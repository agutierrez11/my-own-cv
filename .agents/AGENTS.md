# Reglas del Proyecto - Fintech Portfolio Optimized

## Flujo de Despliegue (Deployment Flow)
- **Deploy Principal:** `git commit` + `git push origin main` → Cloudflare Pages auto-build → sitio live. NO se requieren uploads manuales.
- **Cloudflare Pages** (`cvagutierrezj2026.pages.dev`): conectado a `agutierrez11/my-own-cv` (branch `main`). Build command: `npm run build`. Output: `dist/public`.
- **Vercel (Espejo LinkedIn):** `https://fintech-portfolio-optimized.vercel.app/` se actualiza automáticamente con cada `git push`. Se usa como espejo porque el subdominio `.pages.dev` de Cloudflare puede ser catalogado como sospechoso en LinkedIn.
- **⚠️ BUG CRÍTICO RESUELTO:** El archivo `client/public/_redirects` tenía un redirect `/* https://fintech-portfolio-optimized.vercel.app/:splat 301` que enviaba TODO el tráfico de Cloudflare Pages a Vercel. NUNCA agregar redirects 301 a dominios externos en ese archivo. El archivo correcto debe contener solo `/* /index.html 200` (SPA fallback).
- **NO subir archivos manualmente** a Cloudflare Pages. El pipeline de git es el único canal de deploy.

## Redacción del CV Tradicional (Viñetas de Clip)
Cuando se actualice el CV tradicional en PDF/Word o se redacten cartas de presentación, usar exactamente esta estructura para la experiencia en Clip:
- **Top Performer & Cumplimiento:** Posicionado en el Top 12% nacional (Lugar #22 de 184 ejecutivos de Middle Market) en H1 2022, superando las cuotas de volumen mensual asignadas por más del 280% de forma consistente ($2.8M a $5.8M MXN promedio frente a la meta de $1M).
- **Eficiencia de Cartera (High Value):** Diseñé y ejecuté una estrategia comercial enfocada en cuentas medianas de alto potencial, logrando un TPV promedio por deal de $555k MXN (60% superior a la media del segmento), maximizando el volumen procesado con una fracción del costo operativo de integración y soporte.
- **Cierre de Cuentas Enterprise (Outbound):** Cerré de manera autónoma las cuentas de mayor volumen de la cartera en el sector turismo de lujo, destacando The Yacht Experiences ($14.5M MXN YTD) y Jetpack Adventures ($20.0M MXN YTD) mediante prospección activa en frío.
- **Integraciones Tecnológicas & APIs:** Lideré negociaciones comerciales complejas e integraciones de pasarela de pagos vía API/ISV con sistemas clave (Bistrosoft, Profitroom, Odoo ERP), incrementando la retención de clientes a largo plazo con una tasa de churn cercana a cero.

