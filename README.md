# Hola 👋, soy Harold

¡Gracias por tomarte el tiempo de revisar mi código y mi portafolio!

Este proyecto es el código fuente de mi CV interactivo y sitio web personal. He puesto mucho cariño en crear una arquitectura moderna, escalable y performante que refleje mis habilidades técnicas y mi atención al detalle.

## 🛠️ Cómo está construido

Este proyecto es una **Single Page Application (SPA)** moderna (con Server Side Rendering gracias a Next.js) que utiliza las tecnologías más actuales del ecosistema React:

### Core

- **[Next.js 16](https://nextjs.org/) (App Router):** Aprovechando las últimas características de React Server Components para un rendimiento óptimo.
- **[TypeScript](https://www.typescriptlang.org/):** Para asegurar un código robusto, mantenible y libre de errores de tipado.
- **[React 19](https://react.dev/):** Utilizando las APIs más recientes.

### UI & Experiencia de Usuario

- **[Tailwind CSS 4](https://tailwindcss.com/):** Para un sistema de diseño ágil y altamente personalizable.
- **[Radix UI](https://www.radix-ui.com/):** Componentes base accesibles (headless UI) para asegurar que la web sea utilizable por todos.
- **[Lucide React](https://lucide.dev/):** Iconografía limpia y consistente.
- **Animaciones:** Integración de movimientos suaves para mejorar la UX.

### Funcionalidades Destacadas

- **Internacionalización (i18n):** Implementado con `next-intl` para ofrecer una experiencia nativa en Español e Inglés, con soporte de rutas dinámicas.
- **Generación de PDF On-the-fly:** Utilizo `@react-pdf/renderer` para generar mi CV en formato PDF en tiempo real, utilizando los mismos datos que la web, asegurando que siempre esté actualizado.
- **Gráficos 3D:** Experimentos visuales con `Three.js` y `@react-three/fiber` para demostrar capacidades creativas.
- **Validación de Datos:** Formularios y esquemas validados con `Zod`.

## 💻 Ejecutar localmente

Para ver el proyecto en tu entorno local:

1.  **Instalar dependencias:**

    ```bash
    npm install
    # o pnpm install
    ```

2.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    # o pnpm dev
    ```

Visita `http://localhost:3000` para verlo en acción.

---

¡Espero que disfrutes explorando el código tanto como yo disfruté escribiéndolo! Si tienes alguna pregunta, no dudes en contactarme.
