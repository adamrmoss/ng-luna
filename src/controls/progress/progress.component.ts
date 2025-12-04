import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';

import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-progress',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './progress.component.html',
    styleUrls: [ './progress.component.scss' ]
})
export class ProgressComponent
    extends LunaControl
{
    @Input()
    public set max(value: NumberInput)
    {
        this._max = coerceNumberProperty(value, 100);
    }

    public get max(): number
    {
        return this._max;
    }

    @Input()
    public set value(value: NumberInput | undefined)
    {
        this._value = value !== undefined ? coerceNumberProperty(value) : undefined;
    }

    public get value(): number | undefined
    {
        return this._value;
    }

    private _max = 100;
    private _value?: number;
}
