import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { LunaDismissStack } from '../overlay/dismiss-stack.service';
import { MESSAGE_BOX_DATA, MessageBoxData, MessageBoxReturnData } from './message-box-data';
import { LunaModalRef } from './modal-ref';

/**
 * Modal body for alert, confirm, and prompt flows (`MESSAGE_BOX_DATA`), keyboard handling, and `LunaModalRef` close wiring.
 */
@Component({
    selector: 'luna-message-box',
    standalone: true,
    imports: [ A11yModule, ButtonComponent, CommonModule, FormsModule, InputComponent ],
    templateUrl: './message-box.component.html',
    styleUrls: [ './message-box.component.scss' ],
})
export class MessageBoxComponent implements OnInit, OnDestroy
{
    /** Injected dialog configuration for this overlay instance. */
    protected readonly data = inject(MESSAGE_BOX_DATA) as MessageBoxData<unknown>;

    private readonly dismissStack = inject(LunaDismissStack);

    private readonly modalRef = inject(LunaModalRef<unknown>);

    private releaseEscape: (() => void) | null = null;

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
     * Handles Enter at the document level. Escape is owned by the dismiss stack.
     *
     * @param event - Keydown from the document while the modal is open.
     */
    @HostListener('document:keydown', [ '$event' ])
    public onKeydown(event: KeyboardEvent): void
    {
        // Enter confirms. Escape is the top surface on the dismiss stack.
        if (event.key !== 'Enter')
        {
            return;
        }

        event.preventDefault();
        this.onOk();
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

        // Above the modal's generic close, so an alert still confirms and the others cancel.
        this.releaseEscape = this.dismissStack.push(() =>
        {
            if (this.data.type === 'alert')
            {
                this.onOk();

                return;
            }

            this.onCancel();
        });
    }

    /**
     * Drops this dialog's Escape handler.
     */
    public ngOnDestroy(): void
    {
        this.releaseEscape?.();
        this.releaseEscape = null;
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
                promptValue: this.promptValue,
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
