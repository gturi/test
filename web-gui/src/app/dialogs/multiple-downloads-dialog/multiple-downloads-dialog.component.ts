import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractMatDialog } from 'src/app/dialogs/abstract-mat-dialog';

@Component({
  selector: 'app-multiple-downloads-dialog',
  templateUrl: './multiple-downloads-dialog.component.html',
  styleUrls: ['./multiple-downloads-dialog.component.scss']
})
export class MultipleDownloadsDialogComponent extends AbstractMatDialog {

  urls: string[] = [''];

  constructor(
    public dialogRef: MatDialogRef<MultipleDownloadsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) urls: string[]) {
    super(dialogRef);
    this.urls = urls;
  }

  close() {
    this.dialogRef.close(this.urls);
  }

  isRemoveEnabled(index: number): boolean {
    return this.urls.length !== 1;
  }

  remove(index: number) {
    this.urls.splice(index, 1);
  }

  isAddEnabled(index: number): boolean {
    const url = this.urls[index];
    return url !== undefined && url !== null && url !== '';
  }

  add(index: number) {
    this.urls.splice(index, 0, '');
  }

}
