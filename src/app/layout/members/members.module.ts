import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

@NgModule({
    imports: [CommonModule, MembersRoutingModule, PageHeaderModule, FormsModule],
    declarations: [MembersComponent, AddMemberComponent, EditMemberComponent]
})
export class MembersModule {}

