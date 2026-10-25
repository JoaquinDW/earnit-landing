# SEO para Earnit: del problema buscado a la descarga

Plan de trabajo preparado el 24 de octubre de 2026. La implementación local incluye páginas y guías estáticas en inglés/español, sitemap, enlaces internos, medición configurable y análisis de exportaciones de Search Console. El estado operativo y los pasos de despliegue están en [docs/SEO-WORKFLOW.md](docs/SEO-WORKFLOW.md). No se programó publicación automática.

## Qué muestra el video

Fuente: [Starter Story — I built an app that makes $2K PER DAY](https://www.youtube.com/watch?v=NuYO7DWzlaM&t=465s).

Se revisaron fotogramas de 7:45–9:50 con watch y los subtítulos automáticos en inglés. También se leyó la transcripción de 6:00–7:45 para entender el contexto. Los subtítulos automáticos pueden contener errores; por ejemplo, transcriben el nombre de Claude como «cloud».

- 7:59–8:14: describe agentes de programación y gum, su herramienta de conexión con servicios de Google.
- 8:15–8:35: detecta consultas con apariciones pero pocos clics y publica una guía específica.
- 8:39–8:53: conecta las guías nuevas mediante enlaces internos desde páginas existentes y relaciona el tráfico con ingresos.
- 8:54–9:05: afirma que publica aproximadamente una guía diaria y revisa su calidad.

Es su relato del proceso, no una demostración reproducible de causalidad ni una garantía de resultados. Los 3–4 días que menciona para que Google registre contenido son una observación de su sitio.

## Las piezas del sistema

| Pieza | Para qué sirve |
| --- | --- |
| Google Search Console | Ver consultas y páginas de tu propio sitio: impresiones, clics, CTR y posición media. Requiere verificar la propiedad o recibir acceso. |
| Google Keyword Planner | Investigar demanda estimada y descubrir ideas de búsquedas por mercado e idioma. No sustituye los datos de rendimiento de tu web. |
| Un agente con acceso al repositorio | Investigar, redactar, editar HTML, comprobar enlaces y preparar cambios. |
| gum, opcional | Dar acceso a APIs de Google desde CLI o MCP. Requiere instalación, APIs habilitadas y autorización de las cuentas correspondientes. |
| Medición de adquisición | Conectar las visitas a guías con clics al App Store y, cuando la atribución lo permita, instalaciones e ingresos. |

En el video se menciona Keyword Planner al describir métricas de apariciones y clics del propio sitio. Para replicarlo conviene separar ambas fuentes: esas métricas corresponden a Search Console. Su API admite agrupaciones por consulta y página y acceso de solo lectura.

Fuentes: [Search Console: rendimiento](https://support.google.com/webmasters/answer/7576553?hl=es), [API de Search Analytics](https://developers.google.com/webmaster-tools/v1/searchanalytics/query), [repositorio oficial de gum](https://github.com/ehmo/gum).

## Cómo convertirlo en adquisición

Una persona busca un problema que Earnit puede resolver. Una guía responde a ese problema y muestra cuándo tiene sentido usar Earnit. La guía ofrece un enlace relevante a la explicación del producto y un acceso claro al App Store.

Ejemplo propuesto:

`how to earn screen time by walking` → guía que explica el mecanismo → demostración de Earnit → App Store.

Los enlaces internos son enlaces entre páginas de earnitscreen.com. No requieren comprar enlaces ni conseguir primero otro sitio con tráfico. Ayudan a descubrir páginas y a entender la relación entre ellas; enlazar una página no le garantiza una posición.

La guía debe servir incluso a quien no instale la app. Si explica cómo configurar restricciones nativas de iPhone, hay que verificar los pasos con documentación actual de Apple y distinguir esas opciones del mecanismo de Earnit.

## Punto de partida del repositorio

Inspección local, sin auditoría de la versión desplegada ni acceso a Search Console:

- `index.html` ya tiene título, descripción, canonical y metadatos sociales.
- Hay una landing, soporte y páginas legales; todavía no se encontró una sección de guías.
- No se encontraron `sitemap.xml` ni `robots.txt` en el repositorio. Su ausencia no impide por sí sola aparecer en Google; el sitemap puede facilitar el descubrimiento de URLs nuevas.
- El cambio inglés/español se hace mediante JavaScript en una misma URL. Para trabajar SEO en ambos idiomas conviene servir cada versión en una URL propia, con contenido disponible directamente en HTML, canonical propio y referencias `hreflang` recíprocas.
- Este diagnóstico no demuestra si el sitio ya está indexado, cuánto tráfico recibe ni qué búsquedas tienen oportunidad.

Fuentes: [guía inicial de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [sitios multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

## Primeras páginas propuestas

Estas consultas son hipótesis basadas en el producto. No se han medido su volumen ni su dificultad. Las URLs son propuestas y todavía no existen.

| Consulta candidata | URL propuesta | Intención y contenido |
| --- | --- | --- |
| earn screen time by walking | `/guides/earn-screen-time-by-walking/` | Explicar pasos → minutos → desbloqueo de apps, con capturas reales y configuración verificada. Es el punto de entrada más cercano al producto. |
| block apps until step goal | `/guides/block-apps-until-step-goal/` | Resolver si se puede condicionar el acceso a movimiento. Comprobar primero que la intención coincide con el mecanismo real de Earnit; no prometer una meta fija si funciona con saldo de minutos. |
| how to limit Instagram on iPhone | `/guides/limit-instagram-iphone/` | Guía práctica que compare el límite nativo con ganar tiempo mediante pasos. Verificar instrucciones y limitaciones. |

Si las dos primeras consultas tienen la misma intención y resultados similares, cubrirlas con una única guía. No crear páginas casi iguales cambiando solo palabras.

Antes de escribir: revisar los resultados actuales por país e idioma, comprobar qué respuesta buscan los usuarios y priorizar la cercanía al producto. Una búsqueda de gran volumen puede atraer personas que no necesitan Earnit.

## Orden de implementación

1. **Conseguir una línea base.** Verificar earnitscreen.com en Search Console y revisar indexación, consultas y páginas. Si no hay datos suficientes, comenzar con investigación de demanda y unas pocas guías útiles.
2. **Preparar la estructura.** Crear `/guides/`, una plantilla de artículo y enlaces HTML rastreables desde la landing. Mantener títulos y descripciones únicos y canonical propio por página. Añadir sitemap con las URLs publicadas.
3. **Publicar una primera guía.** Empezar por caminar para ganar tiempo de pantalla, si la investigación confirma una oportunidad. Incluir respuesta directa, pasos comprobados, imágenes reales, limitaciones y CTA al App Store cerca del punto donde se explica la solución.
4. **Medir.** Registrar visitas a cada guía y clics al App Store. Un clic no equivale a una instalación; una instalación tampoco equivale a una compra. Usar los datos disponibles de App Store Connect para evaluar la parte posterior del recorrido.
5. **Iterar con datos.** Revisar semanalmente qué consultas empiezan a aparecer y si conviene mejorar una guía existente o crear una respuesta distinta.

No hace falta esperar a tener una página con mucho tráfico para empezar. La landing puede enlazar a las primeras guías y estas pueden enlazarse entre sí cuando sean pertinentes.

## Regla de selección para el agente

Usar ventanas de varias semanas y segmentar por país/idioma cuando haya datos suficientes. Search Console muestra consultas donde tu sitio aparece; no es un inventario completo de todas las búsquedas del mercado.

- Muchas impresiones y posición baja: comprobar intención, calidad y competencia. No asumir que cambiar el título bastará.
- Posición razonable y pocos clics: revisar título, descripción, formato del resultado y si responde a la búsqueda.
- Tráfico relevante y pocos clics al App Store: revisar la explicación del producto y el CTA.
- Una guía ya cubre la intención: mejorarla antes de crear otra que compita con ella.
- Falta evidencia o no hay oportunidad clara: no generar un artículo para cumplir una cuota.

La posición es una media y el CTR depende del contexto. Los datos de consultas pueden estar limitados por privacidad y por las restricciones de la API.

## Instrucción reutilizable para una ejecución del agente

> Analizá el SEO de Earnit con los datos de Search Console disponibles y las páginas actuales del repositorio. Separá hechos medidos de hipótesis. Elegí como máximo una oportunidad vinculada a una capacidad verificada del producto. Mostrá la consulta, la URL que ya aparece, las métricas y el motivo de la elección. Si una página cubre la misma intención, mejorala; si falta una respuesta distinta, prepará una guía nueva. Verificá instrucciones técnicas con fuentes oficiales y no inventes capturas, estadísticas, testimonios ni funcionalidades. Agregá enlaces internos contextuales, un CTA relevante al App Store y los metadatos correspondientes. Comprobá enlaces y consistencia del contenido. Entregá cambios revisables y explicá qué falta si no tenés acceso a datos. No publiques ni programes ejecuciones mediante esta instrucción.

Esta instrucción sirve para ejecutar el proceso una vez. Convertirlo en una tarea recurrente requiere configurar por separado la frecuencia, el acceso a datos y el flujo de publicación.

## Expectativas

La cadencia de una guía diaria es la elección del entrevistado. No existe una regla general de Google que premie esa frecuencia. Evaluar resultados lleva tiempo: el descubrimiento, la indexación, las posiciones y las conversiones son pasos distintos.

El objetivo de Earnit sería conseguir usuarios interesados en cambiar su relación con el teléfono y dispuestos a probar el mecanismo de esfuerzo → tiempo de pantalla. El número de artículos es una medida de producción; las instalaciones y conversiones atribuibles son medidas de resultado.
