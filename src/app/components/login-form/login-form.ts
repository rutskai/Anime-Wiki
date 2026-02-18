import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
   loginForm: FormGroup;
  loginError: boolean;

  /**
   * Constructor del componente
   * Inicializa el formulario de login y la variable loginError 
   * Contiene validaciones requeridas y de email con Validators
   * 
   * @param {User} userService - Servicio para gestionar usuarios y validar datos
   * @param {Router} router - Servicio para navegar entre rutas
   */

  constructor(private userService: UserService, private router: Router, private cdr:ChangeDetectorRef) {
    this.loginError=false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

  }

    /**
   * Maneja el proceso de inicio de sesión
   * Valida los datos del formylario y redirige al home si el login es exitoso
   * 
   * 1- Valida que el formulario sea válido (campos requeridos y email correcto)
   * 2- Comprueba si hay usuarios registrados en el sistema
   * 3- Valida los datos (email y password) en el servidor
   * 4- Si es correcto: redirige a /home, limpia el formulario y desactiva el error
   * 5- Si es incorrecto: variable loginError a true y muestra mensaje de error
   * 
   * @returns {void}
   * 
   */
  handleLogin():void {

      if (this.loginForm.invalid) { 
      return;
    }

    const { email, password } = this.loginForm.value;
    
      if (this.userService.accounts.length === 0) {
      this.loginError = true;
      console.log('No hay usuarios registrados');
      return;
    }

    if (this.userService.validateLogin(email, password)) {
       this.loginError = false;
       this.router.navigate(['/']);
       this.loginForm.reset();
      console.log('Login correcto');
      this.cdr.detectChanges();
    } else {
       this.loginError = true;
      console.log('Usuario o contraseña incorrecta');
    }
  }

}
