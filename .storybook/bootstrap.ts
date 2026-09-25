import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

/**
 * Placeholder root so the Angular build target Storybook reads has a browser entry.
 */
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './bootstrap.component.html',
})
class StorybookHostComponent
{
}

/**
 * Boots the placeholder host. Storybook replaces this entry when it serves stories.
 */
bootstrapApplication(StorybookHostComponent).catch((error: unknown) =>
{
    console.error(error);
});
