import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonModalSearchComponent } from './mon-modal-search/mon-modal-search.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    MonModalSearchComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzModalModule
  ],
  exports: [
    MonModalSearchComponent
  ]
})
export class NgMonitenceComponentsModule { }
