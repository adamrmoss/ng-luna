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

Menu, modal, and tooltip render through Angular CDK Overlay. Put `OverlayComponent` in the root template and provide `LunaOverlayContainer` so those panes attach inside the app and use Luna styles.

**1. Root template** (`app.component.html`):

```html
<luna-overlay></luna-overlay>
<!-- rest of your app -->
```

**2. Root component** imports `OverlayComponent` from `ng-luna`.

**3. Root providers** (`main.ts`):

```typescript
import { OverlayContainer } from '@angular/cdk/overlay';
import { bootstrapApplication } from '@angular/platform-browser';
import { LunaOverlayContainer } from 'ng-luna';

bootstrapApplication(AppComponent, {
    providers: [
        { provide: OverlayContainer, useClass: LunaOverlayContainer },
    ],
});
```

`@angular/cdk` is a peer dependency. Menu, modal, and tooltip inject CDK `Overlay` from that package. Menu trigger, backdrop, modal pane, and tooltip styles ship with `OverlayComponent`.

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

This copies the font files from the ng-luna package to your application's `/fonts/` directory during build. Component styles already include the `@font-face` rules, and those rules request the files from `/fonts`.

That URL is compiled into the published CSS. To serve the files from another path, change `$font-assets-path` in `src/theme/_fonts.scss` and rebuild the library.

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
- `'IBM Plex Mono', monospace` - Action buttons and the disk name field
- `'IBM Plex Serif', serif` - Available for app styles; controls do not use it

**Note:** The ng-luna components will automatically use these fonts once they are available at `/fonts`. Font families are not custom properties.

### Theme

The default paint is the EduBASIC palette, written on `:root` by `@use 'ng-luna/theme'`. Set any property below on `:root` or an ancestor to reskin a control. Each component reads its own token with one `var()` lookup, for example `var(--luna-window-title-background)`. Changing `--luna-color-action` does not change the title bar. Set `--luna-window-title-background` to reskin that fill. Each metric names its component and variant.

Load the theme from an app stylesheet. `@use 'ng-luna/theme/global'` loads the same paint, plus the reset and the scrollbar. An app that loads neither leaves the variables unset.

```scss
@use 'ng-luna/theme';
```

`global` applies `box-sizing: border-box`, IBM Plex Serif on `body`, IBM Plex Sans on headings, and the Luna scrollbar. `_palette.scss` and `_typography.scss` in the published `theme/` folder are the SCSS source for layout you write yourself:

```scss
@use 'ng-luna/theme/palette' as palette;

.stage {
    background: palette.$beige-300;
}
```

Action hover is `color-mix` of `--luna-button-action-background` 90% with white. Window caption buttons mix `--luna-window-title-background` the same way. Solid danger hover on an action button, and on an icon button at the default size, is `color-mix` of `--luna-button-action-danger-background` 10% toward black.

