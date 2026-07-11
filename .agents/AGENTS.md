# Reglas del Proyecto - Fintech Portfolio Optimized

## Flujo de Despliegue (Deployment Flow)
- **Compilación Local:** Los cambios del frontend deben compilarse localmente en la carpeta `C:\Users\Antonio\OneDrive\Escritorio\fintech-portfolio-optimized\dist` (específicamente la parte estática del cliente se genera en `dist/public`).
- **Despliegue Manual:** El usuario sube manualmente los archivos compilados de la carpeta `dist/public` a Cloudflare Pages.
- **Acción Obligatoria:** Cada vez que se modifique el código del cliente (React/TypeScript), se debe ejecutar inmediatamente el comando de compilación (`npm run build`) para actualizar la carpeta `dist`.
- **Git Push:** No intentar hacer push automático a GitHub para desplegar, a menos que el usuario lo solicite de manera explícita o se discuta la sincronización con Vercel.
- **Vercel (Espejo):** Vercel (`https://fintech-portfolio-optimized.vercel.app/`) se utiliza como un espejo secundario porque el subdominio por defecto de Cloudflare Pages (`.pages.dev`) a veces es catalogado como sospechoso o malicioso en ciertas plataformas (como LinkedIn). Para actualizar Vercel, los cambios deben ser subidos a GitHub (`git commit` y `git push`), lo cual dispara su compilación y despliegue automático.
- **Servicio Principal:** Cloudflare Pages es el servicio de despliegue principal.
