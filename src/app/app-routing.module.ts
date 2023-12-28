import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MirrorWordComponent } from './mirror-word/mirror-word.component';
import { JumbledWordComponent } from './jumbled-word/jumbled-word.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'mirror', component:MirrorWordComponent},
  {path: 'jumbled', component:JumbledWordComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
