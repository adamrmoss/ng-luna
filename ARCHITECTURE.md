# ng-luna Library Architecture

This document explains how ng-luna is structured, built, and packaged as a self-contained Angular component library.

## Self-Contained Design

**ng-luna is completely self-contained.** When you install it, you get everything:
- ✅ All Angular components (compiled and bundled)
- ✅ All 1400+ Lucide icons (bundled as tree-shakable exports)
- ✅ IBM Plex font files (3 font families, all weights)
- ✅ SCSS theme files (colors, breakpoints, etc.)

**Consumers only need to install:** `npm install ng-luna`

No additional dependencies for fonts or icons. Everything is included.

## Source Structure

```
src/
├── controls/              # All components
│   ├── button/
│   ├── checkbox/
│   ├── icons/             # IconComponent + Lucide icon re-exports
│   ├── input/
│   ├── progress/
│   ├── radio/
│   ├── select/
│   ├── slider/
│   ├── tabs/
│   ├── textarea/
│   ├── window/
│   ├── luna-control.ts    # Base class
│   └── index.ts           # Barrel export for all controls
├── theme/                 # SCSS variables and mixins
│   ├── _breakpoints.scss
│   ├── _fonts.scss
│   ├── _global.scss
│   ├── _graphics.scss     # Embedded SVG graphics
│   ├── _palette.scss
│   ├── _reset.scss
│   └── _z-layers.scss
└── public-api.ts          # Main entry point
```

### Export Chain (Barrel Pattern)

The library uses a **barrel export pattern** for a clean public API:

```typescript
// src/public-api.ts
export * from './controls';

// src/controls/index.ts
export * from './button/button.component';
export * from './checkbox/checkbox.component';
export * from './icons';
export * from './input/input.component';
// ... all components

// src/controls/icons/index.ts
export * from './icon.component';
export * from 'lucide-static';  // All icon strings
```

**Result:** Consumers import everything from one place:
```typescript
import { ButtonComponent, IconComponent, Home, Save } from 'ng-luna';
```

## Build Process

### Configuration (`ng-package.json`)

```json
{
  "dest": "./dist",
  "lib": {
    "entryFile": "src/public-api.ts",
    "cssUrl": "none"
  },
  "assets": [
    "THIRD-PARTY-LICENSES.md",
    "node_modules/@ibm/plex/IBM-Plex-*/",
    "src/theme/*.scss"
  ],
  "allowedNonPeerDependencies": [
    "@angular/cdk",
    "@ibm/plex"
  ]
}
```

### What ng-packagr Does

1. **Compiles** all TypeScript code starting from `src/public-api.ts`
2. **Bundles** all code (including Lucide icons) into a flat ESM module
3. **Generates** TypeScript definition files (`.d.ts`)
4. **Copies** font files from `@ibm/plex` to `dist/assets/fonts/`
5. **Copies** SCSS theme files to `dist/theme/`
6. **Creates** production-ready `package.json`

### What Gets Bundled

**In `dist/fesm2022/ng-luna.mjs` (the main bundle):**
- All component code (ButtonComponent, IconComponent, etc.)
- LunaControl base class
- All Lucide icon strings (1400+ string constants)
- All type definitions and Angular metadata

**Size**: ~1.5MB uncompressed, but tree-shakable (consumers only get what they import)

**Copied as separate files:**
- Font files: `dist/assets/fonts/`
- SCSS files: `dist/theme/`
- License: `dist/THIRD-PARTY-LICENSES.md`

## Distribution Structure

```
dist/
├── fesm2022/
│   ├── ng-luna.mjs             # 📦 Complete bundled library
│   └── ng-luna.mjs.map         # Source map
├── assets/
│   └── fonts/
│       ├── IBM-Plex-Mono/      # Monospace font
│       ├── IBM-Plex-Sans/      # Sans-serif font  
│       └── IBM-Plex-Serif/     # Serif font
├── theme/
│   ├── _breakpoints.scss       # Responsive breakpoints
│   ├── _fonts.scss             # Font face declarations
│   ├── _palette.scss           # Color variables
│   ├── _reset.scss             # CSS reset
│   └── _z-layers.scss          # Z-index layers
├── controls/
│   ├── */
│   │   └── *.component.d.ts    # TypeScript definitions
│   └── index.d.ts
├── index.d.ts                  # Main type entry
├── public-api.d.ts
├── package.json                # Package metadata
├── LICENSE                     # MIT license
├── THIRD-PARTY-LICENSES.md     # Bundled software licenses
└── README.md
```

### Package Metadata (`dist/package.json`)

```json
{
  "name": "ng-luna",
  "version": "0.3.2",
  "module": "fesm2022/ng-luna.mjs",
  "typings": "index.d.ts",
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "default": "./fesm2022/ng-luna.mjs"
    }
  },
  "dependencies": {
    "@angular/cdk": "19.x.x",
    "tslib": "2.x.x"
  }
}
```

**Key points:**
- `"sideEffects": false` - enables tree-shaking
- `"module"` - points to the ESM bundle
- `"exports"` - defines what consumers can import
- Dependencies only include Angular CDK (fonts and icons are bundled)

## How Consumers Use It

### Installation

```bash
npm install ng-luna
```

That's it! All components, icons, and fonts are included.

### Importing Components & Icons

```typescript
import { 
  ButtonComponent, 
  IconComponent,
  Home,           // Icon string from Lucide
  Save,           // Icon string from Lucide
  Folder 
} from 'ng-luna';

@Component({
  imports: [ ButtonComponent, IconComponent ],
  template: `
    <luna-button>Click Me</luna-button>
    <luna-icon [svg]="homeIcon" size="24"></luna-icon>
  `
})
export class MyComponent {
  homeIcon = Home;
}
```

