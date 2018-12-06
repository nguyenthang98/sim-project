import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { debounce } from "lodash";

@Component({
  selector: 'sim-export-dialog',
  templateUrl: './sim-export-dialog.component.html',
  styleUrls: ['./sim-export-dialog.component.css']
})
export class SimExportDialogComponent {
  public exportConfig = {
    imageName: "Untitled Image",
    exportType: "png",
    exportQuality: 1,
    x: 0,
    y: 0,
    width: null,
    height: null
  }
  public imageURL = "/";
  constructor(@Inject(MAT_DIALOG_DATA) public appConfig: any, public dialogRef: MatDialogRef<SimExportDialogComponent>) {
    this.reloadImageURL();

    this.exportConfig.width = appConfig.mainConfig.width;
    this.exportConfig.height = appConfig.mainConfig.height;
  }

  private doReloadImageURL() {
    this.imageURL = this.appConfig.toImageURL(this.exportConfig);
  }
  reloadImageURL = debounce(this.doReloadImageURL, 100);

  cancelButtonClicked() {
    this.dialogRef.close();
  }

  saveButtonClicked() {
    this.appConfig.saveStageAsImage(this.exportConfig);
    this.dialogRef.close();
  }
}
