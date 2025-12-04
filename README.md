# ng-luna

An Angular component library inspired by Windows XP aesthetics, built with IBM Plex fonts.

## Overview

ng-luna provides a collection of Angular components styled to match the classic Windows XP design language. The library uses custom styling inspired by Windows XP and [IBM Plex](https://www.ibm.com/plex/) fonts for typography.

All components are **standalone** and implement Angular's reactive forms API where applicable, making them compatible with `FormControl`, `FormGroup`, and `ngModel`.

## Installation

```bash
npm install ng-luna
```

## Peer Dependencies

This library requires the following peer dependencies:

- `@angular/common`: 19.2.15
- `@angular/core`: 19.2.15
- `@angular/forms`: 19.2.15

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

The IBM Plex fonts are **automatically bundled and loaded** when you use any ng-luna component. No additional setup or configuration is required.

**Fonts are automatically available:**
- ✅ Font files are bundled with the library
- ✅ Fonts load automatically when you use any component
- ✅ No imports or configuration needed
- ✅ Works out of the box

**Using fonts in your own styles:**

Since the fonts are already loaded, you can use them directly in your CSS/SCSS:

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

## Components

### Button Component

The `luna-button` component provides a Windows XP-styled button.

**Selector:** `luna-button`

#### Inputs

- `autofocus: boolean` - Whether the button should be autofocused (default: `false`)
- `command?: string` - Command to invoke when the button is clicked
- `commandfor?: string` - Element ID that the command is for
- `disabled: boolean` - Whether the button is disabled (default: `false`)
- `form?: string` - Form element ID to associate with
- `formaction?: string` - URL to submit the form to (for submit buttons)
- `formenctype?: FormEnctype` - Form encoding type: `'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'`
- `formmethod?: FormMethod` - HTTP method for form submission: `'get' | 'post'`
- `formnovalidate: boolean` - Whether to bypass form validation (default: `false`)
- `formtarget?: FormTarget` - Where to display form response: `'_self' | '_blank' | '_parent' | '_top'`
- `name?: string` - Name attribute for the button
- `popovertarget?: string` - ID of popover element to control
- `popovertargetaction?: PopoverTargetAction` - Popover action: `'show' | 'hide' | 'toggle'`
- `tabindex?: number` - Tab index for keyboard navigation
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

- `disabled: boolean` - Whether the checkbox is disabled (default: `false`)
- `label?: string` - Label text for the checkbox
- `name?: string` - Name attribute for the checkbox
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

- `disabled: boolean` - Whether the input is disabled (default: `false`)
- `name?: string` - Name attribute for the input
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

- `disabled: boolean` - Whether the radio button is disabled (default: `false`)
- `label?: string` - Label text for the radio button
- `name?: string` - Name attribute for the radio button (required for grouping)
- `value?: string` - Value attribute for the radio button

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

- `disabled: boolean` - Whether the select is disabled (default: `false`)
- `name?: string` - Name attribute for the select

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

- `disabled: boolean` - Whether the slider is disabled (default: `false`)
- `name?: string` - Name attribute for the slider
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

The `luna-tabs` component provides a Windows XP-styled tab interface.

**Selector:** `luna-tabs`

#### Inputs

- `tabs: Tab[]` - Array of tab objects with `id`, `label`, and optional `content`
- `activeTabId?: string` - ID of the currently active tab

#### Outputs

- `tabChange: EventEmitter<string>` - Emitted when a tab is selected

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

- `disabled: boolean` - Whether the textarea is disabled (default: `false`)
- `name?: string` - Name attribute for the textarea
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

The `luna-window` component provides a Windows XP-styled window with title bar and controls.

**Selector:** `luna-window`

#### Inputs

- `title?: string` - Window title text
- `showMinimize: boolean` - Whether to show the minimize button (default: `true`)
- `showMaximize: boolean` - Whether to show the maximize button (default: `true`)
- `showHelp: boolean` - Whether to show the help button (default: `false`)
- `showClose: boolean` - Whether to show the close button (default: `true`)
- `isMaximized: boolean` - Whether the window is currently maximized (default: `false`)

#### Outputs

- `minimize: EventEmitter<void>` - Emitted when the minimize button is clicked
- `maximize: EventEmitter<void>` - Emitted when the maximize button is clicked
- `restore: EventEmitter<void>` - Emitted when the restore button is clicked
- `help: EventEmitter<void>` - Emitted when the help button is clicked
- `close: EventEmitter<void>` - Emitted when the close button is clicked

#### Example

```html
<luna-window 
    title="My Application"
    [showHelp]="true"
    (minimize)="onMinimize()"
    (maximize)="onMaximize()"
    (close)="onClose()">
    <div class="window-body">
        Window content goes here
    </div>
</luna-window>
```

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
- **@angular/cdk** (v19.2.17) - Angular Component Dev Kit

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
