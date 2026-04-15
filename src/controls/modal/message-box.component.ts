import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { LunaModalRef } from './modal-ref';
import { MESSAGE_BOX_DATA, MessageBoxData, MessageBoxReturnData } from './message-box-data';

/**
 * Modal body for alert, confirm, and prompt flows (`MESSAGE_BOX_DATA`), keyboard handling, and `LunaModalRef` close wiring.
 */
@Component({
    selector: 'luna-message-box',
    standalone: true,
    imports: [ A11yModule, ButtonComponent, CommonModule, FormsModule, InputComponent ],
    templateUrl: './message-box.component.html',
    styleUrls: [ './message-box.component.scss' ]
})
export class MessageBoxComponent implements OnInit
{
    /** Injected dialog configuration for this overlay instance. */
    protected readonly data = inject(MESSAGE_BOX_DATA) as MessageBoxData<unknown>;

    private readonly modalRef = inject(LunaModalRef<unknown>);

    /** Two-way bound value for the prompt field. */
    public promptValue = '';

    /**
     * @returns Resolved cancel button caption.
     */
    public get cancelLabel(): string
    {
        return this.data.options?.cancelLabel ?? 'Cancel';
    }

    /**
     * @returns Title from options or legacy `data.title`.
     */
    public get messageBoxTitle(): string | undefined
    {
        return this.data.options?.title ?? this.data.title;
    }

    /**
     * @returns Resolved OK button caption.
     */
    public get okLabel(): string
    {
        return this.data.options?.okLabel ?? 'OK';
    }

    /**
     * @returns Placeholder string for the prompt input.
     */
    public get promptPlaceholder(): string
    {
        return this.data.options?.promptPlaceholder ?? '';
    }

    /**
     * Handles Enter (OK) and Escape (cancel or OK on alert) at the document level.
     *
     * @param event - Keydown from the document while the modal is open.
     */
    @HostListener('document:keydown', [ '$event' ])
    public onKeydown(event: KeyboardEvent): void
    {
        // Map standard dialog keys to the same actions as footer buttons.
        switch (event.key)
        {
            case 'Enter':
                event.preventDefault();
                this.onOk();
                break;
            case 'Escape':
                event.preventDefault();

                // Alert has a single acknowledgement path; others dismiss as cancel.
                if (this.data.type === 'alert')
                {
                    this.onOk();
                }
                else
                {
                    this.onCancel();
                }
                break;
        }
    }

    /**
     * Seeds `promptValue` when the dialog is a prompt.
     */
    public ngOnInit(): void
    {
        // Pre-fill the field so prompt dialogs open with a suggested value.
        if (this.data.type === 'prompt')
        {
            this.promptValue = this.data.options?.promptDefaultValue ?? '';
        }
    }

    /**
     * Closes with cancel semantics: structured payload for prompt, boolean for confirm, void for alert.
     */
    public onCancel(): void
    {
        // Prompt cancel must return structured `MessageBoxReturnData` for callers.
        if (this.data.type === 'prompt')
        {
            this.modalRef.close({ button: 'cancel' } as MessageBoxReturnData);

            return;
        }

        // Confirm returns the configured cancel payload; alert cancel path is unused here.
        const value = this.data.type === 'confirm'
            ? (this.data.options?.cancelValue ?? false)
            : undefined;
        this.modalRef.close(value);
    }

    /**
     * Closes with OK semantics: includes prompt text when applicable.
     */
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

        // Confirm defaults to true; alert may still pass a custom `okValue` when provided.
        const value = this.data.type === 'confirm'
            ? (this.data.options?.okValue ?? true)
            : (this.data.options?.okValue ?? undefined);
        this.modalRef.close(value);
    }
}
