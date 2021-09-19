import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractMatDialog } from 'src/app/dialogs/abstract-mat-dialog';

@Component({
  selector: 'app-doc-dialog',
  templateUrl: './doc-dialog.component.html',
  styleUrls: ['./doc-dialog.component.scss']
})
export class DocDialogComponent extends AbstractMatDialog {

  constructor(
    public dialogRef: MatDialogRef<DocDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public youtubeDlDoc: string) {
    super(dialogRef);
  }

}
