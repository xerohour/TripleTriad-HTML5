# Final Fantasy VIII - Triple Triad HTML5 🎴

A modern, high-performance HTML5 darkmode web application implementing the iconic **Triple Triad** card game from *Final Fantasy VIII*.

![Triple Triad HTML5](https://img.shields.io/badge/FFVIII-Triple%20Triad-00f0ff?style=for-the-badge)
![HTML5 Canvas & ES Modules](https://img.shields.io/badge/HTML5-Canvas%20%26%20Audio-gold?style=for-the-badge)

---

## ✨ Features

- **Authentic Rules & Combo Engine**:
  - **Open**: Option to play with revealed or hidden hands.
  - **Same**: Flip matching edge cards when 2+ edges equal adjacent numbers.
  - **Plus**: Flip matching sum pairs when 2+ adjacent sides total the same number.
  - **Same Wall**: Outer board boundaries count as rank `10 ('A')` for Same/Plus checks.
  - **Combo**: Flipped cards recursively trigger standard capture checks on adjacent cards!
  - **Elemental**: Random elemental tiles (Fire, Ice, Thunder, Earth, Poison, Holy, Wind, Water) boost or diminish card stats by +1/-1.
- **Smart AI Opponents**:
  - Multiple opponent profiles (Jack, Club Knight, Instructor Quistis, Zell, Seifer, Squall, Sorceress Ultimecia) with varying AI intelligence levels.
- **Synthesized Web Audio SFX & Retro Music**:
  - Web Audio API sound generator for card placement, 3D card flips, Same/Plus combo fanfares, and ambient background music synth loop.
- **Particle & Visual Effects**:
  - HTML5 Canvas particle bursts, floating combo badges ("SAME!", "PLUS!", "COMBO!"), and 3D card flip animations.
- **Deck Builder & Complete Card Collection**:
  - Build custom 5-card battle decks.
  - Full catalog of 71 cards spanning Level 1 to Level 10 (GFs & Main Characters).
  - Collect opponent cards upon match victory using Trade Rules!
- **Sleek Dark Mode Aesthetic**:
  - Balamb Garden neon blue/gold glassmorphism theme.

---

## 🚀 Getting Started

Simply serve the repository using any local web server:

```bash
# Using Python
python -m http.server 8080

# Or using Node / npx
npx serve .
```

Open `http://localhost:8080` in your web browser.

---

## 📜 License

MIT License. Created for Final Fantasy VIII and Triple Triad enthusiasts!
