# Reglas del Proyecto - Fintech Portfolio Optimized

## Flujo de Despliegue (Deployment Flow)
- **Compilación Local:** Los cambios del frontend deben compilarse localmente en la carpeta `C:\Users\Antonio\OneDrive\Escritorio\fintech-portfolio-optimized\dist` (específicamente la parte estática del cliente se genera en `dist/public`).
- **Despliegue Manual:** El usuario sube manualmente los archivos compilados de la carpeta `dist/public` a Cloudflare Pages.
- **Acción Obligatoria:** Cada vez que se modifique el código del cliente (React/TypeScript), se debe ejecutar inmediatamente el comando de compilación (`npm run build`) para actualizar la carpeta `dist`.
- **Git Push:** No intentar hacer push automático a GitHub para desplegar, a menos que el usuario lo solicite de manera explícita o se discuta la sincronización con Vercel.
- **Vercel (Espejo):** Vercel (`https://fintech-portfolio-optimized.vercel.app/`) se utiliza como un espejo secundario porque el subdominio por defecto de Cloudflare Pages (`.pages.dev`) a veces es catalogado como sospechoso o malicioso en ciertas plataformas (como LinkedIn). Para actualizar Vercel, los cambios deben ser subidos a GitHub (`git commit` y `git push`), lo cual dispara su compilación y despliegue automático.
- **Servicio Principal:** Cloudflare Pages es el servicio de despliegue principal.

## Redacción del CV Tradicional (Viñetas de Clip)
Cuando se actualice el CV tradicional en PDF/Word o se redacten cartas de presentación, usar exactamente esta estructura para la experiencia en Clip:
- **Top Performer & Cumplimiento:** Posicionado en el Top 12% nacional (Lugar #22 de 184 ejecutivos de Middle Market) en H1 2022, superando las cuotas de volumen mensual asignadas por más del 280% de forma consistente ($2.8M a $5.8M MXN promedio frente a la meta de $1M).
- **Eficiencia de Cartera (High Value):** Diseñé y ejecuté una estrategia comercial enfocada en cuentas medianas de alto potencial, logrando un TPV promedio por deal de $555k MXN (60% superior a la media del segmento), maximizando el volumen procesado con una fracción del costo operativo de integración y soporte.
- **Cierre de Cuentas Enterprise (Outbound):** Cerré de manera autónoma las cuentas de mayor volumen de la cartera en el sector turismo de lujo, destacando The Yacht Experiences ($14.5M MXN YTD) y Jetpack Adventures ($20.0M MXN YTD) mediante prospección activa en frío.
- **Integraciones Tecnológicas & APIs:** Lideré negociaciones comerciales complejas e integraciones de pasarela de pagos vía API/ISV con sistemas clave (Bistrosoft, Profitroom, Odoo ERP), incrementando la retención de clientes a largo plazo con una tasa de churn cercana a cero.

