import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../button/button.component';
import { LunaModalRef } from './modal-ref';
import { MESSAGE_BOX_DATA, MessageBoxData } from './message-box-data';

@Component({
    selector: 'luna-message-box',
    standalone: true,
    imports: [ CommonModule, ButtonComponent ],
    templateUrl: './message-box.component.html',
    styleUrls: [ './message-box.component.scss' ]
})
export class MessageBoxComponent
{
    protected readonly data = inject(MESSAGE_BOX_DATA) as MessageBoxData<unknown>;
    private readonly modalRef = inject(LunaModalRef<unknown>);

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

    public onCancel(): void
    {
        const value = this.data.type === 'confirm'
            ? (this.data.options?.cancelValue ?? false)
            : undefined;
        this.modalRef.close(value);
    }

    public onOk(): void
    {
        const value = this.data.type === 'confirm'
            ? (this.data.options?.okValue ?? true)
            : (this.data.options?.okValue ?? undefined);
        this.modalRef.close(value);
    }
}
