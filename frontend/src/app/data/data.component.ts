import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as echarts from 'echarts'

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @ViewChild('echarts', {static: true}) echartsReference: any;

  public files: any[] = [];
  public excelFilesData: any[] = [];
  public uploadFileForm: FormGroup;
  public data: any[] = [];
  public dataForm: FormGroup;
  public skinBioscenseList: any[] = [];
  public skinBioscenseData: any[] = [];
  public perceptionList: any[] = [];
  public perceptionData: any[] = [];
  public series: any[] = [];
  public title: string = '';

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
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

  private initEchartOptions(): void {
    const myChart = echarts.init(this.echartsReference.nativeElement);

    const option = {
      title: {
        text: this.title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            title: 'Load'
          }
        }
      },
      legend: {
        data: [this.title]
      },
      xAxis: {
        data: this.series
      },
      yAxis: {},
      series: [
        {
          name: this.title,
          type: 'bar',
          data: this.data
        }
      ]
    };

    myChart.setOption(option);
  }

  /**
   * Generate pdf file
   */
  public generatePdfFile(): void {
    const tab = this.dataForm?.value?.tab;
    const option = (this.dataForm?.value?.option === '1') ?
                      1 : (this.dataForm?.value?.option === '2') ? 2
                        : (this.dataForm?.value?.option === '3') ? 3 : 0;
    const count = this.dataForm?.value?.count;

    if (this.excelFilesData.length === 2500) {
      if (tab && tab === 'perception') {
        this.title = 'Perception of users';
        this.perceptionData = this.perceptionList.slice(0, Number(count));
        this.series = this.perceptionData.map(data => data.user_id);
        this.data = this.perceptionData.map(data => data.score_perception);
        this.initEchartOptions();
      } else if (tab && tab === 'skin') {
        if (option === 1) {
          this.title = 'Skin biosense antioxydant';
        } else if (option ===2) {
          this.title = 'Skin biosense moisturizing';
        } else if (option === 3) {
          this.title = 'Skin biosense barrier';
        } else {
          console.error('Option not implemented');
        }

        this.skinBioscenseData = this.skinBioscenseList.slice(0, Number(count));
        this.skinBioscenseData.filter(el => el.score_skinbiosense === option);
        this.series = this.skinBioscenseData.map(data => data.user_id);
        this.data = this.skinBioscenseData.map(data => data.mesure);
        this.initEchartOptions();
      } else {
        console.error('Tab option not implemented');
      }
    } else {
      console.error("Select file managed by admin");
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
   * Logout user
   */
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}