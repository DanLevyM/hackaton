import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public files: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  /**
   * Trigger on file drop handler
   * @param event Dom element file
   */
  public onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  /**
   * Upload file
   * @param event Dom element target
   */
  public uploadFile(event: any): void {
    event.preventDefault();
    this.dataService.getExcelFileData(event.target).subscribe((res: any) => {
      if (!res?.success) {
        console.error(res.message);
      }
    });
  }

  /**
   * Handle file from browsing
   * @param target Dom element target
   */
  public fileBrowseHandler(target: any): void {
    this.prepareFilesList(target.files);
  }

  /**
   * Delete file from files list
   * @param index File index
   */
  public deleteFile(index: number): void {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   * @param index File index
   */
  public uploadFilesSimulator(index: number): void {
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
   * Convert files list to normal array list
   * @param files Files list
   */
  public prepareFilesList(files: Array<any>): void {
    // for (const item of files) {
    //   item.progress = 0;
    //   this.files.push(item);
    // }
    this.files = [];
    files[0].progress = 0;
    this.files.push(files[0]); // only one file can be added
    this.uploadFilesSimulator(0);
  }

  /**
   * Format bytes
   * @param bytes File size in bytes
   * @param decimals Decimals point
   * @returns Bytes formatted
   */
  public formatBytes(bytes: any, decimals: any = 0): string {
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