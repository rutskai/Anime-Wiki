import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   accounts: { email: string; nickname: string; password: string }[] = [];
  currentUser: { email: string, nickname: string } | null;

  /**
 * Constructor del componente
 * Inicializa la variable currentUser como null indicando que
 * no hay ningún usuario logueado al empezar
 * 
 * @param {Router} router - Servicio para navegar entre las páginas
 */

  constructor(private router: Router) {
    this.currentUser = null;

  }

  /**
  * Crea una nueva cuenta de usuario y la añade al array de cuentas
  * 
  * @param {string} email - Correo electrónico del nuevo usuario
  * @param {string} nickname - Nombre de usuario del nuevo usuario
  * @param {string} password - Contraseña del nuevo usuario
  * @returns {void}
  * 
  */
  addAccount(email: string, nickname: string, password: string) {
    this.accounts.push({ email, nickname, password });
  }

  /**
   * Retorna la lista completa de todas las cuentas registradas
   * 
   * @returns {Array<Object>} Array con todas las cuentas de usuarios
   *
   */

  getAccounts(): Array<{email: string; nickname: string; password: string}> {
    return this.accounts;
  }

  /**
 * Valida los datos de un usuario intentando iniciar sesión
 * Busca un usuario con el email y contraseña especificados
 * Si encuentra coincidencia, establece el usuario actual como validado
 * 
 * @param {string} email - Correo electrónico del usuario a autenticar
 * @param {string} password - Contraseña del usuario a autenticar
 * @returns {boolean} true si el login es exitoso, false si falla
 * 
 */

  validateLogin(email: string, password: string): boolean {
    const user = this.accounts.find(acc => acc.email === email && acc.password === password);
    if (user) {
      this.currentUser = { email: user.email, nickname: user.nickname };
      return true;
    }
    return false;

  }

  /**
   * Obtiene la información del usuario actual
   * Retorna null si no hay usuario logueado
   * 
   * @returns {Object|null} Objeto con email y nickname del usuario actual,
   *                        o null si no hay sesión activa
   */

  getCurrentUser(): {email: string, nickname: string} | null {
    return this.currentUser;
  }


  
}
