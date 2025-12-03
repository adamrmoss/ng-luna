import { Input } from '@angular/core';

// Base class for all Luna components providing common form element attributes
// Abstract base classes with @Input are valid in Angular - this is intentional
export abstract class LunaControl
{
    @Input()
    public id?: string;

    @Input()
    public name?: string;

    @Input()
    public disabled = false;

    @Input()
    public tabindex?: number;

    @Input()
    public autofocus = false;
}

