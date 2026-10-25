import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { randomUUID } from 'node:crypto';

const source = await readFile(new URL('../assets/analytics.js',import.meta.url),'utf8');
function run({host='www.earnitscreen.com',dnt='0',gpc=false,enabled=true}={}) {
  const requests = [], listeners = {};
  const window = { EARNIT_ANALYTICS:{enabled,productionHost:'www.earnitscreen.com',host:'https://ingest.example',token:'phc_test'}, addEventListener:(event,fn) => { listeners[event] = fn; } };
  vm.runInNewContext(source,{
    window,location:{hostname:host,pathname:'/guides/walking/',search:'?email=private@example.com'},
    navigator:{doNotTrack:dnt,globalPrivacyControl:gpc},
    document:{documentElement:{lang:'en'},body:{dataset:{content:'walking'}},referrer:'https://www.google.com/search?q=private'},
    crypto:{randomUUID},URL,fetch:(url,options) => {requests.push({url,options,payload:JSON.parse(options.body)});return Promise.resolve({ok:true});}
  });
  return {requests,listeners};
}
test('previews, opt-out signals and disabled configuration send no events', () => {
  for (const settings of [{host:'localhost'},{host:'preview.vercel.app'},{dnt:'1'},{gpc:true},{enabled:false}]) assert.equal(run(settings).requests.length,0);
});
test('only explicit views and App Store clicks are captured, with a per-page ID', () => {
  const {requests,listeners} = run();
  listeners['earnit:analytics']({detail:{event:'app_store_click',properties:{placement:'setup'}}});
  listeners['earnit:analytics']({detail:{event:'unexpected',properties:{}}});
  assert.equal(requests.length,2);
  assert.equal(requests[0].payload.event,'website_page_viewed');
  assert.equal(requests[1].payload.event,'app_store_click');
  assert.equal(requests[0].payload.distinct_id,requests[1].payload.distinct_id);
  assert.notEqual(requests[0].payload.distinct_id,run().requests[0].payload.distinct_id);
  assert.equal(requests[0].payload.properties.$process_person_profile,false);
  assert.equal(requests[0].payload.properties.$geoip_disable,true);
  assert.equal(requests[0].options.credentials,'omit');
  assert.equal(requests[0].options.keepalive,true);
  assert.equal(requests[0].payload.properties.referrer_host,'www.google.com');
  assert.equal(JSON.stringify(requests).includes('private'),false);
});
