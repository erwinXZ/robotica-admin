import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengesComponent } from './challenges.component';
import { PageHeaderModule } from './../../shared';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { EditChallengeComponent } from './edit-challenge/edit-challenge.component';

import { FormsModule } from '@angular/forms';

import { DropZoneDirective } from '../../shared';
import { FileSizePipe } from '../../shared';

@NgModule({
    imports: [CommonModule, ChallengesRoutingModule, PageHeaderModule, FormsModule],
    declarations: [ChallengesComponent, AddChallengeComponent, EditChallengeComponent]
})
export class ChallengesModule {}
