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

### Using Bundled Icons

ng-luna includes [Lucide Icons](https://lucide.dev/), a comprehensive set of clean, consistent SVG icons that complement the Windows XP aesthetic.

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
                "input": "node_modules/ng-luna/assets/icons",
                "output": "/assets/icons"
              }
            ]
          }
        }
      }
    }
  }
}
```

This copies all Lucide icon SVGs from ng-luna to your application's `/assets/icons/` directory during build.

#### Using Icons in Your Templates

Once configured, you can reference icons directly in your HTML:

```html
<!-- Using img tag -->
<img src="assets/icons/icons/home.svg" alt="Home" width="24" height="24">

<!-- Using CSS background -->
<div class="icon-container"></div>
```

```scss
.icon-container {
    width: 24px;
    height: 24px;
    background-image: url('/assets/icons/icons/home.svg');
    background-size: contain;
}
```

#### Available Icons

Lucide provides over 1,400 icons. Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons).

**Common icons for XP-style interfaces:**
- `home.svg`, `folder.svg`, `file.svg` - Navigation
- `settings.svg`, `tool.svg`, `wrench.svg` - Configuration
- `user.svg`, `users.svg` - User management
- `save.svg`, `download.svg`, `upload.svg` - File operations
- `x.svg`, `minimize-2.svg`, `maximize-2.svg` - Window controls
- `chevron-left.svg`, `chevron-right.svg`, `chevron-down.svg` - Navigation arrows
- `check.svg`, `x.svg`, `alert-triangle.svg` - Status indicators

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

The `luna-tabs` component provides a Windows XP-styled tab interface with keyboard navigation support.

**Selector:** `luna-tabs`

#### Inputs

- `tabs: Tab[]` - Array of tab objects with `id`, `label`, and optional `content`
- `activeTabId?: string` - ID of the currently active tab

#### Outputs

- `tabChange: EventEmitter<string>` - Emitted when a tab is selected

#### Keyboard Navigation

- **Arrow Left/Right** - Navigate between tabs
- **Tab** - Move focus to tab panel content

#### Example

```html
<luna-tabs 
    [tabs]="tabs"
    [activeTabId]="activeTabId"
    (tabChange)="onTabChange($event)">
</luna-tabs>
```

```typescript
tabs: Tab[] = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' }
];
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

### Building the Library

```bash
npm run build
```

### Project Structure

```
ng-luna/
├── src/
│   ├── controls/          # Component library controls
│   │   ├── button/        # Button component
│   │   ├── checkbox/      # Checkbox component
│   │   ├── fieldset/      # Fieldset component
│   │   ├── input/         # Input component
│   │   ├── progress/      # Progress component
│   │   ├── radio/         # Radio component
│   │   ├── select/        # Select component
│   │   ├── slider/        # Slider component
│   │   ├── tabs/          # Tabs component
│   │   ├── textarea/      # Textarea component
│   │   ├── window/        # Window component
│   │   └── index.ts       # Controls barrel export
│   ├── theme/             # Theme files (fonts, styles)
│   │   ├── _fonts.scss    # IBM Plex font imports
│   │   ├── _palette.scss  # Color palette
│   │   ├── _graphics.scss # SVG graphics
│   │   └── _global.scss   # Global styles
│   └── public-api.ts      # Public API surface
├── ng-package.json        # ng-packagr configuration
├── package.json           # Package dependencies
└── tsconfig.json          # TypeScript configuration
```

## Dependencies

- **@ibm/plex** (v6.4.1) - IBM Plex font families (fonts are bundled with the library)
- **lucide-static** - Lucide icon set (icons are bundled with the library)
- **@angular/cdk** (19.x.x) - Angular Component Dev Kit

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
