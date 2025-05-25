import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dni: string;
  phone: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RegisterPagePage {
  registerForm: FormGroup;

  constructor(private FormBuilder: FormBuilder) {
    this.registerForm = this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{13,}$/)]], 
      phone: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]], 
    });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get dni() { return this.registerForm.get('dni'); }
  get phone() { return this.registerForm.get('phone'); }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      console.log('Usuario registrado:', user);
    }
  }
}
