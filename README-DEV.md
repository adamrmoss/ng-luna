# Development App

This directory contains a minimal Angular application for visually testing ng-luna components during development.

## Setup

1. Install dependencies (if not already installed):
```bash
npm install
```

## Running the Dev App

From the project root:
```bash
npm run dev
```

This will start a development server at `http://localhost:4200` where you can see and test the components.

## How It Works

- The dev app uses TypeScript path mapping to import directly from the library source (`../src/public-api.ts`)
- Changes to library components are immediately reflected (no rebuild needed)
- The dev app is excluded from the published package (via `.gitignore` and `ng-package.json`)

## Adding Test Cases

Edit `dev/src/app/app.component.html` and `app.component.ts` to add more component examples and test cases.

