import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExameModePageRoutingModule } from './exame-mode-routing.module';

import { ExameModePage } from './exame-mode.page';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExameModePageRoutingModule,
    MatRippleModule
  ],
  declarations: [ExameModePage]
})
export class ExameModePageModule {}
