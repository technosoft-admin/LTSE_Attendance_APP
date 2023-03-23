import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceAddPageRoutingModule } from './attendance-add-routing.module';

import { AttendanceAddPage } from './attendance-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceAddPageRoutingModule
  ],
  declarations: [AttendanceAddPage]
})
export class AttendanceAddPageModule {}
