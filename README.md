# Taskle

Taskle is a personal task management application designed to help you organize and prioritize your daily tasks efficiently. It features a handcrafted, warm, and creative UI that feels like a beautifully designed digital notebook.

## ✨ Theme & Design System

Taskle uses a unique "Handcrafted Productivity" theme:

- **Dark, warm backgrounds** (`#1B1615`, `#232329`) with high-contrast white text
- **Yellow accents** (`#fde047`, `#facc15`, `#eab308`) for highlights, buttons, and active states
- **Handwritten fonts**: `Virgil` for headings, `Patrick Hand` for UI/body, `Geist Sans` as fallback
- **Glass-morphism**: Semi-transparent overlays, backdrop blur, and soft borders
- **Generous spacing** and **rounded corners** for a soft, inviting feel
- **Smooth animations** and **responsive design** for all devices

See [`THEME_CONTEXT.md`](./THEME_CONTEXT.md) for a full design system and LLM prompt context.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🖋️ Fonts

- **Virgil** (local, for headings/logo)
- **Patrick Hand** (Google Fonts, for UI/body)
- **Geist Sans/Mono** (Google Fonts, fallback)

Fonts are loaded and configured in [`src/app/layout.tsx`](./src/app/layout.tsx).

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [@tanstack/react-query](https://tanstack.com/query/latest)

## 📁 Project Structure

- `src/app/` — App routes, layout, and global styles
- `src/components/` — UI components (Navbar, Home, etc.)
- `public/assets/fonts/` — Local font files (Virgil)
- `THEME_CONTEXT.md` — Full design system and LLM prompt context

## 🧑‍🎨 Contributing

Pull requests and feedback are welcome! Please read the theme context before contributing UI changes.

## 📄 License

MIT

---

> Taskle: Productivity, beautifully handcrafted.
