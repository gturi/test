import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {

  errorTitle = 'Unknown error';
  errorMessage: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.errorMessage = data.message;

    const error = data.error;
    if (error instanceof Blob) {
      this.errorTitle = `Error ${data.status}`;
      this.parseErrorMessageFromBlob(error);
    } else {
      this.errorMessage = `unkown error instance, to know more look at your browser console output`;
      console.error(data);
    }
  }

  parseErrorMessageFromBlob(error: Blob) {
    error.text().then(content => {
      const blobContentType = error.type;
      if (blobContentType === 'application/json') {
        this.errorMessage = JSON.parse(content).message;
      } else {
        this.errorMessage = `no blob parser specified for ${blobContentType}`;
        console.warn(this.errorMessage);
        console.error(content);
      }
    });
  }
}
