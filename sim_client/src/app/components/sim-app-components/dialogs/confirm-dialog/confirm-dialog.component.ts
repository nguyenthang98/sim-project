import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  noButtonClicked() {
    this.dialogRef.close(false);
  }

  yesButtonClicked() {
    this.dialogRef.close(true);
  }
}
