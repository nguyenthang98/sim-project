import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatCheckboxModule, MatExpansionModule, MatSliderModule, MatRadioModule,
  MatButtonModule, MatTableModule, MatIconModule, MatInputModule, MatListModule,
} from "@angular/material";

const materialsComponents = [
  BrowserAnimationsModule, MatExpansionModule, MatSliderModule, MatRadioModule, MatCheckboxModule,
  MatButtonModule, MatTableModule, MatIconModule, MatInputModule, MatListModule
]

@NgModule({
  imports: materialsComponents,
  exports: materialsComponents
})
export class AppMaterialModule { }
