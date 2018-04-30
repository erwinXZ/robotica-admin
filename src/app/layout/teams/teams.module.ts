import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

@NgModule({
    imports: [CommonModule, TeamsRoutingModule, PageHeaderModule, FormsModule],
    declarations: [TeamsComponent, AddTeamComponent, EditTeamComponent]
})
export class TeamsModule {}