| Property | :root value | Read by |
|---|---|---|
| `--luna-color-accent-dark` | `#00138c` | Editor and command toolbars |
| `--luna-color-accent-light` | `#003c74` | Menu row hover |
| `--luna-color-action` | `#0053ee` | Button focus outline and text selection |
| `--luna-color-border` | `#1d5281` | Command button border |
| `--luna-color-text` | `#ffffff` | Action and icon button, field, and menu highlight |
| `--luna-color-danger` | `#e5a01a` | Danger menu row and compact danger icon text |
| `--luna-button-default-background` | `#ffffff` | Default button |
| `--luna-button-default-background-hover` | `#f2f2f1` | Default button hover |
| `--luna-button-default-border` | `#9d9c99` | Default button border |
| `--luna-button-default-color` | `#000000` | Default button text |
| `--luna-button-default-font-size` | `11px` | Default button |
| `--luna-button-default-padding-x` | `12px` | Default button |
| `--luna-button-default-padding-y` | `4px` | Default button |
| `--luna-button-default-radius` | `3px` | Default button |
| `--luna-button-action-background` | `#0053ee` | Action button and default-size icon button |
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
| `--luna-checkbox-background` | `#ffffff` | Checkbox |
| `--luna-checkbox-border` | `#000000` | Checkbox border |
| `--luna-fieldset-background` | `#ecebe5` | Fieldset and legend |
| `--luna-fieldset-border` | `#000000` | Fieldset and legend border |
| `--luna-fieldset-color` | `#000000` | Fieldset and legend text |
| `--luna-input-disk-background` | `#ffffff` | Disk name field (`luna-input`) |
| `--luna-input-disk-border` | `#000000` | Disk name field |
| `--luna-input-disk-border-focus` | `#0053ee` | Disk name field focus |
| `--luna-input-disk-color` | `#000000` | Disk name field text |
| `--luna-input-disk-font-size` | `13px` | Disk name field |
| `--luna-input-disk-padding-x` | `12px` | Disk name field |
| `--luna-input-disk-padding-y` | `8px` | Disk name field |
| `--luna-input-disk-placeholder` | `#858585` | Disk name field placeholder |
| `--luna-input-disk-radius` | `4px` | Disk name field |
| `--luna-input-background` | `#003c74` | Select, slider track, progress track |
| `--luna-input-border` | `#1d5281` | Select, slider track, progress track |
| `--luna-input-border-focus` | `#0053ee` | Select and textarea focus |
| `--luna-input-font-size` | `11px` | Select and textarea |
| `--luna-input-padding-x` | `4px` | Select and textarea |
| `--luna-input-padding-y` | `4px` | Select and textarea |
| `--luna-input-radius` | `2px` | Select and textarea |
| `--luna-menu-menubar-background` | `#dcdcd7` | Menu bar and menu panel |
| `--luna-menu-menubar-border` | `#9d9c99` | Menu panel border and separator |
| `--luna-menu-menubar-color` | `#000000` | Menu text and triggers |
| `--luna-menu-menubar-disabled-color` | `#9d9c99` | Disabled menu row |
| `--luna-menu-menubar-font-size` | `11px` | Menu rows and triggers |
| `--luna-menu-menubar-item-padding-y` | `4px` | Menu row and trigger |
| `--luna-menu-menubar-item-padding-x` | `12px` | Menu row and trigger |
| `--luna-menu-menubar-item-padding-left` | `8px` | Menu row |
| `--luna-menu-menubar-check-gap` | `8px` | Menu check slot |
| `--luna-menu-menubar-margin-bottom` | `8px` | Menu bar |
| `--luna-menu-menubar-min-width` | `10rem` | Menu panel |
| `--luna-menu-menubar-radius` | `0` | Menu panel and trigger |
| `--luna-radio-background` | `#ffffff` | Radio |
| `--luna-radio-border` | `#000000` | Radio border |
| `--luna-tab-background` | `#ecebe5` | Tab |
| `--luna-tab-background-hover` | `#ecebe5` | Tab hover |
| `--luna-tab-color` | `#000000` | Tab text |
| `--luna-tab-selected-background` | `#e8e6dc` | Selected tab |
| `--luna-tab-selected-color` | `#000000` | Selected tab text |
| `--luna-tab-panel-background` | `#ecebe5` | Tab panel |
| `--luna-tab-panel-border` | `#000000` | Tab and panel border |
| `--luna-tab-panel-color` | `#000000` | Tab panel text |
| `--luna-tab-font-size` | `11px` | Tab |
| `--luna-tab-padding-y` | `4px` | Tab |
| `--luna-tab-padding-x` | `12px` | Tab |
| `--luna-tab-padding-bottom` | `4px` | Tab |
| `--luna-tab-margin-right` | `2px` | Tab |
| `--luna-tab-panel-padding` | `8px` | Tab panel |
| `--luna-textarea-background` | `#ffffff` | Textarea |
| `--luna-textarea-border` | `#000000` | Textarea border |
| `--luna-textarea-color` | `#000000` | Textarea text |
| `--luna-textarea-placeholder` | `#858585` | Textarea placeholder |
| `--luna-toolbar-cluster-gap` | `4px` | Cluster toolbar |
| `--luna-toolbar-editor-padding-y` | `12px` | Editor toolbar |
| `--luna-toolbar-editor-padding-x` | `16px` | Editor toolbar |
| `--luna-toolbar-editor-min-height` | `56px` | Editor toolbar |
| `--luna-toolbar-editor-group-start-gap` | `12px` | First group in an editor toolbar |
| `--luna-toolbar-editor-group-end-gap` | `8px` | Later groups in an editor toolbar |
| `--luna-toolbar-command-padding` | `8px` | Command toolbar |
| `--luna-toolbar-command-gap` | `8px` | Command toolbar |
| `--luna-toolbar-float-offset` | `16px` | Float toolbar |
| `--luna-tooltip-background` | `#f3f2ea` | Tooltip |
| `--luna-tooltip-border` | `#9d9c99` | Tooltip border |
| `--luna-tooltip-color` | `#000000` | Tooltip text |
| `--luna-tooltip-shadow` | `0 1px 2px #00000026` | Tooltip |
| `--luna-window-background` | `#ecebe5` | Window body |
| `--luna-window-title-background` | `#0053ee` | Window frame, title bar, dialog title |
| `--luna-window-frame-padding` | `4px` | Window frame |
| `--luna-window-title-height` | `25px` | Window and dialog title bar |
| `--luna-window-title-padding` | `4px` | Window title bar |
| `--luna-window-title-shadow` | `1px 1px #0f1089` | Window title text |
| `--luna-window-title-font-size` | `12px` | Window and dialog title |
| `--luna-window-title-control-gap` | `2px` | Window title controls |
| `--luna-window-title-control-size` | `21px` | Window title controls |
| `--luna-window-body-padding` | `8px` | Window body |
| `--luna-window-radius` | `6px` | Window |
| `--luna-window-title-color` | `#ffffff` | Window title text |
| `--luna-window-body-color` | `#000000` | Window body text |
| `--luna-window-inset` | `0` | Maximized window gutter. A shell stylesheet sets this on the host |
| `--luna-overlay-shadow-half` | `#00000080` | Modal veil |
| `--luna-overlay-shadow-quarter` | `#00000040` | Popup veil |

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

