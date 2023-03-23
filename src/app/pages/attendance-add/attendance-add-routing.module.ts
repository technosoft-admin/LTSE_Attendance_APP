import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceAddPage } from './attendance-add.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceAddPageRoutingModule {}
