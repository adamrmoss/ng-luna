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

- `@angular/common`: ^19.2.15
- `@angular/core`: ^19.2.15

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

- `type: ButtonType` - Button type: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `disabled: boolean` - Whether the button is disabled (default: `false`)
- `name: string` - Name attribute for the button
- `value: string` - Value attribute for the button
- `autofocus: boolean` - Whether the button should be autofocused (default: `false`)
- `tabindex: number` - Tab index for keyboard navigation

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

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

