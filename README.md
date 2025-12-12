# Frontend Quiz - Wedding Edition 🎉

A fun interactive quiz app built with Next.js. Test your knowledge with a series of questions and get instant feedback with sounds and animations.

## What's This About?

This is a quiz application I built for The Wedding Company. It features smooth animations, sound effects, and a clean UI. Users answer questions, get immediate feedback, and see their score at the end with a nice confetti celebration.

## Features

- **4 Questions** covering various topics
- **Sound Effects** - Click sounds, correct/wrong answer feedback
- **Smooth Animations** - Powered by Framer Motion
- **Progress Tracking** - Visual progress bar showing which question you're on
- **Score Page** - See your results with a percentage score
- **Responsive Design** - Works on different screen sizes
- **Confetti Celebration** - Because who doesn't love confetti? 🎊

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **use-sound** - Sound effects
- **react-confetti** - Confetti animations

## Getting Started

### Prerequisites

Make sure you have Node.js installed (v18 or higher recommended).

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saumyyaa/frontend-quiz-wed.git
```

2. Navigate to the project directory:
```bash
cd frontend-quiz-wed
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
wed/
├── app/
│   ├── components/       # Reusable components
│   │   ├── SoundButton.tsx
│   │   └── TransitionWrapper.tsx
│   ├── result/          # Results page
│   ├── page.tsx         # Main quiz page
│   └── layout.tsx       # Root layout
├── public/
│   ├── images/          # Images and GIFs
│   └── sounds/          # Sound files
└── package.json
```

## How It Works

1. Start the quiz and answer the first question
2. Select an option - you'll hear a sound (correct or wrong)
3. Use the arrow buttons to navigate between questions
4. On the last question, click Submit
5. View your score and get some confetti if you did well!

## Building for Production

```bash
npm run build
npm start
```

## Notes

- The "best of luck" image and paw GIF only appear on the first question
- Sounds are preloaded for better performance
- The app uses client-side routing for smooth navigation

## License

This project is private and proprietary.

---

Built with ❤️ for The Wedding Company
