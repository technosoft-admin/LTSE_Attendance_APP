import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AggreePageRoutingModule } from './aggree-routing.module';

import { AggreePage } from './aggree.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AggreePageRoutingModule
  ],
  declarations: [AggreePage]
})
export class AggreePageModule {}
