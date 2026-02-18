import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerForm: FormGroup;

  /**
   * Constructor del componente RegisterForm
   * Inicializa el formulario con sus campos y validadores
   * Crea el FormGroup con los campos correspondientes y aplica validaciones 
   * obligatorias, de mínimo de longitud, de email y dos propias que comparan que las
   * dos contraseñas coincidan y el email no esté repetido.
   * 
   * @param {User} userService - Servicio para gestionar usuarios
   * @param {Router} router - Servicio para navegar entre páginas
   */
  constructor(private userService: UserService, private router: Router) {
   

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, (control) => this.repeatedEmail(control)]),
      nickname: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', Validators.required)
    }, {validators: this.validateOptions});
  }

   /**
   * Validador personalizado a nivel de formulario
   * Comprueba que el campo password y repeatPassword sean idénticos
   * 
   * @param {any} control - Los campos de FormGroup a validar (password,repeatpassword)
   * @returns {Object|null} Retorna {noMatch: true} si las contraseñas no coinciden,
   *                        null si la validación es correcta
   */

  validateOptions(control: any): ValidationErrors | null{
 const { password, repeatPassword } = control.value;
    
    if (password !== repeatPassword) {
      return {noMatch:true}
    }
    return null;  

  }

  /**
 * Validador que verifica si el email ya está registrado en el servidor
 * 
 * @param control - El control del formulario que contiene el email a validar
 * @returns Un objeto con el error { emailRepeated: true } si el email ya existe,
 *          o null si el email es válido (no está repetido)
 */

  repeatedEmail(control: any): ValidationErrors | null {
  const email = control.value;
  const match = this.userService.getAccounts().some(a=> a.email === email);

  if(match) {
    return { emailRepeated: true };
  }

  return null;
}

 

   /**
   * Maneja la creación de una nueva cuenta de usuario y reinicia el formulario
   * Valida el formulario y, si es correcto, crea la cuenta en el servidor y
   * redirige al /login
   * 
   * @returns {void}
   */
  handleAccount(): void {
    const { email,nickname, password} = this.registerForm.value;

    if (this.registerForm.invalid) {
      return;
    }

   this.userService.addAccount(email, nickname, password);
    console.log('Cuenta creada:', { email, nickname, password });
    this.registerForm.reset();
    this.router.navigate(['/loginForm']);
  }

}
