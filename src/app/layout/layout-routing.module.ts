import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'news', loadChildren: './news/news.module#NewsModule' },
            { path: 'challenges', loadChildren: './challenges/challenges.module#ChallengesModule' },
            { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule' },
            { path: 'teams', loadChildren: './teams/teams.module#TeamsModule' },
            { path: 'members', loadChildren: './members/members.module#MembersModule' },
            { path: 'solutions', loadChildren: './solutions/solutions.module#SolutionsModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
