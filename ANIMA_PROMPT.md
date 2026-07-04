# Prompt para Anima App - Fintech Portfolio Optimizado

## Contexto General
Transforma el portafolio de Antonio Gutiérrez (B2B Sales Executive en Fintech) en un sitio web premium con efectos inmersivos tipo Awwwards. El sitio debe reflejar el ecosistema fintech de México y LATAM con elementos visuales auténticos (tarjetas, terminales de pago, billeteras digitales).

---

## Especificaciones de Diseño

### Paleta de Colores
- **Primario (Azul Profundo):** `#0F172A` / `oklch(0.15 0.08 260)` - Confianza, seguridad, profesionalismo
- **Secundario (Verde Cítrico):** `#10B981` / `oklch(0.65 0.15 140)` - Crecimiento, energía, movimiento
- **Acento (Naranja Cálido):** `#F97316` / `oklch(0.65 0.20 30)` - Urgencia, acción, CTAs
- **Fondo:** Azul muy oscuro casi negro (`#08111F`)
- **Texto Principal:** Blanco/Gris claro

### Tipografía
- **Display (Títulos):** Sora Bold/Extrabold, 48-72px, tracking -0.02em
- **Body:** Inter Regular/Medium, 16px, line-height 1.6
- **Etiquetas:** Inter Semibold, 12px, uppercase, tracking 0.05em
- **Monoespaciado:** JetBrains Mono para números fintech

### Tema Visual
- Tema oscuro profesional (dark mode)
- Fondo con gradientes sutiles (azul → negro)
- Efectos de profundidad: sombras suaves, bordes con brillo
- Texturas: grid patterns sutiles, bokeh lights en fondos

---

## Estructura de Secciones

### 1. Hero Section (Full Screen)
**Objetivo:** Impacto inmediato, presentar al ejecutivo fintech

**Elementos:**
- Título grande: "B2B Sales Executive Fintech Premium"
- Subtítulo: Descripción de especialización
- Tarjeta 3D flotante a la derecha (perspectiva CSS)
- Stats en grid: "5+ años", "$10M ARR", "500+ Red"
- Botones CTA: "Conectar Ahora" (verde) + "Ver Trayectoria" (outline)
- Scroll indicator animado (bounce)

**Efectos:**
- Parallax en fondo (velocidad 0.3)
- Tarjeta 3D con rotación al mouse
- Slide-in animations (left/right)
- Animated background blobs (float animation)

### 2. Servicios & Capacidades
**Objetivo:** Mostrar expertise en merchant acquiring, APIs, LATAM payments

**Elementos:**
- 6 tarjetas de servicios en grid (3x2)
- Cada tarjeta: ícono + título + descripción + métricas
- Tarjetas con efecto hover: elevación + cambio de color + glow

**Efectos:**
- Scroll-reveal (fade-in + translateY)
- Hover: translateY(-8px) + shadow expansion
- Glow effect en hover (box-shadow con color secundario)

### 3. Terminal de Pago Inteligente (POS)
**Objetivo:** Elemento interactivo que simula transacción fintech

**Elementos:**
- Terminal física 3D (Clip/Square style)
- Pantalla mostrando: "MXN 2,500" animado
- Indicadores LED parpadeantes
- Lector de chip (shimmer effect)
- Keypad numérico
- Botones CANCELAR/CONFIRMAR

**Efectos:**
- Contador animado (números suben al entrar en viewport)
- LED pulse animation
- Shimmer effect en lector de chip
- Transición suave de estado (idle → processing → success)

### 4. Estadísticas Animadas
**Objetivo:** Mostrar impacto cuantificable

**Elementos:**
- 4 contadores: "5+", "$10M", "500+", "90%"
- Cada uno con label descriptivo
- Fondo con gradiente fintech

**Efectos:**
- Scroll-reveal trigger
- Counter animation (0 → valor final en 2s)
- IntersectionObserver para activar solo en viewport

### 5. Trayectoria Comercial (Timeline)
**Objetivo:** Narrar experiencia profesional en fintech

**Elementos:**
- Timeline vertical con línea conectora
- 3-4 posiciones: Fiserv, Clip, LATAM Payments
- Cada item: empresa + rol + período + descripción + badges de métricas
- Puntos interactivos en timeline

**Efectos:**
- Scroll-reveal con stagger (30-50ms entre items)
- Hover: tarjeta se eleva + border cambia a verde
- Timeline line: gradient animation (azul → verde)

### 6. Proyectos Activos
**Objetivo:** Mostrar innovación: Nerv (IA) y LATAM Payments Community

**Elementos:**
- 2 tarjetas grandes con imágenes
- Nerv: "1,000+ fintechs mapeadas", "Gemini 2.0 Flash"
- LATAM Payments: "500+ profesionales", "4 países"
- Imágenes: Network visualization + Digital wallet

**Efectos:**
- Parallax en imágenes (velocidad 0.4)
- Hover: zoom image + overlay info
- Scroll-reveal con fade-in

### 7. Stack Comercial & Técnico
**Objetivo:** Listar herramientas y expertise

**Elementos:**
- 2 columnas: Herramientas (Salesforce, Pipedrive, etc.) + Expertise (Fintech, Acquiring, etc.)
- Herramientas: grid de badges
- Expertise: lista con valores (Experto, MX/LATAM, etc.)

**Efectos:**
- Scroll-reveal
- Hover en badges: cambio de color + border glow

### 8. CTA Final - Conectemos
**Objetivo:** Conversión final

