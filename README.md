# Options Price and Greeks Visualizer

An interactive web application for visualizing European options prices and their Greeks (Delta, Gamma, Theta, Vega, and Rho). Built with React, this tool helps traders and analysts understand how option prices and sensitivities change with different market conditions.

## Features

- Real-time visualization of option prices based on market parameters
- Interactive graphs for the following Greeks:
  - Delta (𝛥): Measures the rate of change in option price with respect to the underlying asset
  - Gamma (Γ): Shows the rate of change in Delta with respect to the underlying price
  - Theta (Θ): Illustrates time decay of option value
  - Vega (v): Displays sensitivity to volatility changes
  - Rho (ρ): Shows sensitivity to interest rate changes
- European options pricing using the Black-Scholes model
- Responsive design for desktop and mobile devices

## Demo

Visit the live demo [here](moyuanchen.github.io)

# Getting Started

## Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/black-scholes-calculator.git
cd black-scholes-calculator
```

2. Install dependencies:
```bash
npm install react@18.2.0 react-dom@18.2.0 react-scripts@5.0.1
npm install recharts @shadcn/ui @radix-ui/react-slider
```

3. Set up Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Install shadcn/ui components:
```bash
npx shadcn@latest init
```

When prompted during initialization:
- Would you like to use TypeScript? › No
- Where is your global CSS file? › src/index.css
- Do you want to use CSS variables? › Yes
- Where is your tailwind.config.js located? › tailwind.config.js
- Configure the import alias for components? › @/components
- Configure the import alias for utils? › @/lib/utils

5. Install required shadcn/ui components:
```bash
npx shadcn@latest add card
npx shadcn@latest add slider
```

## Project Structure
```
project-root/
├── public/
│   └── index.html
├── src/
│   ├── index.jsx
│   ├── index.css
│   ├── App.jsx
│   └── BlackScholesCalculator.jsx
├── package.json
├── tailwind.config.js
└── jsconfig.json
```

## Running the Application

1. Start the development server:
```bash
npm dev run
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

To create a production build:
```bash
npm run build
```

## Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1",
    "recharts": "^2.10.3",
    "@shadcn/ui": "latest",
    "@radix-ui/react-slider": "^1.1.2"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16"
  }
}
```

## Configuration Files

### tailwind.config.js
```javascript
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
