import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './challenges.component';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { EditChallengeComponent } from './edit-challenge/edit-challenge.component';

const routes: Routes = [
    {path: '', component: ChallengesComponent},
    {path: 'add-challenge', component: AddChallengeComponent},
    {path: 'edit-challenge/:id', component: EditChallengeComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChallengesRoutingModule {
}
