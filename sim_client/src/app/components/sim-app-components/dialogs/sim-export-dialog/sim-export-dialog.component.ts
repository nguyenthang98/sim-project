import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { debounce } from "lodash";
import { NgxSpinnerService } from 'ngx-spinner';
import { SimApiService } from 'src/app/services/sim-api.service';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public appConfig: any,
    public dialogRef: MatDialogRef<SimExportDialogComponent>,
    private spinner: NgxSpinnerService,
    private simApiService: SimApiService,
    private snackBar: MatSnackBar
  ) {
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

  saveToServer() {
    this.appConfig.toBlob(this.exportConfig)
      .then((blob: any) => {
        const payload = new FormData();      
        payload.append("file", blob, this.exportConfig.imageName);
        this.spinner.show();
        this.simApiService.createImage(payload)
          .subscribe(res => {
            console.log(res);
            this.spinner.hide();
            if(res.code !== 200) {
              const reson = res.reason;              
              this.snackBar.open(reson, "Close", {duration: 5000});
            } else {
              this.dialogRef.close();
            }
          })
      })
  }
}
