import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { LunaControl } from '../luna-control';

/**
 * Progress bar that optionally announces coarse percentage milestones for assistive tech.
 */
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
    /** Coerces and stores the maximum value used for percentage math (default 100). */
    @Input()
    public set max(value: NumberInput)
    {
        this._max = coerceNumberProperty(value, 100);
    }

    /** Returns the coerced maximum bound. */
    public get max(): number
    {
        return this._max;
    }

    /** Coerces and stores the current value; leaves internal state undefined when unset. */
    @Input()
    public set value(value: NumberInput | undefined)
    {
        this._value = value !== undefined ? coerceNumberProperty(value) : undefined;
    }

    /** Returns the coerced current value when defined. */
    public get value(): number | undefined
    {
        return this._value;
    }

    private _max = 100;

    private _value?: number;

    private _previousValue?: number;

    /**
     * @param liveAnnouncer - Speaks milestone progress updates when inputs change.
     */
    public constructor(
        private liveAnnouncer: LiveAnnouncer
    )
    {
        super();
    }

    /**
     * Announces milestone percentages when `value` changes by meaningful amounts.
     *
     * @param changes - Angular input change record for this tick.
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        // Ignore unrelated updates; require a defined numeric value to compute ratios.
        if (changes['value'] && this._value !== undefined)
        {
            const percentage = Math.round((this._value / this._max) * 100);
            const milestones = [ 0, 25, 50, 75, 100 ];

            const previousPercentage = this._previousValue !== undefined
                ? Math.round((this._previousValue / this._max) * 100)
                : undefined;

            // Only consider milestone crossings to limit noisy announcements.
            if (previousPercentage === undefined || milestones.includes(percentage))
            {
                // Skip tiny oscillations around the same milestone bucket.
                if (previousPercentage === undefined || Math.abs(percentage - (previousPercentage || 0)) >= 10)
                {
                    this.liveAnnouncer.announce(`Progress ${percentage} percent`, 'polite');
                }
            }

            // Remember the last announced logical value for delta comparisons.
            this._previousValue = this._value;
        }
    }
}
