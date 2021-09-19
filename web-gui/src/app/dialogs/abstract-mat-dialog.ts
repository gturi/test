import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogUtils } from 'src/app/dialogs/mat-dialog-utils';

@Component({ template: '' })
export class AbstractMatDialog {

  constructor(protected dialogRef: MatDialogRef<any>) {
  }

  @HostListener('window:resize', ['$event'])
  protected onResize(event: any) {
    this.computeSize(this.dialogRef);
  }

  protected computeSize(dialogRef: MatDialogRef<any>) {
    console.log(window.innerWidth)
    const width = MatDialogUtils.getWidth();
    const height = '80%';
    dialogRef.updateSize(width, height);
  }
}
