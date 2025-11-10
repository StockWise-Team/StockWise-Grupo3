import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario = new String
  contra = new String
  authA = new Array

  constructor(private router:Router){}
  navegarHome(){
    this.router.navigate(['home'])

  }


 async testean2(){
  try {
    const body ={
      email: this.usuario,
      contra: this.contra
    }

    const res = await fetch(`http://127.0.0.1:3000/api/auth?email=${this.usuario}&contra=${this.contra}`)
 
    const data = await res.json()

    if (this.usuario == data.MAIL){
      if(this.contra == data.CONTRASEÑA){
        this.navegarHome()
      }
    } else {
      console.log('error logueando')
    }
    console.log(data)
  }
  catch(error) {
    console.log('no agarro', error)
  }
  }

  test(){
    console.log(this.usuario, this.contra)
  }

}
