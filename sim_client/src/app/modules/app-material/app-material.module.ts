import { NgModule } from "@angular/core";
import {
    MatCheckboxModule,
    MatExpansionModule,
    MatSliderModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDialogModule,
} from "@angular/material";

import { DragDropModule } from "@angular/cdk/drag-drop";

const importedModules = [
    MatExpansionModule,
    MatSliderModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDialogModule,

    DragDropModule
];

@NgModule({
    exports: importedModules
})
export class AppMaterialModule { }
