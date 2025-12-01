# ng-luna

An Angular component library inspired by Windows XP aesthetics, built with XP.css and IBM Plex fonts.

## Overview

ng-luna provides a collection of Angular components styled to match the classic Windows XP design language. The library uses [XP.css](https://botoxparty.github.io/XP.css/) for styling and [IBM Plex](https://www.ibm.com/plex/) fonts for typography.

## Installation

```bash
npm install ng-luna
```

## Peer Dependencies

This library requires the following peer dependencies:

- `@angular/common`: 19.2.15
- `@angular/core`: 19.2.15

## Usage

### Import the Module

Import the components you need in your Angular application:

```typescript
import { ButtonComponent } from 'ng-luna';
```

### Button Component

The `luna-button` component provides a Windows XP-styled button:

```html
<luna-button (click)="handleClick()">Click Me</luna-button>
```

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
│   │   └── index.ts       # Controls barrel export
│   ├── theme/             # Theme files (fonts, styles)
│   │   └── _fonts.scss    # IBM Plex font imports
│   └── public-api.ts      # Public API surface
├── ng-package.json        # ng-packagr configuration
├── package.json           # Package dependencies
└── tsconfig.json          # TypeScript configuration
```

## Dependencies

- **XP.css** (v0.2.6) - Windows XP styling framework
- **@ibm/plex** (v6.4.1) - IBM Plex font families
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

