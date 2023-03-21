import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterSuccessPageRoutingModule } from './register-success-routing.module';

import { RegisterSuccessPage } from './register-success.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    RegisterSuccessPageRoutingModule
  ],
  declarations: [RegisterSuccessPage]
})
export class RegisterSuccessPageModule {}
