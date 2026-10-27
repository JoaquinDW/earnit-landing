(() => {
  const phone = document.getElementById('demo-phone');
  const data = document.getElementById('demo-copy');
  if (!phone || !data) return;
  const copy = JSON.parse(data.textContent);
  const stages = {
    walk: { balance: '0', label: 'phone.available', sub: 'phone.spend', action: 'phone.earn', next: 'phone.moveNext', steps: 'phone.moveSteps', earned: 'phone.moveEarned', state: 'phone.locked', note: 'demo.walkNote' },
    earn: { balance: '10', label: 'phone.available', sub: 'phone.spend', action: 'phone.earn', next: 'phone.next', steps: 'phone.steps', earned: 'phone.earned', state: 'phone.state', note: 'demo.earnNote' },
    use: { balance: '5', label: 'phone.sessionLabel', sub: 'phone.sessionSub', action: 'phone.sessionAction', next: 'phone.sessionNext', steps: 'phone.steps', earned: 'phone.earned', state: 'phone.session', note: 'demo.unlockNote' }
  };
  function render(stage) {
    const state = stages[stage];
    if (!state) return;
    phone.dataset.stage = stage;
    const balance = document.getElementById('demo-balance');
    if (balance) balance.innerHTML = state.balance + ' <small>min</small>';
    document.getElementById('balance-number').textContent = state.balance;
    for (const [id, key] of Object.entries({
      'balance-label': state.label, 'balance-sub': state.sub, 'phone-action-label': state.action,
      'phone-next': state.next, 'phone-steps': state.steps, 'phone-earned': state.earned,
      'phone-state': state.state, 'demo-note': state.note
    })) document.getElementById(id).textContent = copy[key];
    document.querySelectorAll('button[data-stage]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.stage === stage));
    });
  }
  const preview = document.getElementById('app-preview');
  document.querySelectorAll('button[data-preview]').forEach(button => {
    button.addEventListener('click', () => {
      preview.dataset.preview = button.dataset.preview;
      document.querySelectorAll('button[data-preview]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
  document.querySelectorAll('button[data-stage]').forEach(button => {
    button.addEventListener('click', () => render(button.dataset.stage));
  });
})();
