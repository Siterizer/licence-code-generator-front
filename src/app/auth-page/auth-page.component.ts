import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  showRegister = true;

  switchAuthItem(){
    this.showRegister = !this.showRegister;
  }

}
