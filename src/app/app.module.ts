import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormUtilsModule } from 'src/app/form-utils/form-utils.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormUtilsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
