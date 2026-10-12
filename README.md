# ng-luna

An Angular component library. The default paint is the EduBASIC navy theme, set in IBM Plex Sans and IBM Plex Mono.

## Overview

ng-luna provides standalone Angular components. Buttons, fields, menus, windows, tabs, and dialogs ship with the EduBASIC surfaces: a light window and default button, navy fields, and bright-blue actions. Another app reskins that theme with CSS custom properties. Font families stay [IBM Plex](https://www.ibm.com/plex/) Sans and IBM Plex Mono.

All components are **standalone** and implement Angular's reactive forms API where applicable, making them compatible with `FormControl`, `FormGroup`, and `ngModel`. Components are built on **Angular CDK** for enhanced accessibility, keyboard navigation, drag-and-drop, and cross-platform support.

## Installation

```bash
npm install ng-luna
```

## Peer Dependencies

This library requires the following peer dependencies:

- `@angular/cdk`: 19.x.x
- `@angular/common`: 19.x.x
- `@angular/core`: 19.x.x
- `@angular/forms`: 19.x.x
- `@angular/platform-browser`: 19.x.x
- `rxjs`: 7.x.x

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

The IBM Plex fonts are bundled with ng-luna and need to be copied to `/fonts` in your application.

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
                "input": "node_modules/ng-luna/fonts",
                "output": "/fonts"
              }
            ]
          }
        }
      }
    }
  }
}
```

This copies the font files from the ng-luna package to your application's `/fonts/` directory during build.

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
- `'IBM Plex Sans', sans-serif` - Default and command buttons, menubar rows and triggers, select, textarea, tabs, title bar, dialog titles, fieldset legends
- `'IBM Plex Mono', monospace` - Action buttons, the disk name field, and context menu rows
- `'IBM Plex Serif', serif` - Available for app styles; controls do not use it

**Note:** The ng-luna components will automatically use these fonts once they are available at `/fonts`. Font families are not custom properties.

### Theme

The default paint is the EduBASIC palette. Set any property below on `:root` or an ancestor to reskin a control. When the variable is unset, the control uses the fallback. A component property that shares a role falls back to that role first, so `--luna-color-accent-light` reskins the fields unless that control's own property is set. The window body and the tab panel use their own fill. Each metric names its component and variant. `_palette.scss` and `_typography.scss` in the published `theme/` folder remain the SCSS source for layout you write yourself.

Solid danger hover on an action button, and on an icon button at the default size, is `color-mix` of `--luna-button-action-danger-background` 10% toward black.

| Property | Fallback | Read by |
|---|---|---|
| `--luna-color-accent-light` | `#003c74` | Menubar row hover. Role for field fills, the fieldset, and the dialog body |
| `--luna-color-accent-dark` | `#00138c` | Editor and command toolbars. Role for the selected tab and the context menu |
| `--luna-color-action` | `#0053ee` | Button focus outline and text selection. Role for action button fills, field focus, and the window title |
| `--luna-color-action-hover` | `#0050ee` | Window control buttons. Role for action button hover |
| `--luna-color-border` | `#1d5281` | Command button border, menu border, dialog, fieldset, and field borders |
| `--luna-color-text` | `#ffffff` | Action and icon button, field, context menu, window title, selected tab, and dialog text |
| `--luna-color-text-secondary` | `#e0e0e0` | Disabled menu rows |
| `--luna-color-danger` | `#e5a01a` | Compact danger icon text. Role for the action danger fill and context danger text |
| `--luna-button-default-background` | `#ffffff` | Default button |
| `--luna-button-default-background-hover` | `#f2f2f1` | Default button hover |
| `--luna-button-default-border` | `#9d9c99` | Default button border |
| `--luna-button-default-color` | `#000000` | Default button text |
| `--luna-button-default-font-size` | `11px` | Default button |
| `--luna-button-default-padding-x` | `12px` | Default button |
| `--luna-button-default-padding-y` | `4px` | Default button |
| `--luna-button-default-radius` | `3px` | Default button |
| `--luna-button-action-background` | `#0053ee` | Action button and default-size icon button |
| `--luna-button-action-background-hover` | `#0050ee` | Action button and default-size icon button hover |
| `--luna-button-action-danger-background` | `#e5a01a` | Danger action button and danger icon button at default size |
| `--luna-button-action-font-size` | `12px` | Action button |
| `--luna-button-action-gap` | `8px` | Action button |
| `--luna-button-action-padding-x` | `12px` | Action button |
| `--luna-button-action-padding-y` | `8px` | Action button |
| `--luna-button-action-radius` | `4px` | Action button |
| `--luna-button-command-background` | `#7f9db9` | Command button |
| `--luna-button-command-background-hover` | `#91a7b4` | Command button hover |
| `--luna-button-command-background-active` | `#1d5281` | Command button active |
| `--luna-button-command-font-size` | `12px` | Command button |
| `--luna-button-command-padding-x` | `12px` | Command button |
| `--luna-button-command-padding-y` | `4px` | Command button |
| `--luna-button-command-radius` | `0` | Command button |
| `--luna-button-icon-size` | `28px` | Icon button |
| `--luna-button-icon-font-size` | `16px` | Icon button |
| `--luna-button-icon-radius` | `4px` | Icon button |
| `--luna-button-icon-compact-size` | `24px` | Compact icon button |
| `--luna-button-icon-compact-font-size` | `12px` | Compact icon button |
| `--luna-button-icon-compact-radius` | `3px` | Compact icon button |
| `--luna-button-icon-compact-background` | `#ffffff1a` | Compact icon button |
| `--luna-button-icon-compact-background-hover` | `#ffffff33` | Compact icon button hover |
| `--luna-button-icon-compact-danger-background` | `#e5a01a33` | Compact danger icon button |
| `--luna-button-icon-compact-danger-background-hover` | `#e5a01a4d` | Compact danger icon button hover |
| `--luna-input-disk-background` | `#003c74` | Disk name field (`luna-input`) |
| `--luna-input-disk-border` | `#1d5281` | Disk name field |
| `--luna-input-disk-border-focus` | `#0053ee` | Disk name field focus |
| `--luna-input-disk-font-size` | `13px` | Disk name field |
| `--luna-input-disk-padding-x` | `12px` | Disk name field |
| `--luna-input-disk-padding-y` | `8px` | Disk name field |
| `--luna-input-disk-placeholder` | `#e0e0e08c` | Disk name field placeholder |
| `--luna-input-disk-radius` | `4px` | Disk name field |
| `--luna-input-background` | `#003c74` | Select, textarea, checkbox, radio, slider track, progress track |
| `--luna-input-border` | `#1d5281` | Select, textarea, checkbox, radio, slider track, progress track |
| `--luna-input-border-focus` | `#0053ee` | Select and textarea focus |
| `--luna-input-font-size` | `11px` | Select and textarea |
| `--luna-input-padding-x` | `4px` | Select and textarea |
| `--luna-input-padding-y` | `4px` | Select and textarea |
| `--luna-input-placeholder` | `#e0e0e08c` | Textarea placeholder |
| `--luna-input-radius` | `2px` | Select and textarea |
| `--luna-menu-menubar-background` | `#dcdcd7` | Menubar and menubar dropdown |
| `--luna-menu-menubar-color` | `#000000` | Menubar text and triggers |
| `--luna-menu-menubar-font-size` | `11px` | Menubar rows and triggers |
| `--luna-menu-menubar-item-padding-y` | `4px` | Menubar row and trigger |
| `--luna-menu-menubar-item-padding-x` | `12px` | Menubar row and trigger |
| `--luna-menu-menubar-item-padding-left` | `8px` | Menubar row |
| `--luna-menu-menubar-check-gap` | `8px` | Menubar check slot |
| `--luna-menu-menubar-margin-bottom` | `8px` | Menubar |
| `--luna-menu-menubar-min-width` | `10rem` | Menubar dropdown |
| `--luna-menu-menubar-radius` | `0` | Menubar dropdown and trigger |
| `--luna-menu-context-background` | `#00138c` | Context menu |
| `--luna-menu-context-hover-background` | `#001ea0` | Context menu row hover |
| `--luna-menu-context-font-size` | `13px` | Context menu rows |
| `--luna-menu-context-padding` | `4px` | Context menu panel |
| `--luna-menu-context-row-gap` | `2px` | Context menu rows |
| `--luna-menu-context-item-padding` | `12px` | Context menu row |
| `--luna-menu-context-item-gap` | `12px` | Context menu row |
| `--luna-menu-context-item-radius` | `4px` | Context menu row |
| `--luna-menu-context-radius` | `6px` | Context menu panel |
| `--luna-menu-context-min-width` | `180px` | Context menu panel |
| `--luna-menu-context-shadow` | `0 4px 12px #00000066` | Context menu panel |
| `--luna-menu-context-danger-color` | `#e5a01a` | Context menu danger row |
| `--luna-menu-context-danger-hover-background` | `#e5a01a1a` | Context menu danger row hover |
| `--luna-tab-background` | `#ffffff` | Inactive tab |
| `--luna-tab-background-hover` | `#f2f2f1` | Inactive tab hover |
| `--luna-tab-color` | `#000000` | Inactive tab text |
| `--luna-tab-selected-background` | `#00138c` | Selected tab |
| `--luna-tab-selected-color` | `#ffffff` | Selected tab text |
| `--luna-tab-panel-border` | `#dcdcd7` | Tab panel border |
| `--luna-tab-font-size` | `11px` | Tab |
| `--luna-tab-padding-y` | `4px` | Tab |
| `--luna-tab-padding-x` | `12px` | Tab |
| `--luna-tab-padding-bottom` | `4px` | Tab |
| `--luna-tab-margin-right` | `2px` | Tab |
| `--luna-tab-panel-padding` | `8px` | Tab panel |
| `--luna-toolbar-cluster-gap` | `4px` | Cluster toolbar |
| `--luna-toolbar-editor-padding-y` | `12px` | Editor toolbar |
| `--luna-toolbar-editor-padding-x` | `16px` | Editor toolbar |
| `--luna-toolbar-editor-min-height` | `56px` | Editor toolbar |
| `--luna-toolbar-editor-group-start-gap` | `12px` | First group in an editor toolbar |
| `--luna-toolbar-editor-group-end-gap` | `8px` | Later groups in an editor toolbar |
| `--luna-toolbar-command-padding` | `8px` | Command toolbar |
| `--luna-toolbar-command-gap` | `8px` | Command toolbar |
| `--luna-toolbar-float-offset` | `16px` | Float toolbar |
| `--luna-window-background` | `#ecebe5` | Window body and tab panel |
| `--luna-window-title-background` | `#0053ee` | Window frame, title bar, dialog title |
| `--luna-window-frame-padding` | `4px` | Window frame |
| `--luna-window-title-height` | `21px` | Window title bar |
| `--luna-window-title-padding` | `4px` | Window title bar |
| `--luna-window-title-font-size` | `11px` | Window title |
| `--luna-window-title-control-gap` | `2px` | Window title controls |
| `--luna-window-title-control-size` | `21px` | Window title controls |
| `--luna-window-body-padding` | `8px` | Window body |
| `--luna-window-radius` | `6px` | Window |

