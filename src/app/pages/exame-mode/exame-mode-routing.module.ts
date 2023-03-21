import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExameModePage } from './exame-mode.page';

const routes: Routes = [
  {
    path: '',
    component: ExameModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExameModePageRoutingModule {}