`LunaControl` supplies these inputs on button, checkbox, fieldset, input, menu bar, progress, radio, select, slider, tab, tabs, textarea, and window:

- `id?: string` - Element ID
- `name?: string` - Name attribute
- `disabled: boolean` - Whether the control is disabled (default: `false`)
- `isMaximized: boolean` - Expands the control to fill its containing block (default: `false`); adds the `luna-maximized` CSS class to the host element
- `tabindex?: number` - Tab index for keyboard navigation
- `autofocus: boolean` - Whether the control should be autofocused (default: `false`)

Icon, menu, toolbar, overlay, and tooltip have their own inputs, listed on those components.

### Button Component

The `luna-button` component paints one variant at a time. `size` applies only with `variant="icon"`.

**Selector:** `luna-button`

`variant="default"` is IBM Plex Sans, 11px, line-height 1.2, padding `4px 12px`, a gray border, radius `3px`, a white face, and black text. Hover uses `--luna-button-default-background-hover`. An active press moves it down 1px.

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

The `luna-checkbox` component is a checkbox with a white box and a black border. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-fieldset` component groups form controls. Frame and legend colors come from the fieldset variables. Their defaults match the window body fill and text. The border defaults to black.

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

#### Inputs

- `variant: LunaToolbarVariant` - Bar metrics: `'cluster' | 'editor' | 'command' | 'end' | 'float'` (default: `'cluster'`)

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

The `luna-menu-bar` component is a horizontal bar for one or more `luna-menu` components, for example under a window title. It uses the shared `LunaControl` inputs.

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

The `luna-menu` component opens a menu panel from a trigger, or at a viewport point. The panel is Sans 11px on `#dcdcd7`, with black text, padding `4px 12px 4px 8px`, and square corners. A highlighted row and an open trigger are navy with white text. It supports checked items, icons, a danger tone, hover highlighting, Up/Down to move the highlight within the list, closing with Escape, and Enter to activate the highlighted row. When the menu sits inside a **Menu Bar Component**, Left/Right move to the previous or next top-level menu in the bar (with wraparound).

