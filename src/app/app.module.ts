import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { CdkMenuModule } from '@angular/cdk/menu';

@NgModule({
  declarations: [AppComponent, LayoutComponent, NavigationComponent],
  imports: [BrowserModule, AppRoutingModule, CdkMenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
