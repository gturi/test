export class MatDialogUtils {

  static getWidth(): string {
    if (window.innerWidth <= 600) {
      return '100%';
    } else {
      return '60%';
    }
  }

  static getHeigth(): string {
    return '80%';
  }
}