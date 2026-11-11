# ng-luna library architecture

How the library is structured, built, and installed.

## What an install contains

`npm install ng-luna` installs the compiled controls, the IBM Plex font files, and the SCSS theme partials. `lucide-static` is a direct dependency, so npm installs it with the package. `@angular/cdk`, the Angular packages, and `rxjs` are peers. The app supplies those.

Public imports come from one entry:

```typescript
import { ButtonComponent, IconComponent, HomeSvg, SaveSvg } from 'ng-luna';
```

`src/public-api.ts` re-exports `src/controls/index.ts`. That barrel re-exports each control. Icon strings are re-exported from `src/controls/icons/lucide-svg.ts`.

## Source layout

```
src/
├── _theme.scss            # Published at the package root. @use 'ng-luna/theme'
├── controls/
│   ├── button/
│   ├── checkbox/
│   ├── fieldset/
│   ├── icons/             # IconComponent and suffixed Lucide re-exports
│   ├── input/
│   ├── menu/
│   ├── menu-bar/
│   ├── modal/             # LunaModalService, LunaModalRef, message box data
│   ├── overlay/           # Overlay host, shared surface opener, dismiss stack
│   ├── popup/             # LunaPopupService, LunaPopupRef, POPUP_DATA
│   ├── progress/
│   ├── radio/
│   ├── select/
│   ├── slider/
│   ├── tabs/
│   ├── textarea/
│   ├── toolbar/
│   ├── tooltip/
│   ├── window/
│   ├── luna-control.ts
│   └── index.ts
├── theme/
│   ├── _breakpoints.scss
│   ├── _fonts.scss
│   ├── _global.scss
│   ├── _graphics.scss
│   ├── _layout.scss
│   ├── _palette.scss
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _z-layers.scss
└── public-api.ts
```

## Icons

Lucide names are re-exported with an `Svg` suffix:

```typescript
export { Copy as CopySvg } from 'lucide-static';
export { Save as SaveSvg } from 'lucide-static';
```

`npm run write-lucide-svg-barrel` regenerates `src/controls/icons/lucide-svg.ts` from the pinned `lucide-static` package. The strings stay in `lucide-static`. An application bundler keeps the icons that are imported by name. `import * as Icons from 'ng-luna'` pulls the whole set.

`IconComponent` sanitizes the SVG string and sizes it with `IconSize`: `'12' | '14' | '16' | '20' | '24' | '32' | '48'`.

## Fonts

`src/theme/_fonts.scss` declares IBM Plex Sans, IBM Plex Mono, and IBM Plex Serif. Each face has woff2 and woff, weights 100 through 700, and italics. The URL prefix is `$font-assets-path`, which defaults to `/fonts`.

`npm run build` runs `scripts/stage-fonts.mjs` first. That script copies the files named in `_fonts.scss` from `@ibm/plex` into `.cache/fonts/`. ng-packagr then copies `.cache/fonts` to `dist/fonts`. Consumers copy `node_modules/ng-luna/fonts` to `/fonts` in their app assets. They do not install `@ibm/plex`.

Component styles `@use` the font partial, so the published CSS contains the `@font-face` rules.

## Theme partials

`src/_theme.scss` is published at the package root and is `@use 'ng-luna/theme'`. It writes the palette and metrics onto `:root`. `dist/theme/` still holds the partials. Component styles read one `var(--luna-…)` each. The README theme table lists each property, its `:root` value, and what reads it.

`@use 'ng-luna/theme/global'` still loads the reset and the scrollbar, and it pulls in the parent theme. Palette names such as `palette.$beige-300` are for app layout. Control padding and type stay on the theme variables. An app that loads neither `ng-luna/theme` nor `ng-luna/theme/global` leaves those variables unset.

## Overlay host

Menu, modal, popup, and tooltip inject CDK `Overlay`. `OverlayComponent` (`luna-overlay`) registers a host element on `LunaOverlayContainer`. The app provides that class as `OverlayContainer` and places `<luna-overlay>` in the root template. Trigger, backdrop, pane, and tooltip rules live in `overlay.component.scss` with `ViewEncapsulation.None`, so they apply to the CDK panes attached under that host.

`LunaModalService` and `LunaPopupService` share one opener. It centers the caller's component, locks scroll, and attaches one backdrop per surface. The modal veil is 50% black. The popup veil is 25% black plus a blur, and a backdrop click closes the popup. A second surface stacks another veil. Neither service builds a `luna-window`.

`LunaDismissStack` owns Escape for menus, message boxes, modals, and popups. Each surface pushes a close handler when it opens and removes it when it closes. Escape runs the top handler only. Message boxes still handle Enter themselves, and their Escape handler confirms an alert or cancels the other boxes.

## Build

`ng-package.json` sets the entry to `src/public-api.ts`, `cssUrl` to `none`, and allows `lucide-static` as a non-peer dependency. Assets copied into `dist/` are `THIRD-PARTY-LICENSES.md`, the staged fonts, `src/_theme.scss`, and the theme partials.

```bash
npm run build
```

ng-packagr compiles the public entry to `dist/fesm2022/ng-luna.mjs`, writes the `.d.ts` files, and emits `dist/package.json`. `lucide-static` and `tslib` stay dependencies of that package. `"sideEffects": false` lets the app bundler drop unused exports.

Publish from the repo with `npm run publish`. That installs, builds, and runs `npm publish ./dist`.

## Licenses

| Software | License | How it ships |
|---|---|---|
| ng-luna | MIT | The library |
| IBM Plex | SIL OFL 1.1 | Font files in `dist/fonts` |
| Lucide | ISC | `lucide-static` dependency |
| Angular CDK | MIT | Peer dependency |

Full texts are in `THIRD-PARTY-LICENSES.md`.
