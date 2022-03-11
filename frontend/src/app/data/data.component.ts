import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../shared/services/forgot-password.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public files: any[] = [];

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {}

  /**
   * Trigger on file drop handler
   * @param event
   */
  public onFileDropped($event: any) {
    console.log('1');
    this.prepareFilesList($event);
  }

  /**
   * Handle file from browsing
   */
  public fileBrowseHandler(target: any) {
    console.log('2', target);
    this.prepareFilesList(target.files);
    console.log('FILE TO SEND', target.files);
    this.forgotPasswordService.test(target).subscribe(res => {
      console.log('Res', res)
    });
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  public deleteFile(index: number) {
    console.log('3');
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   * @param index (File index)
   */
  public uploadFilesSimulator(index: number) {
    console.log('4');
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  public prepareFilesList(files: Array<any>) {
    console.log('5');
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    console.log('Files', files);
    // this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  public formatBytes(bytes: any, decimals: any = 0) {
    console.log('6');
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}