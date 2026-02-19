# Anime-Wiki

Aplicación web desarrollada con Angular que permite gestionar un catálogo de animes con sistema de autenticación de usuarios.

---

## Tecnologías usadas

| Tecnología | Descripción |
|---|---|
| [Angular](https://angular.io/) | Framework principal para el desarrollo frontend |
| TypeScript | Lenguaje de programación tipado |
| Reactive Forms | Gestión de formularios con validaciones |
| Angular Router | Navegación entre páginas |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── anime-card/         # Listado de animes en tarjetas
│   │   ├── details/            # Vista detallada de un anime
│   │   ├── form-anime/         # Formulario para crear y editar animes
│   │   ├── header/             # Cabecera con navegación y usuario activo
│   │   ├── login-form/         # Formulario de inicio de sesión
│   │   └── register-form/      # Formulario de registro de usuario
│   ├── models/
│   │   └── anime.model.ts      # Interfaz del modelo Anime
│   └── services/
│       ├── anime-service.ts    # Servicio para operaciones CRUD de animes
│       └── user/
│           └── user-service.ts # Servicio para gestión y autenticación de usuarios
```

---

## Instalación y uso

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.io/cli) v17 o superior

```bash
npm install -g @angular/cli
```

### Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

2. Instala las dependencias:

```bash
npm install
```
### Compilación

```bash
ng build
```

### Ejecución en desarrollo

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Listado de animes con tarjetas visuales
- Vista de detalles de cada anime
- Creación y edición de animes mediante formulario
- Validaciones en todos los formularios (campos requeridos, longitud mínima, formato de URL, etc.)

### Autenticación de usuarios

- **Registro de nuevos usuarios** con los campos email, nickname y contraseña
- Validación de que el **email no esté ya registrado** mediante un validador personalizado
- Validación de que las **dos contraseñas coincidan** mediante un validador a nivel de formulario
- **Inicio de sesión** con email y contraseña, mostrando un mensaje de error si los datos son incorrectos
- Comprobación de que existan usuarios registrados antes de intentar el login
- El **usuario activo** es accesible desde cualquier parte de la aplicación a través del `UserService`
- El **nickname del usuario** logueado se muestra en el header de la aplicación

### Gestión del catálogo de animes

- **Listado de animes** con detección automática de cambios en la vista
- **Vista de detalles** de cada anime con todos sus datos: título, sinopsis, género, episodios, puntuación, estado, imagen y año
- Si el anime solicitado no existe, **redirige automáticamente** a la página principal
- **Creación de nuevos animes** mediante un formulario reactivo con los campos:
  - Título (mínimo 2 caracteres)
  - Sinopsis (mínimo 10 caracteres)
  - Género
  - Número de episodios (mínimo 1)
  - Puntuación (entre 0 y 100)
  - Estado: `En emisión`, `Finalizado` o `Pendiente`
  - URL de imagen (debe seguir el formato `http://` o `https://`)
  - Año (entre 1960 y 2030)
- **Edición de animes existentes** con el mismo formulario, que se pre-rellena automáticamente con los datos actuales del anime
- El formulario detecta automáticamente si es una **creación o una edición** según la presencia de un `id` en la ruta

### Validaciones

- Todos los formularios usan **Reactive Forms** de Angular
- Validaciones nativas: `required`, `minLength`, `min`, `max`, `email`, `pattern`
- Validadores personalizados para **email repetido** y **contraseñas no coincidentes**
- El formulario no se puede enviar si hay campos inválidos