**Selector:** `luna-menu`

**Trigger directive:** `lunaMenuTrigger` – attach to the button that opens the menu.

**Link directive:** `lunaMenuLink` – attach to an anchor in the menu bar. It uses the same chrome as the trigger, including hover, and does not open a menu. The active class stays on the button.

Use `OverlayComponent` and `LunaOverlayContainer` as described in **Overlay (menu, modal, tooltip)** above so the menu overlay and trigger are styled. For a top-level menu bar, use the **Menu Bar Component** and place one or more `luna-menu` inside it.

#### Inputs

- `items: LunaMenuEntry[]` – Menu entries. Each item: `{ label: string, checked?: boolean, disabled?: boolean, icon?: string, tone?: LunaTone }`. `icon` is SVG markup, the same string as `luna-icon` `svg`, drawn at 16px. `tone: 'danger'` recolors the row. Use `{ separator: true }` for a divider line.

#### Methods

- `open(origin)` – Opens the panel anchored to a trigger element. `lunaMenuTrigger` calls this.
- `openAt(x, y)` – Opens the panel at viewport coordinates. No trigger child is required.

#### Outputs

- `itemSelect: EventEmitter<LunaMenuItem | null>` – Emitted when an item is chosen (or `null` when the menu is closed without selection, e.g. via Escape or backdrop click).

#### Example

```html
<luna-menu-bar>
    <luna-menu [items]="menuItems" (itemSelect)="onMenuSelect($event)">
        <button lunaMenuTrigger type="button">File</button>
    </luna-menu>
    <a lunaMenuLink href="/guide">Guide</a>
</luna-menu-bar>
```

A menubar trigger is black text on a transparent button. Place it in `luna-menu-bar` so it sits on the gray bar. `openAt` opens that same panel at a viewport point:

```html
<div (contextmenu)="onContext($event, menu)">
    <luna-menu
        #menu
        [items]="menuItems"
        (itemSelect)="onMenuSelect($event)">
    </luna-menu>
</div>
```

```typescript
onContext(event: MouseEvent, menu: LunaMenuComponent): void {
    event.preventDefault();
    menu.openAt(event.clientX, event.clientY);
}
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

The `luna-input` component is the disk name field: IBM Plex Mono, 13px, padding `8px 12px`, radius `4px`, white fill, black text, and a black border. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-progress` component is a 14px progress bar. The track uses the field surface. The indicator is a green gradient. Leave `value` unset for an indeterminate sliding bar.

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

