import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {
  loginData:FormGroup;
  role:string = "";
  afficheRoleModal : boolean = false;
  constructor(private toastr:ToastrService,private spinner:NgxSpinnerService, private fb:FormBuilder, private data:LoginService) {
    this.loginData = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.min(6)]],
    });
  }
  errorMessage: string = '';

  ngOnInit() {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide()
    },5000)

  }
  verifier(){
    if (!this.loginData.valid) {
      this.toastr.error("Veuillez renseigner tout les champs","erreur",{
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })
    }else {
      this.afficheRoleModal = true;
    }
  }

  confirmerRole() {
    this.afficheRoleModal = false;
    this.onLogin();
  }

  annulerRole() {
    this.afficheRoleModal = false;
    this.role = "";
  }

  onLogin() {
    if (this.loginData.valid && this.role != "") {
      const logData = {
        email:this.loginData.value.email,
        motDePasse:this.loginData.value.password,
        role:this.role
      }
      this.data.login(logData);
    }
  }
}

