import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Page404Component } from './pages/page404/page404.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [NavbarComponent, Page404Component, SpinnerComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [NavbarComponent, Page404Component, SpinnerComponent],
})
export class SharedModule {}