### Using Fonts

Fonts need to be copied to the consuming app's assets:

```json
// angular.json
{
  "assets": [{
    "glob": "**/*",
    "input": "node_modules/ng-luna/assets/fonts",
    "output": "/assets/fonts"
  }]
}
```

### Using SCSS Themes

```scss
// styles.scss
@use 'ng-luna/theme/palette';
@use 'ng-luna/theme/breakpoints';

.my-component {
  background: palette.$blue-bright;
  
  @include breakpoints.media-breakpoint-up(md) {
    padding: 2rem;
  }
}
```

## Tree-Shaking

Despite bundling everything into one file, tree-shaking works perfectly:

```typescript
// Consumer only imports ButtonComponent
import { ButtonComponent } from 'ng-luna';

// Build process:
// 1. Angular compiler sees you only use ButtonComponent
// 2. Tree-shaking removes all unused exports from ng-luna.mjs
// 3. Final app bundle contains only ButtonComponent code
```

**How it works:**
- ESM modules with `export` statements are tree-shakable
- Modern bundlers (esbuild, Webpack 5+) analyze the dependency graph
- Unused exports are marked as "dead code" and removed
- `"sideEffects": false` confirms no global side effects

**Example sizes (approximate, after tree-shaking + minification):**
- ButtonComponent only: ~8KB
- ButtonComponent + IconComponent + 3 icons: ~12KB
- All components: ~45KB
- All components + all icons: ~180KB

## Icon System

### How Icons are Bundled

Lucide icons are JavaScript string constants:

```typescript
// From lucide-static
export const Home = `<svg ...>...</svg>`;
export const Save = `<svg ...>...</svg>`;
// ... 1400+ more
```

These get compiled into `ng-luna.mjs` as:

```javascript
const Home = `<svg xmlns="http://www.w3.org/2000/svg"...>...</svg>`;
const Save = `<svg xmlns="http://www.w3.org/2000/svg"...>...</svg>`;
export { Home, Save, /* ... all icons */ };
```

### Tree-Shaking Icons

Icons are individually exported, so tree-shaking works at the icon level:

```typescript
import { Home, Save } from 'ng-luna';
// ✅ Only Home and Save strings are in the final bundle

import * as Icons from 'ng-luna';
// ❌ All 1400+ icons included (don't do this!)
```

### IconComponent

The IconComponent handles sanitization and sizing:

```typescript
@Input({ required: true }) svg: string;  // Raw SVG string
@Input() size: IconSize = '24';          // '12' | '16' | '20' | '24' | '32' | '48'
```

It automatically sanitizes the SVG through Angular's DomSanitizer for security.

## Font System

### Font Families Included

- **IBM Plex Sans** - Primary UI font (16 weights)
- **IBM Plex Mono** - Monospace font (16 weights)
- **IBM Plex Serif** - Serif font (16 weights)

### Font Files

Each font includes:
- WOFF2 (modern browsers, best compression)
- WOFF (fallback for older browsers)
- All weights: Thin (100) through Bold (700)
- Italic variants

### How Components Use Fonts

Components use SCSS variables:

```scss
// From theme/_fonts.scss
$font-sans: 'IBM Plex Sans', sans-serif;
$font-mono: 'IBM Plex Mono', monospace;
$font-serif: 'IBM Plex Serif', serif;

// In component styles
.button {
  font-family: $font-sans;
}
```

The font files are referenced with a configurable path:

```scss
$font-assets-path: '/assets/fonts' !default;

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('#{$font-assets-path}/IBM-Plex-Sans/.../Regular.woff2');
}
```

## License Compliance

ng-luna is MIT licensed and bundles the following open-source software:

| Software     | License     | Usage                |
|--------------|-------------|----------------------|
| IBM Plex     | SIL OFL 1.1 | Bundled fonts        |
| Lucide Icons | ISC         | Bundled icon strings |
| Angular CDK  | MIT         | Peer dependency      |

All licenses permit bundling and redistribution. Full license texts are in `THIRD-PARTY-LICENSES.md`.

### License Requirements Met

✅ **Angular CDK (MIT)**: Peer dependency, not redistributed  
✅ **IBM Plex (SIL OFL)**: License file included in font assets  
✅ **Lucide (ISC)**: Copyright notice in THIRD-PARTY-LICENSES.md  

## Development

### Building the Library

```bash
npm run build
```

Output goes to `dist/`. The build:
1. Compiles TypeScript
2. Bundles all code and icons into `fesm2022/ng-luna.mjs`
3. Copies fonts to `dist/assets/fonts/`
4. Copies SCSS to `dist/theme/`
5. Generates type definitions

### Publishing

```bash
npm run publish
```

This builds and publishes `dist/` to npm. Consumers get the complete self-contained library.

## Summary

**ng-luna is a self-contained, tree-shakable Angular component library:**

- ✅ **Self-contained**: All dependencies bundled (components, icons, fonts)
- ✅ **Single import**: Everything from `'ng-luna'`
- ✅ **Tree-shakable**: Only import what you use, rest is removed
- ✅ **Type-safe**: Full TypeScript definitions
- ✅ **Compliant**: All licenses properly attributed
- ✅ **Modern**: ESM modules, Angular 19, TypeScript 5

Consumers get a complete UI toolkit with zero additional dependencies.
