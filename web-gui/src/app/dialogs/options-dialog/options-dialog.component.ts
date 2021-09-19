import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DocService } from 'src/app/services/doc/doc.service';
import { AbstractMatDialog } from 'src/app/dialogs/abstract-mat-dialog';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent extends AbstractMatDialog {

  youtubeDlOptions: string;
  youtubeDlDoc: string = '';

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ydlOpts: Map<string, string | number>,
    private dialogService: DialogService,
    private docService: DocService) {
    super(dialogRef);
    const ydlOptsObj = Object.fromEntries(ydlOpts);
    this.youtubeDlOptions = JSON.stringify(ydlOptsObj, null, 2);
  }

  showYoutubeDlDocs() {
    if (this.youtubeDlDoc === '') {
      this.docService.getYoutubeDlDoc()
        .then(result => {
          this.youtubeDlDoc = result.content;
          this.dialogService.openYoutubeDlDocsDialog(this.youtubeDlDoc);
        });
    } else {
      this.dialogService.openYoutubeDlDocsDialog(this.youtubeDlDoc);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

  apply() {
    try {
      const newYdlOpts = new Map(Object.entries(JSON.parse(this.youtubeDlOptions)))
      this.dialogRef.close(newYdlOpts);
    } catch (error) {
      this.dialogService.openErrorDialog(error as Error);
    }
  }
}
