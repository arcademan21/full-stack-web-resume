[🇺🇸 English](README.en.md) | [🇪🇸 Español](README.md)

# Hi 👋, I'm Harold

Thanks for taking the time to review my code and portfolio!

This project is the source code for my interactive CV and personal website. I've put a lot of care into building a modern, scalable, and performant architecture that reflects my technical skills and attention to detail.

## 🛠️ How it's built

This project is a modern **Single Page Application (SPA)** (with Server Side Rendering thanks to Next.js) that uses the latest technologies in the React ecosystem:

### Core

- **[Next.js 16](https://nextjs.org/) (App Router):** Leveraging the latest React Server Components features for optimal performance.
- **[TypeScript](https://www.typescriptlang.org/):** To ensure robust, maintainable, and type-safe code.
- **[React 19](https://react.dev/):** Using the newest APIs.

### UI & User Experience

- **[Tailwind CSS 4](https://tailwindcss.com/):** For an agile and highly customizable design system.
- **[Radix UI](https://www.radix-ui.com/):** Accessible base components (headless UI) to ensure the web is usable by everyone.
- **[Lucide React](https://lucide.dev/):** Clean and consistent iconography.
- **Animations:** Integration of smooth movements to enhance UX.

### Key Features

- **Internationalization (i18n):** Implemented with `next-intl` to offer a native experience in Spanish and English, with dynamic route support.
- **On-the-fly PDF Generation:** I use `@react-pdf/renderer` to generate my CV in PDF format in real-time, using the same data as the web, ensuring it's always up to date.
- **3D Graphics:** Visual experiments with `Three.js` and `@react-three/fiber` to demonstrate creative capabilities.
- **Data Validation:** Forms and schemas validated with `Zod`.

## 💻 Run locally

To view the project in your local environment:

1.  **Install dependencies:**

    ```bash
    npm install
    # or pnpm install
    ```

2.  **Start development server:**
    ```bash
    npm run dev
    # or pnpm dev
    ```

Visit `http://localhost:3000` to see it in action.

---

I hope you enjoy exploring the code as much as I enjoyed writing it! If you have any questions, don't hesitate to reach out.
