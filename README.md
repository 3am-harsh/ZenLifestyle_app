# ZenLifestyle

A minimalist, profoundly aesthetic self-improvement web application inspired by the philosophy of Bushido and Zen Buddhism.

## Overview
ZenLifestyle is designed to be more than just a habit tracker. It is a digital dojo—a place to forge discipline, focus, and ultimate flow. Designed as a fully self-contained, offline-capable progressive web app (PWA), it leverages `localStorage` to keep your data completely private and persistent on your device.

## Features
- **Kenzen Ichi Pathway (Sword & Zen are One):** A structured journey through the 7 virtues of Bushido (Gi, Yū, Jin, Rei, Makoto, Meiyo, Chūgi), each unlocking profound lessons and highly aesthetic visual rewards.
- **The Journey (Login Streak):** Visual progression timeline inspired by the wandering swordsman. Maintain your streak to encounter legendary masters.
- **The Zen Garden:** A visual, interactive representation of your daily habits (Mind, Body, Craft, Wealth, Spirit, Intellect). Watch your garden grow as you consistently tend to your goals.
- **Offline & Mobile Ready:** Fully responsive HTML/CSS/JS architecture optimized for Android WebViews (`.apk`/`.aab`) and mobile browsers. No backend required.
- **Sumi-e Ink Aesthetics:** Immersive, dark-mode design featuring glassmorphism, dynamic gradients, and custom illustrations reminiscent of classic samurai manga like *Vagabond*.

## Tech Stack
- **HTML5**
- **Vanilla CSS3** (Custom Variables, Flexbox/Grid, Animations, Glassmorphism)
- **Vanilla JavaScript** (State Management via `localStorage`, DOM manipulation)

## Deployment / Packaging
Since this is a client-side only application, it can be deployed or packaged in minutes:

### Web Hosting
Deploy directly to GitHub Pages, Netlify, or Vercel by simply linking the repository.

### Android Application
1. Install [Capacitor](https://capacitorjs.com/):
   ```bash
   npm install @capacitor/cli @capacitor/core
   npx cap init
   npm install @capacitor/android
   npx cap add android
   ```
2. Build your web app and open Android Studio:
   ```bash
   npx cap copy
   npx cap open android
   ```
3. Generate your `.apk` or `.aab` directly from Android Studio.

## Philosophy
> *"The blade is forged in fire. The mind is forged in stillness."*

There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within. Walk the path alone.
