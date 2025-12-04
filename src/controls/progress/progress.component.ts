import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { LunaControl } from '../luna-control';

@Component({
    selector: 'luna-progress',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './progress.component.html',
    styleUrls: [ './progress.component.scss' ]
})
export class ProgressComponent
    extends LunaControl implements OnChanges
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
    private _previousValue?: number;

    constructor(
        private liveAnnouncer: LiveAnnouncer
    )
    {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['value'] && this._value !== undefined)
        {
            const percentage = Math.round((this._value / this._max) * 100);
            const milestones = [ 0, 25, 50, 75, 100 ];
            const previousPercentage = this._previousValue !== undefined
                ? Math.round((this._previousValue / this._max) * 100)
                : undefined;

            if (previousPercentage === undefined || milestones.includes(percentage))
            {
                if (previousPercentage === undefined || Math.abs(percentage - (previousPercentage || 0)) >= 10)
                {
                    this.liveAnnouncer.announce(`Progress ${percentage} percent`, 'polite');
                }
            }
            this._previousValue = this._value;
        }
    }
}
