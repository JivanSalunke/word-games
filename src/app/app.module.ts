import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordServiceService } from './word-service.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { MirrorWordComponent } from './mirror-word/mirror-word.component';
import { JumbledWordComponent } from './jumbled-word/jumbled-word.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    MirrorWordComponent,
    JumbledWordComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    A11yModule
  ],
  providers: [WordServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
