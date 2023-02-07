import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  logoXl = environment.imagesPath + '/logo-xl.png';
  logo = environment.imagesPath + '/Logo.png';
  formLogin!: FormGroup;
  constructor(private _auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', {validators:[Validators.required, Validators.email]}),
      password: new FormControl('', {validators:[Validators.required]})
    })
  }

  login(){
    const body = this.formLogin.getRawValue();
    this._auth.login(body).subscribe({
      next: rpta=>{
        localStorage.setItem('token', rpta['token']);
        localStorage.setItem('username', rpta['data']['name']);
        this.router.navigate(['/','dashboard'])
      }
    })
  }
}
