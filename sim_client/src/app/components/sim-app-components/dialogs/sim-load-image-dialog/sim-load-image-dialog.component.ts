import { Component, Inject } from '@angular/core';
import { SimApiService } from 'src/app/services/sim-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'sim-load-image-dialog',
  templateUrl: './sim-load-image-dialog.component.html',
  styleUrls: ['./sim-load-image-dialog.component.css']
})
export class SimLoadImageDialogComponent {
  public listImages = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public appConfig: any,
    public matDialogRef: MatDialogRef<SimLoadImageDialogComponent>,
    private simApiService: SimApiService,
    private spinner: NgxSpinnerService
  ) {
    this.getImages();
  }

  getImages() {
    this.spinner.show();
    return this.simApiService.listImages().subscribe(res => {
      if(res.content.length) {
        this.listImages = res.content || [];
      }
      this.spinner.hide();
    });
  }

  loadButtonClicked() {
    this.matDialogRef.close(this.listImages.filter(img => img.selected));
  }

  hasImageSelected() {
    return this.listImages.filter(img => img.selected).length;
  }
}
