import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public files: any[] = [];
  public excelFilesData: any[] = [];
  public uploadFileForm: FormGroup;

  public dataForm: FormGroup;

  public skinBioscenseList: any[] = [];
  public skinBioscenseData: any[] = [];

  public perceptionList: any[] = [];
  public perceptionData: any[] = [];

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.uploadFileForm = this.fb.group({
      file: ['', Validators.required]
    });

    this.dataForm = this.fb.group({
      tab: ['', [Validators.required]],
      option: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  /**
   * Trigger on file drop handler
   * @param event Dom element file
   */
  public onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  /**
   * Generate pdf file
   */
  public generatePdfFile(): void {
    console.log('Data form', this.dataForm);
    const tab = this.dataForm?.value?.tab;
    const option = this.dataForm?.value?.option;
    const count = this.dataForm?.value?.count;

    if (tab && tab === 'perception') {
      this.perceptionList = this.perceptionList
    } else if (tab && tab === 'skin') {

    } else {
      console.error('Tab option not implemented');
    }
  }

  /**
   * Upload file
   * @param event Dom element target
   */
  public uploadFile(event: any): void {
    event.preventDefault();
    const excelFileSubscription = this.dataService.getExcelFileData(event.target);

    if (excelFileSubscription) {
      this.dataService.getExcelFileData(event.target).subscribe((res: any) => {
        if (!res?.success) {
          console.error(res.message);
        }

        console.log('Data', res.data)

        if (res?.data.length === 2500) {
          this.uploadFileForm.value.file = true;
          this.excelFilesData = res.data;
          this.skinBioscenseList = this.excelFilesData.slice(0, 2400);
          this.perceptionList = this.excelFilesData.slice(2400, 2500);
        } else {
          console.error('Only one file is supported for now');
        }
      });
    }
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