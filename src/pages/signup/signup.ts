import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder) {

   this.formGroup = this.formBuilder.group({
     nome: ["teste", [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
     email: ["teste@gmail.com", [Validators.required, Validators.email]],
     tipo: ["1", [Validators.required]],
     cpfOuCnpj: ["05132891942", [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
     senha: ["123", [Validators.required]],
     logradouro: ["Rua via", [Validators.required]],
     numero: ["25", [Validators.required]],
     complemento: ["ap 14", []],
     bairro: ["Copacabana", [Validators.required]],
     cep: ["83322020", [Validators.required]],
     telefone1: ["996154114", [Validators.required]],
     telefone2: ["", []],
     telefone3: ["", []],
     estadoId: [null, [Validators.required]],
     cidadeId: [null, [Validators.required]]

   });             
  }

  signupUser(){
    console.log("enviou o form");
  }



}
