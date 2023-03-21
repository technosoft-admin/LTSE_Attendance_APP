import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewuserPageRoutingModule } from './newuser-routing.module';

import { NewuserPage } from './newuser.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NewuserPageRoutingModule
    
  ],
  declarations: [NewuserPage]
})
export class NewuserPageModule {}
