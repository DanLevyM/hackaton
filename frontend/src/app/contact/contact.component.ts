import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Send message to user
   */
  public sendMessage(): void {
    this.contactService.contactUser(
      this.contactForm.value?.name,
      this.contactForm.value?.email,
      this.contactForm.value?.company,
      this.contactForm.value?.number,
      this.contactForm.value?.message,
      this.contactForm.value?.role,
    ).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['']);
      }
    });
  }
}