**Elementos:**
- Fondo: Gradiente fintech (azul → verde → naranja)
- Título grande: "Conectemos en el Ecosistema Fintech"
- Descripción: Disponibilidad para partnerships
- Botones: "Enviar Mensaje" (blanco) + "Ver LinkedIn" (outline)
- Info de contacto: Email, teléfono, ubicación

**Efectos:**
- Animated background blobs (float)
- Scroll-reveal
- Botones con hover effect

### 9. Footer
**Objetivo:** Información legal y branding

**Elementos:**
- Logo + marca
- Copyright
- Links a redes (si aplica)

---

## Efectos Técnicos Clave

### Parallax Scroll
- Implementar con scroll listener + transform: translateY()
- Velocidad variable por sección (0.3 - 0.5)
- Solo en elementos visibles (performance)

### Tarjetas 3D
- Usar `perspective: 1000px` + `rotateX/rotateY`
- Rotación basada en posición del mouse
- Transición suave al salir (300ms)

### Scroll-Reveal
- Usar IntersectionObserver
- Trigger: elemento 50% visible
- Animación: opacity 0→1 + translateY(20px→0)
- Duración: 600ms ease-out

### Contadores Animados
- requestAnimationFrame para smoothness
- Duración: 2000ms
- Trigger: IntersectionObserver

### Hover Effects
- Elevación: translateY(-8px)
- Sombra: box-shadow expansion
- Glow: box-shadow con color secundario
- Duración: 300ms ease-out

### Animaciones de Entrada
- Stagger: 30-50ms entre elementos
- Slide-in: translateX ±40px → 0
- Fade-in: opacity 0 → 1
- Duración: 600ms ease-out

---

## Especificaciones de Componentes

### Card3D Component
```
Props:
- children: React.ReactNode
- glowColor: 'accent' | 'secondary'
- className: string

Behavior:
- Mouse move: Rotación 3D basada en posición
- Mouse leave: Reset a rotación 0
- Hover: Elevación + shadow expansion
```

### POSTerminal Component
```
Props:
- amount: number (default 2500)
- currency: string (default 'MXN')
- status: 'idle' | 'processing' | 'success'

Behavior:
- Processing: Contador animado + LED pulse
- Success: Checkmark + LED verde
- Animación de transacción: 2-3 segundos
```

### CounterStat Component
```
Props:
- value: number
- label: string
- prefix/suffix: string
- duration: number (default 2000ms)

Behavior:
- Trigger: IntersectionObserver
- Animation: Contador sube de 0 a value
- Easing: ease-out
```

### ServiceCard Component
```
Props:
- icon: LucideIcon
- title: string
- description: string
- metrics: Array<{label, value}>

Behavior:
- Hover: Elevación + border color change + glow
- Gradient overlay: opacity 0 → 10% on hover
```

---

## Guía de Colores por Sección

| Sección | Fondo | Acentos | Texto |
|---------|-------|---------|-------|
| Hero | Gradient azul → negro | Verde + Naranja | Blanco |
| Servicios | Gris oscuro | Verde | Blanco |
| POS | Gris muy oscuro | Verde LED | Verde |
| Stats | Gradient fintech | Todos | Blanco |
| Trayectoria | Negro | Verde timeline | Blanco |
| Proyectos | Gris oscuro | Verde + Naranja | Blanco |
| Stack | Gris oscuro | Verde badges | Blanco |
| CTA | Gradient fintech | Blanco buttons | Blanco |

---

## Performance & Optimización

- **Lazy load images:** Usar loading="lazy"
- **Parallax performance:** Throttle scroll events (60fps)
- **Animations:** Solo transform + opacity (GPU)
- **Responsive:** Mobile-first, breakpoints en 640px, 1024px
- **Accessibility:** ARIA labels, keyboard navigation, prefers-reduced-motion

---

## Assets Necesarios

1. **Hero Card 3D:** Tarjeta fintech con perspectiva, gradiente azul-verde
2. **POS Terminal:** Terminal de pago Clip/Square style
3. **Digital Wallet:** Billetera digital con tarjetas stacked
4. **Network Visualization:** Nodos LATAM conectados (MX, CO, BR, PE)
5. **Logo Mark:** Símbolo geométrico tarjeta + flecha, gradiente azul-verde, sin texto

---

## Instrucciones Finales para Anima

1. **Importar en Anima:** Usar este prompt como base para el design system
2. **Crear componentes:** Card3D, POSTerminal, CounterStat, ServiceCard como reusable components
3. **Definir design tokens:** Colores, tipografía, spacing, shadows en Anima
4. **Prototipar interacciones:** Parallax, hover effects, scroll animations
5. **Exportar a código:** React + Tailwind CSS compatible
6. **Testing:** Validar en desktop (1280px) y mobile (375px)

---

## Notas Importantes

- **No usar Inter para todo:** Mezclar Sora (display) + Inter (body) crea jerarquía visual
- **Evitar gradientes genéricos:** Usar colores específicos fintech (azul profundo, verde cítrico)
- **Parallax con propósito:** No abusar, solo en hero y secciones clave
- **Accesibilidad primero:** Contraste claro, focus rings, keyboard navigation
- **Mobile-first:** Diseñar para 375px primero, luego escalar a desktop

---

**Versión:** 1.0  
**Última actualización:** Julio 2026  
**Diseño:** Inmersivo Moderno Fintech  
**Inspiración:** Awwwards + Stripe + Revolut + Wise
