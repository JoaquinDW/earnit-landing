# Operación del SEO de Earnit

## Estado comprobado el 24 de octubre de 2026

La propiedad de dominio `sc-domain:earnitscreen.com` está verificada en Google Search Console. La vista de descripción general todavía muestra que está procesando rendimiento, indexación y experiencia. Esto no equivale a cero tráfico ni demuestra que las páginas estén indexadas.

Se implementaron las versiones inglesa y española de la landing, el índice y dos guías. Las intenciones «ganar tiempo caminando» y «bloquear apps hasta caminar» se reúnen en una guía, para evitar dos artículos casi iguales. Las consultas son hipótesis editoriales; todavía no hay datos de Search Console que acrediten su volumen o dificultad.

## Despliegue y sitemap

1. Ejecutar `npm run build`, `npm run check` y `npm test`.
2. Publicar el cambio mediante el proyecto de Vercel existente. La configuración ahora sirve `public/`, no la raíz del repositorio.
3. Comprobar en producción `/`, `/es/`, `/guides/`, una guía en cada idioma, `/robots.txt` y `/sitemap.xml`. Las guías deben devolver HTML completo y estado 200, sin ejecutar JavaScript.
4. En [Search Console → Sitemaps](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aearnitscreen.com), enviar `https://www.earnitscreen.com/sitemap.xml` después de comprobar que está disponible públicamente. No enviar la URL del servidor local ni la del preview.
5. Inspeccionar una guía nueva con la herramienta de inspección de URLs y revisar su estado de indexación. La publicación o el envío de un sitemap no garantizan indexación ni posición.

El sitemap incluye las once URLs públicas relevantes: ocho páginas localizadas y las tres páginas legales/de soporte. Sus referencias de idioma son recíprocas. `robots.txt` permite rastreo y anuncia el sitemap. Los prototipos del repositorio no se publican.

## Revisar datos sin instalar herramientas

Cuando Search Console termine de procesar:

1. Abrir Rendimiento → Resultados de búsqueda.
2. Elegir un periodo de varias semanas. Anotar filtros de país, dispositivo y tipo de búsqueda.
3. Exportar la tabla **Consultas** a CSV (en el ZIP exportado, suele llamarse `Queries.csv` o `Consultas.csv`).
4. Guardarla dentro de `.seo-data/`, que está excluida de Git y del despliegue.
5. Ejecutar:

```sh
npm run seo:opportunities -- --input .seo-data/Queries.csv
```

El informe queda en `.seo-data/opportunities.md`. El script admite cabeceras en inglés y español. Una exportación de consultas sin dimensión página no se convierte artificialmente en datos por página: la columna aparecerá vacía. Una exportación de páginas se rechaza si no incluye consultas.

La prioridad inicial ordena consultas relevantes por impresiones, con un umbral predeterminado de 25. Es una heurística, no una dificultad SEO ni una predicción de ingresos. Puede ajustarse con `--min-impressions`. No crea ni publica artículos.

## Acceso por API, opcional

Para automatizar la lectura se necesita habilitar Search Console API y autorizar la cuenta que tiene acceso a la propiedad con el scope `https://www.googleapis.com/auth/webmasters.readonly`. Verificar el dominio en el navegador no concede automáticamente ese acceso a un script.

Con un token OAuth válido en la variable de entorno `GSC_ACCESS_TOKEN`:

```sh
npm run seo:opportunities -- --fetch --start 2026-10-01 --end 2026-10-21
```

Las fechas son un ejemplo: elegir un periodo con datos disponibles. El script usa datos finales, agrupa por consulta y página, pagina hasta 100.000 filas y señala si alcanza ese límite. Guarda datos e informe localmente. No imprime ni guarda el token. Search Console puede omitir consultas por privacidad y limitar los datos devueltos.

No poner el token de Google en `.env.local` de la web, en Vercel ni en código del navegador. El generador solo lee las tres variables de analítica pública especificadas en `.env.example`.

## Medición de la web con PostHog

Se encontró el proyecto existente de Earnit: ID `613296`. Su configuración pública de ingesta quedó en `.env.local` de este equipo, fuera de Git. Las tres variables también se guardaron y comprobaron en el entorno **Production** del proyecto `earnit-landing` en Vercel. Se aplicarán al próximo despliegue de producción; no se republicó la web actual.

Para reinstalar o trasladar la configuración, las variables son:

- `POSTHOG_PROJECT_TOKEN`: el token público de proyecto, nunca una clave personal.
- `POSTHOG_HOST`: el host de ingesta que devuelve la configuración del proyecto.
- `ENABLE_WEBSITE_ANALYTICS=true`.

Si falta la configuración, la analítica queda apagada. Si se activa pero falta un valor obligatorio, el build falla. Las visitas a localhost y previews no se envían al proyecto de producción.

Eventos:

| Evento | Cuándo | Propiedades |
| --- | --- | --- |
| `website_page_viewed` | Al cargar una página localizada en el dominio de producción | `surface`, `page`, `language`, `content`, `referrer_host` |
| `app_store_click` | Al pulsar un enlace marcado al App Store | Las anteriores y `placement` |

Filtrar siempre `surface = marketing_website` para separarlos de los eventos de la app. Para medir clics desde artículos, filtrar `content = walking` o `content = instagram` y agrupar por `page` o `language`.

El identificador vive solo en memoria durante una página: sirve para relacionar su visita con sus clics, no para contar personas únicas o reconstruir sesiones entre páginas. No hay cookies, almacenamiento del navegador, replay ni perfiles de persona. No se envían queries de URL ni rutas del sitio de origen. DNT y GPC apagan los eventos. Los bloqueadores, fallos de red y preferencias del navegador pueden reducir la medición.

Un clic al App Store no demuestra una instalación o compra. Evaluar instalaciones y compras con las herramientas de App Store Connect y su atribución disponible. Este cambio no crea atribución individual entre web y app.

Fuentes: [captura HTTP de PostHog](https://posthog.com/docs/api/capture#single-event), [eventos sin perfiles](https://posthog.com/docs/product-analytics/installation/api).

## Una revisión de contenido

Usar [la instrucción del plan](../SEO-PLAN.md#instrucción-reutilizable-para-una-ejecución-del-agente) junto con el informe local. Preparar como máximo una oportunidad relevante por ejecución:

1. Si ya existe una guía para la intención, mejorarla.
2. Si la intención es distinta, verificar la búsqueda y preparar un artículo con utilidad propia.
3. Añadir enlaces internos contextuales y metadatos por idioma.
4. Verificar producto e instrucciones del sistema; no inventar estadísticas, capturas o funciones.
5. Construir, comprobar y entregar cambios revisables.

Al 24 de octubre no había publicación automática. El 26 de octubre el usuario autorizó la campaña de listicles descrita en [el calendario](seo/CALENDAR-2026-10-26.md): 20 keywords de Applyra agrupadas en 10 artículos bilingües, publicados del 26 de octubre al 4 de noviembre mediante una automatización diaria de este chat. Las métricas de Applyra son de App Store; no son volumen de Google.
