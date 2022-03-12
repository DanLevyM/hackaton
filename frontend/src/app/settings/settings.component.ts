import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmedValidator } from '../shared/validators/confirmPassword';

import { SettingsService } from '../shared/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;
  public userData: any;
  public userId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.settingsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  ngOnInit(): void {
    this.settingsService.getCurrentUser().subscribe((res: any) => {
      if (res?.success) {
        this.userId = res.data._id;
        this.userData = res.data;
        this.settingsForm.get('name')?.setValue(this.userData.name);
        this.settingsForm.get('email')?.setValue(this.userData.email);
        if (!this.userData?.company) {
          this.settingsForm.get('company')?.setValue('Wired Beauty');
        } else {
          this.settingsForm.get('company')?.setValue(this.userData.company);
        }
        this.settingsForm.get('name')?.setValue(this.userData.name);
      }
    });
  }

  /**
   * Update user settings
   */
  public updateSettings(): void {
    this.settingsService
      .updateUserSettings(this.settingsForm.value)
      .subscribe((res: any) => {
        if (!res?.success) {
          console.error(res.message);
        }
      });
  }

  /**
   * Logout user
   */
    public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}