import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocDialogComponent } from 'src/app/dialogs/doc-dialog/doc-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialogs/error-dialog/error-dialog.component';
import { MatDialogUtils } from 'src/app/dialogs/mat-dialog-utils';
import { MultipleDownloadsDialogComponent } from 'src/app/dialogs/multiple-downloads-dialog/multiple-downloads-dialog.component';
import { OptionsDialogComponent } from 'src/app/dialogs/options-dialog/options-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openErrorDialog(error: Error) {
    console.error(error);
    this.dialog.open(ErrorDialogComponent, {
      width: MatDialogUtils.getWidth(),
      height: MatDialogUtils.getHeigth(),
      data: error
    });
  }

  openOptionsDialog(ydlOpts: Map<string, string | number>): Promise<Map<string, string | number>> {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      width: MatDialogUtils.getWidth(),
      height: MatDialogUtils.getHeigth(),
      data: ydlOpts
    });

    return dialogRef.afterClosed().toPromise();
  }

  openYoutubeDlDocsDialog(ydlDocs: string): void {
    this.dialog.open(DocDialogComponent, {
      width: MatDialogUtils.getWidth(),
      height: MatDialogUtils.getHeigth(),
      data: ydlDocs
    });
  }

  openMultipleDownloadDialog(urls: string[]): Promise<string[]>  {
    const dialogRef = this.dialog.open(MultipleDownloadsDialogComponent, {
      width: MatDialogUtils.getWidth(),
      height: MatDialogUtils.getHeigth(),
      data: urls
    });

    return dialogRef.afterClosed().toPromise();
  }
}