The `luna-radio` component is a radio button with a white disc and a black border. The label uses the surrounding text color. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-tabs` component is a tab interface with keyboard navigation support. Tab and panel colors come from the tab variables. Their defaults match the window body fill and text. The panel border and the top, left, and right borders on every tab default to black. The selected tab fill is one step darker than the other tabs. The selected tab overlaps the panel by 1px. Use `luna-tab` children to define each tab and its content.

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

The `luna-textarea` component is a multiline field: IBM Plex Sans, 11px, padding `4px`, radius `2px`, white fill, black text, and a black border. It implements `ControlValueAccessor` for reactive forms support.

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

The `luna-overlay` component is the host for menu, modal, and tooltip panes. Add it once, at the root, and provide `LunaOverlayContainer`. Setup is in **Overlay (menu, modal, tooltip)** under [Usage](#usage). The component has no inputs or outputs.

**Selector:** `luna-overlay`

**Class:** `OverlayComponent`

**Related:** `LunaOverlayContainer`, provided as CDK `OverlayContainer`, so panes attach to this host.

### Modal

`LunaModalService` opens a centered dialog on a 50% black veil with no blur. A backdrop click leaves it open. Escape closes it through the shared dismiss stack. It is `providedIn: 'root'`. A second alert, confirm, or prompt while one is already open is ignored. Custom dialogs opened with `open` can stack.

The message box uses the window frame, title bar, and body fill. Message boxes still handle Enter themselves. Their Escape handler sits above the modal close: Escape cancels a confirm or prompt, and confirms an alert.

#### Message boxes

- `alert(message, title?)` returns `Observable<void | undefined>`. Enter and Escape both confirm.
- `confirm(message, title?)` returns `Observable<boolean>`. OK is `true`. Cancel and Escape are `false`.
- `prompt(message, title?)` returns `Observable<MessageBoxReturnData>`: `{ button: 'ok' | 'cancel', promptValue?: string }`.
- `alertWith`, `confirmWith`, and `promptWith` take `MessageBoxOptions` for button labels, a prompt placeholder, a default prompt value, and custom OK or cancel payloads.

```typescript
import { LunaModalService } from 'ng-luna';
import type { MessageBoxReturnData } from 'ng-luna';

export class MyComponent {
    constructor(private modal: LunaModalService) {}

    save(): void {
        this.modal.prompt('File name', 'Save As').subscribe((result: MessageBoxReturnData) => {
            if (result.button === 'ok') {
                console.log(result.promptValue);
            }
        });
    }
}
```

#### Custom dialog

`open(component, { data })` portals a standalone component and returns `Observable<T | undefined>`. The service does not build a window. The caller sets the caption, size, and chrome. The dialog injects `LunaModalRef` and calls `close(result)`. `MODAL_DATA` is the optional `data` value. A backdrop click leaves it open. Escape closes it.

```typescript
import { Component, inject } from '@angular/core';
import { LunaModalRef, LunaModalService, MODAL_DATA } from 'ng-luna';

@Component({
    selector: 'app-rename-dialog',
    standalone: true,
    template: `<button type="button" (click)="modalRef.close(name)">OK</button>`,
})
export class RenameDialog {
    modalRef = inject(LunaModalRef<string>);
    name = inject(MODAL_DATA) as string;
}

// caller
this.modal.open<string>(RenameDialog, { data: 'untitled' }).subscribe((name) => {
    console.log(name);
});
```

### Popup

`LunaPopupService` portals a caller component the same way a modal does: centered, with scroll locked. The veil is 25% black plus a blur. A backdrop click closes it. Escape closes it through the same dismiss stack. The caller owns `luna-window` when the surface should look like a window. The service does not build one.

`open(component, { data })` returns `Observable<T | undefined>`. The component injects `LunaPopupRef` and calls `close(result)`. `POPUP_DATA` is the optional `data` value.

```typescript
import { Component, inject } from '@angular/core';
import { LunaPopupRef, LunaPopupService, POPUP_DATA, WindowComponent } from 'ng-luna';

@Component({
    selector: 'app-publication',
    standalone: true,
    imports: [ WindowComponent ],
    template: `
        <luna-window title="Publication" (close)="onClose()">
            <p>{{ note }}</p>
        </luna-window>
    `,
})
export class Publication {
    note = inject(POPUP_DATA) as string;
    private popupRef = inject(LunaPopupRef<string>);

    onClose(): void {
        this.popupRef.close(this.note);
    }
}

// caller
this.popups.open<string>(Publication, { data: 'A note from the shelf.' }).subscribe((note) => {
    console.log(note);
});
```

### Tooltip

The `lunaTooltip` directive shows a delayed tooltip on hover and focus. An empty string leaves it closed. Show delay defaults to 60ms. Hide delay defaults to 250ms.

**Directive:** `TooltipDirective`, selector `[lunaTooltip]`

#### Inputs

- `lunaTooltip: string` - Tooltip text (default: `''`)
- `lunaTooltipShowDelay: number` - Milliseconds before show (default: `60`)
- `lunaTooltipHideDelay: number` - Milliseconds before hide (default: `250`)

```html
<button lunaTooltip="Save the document" type="button">Save</button>
```

```typescript
import { TooltipDirective } from 'ng-luna';

