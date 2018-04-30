import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

const routes: Routes = [
    {path: '', component: TeamsComponent},
    {path: 'add-team', component: AddTeamComponent},
    {path: 'edit-team/:id', component: EditTeamComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TeamsRoutingModule {
}
