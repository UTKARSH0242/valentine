# Birthday & Anniversary Website for Akanksha 💕

A romantic, interactive personal website celebrating Akanksha's birthday and your 2nd anniversary.

## Features

- 🎯 **Lock Screen with Countdown Timer** - Counts down to January 30, 2026, 00:00:00
- 🎉 **Confetti Celebration** - 10-second confetti explosion when unlocked
- 🎂 **Birthday Hero Section** - Animated text reveal with glowing orbs
- 💑 **Anniversary Timeline** - Glassmorphism cards showcasing your journey
- 🎵 **Music Toggle** - Floating button to play background music
- 💌 **Personal Letter** - Beautiful card for your heartfelt message
- 📱 **Fully Responsive** - Optimized for all devices

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion (for animations)
- react-confetti

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Customization Guide

### 1. Replace Placeholder Text

Look for comments like `<!-- EDIT THIS -->` or `{/* EDIT THIS */}` throughout the code:

- **HeroSection.jsx**: Add your birthday message
- **AnniversarySection.jsx**: Fill in your milestone stories
- **Footer.jsx**: Write your personal letter

### 2. Add Your Photos

Replace the placeholder image in `HeroSection.jsx`:
```jsx
<img src="your-photo-url-or-path" alt="Special moment" />
```

### 3. Add Background Music

1. Add your music file to `/public/music.mp3`
2. The music toggle button will automatically work

### 4. Adjust Colors (Optional)

Edit `tailwind.config.js` to customize the color palette:
```js
colors: {
  'pastel-yellow-light': '#FEF9C3',
  'pastel-yellow': '#FDE047',
  // ... customize as needed
}
```

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready to deploy!

## Deployment

You can deploy this to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

---

Made with ❤️ for Akanksha
