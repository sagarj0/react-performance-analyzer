# React Performance Analysis Tool

A comprehensive web application for analyzing the performance of websites and APIs. This tool measures and displays key performance metrics including load time, page size, and number of HTTP requests.

## Features

### 🌐 Website Performance Analysis

- Analyze any website URL for performance metrics
- Measure total page load duration
- Calculate aggregate size of HTML, CSS, JS, images
- Count total HTTP requests made
- Visual charts and detailed breakdowns
- Performance recommendations

### 🔌 API Performance Analysis

- Test any API endpoint for response performance
- Built-in dummy APIs for quick testing
- Response time and payload size analysis
- JSON/REST API compatibility

### 📊 Visual Analytics

- Interactive charts and graphs using Recharts
- Resource type distribution pie charts
- Size analysis bar charts
- Detailed resource tables
- Performance recommendations

### 📱 Responsive Design

- Mobile-friendly interface
- Clean, modern UI using Ant Design
- Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **Ant Design** for UI components
- **Recharts** for data visualization
- **Vite** for build tooling
- **ESLint** for code quality

## Setup Instructions

### Prerequisites

- Node.js (version 20.19.0 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory:

```bash
cd react-app-performance-analysis
```

3. Install dependencies:

```bash
npm install
```

### Development Setup

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. The application will hot-reload when you make changes to the source code

## Run Instructions

### Development Mode

```bash
npm run dev
```

- Starts the development server with hot reloading
- Access the application at `http://localhost:5173`

### Production Build

```bash
npm run build
```

- Creates an optimized production build in the `dist` folder
- Ready for deployment to any static hosting service

### Preview Production Build

```bash
npm run preview
```

- Serves the production build locally for testing
- Useful for testing the optimized build before deployment

### Code Quality

```bash
npm run lint
```

- Runs ESLint to check for code quality issues
- Helps maintain clean, consistent code

## How to Use

### 1. Website Performance Analysis

- Navigate to the home page
- Enter any website URL (e.g., `https://www.google.com`)
- Click "Analyze Performance"
- View detailed metrics including:
  - Load time in milliseconds
  - Total page size in KB/MB
  - Number of HTTP requests
  - Resource breakdown by type
  - Performance recommendations

### 2. API Performance Analysis

- Click on "API Performance Analysis" in the navigation
- Either:
  - Enter a custom API URL in the input field, or
  - Click on one of the provided dummy APIs for quick testing
- View API response metrics:
  - Response time
  - Payload size
  - Request details

### Example URLs to Test

- **Websites**: `https://www.github.com`, `https://www.stackoverflow.com`
- **APIs**: Already provided as dummy APIs in the interface

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation header
│   ├── UrlInput.tsx     # URL input form component
│   └── MetricsDisplay.tsx # Performance metrics display
├── pages/              # Page components
│   ├── UrlAnalysis.tsx # Website analysis page
│   └── ApiAnalysis.tsx # API analysis page
├── hooks/              # Custom React hooks
│   └── usePerformanceAnalysis.ts # Performance analysis logic
├── utils/              # Utility functions
│   └── performanceAnalyzer.ts # Core analysis functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── App.css             # Global styles
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Deploy to Netlify

1. Run: `npm run build`
2. Upload the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## Features & Limitations

### Current Features

✅ Website performance analysis
✅ API endpoint testing  
✅ Visual data representation
✅ Responsive design
✅ Multiple dummy APIs
✅ Performance recommendations

### Technical Notes

- Cross-origin requests may be limited by CORS policies
- Some websites may block analysis due to security restrictions
- Resource size calculations for external sites are estimated
- Real-world performance may vary based on network conditions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues, questions, or contributions, please create an issue in the GitHub repository.
