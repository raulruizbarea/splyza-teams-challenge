import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, DividerModule, TranslateModule.forChild()],
  exports: [HeaderComponent],
  providers: [],
})
export class SharedModule {}