@Component({
    imports: [ TooltipDirective ],
})
```

### Window Component

The `luna-window` component is a draggable window with a title bar and window controls. The host is the frame box. The body uses `--luna-window-body-color` and the title uses `--luna-window-title-color`. The title bar background is `--luna-window-title-background`. There are no style inputs. `id` is the host only.

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

`isMaximized` is inherited from `LunaControl` (see common inputs above). When true, the window fills its containing block and keeps its frame and radius.

#### Outputs

- `minimize: EventEmitter<void>` - Emitted when the minimize button is clicked
- `maximize: EventEmitter<void>` - Emitted when the maximize button is clicked
- `restore: EventEmitter<void>` - Emitted when the restore button is clicked
- `help: EventEmitter<void>` - Emitted when the help button is clicked
- `close: EventEmitter<void>` - Emitted when the close button is clicked

#### Dragging and maximizing

The window can be dragged by its title bar. Double-clicking the title bar toggles maximize/restore when `showMaximize` is `true`.

When `isMaximized` is `true`, dragging is disabled. The host margin is `var(--luna-window-inset)` and the width and height are `calc(100% - 2 * var(--luna-window-inset))`. `:root` sets the inset to `0`. A shell stylesheet opts into a gutter by setting `--luna-window-inset` on the window. To fill the viewport, the host's ancestors need `height: 100%` down to `html`. Drag position is reset when maximizing. Every window fades in with opacity over 150ms. The same entrance runs on modal and popup veils and panes.

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

- **Focus** - Button, checkbox, input, radio, select, slider, and textarea monitor focus with CDK `FocusMonitor`.
- **Announcements** - Checkbox, input, progress, radio, select, slider, and textarea announce state changes with `LiveAnnouncer`.
- **Keyboard** - Tabs move with Left and Right. An open menu moves with Up and Down and activates with Enter. Inside a menu bar, Left and Right move to the neighboring menu. Escape closes the top menu, message box, modal, or popup. A field inside that surface does not swallow Escape. A message box confirms with Enter; Escape cancels, or confirms when the box is an alert.
- **Drag** - `luna-window` drags from the title bar, optionally inside `boundaryElement`.
- **Direction** - Button and input honor CDK `Dir` when an ancestor provides it.
- **Numbers** - Progress and slider coerce numeric inputs through CDK.

## Reactive Forms Support

Checkbox, input, radio, select, slider, and textarea implement `ControlValueAccessor`. Import `FormsModule` for `ngModel`, or `ReactiveFormsModule` for `formControlName`.

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

This serves stories at `http://localhost:6006`. Each public control has a story next to its source under `src/controls/`. The Controls panel edits inputs. Menus, modals, popups, and tooltips render inside `luna-overlay`, which `.storybook/preview.ts` adds to every story and pairs with `LunaOverlayContainer`.

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
│   ├── _theme.scss        # :root paint. @use 'ng-luna/theme'
│   ├── controls/          # Component library controls
│   │   ├── button/        # Button component
│   │   ├── checkbox/      # Checkbox component
│   │   ├── fieldset/      # Fieldset component
│   │   ├── icons/         # Icon component + Lucide icons
│   │   ├── input/         # Input component
│   │   ├── menu/          # Menu component, trigger, link, panel
│   │   ├── menu-bar/      # Menu bar container
│   │   ├── modal/         # Modal service + message box
│   │   ├── overlay/       # Overlay host, surface opener, dismiss stack
│   │   ├── popup/         # Popup service, ref, and data token
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

```bash
npm run publish
```

That script installs dependencies, builds with ng-packagr, and publishes `./dist`. The built package already contains `fonts/` and `theme/`.

### Publishing Updates

```bash
npm version patch
npm run publish
```

`npm version` also accepts `minor` and `major`.

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Adam R Moss
