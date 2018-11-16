import { NgModule } from "@angular/core";
import { 
  MatCheckboxModule, MatExpansionModule, MatSliderModule, MatRadioModule, MatTabsModule,
	MatButtonModule, MatTableModule, MatIconModule, MatInputModule, MatListModule, MatSlideToggleModule,
	MatGridListModule, MatSnackBarModule, MatTooltipModule
} from "@angular/material";

const materialsModules = [
  MatExpansionModule, MatSliderModule, MatRadioModule, MatCheckboxModule, MatTabsModule,
	MatButtonModule, MatTableModule, MatIconModule, MatInputModule, MatListModule, MatSlideToggleModule,
	MatGridListModule, MatSnackBarModule, MatTooltipModule
]

@NgModule({
	exports: materialsModules
})
export class AppMaterialModule {};


