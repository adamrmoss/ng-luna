import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import type { LunaMenuEntry, LunaMenuItem } from 'ng-luna';
import {
    ButtonComponent,
    CheckboxComponent,
    FieldsetComponent,
    IconComponent,
    InputComponent,
    LunaMenuComponent,
    LunaModalService,
    LunaMenuTriggerDirective,
    MenuBarComponent,
    OverlayComponent,
    ProgressComponent,
    RadioComponent,
    SelectComponent,
    SliderComponent,
    TabComponent,
    TabsComponent,
    TextareaComponent,
    TooltipDirective,
    WindowComponent,
    Home,
    Save,
    Folder,
    File,
    Settings,
    User,
    Download,
    Upload,
    X,
    Minimize2,
    Maximize2,
    Search,
    Copy,
    Trash2,
    Edit,
    Play,
    Pause,
    SkipForward,
    Volume2
} from 'ng-luna';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        BidiModule,
        ButtonComponent,
        CheckboxComponent,
        CommonModule,
        FieldsetComponent,
        FormsModule,
        IconComponent,
        InputComponent,
        LunaMenuComponent,
        LunaMenuTriggerDirective,
        MenuBarComponent,
        OverlayComponent,
        OverlayModule,
        ProgressComponent,
        RadioComponent,
        SelectComponent,
        SliderComponent,
        TabComponent,
        TabsComponent,
        TextareaComponent,
        TooltipDirective,
        WindowComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent
{
    public checkboxValue: boolean = false;
    public inputValue: string = '';
    public modalResult: string = '';
    public progressValue: number = 50;
    public radioValue: string = 'option1';
    public selectValue: string = 'option2';
    public showStatusBar = true;
    public showToolbar = true;
    public sliderValue: number = 50;
    public textareaValue: string = '';
    public title: string = 'ng-luna Component Gallery';

    constructor(private readonly modal: LunaModalService) {}

    public get editMenuItems(): LunaMenuEntry[]
    {
        return [
            { disabled: true, label: 'Undo' },
            { disabled: true, label: 'Redo' },
            { separator: true },
            { disabled: true, label: 'Cut' },
            { disabled: true, label: 'Copy' },
            { label: 'Paste' },
            { separator: true },
            { label: 'Find...' },
            { label: 'Replace...' }
        ];
    }

    public get fileMenuItems(): LunaMenuEntry[]
    {
        return [
            { label: 'New' },
            { label: 'Open...' },
            { label: 'Save' },
            { label: 'Save As...' },
            { separator: true },
            { label: 'Page Setup...' },
            { label: 'Print...' },
            { separator: true },
            { label: 'Exit' }
        ];
    }

    public get optionsMenuItems(): LunaMenuEntry[]
    {
        return [
            { label: 'Preferences...' },
            { separator: true },
            { label: 'About...' }
        ];
    }

    public get viewMenuItems(): LunaMenuEntry[]
    {
        return [
            { label: 'Show Toolbar', checked: this.showToolbar },
            { label: 'Show Status Bar', checked: this.showStatusBar },
            { separator: true },
            { label: 'Refresh' },
            { label: 'Full Screen' }
        ];
    }

    public onEditMenuSelect(item: LunaMenuItem | null): void
    {
        if (item === null)
        {
            return;
        }
        switch (item.label)
        {
            case 'Find...':
                this.modal.alert('Find is not implemented in this demo.', 'Find').subscribe();
                break;
            case 'Paste':
                this.modal.alert('Clipboard is empty (demo).', 'Paste').subscribe();
                break;
            case 'Replace...':
                this.modal.alert('Replace is not implemented in this demo.', 'Replace').subscribe();
                break;
        }
    }

    public onFileMenuSelect(item: LunaMenuItem | null): void
    {
        if (item === null)
        {
            return;
        }
        switch (item.label)
        {
            case 'Exit':
                this.modal.alert('This is a demo shell; nothing exits.', 'Exit').subscribe();
                break;
            case 'New':
                this.modal.alert('Created a new untitled document (demo).', 'New').subscribe();
                break;
            case 'Open...':
                this.modal.alert('Open dialog would appear here (demo).', 'Open').subscribe();
                break;
            case 'Page Setup...':
                this.modal.alert('Page setup is not implemented in this demo.', 'Page Setup').subscribe();
                break;
            case 'Print...':
                this.modal.alert('Print preview is not implemented in this demo.', 'Print').subscribe();
                break;
            case 'Save':
                this.modal.alert('Document saved (demo).', 'Save').subscribe();
                break;
            case 'Save As...':
                this.modal.alert('Save As dialog would appear here (demo).', 'Save As').subscribe();
                break;
        }
    }

    public onOptionsMenuSelect(item: LunaMenuItem | null): void
    {
        if (item === null)
        {
            return;
        }
        switch (item.label)
        {
            case 'About...':
                this.modal.alert(
                    'ng-luna Component Gallery\n\nA Windows-inspired Angular component library.',
                    'About'
                ).subscribe();
                break;
            case 'Preferences...':
                this.modal.alert('Preferences are not implemented in this demo.', 'Preferences').subscribe();
                break;
        }
    }

    public onViewMenuSelect(item: LunaMenuItem | null): void
    {
        if (item === null)
        {
            return;
        }
        switch (item.label)
        {
            case 'Full Screen':
                this.modal.alert('Full screen is not implemented in this demo.', 'View').subscribe();
                break;
            case 'Refresh':
                this.modal.alert('View refreshed (demo).', 'View').subscribe();
                break;
            case 'Show Toolbar':
                this.showToolbar = !this.showToolbar;
                break;
            case 'Show Status Bar':
                this.showStatusBar = !this.showStatusBar;
                break;
        }
    }

    public onAlert(): void
    {
        this.modalResult = '';
        this.modal.alert('Settings saved successfully.', 'Information').subscribe(() =>
        {
            this.modalResult = 'Alert closed (OK).';
        });
    }

    public onConfirm(): void
    {
        this.modalResult = '';
        this.modal.confirm('Are you sure you want to discard your changes?', 'Confirm').subscribe((ok) =>
        {
            this.modalResult = ok ? 'Result: Yes (OK)' : 'Result: No (Cancel or backdrop)';
        });
    }

    public onConfirmWith(): void
    {
        this.modalResult = '';
        this.modal.confirmWith('Overwrite the existing file?', {
            cancelLabel: 'No',
            cancelValue: 'no',
            okLabel: 'Yes',
            okValue: 'yes',
            title: 'Confirm Save'
        }).subscribe((result) =>
        {
            this.modalResult = result !== undefined ? `Result: ${result}` : 'Result: (dismissed)';
        });
    }

    public onPrompt(): void
    {
        this.modalResult = '';
        this.modal.prompt('Enter your name:', 'Name').subscribe((result) =>
        {
            if (result.button === 'ok' && result.promptValue !== undefined)
            {
                this.modalResult = `Result: ${result.button}, promptValue: "${result.promptValue}"`;
            }
            else
            {
                this.modalResult = `Result: ${result.button}`;
            }
        });
    }

    public onPromptWith(): void
    {
        this.modalResult = '';
        this.modal.promptWith('Save as filename:', {
            cancelLabel: 'Cancel',
            okLabel: 'Save',
            promptDefaultValue: 'document.txt',
            promptPlaceholder: 'Enter filename',
            title: 'Save As'
        }).subscribe((result) =>
        {
            if (result.button === 'ok' && result.promptValue !== undefined)
            {
                this.modalResult = `Result: ${result.button}, promptValue: "${result.promptValue}"`;
            }
            else
            {
                this.modalResult = `Result: ${result.button}`;
            }
        });
    }

    public readonly homeIcon = Home;
    public readonly saveIcon = Save;
    public readonly folderIcon = Folder;
    public readonly fileIcon = File;
    public readonly settingsIcon = Settings;
    public readonly userIcon = User;
    public readonly downloadIcon = Download;
    public readonly uploadIcon = Upload;
    public readonly xIcon = X;
    public readonly minimize2Icon = Minimize2;
    public readonly maximize2Icon = Maximize2;
    public readonly searchIcon = Search;
    public readonly copyIcon = Copy;
    public readonly trash2Icon = Trash2;
    public readonly editIcon = Edit;
    public readonly playIcon = Play;
    public readonly pauseIcon = Pause;
    public readonly skipForwardIcon = SkipForward;
    public readonly volume2Icon = Volume2;
}
