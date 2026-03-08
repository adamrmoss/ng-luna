# ng-luna

An Angular component library inspired by Windows XP aesthetics, built with IBM Plex fonts.

## Overview

ng-luna provides a collection of Angular components styled to match the classic Windows XP design language. The library uses custom styling inspired by Windows XP and [IBM Plex](https://www.ibm.com/plex/) fonts for typography.

All components are **standalone** and implement Angular's reactive forms API where applicable, making them compatible with `FormControl`, `FormGroup`, and `ngModel`. Components are built on **Angular CDK** for enhanced accessibility, keyboard navigation, drag-and-drop, and cross-platform support.

## Installation

```bash
npm install ng-luna
```

## Peer Dependencies

This library requires the following peer dependencies:

- `@angular/common`: 19.x.x
- `@angular/core`: 19.x.x
- `@angular/forms`: 19.x.x

## Usage

### Import Components

Import the components you need in your Angular application. All components are standalone:

```typescript
import { ButtonComponent } from 'ng-luna';

@Component({
    imports: [ ButtonComponent ],
    // ...
})
```

### Overlay (menu, modal, tooltip)

Menu, modal, and tooltip use Angular CDK Overlay. To have their overlays render inside your app (with correct styling), add `LunaOverlayComponent` to your root template and provide `LunaOverlayContainer`:

**1. Root template** (e.g. `app.component.html`):

```html
<luna-overlay></luna-overlay>
<!-- rest of your app -->
```

**2. Root providers** (e.g. `main.ts`):

```typescript
import { OverlayContainer } from '@angular/cdk/overlay';
import { LunaOverlayContainer } from 'ng-luna';

bootstrapApplication(AppComponent, {
    providers: [
        // ... other providers
        { provide: OverlayContainer, useClass: LunaOverlayContainer }
    ]
});
```

**3. Import** `OverlayModule` from `@angular/cdk/overlay` and `OverlayComponent` from `ng-luna` where your root component is declared.

Overlay styles (menu trigger, backdrop, modal pane, tooltip panel) are encapsulated in `LunaOverlayComponent`; you do not need to include any overlay theme files in global styles.

### Using Bundled Fonts

The IBM Plex fonts are bundled with ng-luna and need to be copied to your application's assets folder.

#### Setup

Add the following to your `angular.json` in the `assets` array of your project's build configuration:

```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "node_modules/ng-luna/assets/fonts",
                "output": "/assets/fonts"
              }
            ]
          }
        }
      }
    }
  }
}
```

This copies the font files from the ng-luna package to your application's `/assets/fonts/` directory during build.

#### Using Fonts in Your Styles

Once configured, you can use the fonts directly in your CSS/SCSS:

```scss
.my-custom-class {
    font-family: 'IBM Plex Sans', sans-serif;
}

.code-snippet {
    font-family: 'IBM Plex Mono', monospace;
}

.heading {
    font-family: 'IBM Plex Serif', serif;
}
```

**Available font families:**
- `'IBM Plex Sans', sans-serif` - Default sans-serif font used by components
- `'IBM Plex Mono', monospace` - Monospace font
- `'IBM Plex Serif', serif` - Serif font

**Note:** The ng-luna components will automatically use these fonts once they are available in your assets folder.

### Using Icons

ng-luna includes [Lucide Icons](https://lucide.dev/), a comprehensive set of over 1,400 clean, consistent SVG icons that complement the Windows XP aesthetic. Icons are provided as **tree-shakable ES modules** - only the icons you import will be included in your bundle.

#### Import Icons

```typescript
import { IconComponent, Home, Save, Folder, Settings } from 'ng-luna';

@Component({
    imports: [ IconComponent ],
    template: `
        <luna-icon [svg]="homeIcon" size="24"></luna-icon>
        <luna-icon [svg]="saveIcon" size="16"></luna-icon>
    `
})
export class MyComponent {
    homeIcon = Home;
    saveIcon = Save;
}
```

#### Icon Component

**Selector:** `luna-icon`

##### Inputs

- `svg: string` (required) - The SVG string from an imported Lucide icon
- `size?: IconSize` - Icon size: `'12' | '16' | '20' | '24' | '32' | '48'` (default: `'24'`)

##### Example

```html
<luna-icon [svg]="homeIcon" size="24"></luna-icon>
<luna-icon [svg]="saveIcon" size="16"></luna-icon>

<luna-button>
    <luna-icon [svg]="folderIcon" size="16"></luna-icon>
    Open Folder
</luna-button>
```

#### Available Icons

Lucide provides over 1,400 icons. Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons).

**Common icons for XP-style interfaces:**
- `Home`, `Folder`, `File` - Navigation
- `Settings`, `Tool`, `Wrench` - Configuration
- `User`, `Users` - User management
- `Save`, `Download`, `Upload` - File operations
- `X`, `Minimize2`, `Maximize2` - Window controls
- `ChevronLeft`, `ChevronRight`, `ChevronDown` - Navigation arrows
- `Check`, `AlertTriangle` - Status indicators

#### Tree-Shaking

Icons use ES modules for automatic tree-shaking. Only imported icons are included in your final bundle:

```typescript
// ✅ Good: Only Home and Save icons included in bundle
import { Home, Save } from 'ng-luna';

// ❌ Avoid: Imports entire icon library
import * as Icons from 'ng-luna';
```

## Components

All components extend the `LunaControl` base class, which provides the following common inputs available on every component:

- `id?: string` - Element ID
- `name?: string` - Name attribute
- `disabled: boolean` - Whether the control is disabled (default: `false`)
- `tabindex?: number` - Tab index for keyboard navigation
- `autofocus: boolean` - Whether the control should be autofocused (default: `false`)

These inputs are inherited from the base class and available on all components unless otherwise noted in the component-specific documentation below.

### Button Component

The `luna-button` component provides a Windows XP-styled button.

**Selector:** `luna-button`

#### Inputs

- `command?: string` - Command to invoke when the button is clicked
- `commandfor?: string` - Element ID that the command is for
- `form?: string` - Form element ID to associate with
- `formaction?: string` - URL to submit the form to (for submit buttons)
- `formenctype?: FormEnctype` - Form encoding type: `'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'`
- `formmethod?: FormMethod` - HTTP method for form submission: `'get' | 'post'`
- `formnovalidate: boolean` - Whether to bypass form validation (default: `false`)
- `formtarget?: FormTarget` - Where to display form response: `'_self' | '_blank' | '_parent' | '_top'`
- `popovertarget?: string` - ID of popover element to control
- `popovertargetaction?: PopoverTargetAction` - Popover action: `'show' | 'hide' | 'toggle'`
- `type: ButtonType` - Button type: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `value?: string` - Value attribute for the button

#### Outputs

- `click: EventEmitter<MouseEvent>` - Emitted when the button is clicked

#### Example

```html
<luna-button 
    type="submit" 
    [disabled]="isLoading"
    (click)="onSubmit()">
    Submit Form
</luna-button>
```

### Checkbox Component

The `luna-checkbox` component provides a Windows XP-styled checkbox that implements `ControlValueAccessor` for reactive forms support.

**Selector:** `luna-checkbox`

#### Inputs

- `label?: string` - Label text for the checkbox
- `value?: string` - Value attribute for the checkbox

#### Outputs

- `change: EventEmitter<boolean>` - Emitted when the checkbox state changes

#### Example

```html
<luna-checkbox 
    [(ngModel)]="isChecked"
    label="Accept terms and conditions"
    (change)="onCheckboxChange($event)">
</luna-checkbox>
```

### Fieldset Component

The `luna-fieldset` component provides a Windows XP-styled fieldset for grouping form controls.

**Selector:** `luna-fieldset`

#### Inputs

- `legend?: string` - Legend text for the fieldset

#### Example

```html
<luna-fieldset legend="User Information">
    <!-- Form controls here -->
</luna-fieldset>
```

### Icon Component

The `luna-icon` component provides a convenient way to render Lucide icons with automatic sanitization and sizing.

**Selector:** `luna-icon`

**Note:** This component does not inherit from `LunaControl` and does not have the common base inputs.

#### Inputs

- `svg: string` (required) - The SVG string from an imported Lucide icon
- `size?: IconSize` - Icon size: `'12' | '16' | '20' | '24' | '32' | '48'` (default: `'24'`)

#### Example

```html
<luna-icon [svg]="homeIcon" size="24"></luna-icon>

<luna-button>
    <luna-icon [svg]="saveIcon" size="16"></luna-icon>
    Save File
</luna-button>
```

```typescript
import { IconComponent, Home, Save } from 'ng-luna';

@Component({
    imports: [ IconComponent ],
    // ...
})
export class MyComponent {
    homeIcon = Home;
    saveIcon = Save;
}
```

For more information on importing and using icons, see the [Using Icons](#using-icons) section above.

### Menu Bar Component

The `luna-menu-bar` component is a container that renders a horizontal menu bar (e.g. under a window title bar). It is a flex container; place one or more `luna-menu` components inside it. It extends `LunaControl` (optional `id`, `name`, `tabindex`, `autofocus`).

**Selector:** `luna-menu-bar`

#### Example

```html
<luna-menu-bar>
    <luna-menu [items]="fileMenuItems" (itemSelect)="onFileMenuSelect($event)">
        <button lunaMenuTrigger>File</button>
    </luna-menu>
    <luna-menu [items]="optionsMenuItems" (itemSelect)="onOptionsMenuSelect($event)">
        <button lunaMenuTrigger>Options</button>
    </luna-menu>
</luna-menu-bar>
```

### Menu Component

The `luna-menu` component provides a classic dropdown menu (DOS/Windows 9x style) with a trigger and a list of items. It supports checked items, hover highlighting, arrow-key navigation with cursor highlighting, closing with Escape, and selecting the highlighted option with Enter.

**Selector:** `luna-menu`

**Trigger directive:** `lunaMenuTrigger` – attach to the element that opens the menu (e.g. a button).

Use `LunaOverlayComponent` and `LunaOverlayContainer` as described in **Overlay (menu, modal, tooltip)** above so the menu overlay and trigger are styled. For a top-level menu bar, use the **Menu Bar Component** and place one or more `luna-menu` inside it.

#### Inputs

- `items: LunaMenuEntry[]` – Menu entries. Each item: `{ label: string, checked?: boolean, disabled?: boolean }`. Use `{ separator: true }` for a divider line.

#### Outputs

- `itemSelect: EventEmitter<LunaMenuItem | null>` – Emitted when an item is chosen (or `null` when the menu is closed without selection, e.g. via Escape or backdrop click).

#### Example

```html
<luna-menu [items]="menuItems" (itemSelect)="onMenuSelect($event)">
    <button lunaMenuTrigger>File</button>
</luna-menu>
```

```typescript
import { LunaMenuComponent, LunaMenuTriggerDirective } from 'ng-luna';
import type { LunaMenuEntry, LunaMenuItem } from 'ng-luna';

@Component({
    imports: [ LunaMenuComponent, LunaMenuTriggerDirective ],
    // ...
})
export class MyComponent {
    menuItems: LunaMenuEntry[] = [
        { label: 'New' },
        { label: 'Open...' },
        { separator: true },
        { label: 'Save' },
        { label: 'Save As...', checked: true },
        { separator: true },
        { label: 'Exit', disabled: true }
    ];

    onMenuSelect(item: LunaMenuItem | null): void {
        if (item) {
            console.log('Selected', item.label);
        }
    }
}
```

### Input Component

The `luna-input` component provides a Windows XP-styled text input that implements `ControlValueAccessor` for reactive forms support.

**Selector:** `luna-input`

#### Inputs

- `placeholder?: string` - Placeholder text
- `type: InputType` - Input type: `'text' | 'password' | 'email'` (default: `'text'`)
- `readonly: boolean` - Whether the input is readonly (default: `false`)

#### Outputs

- `change: EventEmitter<string>` - Emitted when the input value changes
- `blur: EventEmitter<FocusEvent>` - Emitted when the input loses focus

#### Example

```html
<luna-input 
    [(ngModel)]="username"
    type="text"
    placeholder="Enter username"
    (change)="onInputChange($event)">
</luna-input>
```

### Progress Component

The `luna-progress` component provides a Windows XP-styled progress bar.

**Selector:** `luna-progress`

#### Inputs

- `value?: number` - Current progress value
- `max: number` - Maximum value (default: `100`)

#### Example

```html
<luna-progress 
    [value]="progressValue"
    [max]="100">
</luna-progress>
```

### Radio Component

The `luna-radio` component provides a Windows XP-styled radio button that implements `ControlValueAccessor` for reactive forms support.

**Selector:** `luna-radio`

#### Inputs

- `label?: string` - Label text for the radio button
- `value?: string` - Value attribute for the radio button

**Note:** The `name` attribute is required for grouping radio buttons together.

#### Outputs

- `change: EventEmitter<string>` - Emitted when the radio button is selected

#### Example

```html
<luna-radio 
    name="option"
    value="option1"
    label="Option 1"
    [(ngModel)]="selectedOption">
</luna-radio>
<luna-radio 
    name="option"
    value="option2"
    label="Option 2"
    [(ngModel)]="selectedOption">
</luna-radio>
```

### Select Component

The `luna-select` component provides a Windows XP-styled select dropdown that implements `ControlValueAccessor` for reactive forms support.

**Selector:** `luna-select`

#### Inputs

No additional inputs beyond the common base inputs.

#### Outputs

- `change: EventEmitter<string>` - Emitted when the selection changes

#### Example

```html
<luna-select 
    [(ngModel)]="selectedValue"
    (change)="onSelectChange($event)">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</luna-select>
```

### Slider Component

The `luna-slider` component provides a Windows XP-styled range slider that implements `ControlValueAccessor` for reactive forms support.

**Selector:** `luna-slider`

#### Inputs

- `min: number` - Minimum value (default: `0`)
- `max: number` - Maximum value (default: `100`)
- `step: number` - Step value (default: `1`)
- `vertical: boolean` - Whether the slider is vertical (default: `false`)
- `boxIndicator: boolean` - Whether to show a box indicator (default: `false`)

#### Outputs

- `change: EventEmitter<number>` - Emitted when the slider value changes

#### Example

```html
<luna-slider 
    [(ngModel)]="sliderValue"
    [min]="0"
    [max]="100"
    [step]="1"
    (change)="onSliderChange($event)">
</luna-slider>
```

### Tabs Component

The `luna-tabs` component provides a Windows XP-styled tab interface with keyboard navigation support. Use `luna-tab` children to define each tab and its content.

**Selector:** `luna-tabs`

#### Inputs

- `activeTabId?: string` - ID of the currently active tab (defaults to the first tab when unset)

#### Outputs

- `tabChange: EventEmitter<string>` - Emitted when a tab is selected

#### Child: luna-tab

Each tab is a `luna-tab` with:

- `id: string` - Unique tab ID
- `label: string` - Tab button label

Tab content is projected inside the `luna-tab` element.

#### Keyboard Navigation

- **Arrow Left/Right** - Navigate between tabs
- **Tab** - Move focus to tab panel content

#### Example

```html
<luna-tabs
    [activeTabId]="activeTabId"
    (tabChange)="onTabChange($event)">
    <luna-tab id="tab1" label="Tab 1">
        Content for tab 1
    </luna-tab>
    <luna-tab id="tab2" label="Tab 2">
        Content for tab 2
    </luna-tab>
</luna-tabs>
```

```typescript
import { TabComponent, TabsComponent } from 'ng-luna';

// In your component:
activeTabId = 'tab1';
onTabChange(tabId: string) { this.activeTabId = tabId; }
```

### Textarea Component

The `luna-textarea` component provides a Windows XP-styled textarea that implements `ControlValueAccessor` for reactive forms support.

**Selector:** `luna-textarea`

#### Inputs

- `placeholder?: string` - Placeholder text
- `rows?: number` - Number of visible rows
- `cols?: number` - Number of visible columns
- `readonly: boolean` - Whether the textarea is readonly (default: `false`)

#### Outputs

- `change: EventEmitter<string>` - Emitted when the textarea value changes
- `blur: EventEmitter<FocusEvent>` - Emitted when the textarea loses focus

#### Example

```html
<luna-textarea 
    [(ngModel)]="message"
    [rows]="5"
    [cols]="40"
    placeholder="Enter your message"
    (change)="onTextareaChange($event)">
</luna-textarea>
```

### Overlay Component

The `luna-overlay` component is **infrastructure** for menu, modal, and tooltip overlays. Add it once to your root template (e.g. as a sibling to your main content) and provide `LunaOverlayContainer` so that overlay content is attached inside your app and styled correctly. See **Overlay (menu, modal, tooltip)** in the [Usage](#usage) section for setup. This component has no inputs or outputs.

**Selector:** `luna-overlay`

**Related:** `LunaOverlayContainer` – provide it in your root providers so CDK Overlay uses the overlay host element from `LunaOverlayComponent`.

### Window Component

The `luna-window` component provides a Windows XP-styled draggable window with title bar and controls.

**Selector:** `luna-window`

#### Inputs

- `title?: string` - Window title text
- `showMinimize: boolean` - Whether to show the minimize button (default: `true`)
- `showMaximize: boolean` - Whether to show the maximize button (default: `true`)
- `showHelp: boolean` - Whether to show the help button (default: `false`)
- `showClose: boolean` - Whether to show the close button (default: `true`)
- `isMaximized: boolean` - Whether the window is currently maximized (default: `false`)
- `boundaryElement?: string` - CSS selector for element that constrains window dragging
- `scrollable: boolean` - Whether the window body should be scrollable (default: `false`)

#### Outputs

- `minimize: EventEmitter<void>` - Emitted when the minimize button is clicked
- `maximize: EventEmitter<void>` - Emitted when the maximize button is clicked
- `restore: EventEmitter<void>` - Emitted when the restore button is clicked
- `help: EventEmitter<void>` - Emitted when the help button is clicked
- `close: EventEmitter<void>` - Emitted when the close button is clicked

#### Dragging

The window can be dragged by its title bar. Dragging is automatically disabled when the window is maximized.

#### Example

```html
<luna-window 
    title="My Application"
    [showHelp]="true"
    boundaryElement=".container"
    [scrollable]="true"
    (minimize)="onMinimize()"
    (maximize)="onMaximize()"
    (close)="onClose()">
    <div class="window-body">
        Window content goes here
    </div>
</luna-window>
```

## Accessibility & CDK Features

All components leverage **Angular CDK** for enhanced functionality:

- **Focus Management** - All form components track focus states for better accessibility
- **Keyboard Navigation** - Tabs support arrow key navigation with focus management
- **Screen Reader Support** - Components announce state changes via `LiveAnnouncer`
- **Drag & Drop** - Window component supports draggable functionality with boundary constraints
- **Scrolling** - Window body supports scrollable content areas
- **Platform Detection** - Components adapt behavior based on platform/browser
- **RTL Support** - Input and button components support right-to-left layouts
- **Type Coercion** - Number inputs use type-safe coercion utilities

Screen reader announcements are non-intrusive and only audible to assistive technology users.

## Reactive Forms Support

Components that implement `ControlValueAccessor` (checkbox, input, radio, select, slider, textarea) can be used with Angular's reactive forms:

```typescript
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export class MyComponent
{
    form: FormGroup;

    constructor(private fb: FormBuilder)
    {
        this.form = this.fb.group({
            username: [''],
            email: [''],
            agreeToTerms: [false]
        });
    }
}
```

```html
<form [formGroup]="form">
    <luna-input 
        formControlName="username"
        placeholder="Username">
    </luna-input>
    
    <luna-input 
        formControlName="email"
        type="email"
        placeholder="Email">
    </luna-input>
    
    <luna-checkbox 
        formControlName="agreeToTerms"
        label="I agree to the terms">
    </luna-checkbox>
</form>
```

## Development

For a detailed explanation of the library architecture, build process, and how the public API works, see [ARCHITECTURE.md](ARCHITECTURE.md).

### Building the Library

```bash
npm run build
```

**Clean build** (use when the build fails, e.g. "Cannot find module 'rxjs'"):

1. **Clean** – Remove `node_modules`, `dist`, and `.angular` if present. Optionally remove `package-lock.json` for a full dependency refresh.
2. **Install** – `npm install`
3. **Build** – `npm run build`

The library uses `import { Observable } from 'rxjs'` like other Angular libraries. `rxjs` is in **peerDependencies** (for apps that use the library) and in **devDependencies** (for this repo's build). If the build still cannot find `rxjs`, confirm that `node_modules/rxjs` exists after `npm install`; if not, run `npm install rxjs --save-dev` and try again.

The build process uses `ng-packagr` to:
- Compile TypeScript to ESM modules
- Generate type definitions
- Bundle everything into `dist/fesm2022/ng-luna.mjs`
- Copy assets (fonts, SCSS themes)
- Create a production-ready `package.json`

All exports go through `src/public-api.ts` → `src/controls/index.ts` → individual components.

### Project Structure

```
ng-luna/
├── src/
│   ├── controls/          # Component library controls
│   │   ├── button/        # Button component
│   │   ├── checkbox/      # Checkbox component
│   │   ├── fieldset/      # Fieldset component
│   │   ├── icons/         # Icon component + Lucide icons
│   │   ├── input/         # Input component
│   │   ├── menu/          # Menu component + trigger, panel
│   │   ├── menu-bar/      # Menu bar container
│   │   ├── modal/         # Modal service + message box
│   │   ├── overlay/       # Overlay component + container (menu/modal/tooltip host)
│   │   ├── progress/      # Progress component
│   │   ├── radio/         # Radio component
│   │   ├── select/        # Select component
│   │   ├── slider/        # Slider component
│   │   ├── tabs/          # Tabs + tab components
│   │   ├── textarea/      # Textarea component
│   │   ├── tooltip/       # Tooltip directive + component
│   │   ├── window/        # Window component
│   │   └── index.ts       # Controls barrel export
│   ├── theme/             # Theme (palette, typography, fonts, etc.)
│   │   ├── _breakpoints.scss
│   │   ├── _fonts.scss    # IBM Plex font imports
│   │   ├── _global.scss
│   │   ├── _graphics.scss
│   │   ├── _palette.scss  # Color palette
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   ├── _z-layers.scss
│   │   └── ...
│   └── public-api.ts      # Public API surface
├── ng-package.json        # ng-packagr configuration
├── package.json           # Package dependencies
└── tsconfig.json          # TypeScript configuration
```

## Dependencies

- **@angular/cdk** (19.x.x) - Angular Component Dev Kit
- **@ibm/plex** (v6.4.1) - IBM Plex font families (fonts are bundled with the library)
- **lucide-static** - Lucide icon set (icons are bundled with the library)

## Publishing

### Prerequisites

1. Create an npm account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. Login to npm from the command line:

```bash
npm login
```

### Publishing Steps

1. **Build the library:**

```bash
npm run build
```

2. **Test the build (optional but recommended):**

```bash
cd dist
npm pack
```

This creates a `.tgz` file you can inspect or test locally before publishing.

3. **Publish to npm:**

```bash
npm publish ./dist
```

### Publishing Updates

When you need to publish a new version:

```bash
# Update the version number (choose one):
npm version patch  # 0.0.1 -> 0.0.2 (bug fixes)
npm version minor  # 0.0.1 -> 0.1.0 (new features)
npm version major  # 0.0.1 -> 1.0.0 (breaking changes)

# Build and publish
npm run build
npm publish ./dist
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Adam R Moss
