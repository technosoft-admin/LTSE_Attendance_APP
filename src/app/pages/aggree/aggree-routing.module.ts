import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggreePage } from './aggree.page';

const routes: Routes = [
  {
    path: '',
    component: AggreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggreePageRoutingModule {}