### Using Icons

ng-luna includes [Lucide Icons](https://lucide.dev/), a comprehensive set of over 1,400 clean, consistent SVG icons. Each icon is a tree-shakable string export whose name is the Lucide name plus `Svg`, such as `CopySvg` and `FolderOpenSvg`. Only the icons you import are included in your bundle.

#### Import Icons

```typescript
import { IconComponent, HomeSvg, SaveSvg, FolderSvg, SettingsSvg } from 'ng-luna';

@Component({
    imports: [ IconComponent ],
    template: `
        <luna-icon [svg]="homeIcon" size="24"></luna-icon>
        <luna-icon [svg]="saveIcon" size="16"></luna-icon>
    `
})
export class MyComponent {
    homeIcon = HomeSvg;
    saveIcon = SaveSvg;
}
```

#### Icon Component

**Selector:** `luna-icon`

##### Inputs

- `svg: string` (required) - The SVG string from an imported Lucide icon
- `size?: IconSize` - Icon size: `'12' | '14' | '16' | '20' | '24' | '32' | '48'` (default: `'24'`)

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

**Common icons:**
- `HomeSvg`, `FolderSvg`, `FileSvg` - Navigation
- `SettingsSvg`, `CogSvg`, `WrenchSvg` - Configuration
- `UserSvg`, `UsersSvg` - User management
- `SaveSvg`, `DownloadSvg`, `UploadSvg` - File operations
- `XSvg`, `Minimize2Svg`, `Maximize2Svg` - Window controls
- `ChevronLeftSvg`, `ChevronRightSvg`, `ChevronDownSvg` - Navigation arrows
- `CheckSvg`, `AlertTriangleSvg` - Status indicators

#### Tree-Shaking

Icons use ES modules for automatic tree-shaking. Only imported icons are included in your final bundle:

```typescript
// ✅ Good: Only HomeSvg and SaveSvg are included in the bundle
import { HomeSvg, SaveSvg } from 'ng-luna';

// ❌ Avoid: Imports entire icon library
import * as Icons from 'ng-luna';
```

## Components

All components extend the `LunaControl` base class, which provides the following common inputs available on every component:

- `id?: string` - Element ID
- `name?: string` - Name attribute
- `disabled: boolean` - Whether the control is disabled (default: `false`)
- `isMaximized: boolean` - Expands the control to fill its containing block (default: `false`); adds the `luna-maximized` CSS class to the host element
- `tabindex?: number` - Tab index for keyboard navigation
- `autofocus: boolean` - Whether the control should be autofocused (default: `false`)

These inputs are inherited from the base class and available on all components unless otherwise noted in the component-specific documentation below.

### Button Component

The `luna-button` component paints one variant at a time. `size` applies only with `variant="icon"`.

**Selector:** `luna-button`

`variant="default"` is IBM Plex Sans, 11px, line-height 1.2, padding `4px 12px`, a gray border, radius `3px`, a white face, and black text. Hover is `$gray-lightest`. An active press moves it down 1px.

`variant="action"` is IBM Plex Mono, 12px, weight 500, padding `8px 12px`, gap `8px`, no border, radius `4px`, and the same fill and press. Projected content, including a `luna-icon` at `size="16"`, is centered in that gap.

`variant="command"` is IBM Plex Sans, 12px, padding `4px 12px`, no gap, a steel border, square corners, and a steel fill. Hover lightens the fill. An active press uses the dark steel fill.

`variant="icon"` is a 28px square, padding `0`, radius `4px`, with the action fill. `size="compact"` is a 24px square, radius `3px`, with a translucent fill. The glyph stays `luna-icon` `size="16"`.

`tone="danger"` on an action button, and on an icon button at the default size, uses a solid danger fill. Compact danger keeps the 24px box: danger text on a translucent danger fill. `disabled` sets `cursor: not-allowed`, opacity `0.6`, and drops hover and active treatment on every variant.

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
- `size: LunaSize` - Density: `'default' | 'compact'` (default: `'default'`). Compact applies with `variant="icon"`.
- `tone: LunaTone` - Semantic recolor: `'default' | 'danger'` (default: `'default'`)
- `type: ButtonType` - Button type: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `value?: string` - Value attribute for the button
- `variant: LunaButtonVariant` - Structure: `'default' | 'action' | 'command' | 'icon'` (default: `'default'`)

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

The `luna-checkbox` component is a checkbox on the shared field surface. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-fieldset` component groups form controls on the window surface.

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
- `size?: IconSize` - Icon size: `'12' | '14' | '16' | '20' | '24' | '32' | '48'` (default: `'24'`)

#### Example

```html
<luna-icon [svg]="homeIcon" size="24"></luna-icon>

<luna-button>
    <luna-icon [svg]="saveIcon" size="16"></luna-icon>
    Save File
</luna-button>
```

```typescript
import { IconComponent, HomeSvg, SaveSvg } from 'ng-luna';

@Component({
    imports: [ IconComponent ],
    // ...
})
export class MyComponent {
    homeIcon = HomeSvg;
    saveIcon = SaveSvg;
}
```

For more information on importing and using icons, see the [Using Icons](#using-icons) section above.

### Toolbar Component

The `luna-toolbar` component is a horizontal bar. `luna-toolbar-group` is a row inside it. The variant owns the bar's padding and gap. There is no gap input.

**Selector:** `luna-toolbar`

**Group selector:** `luna-toolbar-group`

- `variant="cluster"`: padding `0`, gap `4px`, no background. Icon buttons.
- `variant="editor"`: padding `12px 16px`, navy-darkest bar, steel bottom border, `min-height: 56px`, space between, centered. The first group gaps at `12px`. A following group gaps at `8px`.
- `variant="command"`: padding `8px`, gap `8px`, the same bar, centered. Command buttons.
- `variant="end"`: padding `0`, gap `0`, aligned to the end, `flex-shrink: 0`.
- `variant="float"`: padding `0`, gap `0`, `position: absolute`, `top: 16px`, `right: 16px`.

#### Example

```html
<luna-toolbar variant="editor">
    <luna-toolbar-group>
        <luna-button variant="icon" type="button">
            <luna-icon [svg]="saveIcon" size="16"></luna-icon>
        </luna-button>
    </luna-toolbar-group>
    <luna-toolbar-group>
        <luna-button variant="command" type="button">Start</luna-button>
    </luna-toolbar-group>
</luna-toolbar>
```

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

The `luna-menu` component opens a menu panel from a trigger, or at a viewport point. It supports checked items, icons, a danger tone, hover highlighting, Up/Down to move the highlight within the list, closing with Escape, and Enter to activate the highlighted row. When the menu sits inside a **Menu Bar Component**, Left/Right move to the previous or next top-level menu in the bar (with wraparound).

**Selector:** `luna-menu`

**Trigger directive:** `lunaMenuTrigger` – attach to the element that opens the menu (e.g. a button).

Use `LunaOverlayComponent` and `LunaOverlayContainer` as described in **Overlay (menu, modal, tooltip)** above so the menu overlay and trigger are styled. For a top-level menu bar, use the **Menu Bar Component** and place one or more `luna-menu` inside it.

#### Inputs

- `items: LunaMenuEntry[]` – Menu entries. Each item: `{ label: string, checked?: boolean, disabled?: boolean, icon?: string, tone?: LunaTone }`. `icon` is SVG markup, the same string as `luna-icon` `svg`, drawn at 16px. `tone: 'danger'` recolors the row. Use `{ separator: true }` for a divider line.
- `variant: LunaMenuVariant` – Panel paint: `'menubar' | 'context'` (default: `'menubar'`). Menubar is Sans 11px on `#dcdcd7`, black text, with padding `4px 12px 4px 8px` and square corners. The open row and the open trigger are navy with white text. Context is Mono 13px, panel padding `4px`, row gap `2px`, row padding `12px`, radius `6px`. The value is passed into the overlay panel.

#### Methods

- `open(origin)` – Opens the panel anchored to a trigger element. `lunaMenuTrigger` calls this.
- `openAt(x, y)` – Opens the panel at viewport coordinates. No trigger child is required.

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

The `luna-input` component is the disk name field: IBM Plex Mono, 13px, padding `8px 12px`, radius `4px`, navy fill, steel border. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-progress` component is a progress bar. The track uses the field surface and the indicator uses the action color.

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

The `luna-radio` component is a radio button on the shared field surface. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-select` component is a select: IBM Plex Sans, 11px, padding `4px`, radius `2px`, navy fill, steel border. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-slider` component is a range slider. The track uses the field surface. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-tabs` component is a tab interface with keyboard navigation support. Inactive tabs are white with black text. The selected tab is navy-darkest with white text, and it overlaps the panel by 1px. The panel fill is the window body color, with a gray border. Use `luna-tab` children to define each tab and its content.

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

When `isMaximized` is set on `luna-tabs`, it is automatically propagated to every child `luna-tab` so their panels expand to fill available space.

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

The `luna-textarea` component is a multiline field: IBM Plex Sans, 11px, padding `4px`, radius `2px`, navy fill, steel border. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-window` component is a draggable window with a title bar and window controls. The body uses the window ground and the title bar uses the action color.

**Selector:** `luna-window`

#### Inputs

- `title?: string` - Window title text
- `showMinimize: boolean` - Whether to show the minimize button (default: `true`)
- `showMaximize: boolean` - Whether to show the maximize/restore button (default: `true`)
- `showHelp: boolean` - Whether to show the help button (default: `false`)
- `showClose: boolean` - Whether to show the close button (default: `true`)
- `dragDisabled: boolean` - Disables dragging independently of maximize state (default: `false`)
- `boundaryElement?: string` - CSS selector for element that constrains window dragging
- `scrollable: boolean` - Whether the window body should be scrollable (default: `false`)

`isMaximized` is inherited from `LunaControl` (see common inputs above). When true, the window fills its containing block.

#### Outputs

- `minimize: EventEmitter<void>` - Emitted when the minimize button is clicked
- `maximize: EventEmitter<void>` - Emitted when the maximize button is clicked
- `restore: EventEmitter<void>` - Emitted when the restore button is clicked
- `help: EventEmitter<void>` - Emitted when the help button is clicked
- `close: EventEmitter<void>` - Emitted when the close button is clicked

#### Dragging and maximizing

The window can be dragged by its title bar. Double-clicking the title bar toggles maximize/restore when `showMaximize` is `true`.

When `isMaximized` is `true`, dragging is disabled and the window fills its containing block (the element that sizes the `luna-window` host). To fill the full viewport, ensure the host's ancestors have `height: 100%` down to `html`. Drag position is reset when maximizing so the window is flush with its container.

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
    <p>Window content goes here</p>
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

### Storybook

Run the component workshop:

```bash
npm run storybook
```

This serves stories at `http://localhost:6006`. Each public control has a story next to its source under `src/controls/`. The Controls panel edits inputs. Menus, modals, and tooltips render inside `luna-overlay`, which `.storybook/preview.ts` adds to every story and pairs with `LunaOverlayContainer`.

A static build:

```bash
npm run build-storybook
```

Output goes to `dist/storybook`.

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
- Copy fonts and SCSS themes
- Create a production-ready `package.json`

All exports go through `src/public-api.ts` → `src/controls/index.ts` → individual components.

### Project Structure

```
ng-luna/
├── .storybook/          # Workshop preview, theme, and overlay host
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
│   │   ├── toolbar/       # Toolbar and toolbar group
│   │   ├── tooltip/       # Tooltip directive + component
│   │   ├── window/        # Window component
│   │   └── index.ts       # Controls barrel export
│   ├── theme/             # Theme (palette, typography, fonts, etc.)
│   │   ├── _breakpoints.scss
│   │   ├── _fonts.scss    # IBM Plex font imports
│   │   ├── _global.scss
│   │   ├── _graphics.scss
│   │   ├── _layout.scss   # Layout mixins (fill-parent)
│   │   ├── _palette.scss  # Color palette
│   │   ├── _reset.scss
│   │   ├── _tokens.scss   # Custom properties and luna-token()
│   │   ├── _typography.scss
│   │   └── _z-layers.scss
│   └── public-api.ts      # Public API surface
├── ng-package.json        # ng-packagr configuration
├── package.json           # Package dependencies
└── tsconfig.json          # TypeScript configuration
```

## Dependencies

- **lucide-static** (0.468.0) – icon SVG strings re-exported from `ng-luna` with an `Svg` suffix (`CopySvg`, `SaveSvg`, and the rest)
- **tslib** (2.x.x) – TypeScript helpers; the range lets npm dedupe it with Angular

IBM Plex fonts are copied into the published package when the library is built. Consumers do not install `@ibm/plex`.

## Publishing

### Prerequisites

1. Create an npm account at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. Login to npm from the command line:

```bash
npm login
```

### Publishing Steps

`prepublishOnly` builds the library. The built package is `dist/`, which already contains `fonts/` and `theme/`.

```bash
npm publish ./dist
```

### Publishing Updates

When you need to publish a new version:

```bash
npm version patch
npm publish ./dist
```

`npm version` also accepts `minor` and `major`.

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Adam R Moss
