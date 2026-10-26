# Descubrimiento en buscadores con IA

Revisión: 26 de octubre de 2026. Alcance: ChatGPT Search, Google, Bing/Copilot, Claude y Perplexity. Acceso técnico y elegibilidad no equivalen a indexación, cita ni recomendación.

## Comprobado

- Las páginas entregan HTML completo: encabezados, respuestas, tablas, fuentes y enlaces funcionan sin ejecutar JavaScript.
- `robots.txt` permite el rastreo general y anuncia el sitemap. Esa regla también permite OAI-SearchBot, Googlebot, bingbot, PerplexityBot y Claude-SearchBot. No hacen falta grupos redundantes por agente mientras no haya restricciones específicas.
- La guía publicada devolvió HTTP 200, sin X-Robots-Tag restrictivo y con el mismo hash HTML para los cinco nombres de agente. Son solicitudes de prueba desde este equipo, no visitas autenticadas de las IP de cada proveedor.
- Hay canonical por URL, hreflang recíproco, HTML en ambos idiomas y sitemap de páginas publicadas. Las futuras siguen fuera hasta su fecha.
- Las búsquedas públicas `site:earnitscreen.com` de esta revisión no devolvieron resultados. Eso no establece el estado de indexación: falta confirmarlo con las herramientas del propietario.

## Mejoras aplicadas

- Mecanismo concreto de cada opción en las tablas y criterios explícitos para considerar otra alternativa, incluidos los límites de encaje de Earnit.
- Página editorial bilingüe que identifica al editor, su interés comercial, fuentes, método, asistencia de IA, límites de la comparación y canal de correcciones. Enlazada desde la autoría de las guías.
- Entidades estables de editor y app; Article enlazado al editor; citas estructuradas presentes también como enlaces visibles; ItemList coherente con los productos de la página. Sin valoraciones, precios ni pruebas inventadas.
- El build comprueba que las páginas públicas no lleven directivas de noindex/nosnippet ni bloqueos de robots para los agentes revisados. También verifica la correspondencia entre las citas/listas estructuradas y los enlaces visibles.
- `npm run verify:crawlers` permite repetir la prueba HTTP después de un despliegue. No cambia firewall, políticas de entrenamiento ni permisos.

## Estándar editorial para la campaña

Una lista de alternativas debe responder a una decisión propia, explicar la diferencia entre los mecanismos, identificar a quién le conviene cada opción y citar información verificable. La numeración organiza recomendaciones por caso de uso; no acredita superioridad medida. No publicar variantes de la misma intención solo para multiplicar páginas. La revisión documental no se presenta como experiencia práctica.

## Próximas comprobaciones de adquisición

1. Confirmar sitemap e indexación de las nuevas URLs en Search Console y Bing Webmaster Tools con el acceso del propietario. La propiedad de Google ya se había verificado en el trabajo anterior; este informe no acredita la indexación de los artículos nuevos ni el alta en Bing.
2. Añadir pruebas propias documentadas: dispositivo, versión, configuración, tarea y resultado observado, con capturas y límites. No inventar el uso de competidores ni comprar suscripciones sin autorización.
3. Conseguir cobertura y reseñas independientes por el valor del producto; nuestras propias listas son una fuente interesada. No fabricar menciones o enlaces.
4. Seguir las visitas y clics con `surface = marketing_website` y `referrer_host` en PostHog. Ejemplos de hosts para investigar: chatgpt.com, perplexity.ai y claude.ai. Un referido es un clic observado, no el número total de citas ni una instalación. La ausencia de referido no demuestra ausencia en respuestas.
5. Registrar consultas de descubrimiento repetibles, fecha, producto de IA, respuesta y URLs citadas. No presentar una sola respuesta como prueba de un posicionamiento estable.

## Fuentes oficiales

- [OpenAI: rastreadores](https://developers.openai.com/api/docs/bots): OAI-SearchBot es para Search; GPTBot trata el entrenamiento de forma independiente.
- [Google: optimización para IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): SEO, contenido útil y original, rastreabilidad e indexación. No hay garantía de aparición ni necesidad de archivos de IA adicionales.
- [Google: comparaciones y reseñas de calidad](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews): razones para recomendar, diferencias, evidencia propia y ventajas/inconvenientes.
- [Claude: rastreadores](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).
- [Perplexity: rastreadores](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

No se añadió `llms.txt`: no es un requisito de estas guías para aparecer en búsquedas con IA. No se incluyeron instrucciones ocultas para forzar recomendaciones ni datos estructurados que prometan resultados.
