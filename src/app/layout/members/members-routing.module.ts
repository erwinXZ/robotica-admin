import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

const routes: Routes = [
    {path: '', component: MembersComponent},
    {path: 'add-member', component: AddMemberComponent},
    {path: 'edit-member/:id', component: EditMemberComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MembersRoutingModule {
}
