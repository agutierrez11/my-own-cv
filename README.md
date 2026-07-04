# Portafolio Profesional Optimizado - Antonio Gutiérrez

Este es el repositorio del portafolio profesional interactivo de **Antonio Gutiérrez**, Sales Executive especialista en Fintech, Merchant Acquiring y Go-to-Market (GTM) en LATAM.

El sitio está diseñado con una estética premium, animaciones a 60fps, y cuenta con un sistema avanzado de analíticas y tracking de comportamiento para auditar las visitas de reclutadores y clientes.

---

## 📊 Sistema de Analíticas y Tracking de Usuarios

El proyecto integra dos herramientas complementarias de medición de comportamiento, configuradas de manera segura y respetuosa con la privacidad:

### 1. Microsoft Clarity (Mapas Térmicos y Video-Grabaciones)
* **Objetivo:** Permite ver grabaciones de video reales de la interacción de los usuarios con el CV y visualizar mapas térmicos (heatmaps) de scroll y clics para entender qué capta más la atención.
* **Integración:** Inyección dinámica del script oficial en React.
* **Identificador del Proyecto:** `xgxlzgk1ci` (asociado a la cuenta oficial de Clarity).
* **Visualización:** Puedes ver las grabaciones en vivo e históricos en tu consola de [Microsoft Clarity](https://clarity.microsoft.com/).

### 2. Umami / Cloudflare Web Analytics (Eventos y Tiempo de Lectura)
* **Mapeo de Secciones:** El sitio utiliza un `IntersectionObserver` en React para medir cuánto tiempo (en segundos) pasa el lector en cada sección:
  * `#trayectoria`
  * `#proyectos`
  * `#certificaciones`
  * `#contacto`
* **Filtro Inteligente:** Ignora el scroll rápido (menos de 3 segundos) para mantener las estadísticas limpias.
* **Envío de Eventos:** Si un usuario lee una sección por más de 3 segundos, envía un evento de forma automática a Umami (`section_view_duration`) y a Clarity (`section_read_duration`) indicando el nombre de la sección y los segundos de atención.

---

## 🔒 Modo Administrador / Exclusión del Contador de Visitas

El CV cuenta con un contador de visitas visual en el footer. Para evitar que tus propias visitas o recargas repetidas inflen los números de forma artificial, se implementó la siguiente lógica en el almacenamiento local (`localStorage`):

### 1. Excluir tu Navegador Permanentemente (Modo Admin)
* Entra al CV desde tu dispositivo usando el parámetro `?admin=true` o `?exclude=true` en la URL:
  * **Local:** `http://localhost:3001/?admin=true`
  * **Producción:** `https://cvagutierrezj2026.pages.dev/?admin=true`
* Esto guardará la clave `portfolio_admin_exclude: true` en tu navegador. Tus visitas en ese dispositivo ya no se contarán en las estadísticas (solo leerán la cifra actual para que puedas monitorearla).

### 2. Deduplicación de Visitas Únicas (Visitantes normales)
* El navegador de cada visitante normal guarda el timestamp de su última visita. 
* Si recargan la página o entran varias veces el mismo día, el sistema no incrementará el contador si han pasado menos de **24 horas** desde su última visita.

---

## 🚀 Despliegue en Cloudflare Pages

El despliegue está enlazado a Cloudflare Pages bajo el dominio:
🔗 **[https://cvagutierrezj2026.pages.dev/](https://cvagutierrezj2026.pages.dev/)**

Para subir nuevos cambios a producción, vincula este repositorio local a tu GitHub:
```bash
git remote add origin https://github.com/tu-usuario/nombre-del-repo.git
git branch -M main
git push -u origin main
```
*(Esto disparará el deploy automático en Cloudflare Pages en cuanto completes tu primer push).*

---

## 🛠️ Tecnologías Utilizadas
* **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion (para transiciones fluidas y micro-interacciones).
* **Parallax System:** Componentes SVG animados con factores de velocidad dinámicos calculados según el desplazamiento de scroll del viewport.
* **Compilación:** Esbuild para el backend ligero de Node y Vite para la optimización de assets.
