[🇺🇸 English](README.en.md) | [🇪🇸 Español](README.md)

# Haroldy Arturo Pérez Rodríguez

> _"No es la materia lo que define al arquitecto, sino la visión que impone sobre el caos para erigir la estructura."_

### 🏛️ Manifiesto: De la Dualidad a la Creación

En el vasto ágora del desarrollo digital, donde las líneas de código tejen la realidad invisible, presento no solo una colección de proyectos, sino una declaración de principios. Este espacio es el reflejo de una **identidad viva**, un equilibrio dialéctico entre dos fuerzas que, lejos de oponerse, convergen para elevar la obra final.

#### 🔵🔴 La República de la Identidad: Harold y Arturo

Como en el mito del carro alado, mi práctica profesional es guiada por dos aurigas, cada uno esencial para el viaje:

- **<span style="color: #3f80ff">Harold (El Azul)</span>**: Representa el _Ethos_ humano. Es el espíritu libre, la empatía necesaria para comprender que detrás de cada pantalla existe un ser humano sintiendo, esperando. Es la fluidez, la creatividad que nace de la libertad y la cercanía.
- **<span style="color: #f15976">Arturo (El Rojo)</span>**: Encarna el _Logos_ ingenieril. Es la mente rigurosa, la disciplina espartana que no admite el error en la estructura. Es la seriedad inquebrantable ante la arquitectura crítica, la firmeza que sostiene el edificio digital.

Ambos convergen en el **Blanco**, símbolo de la síntesis y homenaje silente a mis raíces en la **República Dominicana**. Llevo mi bandera en la sintaxis misma de mi trabajo: Pasión (Rojo), Libertad (Azul) y Salvación (Blanco).

#### 🧬 El Autómata y la Chispa Divina

Observad el fondo de este portfolio. No es un mero artificio estético, sino la representación del **Juego de la Vida de Conway**.

¿Por qué yace aquí? Porque es la metáfora suprema de mi vocación: la **Inteligencia Artificial y la Automatización**. Al igual que en el universo de Conway, donde reglas simples engendran complejidades infinitas y patrones impredecibles, mi labor es ser el demiurgo que orquesta sistemas autónomos.

No construyo software estático; siembro semillas lógicas que germinan, crecen y evolucionan. El orden emerge del caos algorítmico, y en esa emergencia, reside la belleza de nuestra profesión.

---

### 👋 Hola, soy Harold (y Arturo)

¡Gracias por tomarte el tiempo de leer esto y revisar mi código!

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
- **Animaciones e Interactividad:**
  - Integración de **Conway's Game of Life** en Canvas HTML5 para un fondo dinámico e interactivo.
  - Movimientos suaves con Framer Motion y transiciones CSS.

### Funcionalidades Destacadas

- **Diseño Modular:** Arquitectura limpia con componentes reutilizables (`shadcn/ui`) y separación de responsabilidades.
- **Internacionalización (i18n):** Implementado con `next-intl` para ofrecer una experiencia nativa en Español e Inglés.
- **Generación de PDF On-the-fly:** Utilizo `@react-pdf/renderer` para generar mi CV en formato PDF en tiempo real.
- **Validación de Datos:** Formularios robustos con `React Hook Form` y `Zod`.
- **Gráficos 3D:** Integración ligera de elementos 3D.

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
