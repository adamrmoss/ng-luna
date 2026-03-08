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

## Overlay and Menu Bar Setup

The dev app is configured so that menu, modal, and tooltip overlays work correctly:

- **Root template** (`dev/src/app/app.component.html`): `<luna-overlay></luna-overlay>` is placed at the top so overlay content (menus, modals, tooltips) is hosted inside the app.
- **Root providers** (`dev/src/main.ts`): `OverlayContainer` is provided with `useClass: LunaOverlayContainer` so CDK Overlay attaches to the overlay component’s host element.
- **Root component** (`dev/src/app/app.component.ts`): Imports `OverlayComponent` and `OverlayModule` so the overlay component and CDK overlay are available.

The main window uses `luna-menu-bar` with `luna-menu` inside it for the Options menu, and `luna-tabs` with `luna-tab` children for the gallery sections.

## Adding Test Cases

Edit `dev/src/app/app.component.html` and `app.component.ts` to add more component examples and test cases.

