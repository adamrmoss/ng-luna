import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { LunaModalRef } from './modal-ref';
import { MESSAGE_BOX_DATA, MessageBoxData, MessageBoxReturnData } from './message-box-data';

@Component({
    selector: 'luna-message-box',
    standalone: true,
    imports: [ A11yModule, ButtonComponent, CommonModule, FormsModule, InputComponent ],
    templateUrl: './message-box.component.html',
    styleUrls: [ './message-box.component.scss' ]
})
export class MessageBoxComponent
{
    protected readonly data = inject(MESSAGE_BOX_DATA) as MessageBoxData<unknown>;
    private readonly modalRef = inject(LunaModalRef<unknown>);

    public promptValue = '';

    public get cancelLabel(): string
    {
        return this.data.options?.cancelLabel ?? 'Cancel';
    }

    public get messageBoxTitle(): string | undefined
    {
        return this.data.options?.title ?? this.data.title;
    }

    public get okLabel(): string
    {
        return this.data.options?.okLabel ?? 'OK';
    }

    public get promptPlaceholder(): string
    {
        return this.data.options?.promptPlaceholder ?? '';
    }

    public ngOnInit(): void
    {
        if (this.data.type === 'prompt')
        {
            this.promptValue = this.data.options?.promptDefaultValue ?? '';
        }
    }

    public onCancel(): void
    {
        if (this.data.type === 'prompt')
        {
            this.modalRef.close({ button: 'cancel' } as MessageBoxReturnData);
            return;
        }
        const value = this.data.type === 'confirm'
            ? (this.data.options?.cancelValue ?? false)
            : undefined;
        this.modalRef.close(value);
    }

    public onOk(): void
    {
        if (this.data.type === 'prompt')
        {
            this.modalRef.close({
                button: 'ok',
                promptValue: this.promptValue
            } as MessageBoxReturnData);
            return;
        }
        const value = this.data.type === 'confirm'
            ? (this.data.options?.okValue ?? true)
            : (this.data.options?.okValue ?? undefined);
        this.modalRef.close(value);
    }
}
