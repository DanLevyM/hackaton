import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public isVisible: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((data: any) => {
      if (data instanceof RoutesRecognized) {
        this.isVisible = data?.state?.root?.firstChild?.data?.['header'];
      }
    });
  }

}
