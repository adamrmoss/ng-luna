# ng-luna: chrome defaults so EduBASIC can drop its overrides

EduBASIC 0.26.x consumes ng-luna 1.1.1. The workspace panes (console, code, disk, output) are navy because the app paints them. The window, the default button, and the tabs are light chrome. 1.1.1 paints that chrome navy and bright blue, so `src/index.scss` overrides the tokens. Ship the values below as the library defaults and EduBASIC will delete those overrides.

Do not change spacing, type size, or font family as part of this. Do not paint the menubar. It is already `$gray-light-warm` (`#dcdcd7`) with black text.

## Window

| Token | 1.1.1 fallback | Ship |
|---|---|---|
| `--luna-window-background` | `#003c74` | `#ecebe5` (`$beige-light`) |

This is the window body and the tab panel fill. The navy the user sees inside a tab is the app pane, not this token.

## Default button

Clear Console and About Ok. White face, black label, gray border. Not the bright-blue action fill.

| Token | 1.1.1 fallback | Ship |
|---|---|---|
| `--luna-button-default-background` | `#0053ee` | `#ffffff` |
| `--luna-button-default-background-hover` | `#0050ee` | `#f2f2f1` (`$gray-lightest`) |
| `--luna-button-default-border` | `#003c74` | `#9d9c99` (`$gray-dark`) |
| `--luna-button-default-color` | none; text uses `--luna-color-text` (`#ffffff`) | `#000000` |

Add `--luna-button-default-color` and use it for the default button's text. Do not change `--luna-color-text`. That token is white for the navy controls (action button, icon button, fields, context menu).

## Tabs

Inactive tabs match the default button: white face, black text, hover `$gray-lightest`. The selected tab is `$navy-darkest` with white text. That blue is the inactive-tab fill in 1.1.1; move it to the selected tab. Do not give the inactive tab the old selected fill (`#003c74`).

| Token | 1.1.1 fallback | Ship |
|---|---|---|
| `--luna-tab-background` | `#00138c` | `#ffffff` |
| `--luna-tab-color` | none; text uses `--luna-color-text` (`#ffffff`) | `#000000` |
| `--luna-tab-background-hover` | none; hover uses `--luna-color-navy-dark` (`#001ea0`) | `#f2f2f1` (`$gray-lightest`) |
| `--luna-tab-selected-background` | `#003c74` | `#00138c` (`$navy-darkest`) |
| `--luna-tab-selected-color` | none; text uses `--luna-color-text` (`#ffffff`) | `#ffffff` |
| `--luna-tab-panel-border` | none; panel uses `--luna-color-border` (`#1d5281`) | `#dcdcd7` (`$gray-light-warm`, the menubar) |

Selected hover stays on `--luna-tab-selected-background`. It already does in 1.1.1.

Add the tab color, hover, and panel-border tokens. Do not retint `--luna-color-navy-dark` or `--luna-color-border`. Those still belong to the context menu and to command buttons, fields, and menu borders.

## After it ships

Delete these blocks from EduBASIC `src/index.scss`:

- `luna-window` (`--luna-window-background`)
- `luna-tabs [role="tab"]` and `luna-tabs [role="tab"][aria-selected="true"]`
- `luna-tab [role="tabpanel"]`
- `luna-button[variant="default"]`
