import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, TableModule, ButtonModule],
  exports: [TableModule, ButtonModule],
})
export class SharedModule {}
