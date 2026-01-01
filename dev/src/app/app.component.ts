import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidiModule } from '@angular/cdk/bidi';
import {
    ButtonComponent,
    CheckboxComponent,
    FieldsetComponent,
    IconComponent,
    InputComponent,
    ProgressComponent,
    RadioComponent,
    SelectComponent,
    SliderComponent,
    TabComponent,
    TabsComponent,
    TextareaComponent,
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
        CommonModule,
        FormsModule,
        ButtonComponent,
        CheckboxComponent,
        FieldsetComponent,
        IconComponent,
        InputComponent,
        ProgressComponent,
        RadioComponent,
        SelectComponent,
        SliderComponent,
        TabComponent,
        TabsComponent,
        TextareaComponent,
        WindowComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent
{
    public checkboxValue: boolean = false;
    public inputValue: string = '';
    public progressValue: number = 50;
    public radioValue: string = 'option1';
    public selectValue: string = 'option2';
    public sliderValue: number = 50;
    public textareaValue: string = '';
    public title: string = 'ng-luna Component Gallery';

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
