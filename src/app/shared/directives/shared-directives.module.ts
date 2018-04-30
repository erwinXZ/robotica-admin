import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './file-drop.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DropZoneDirective],
    exports: [DropZoneDirective]
})
export class SharedDirectivesModule { }
