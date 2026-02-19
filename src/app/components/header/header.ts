import { Component, OnInit} from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '../../services/user/user-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  /**
   * Constructor del componente
   * Utiliza el servicio User y obtiene los datos del usuario actual,
   * de esta forma en el header podemos utilizar la variable nickname
   * 
   * @param {UserService} user - Servicio para gestionar usuarios
   */
  constructor(private user: UserService){
  }

   /**
   * Obtiene los datos del usuario actualmente logueado
   * Retorna null si no hay ningún usuario con sesión activa
   *
   * @returns {Object|null} Objeto con email y nickname del usuario actual,
   *                        o null si no hay sesión activa
   */

 get currentUser():{ email: string, nickname: string } | null {
    return this.user.getCurrentUser();
  }
}
