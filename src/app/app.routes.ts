import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AnimeDetailsPage } from './pages/anime-details-page/anime-details-page';
import { FormAnimePage } from './pages/form-anime-page/form-anime-page';
import { LoginFormPage } from './pages/login-form-page/login-form-page';
import { RegisterFormPage } from './pages/register-form-page/register-form-page';
import { EditPage } from './pages/edit-page/edit-page';

export const routes: Routes = [
    {path:"", component: HomePage},
    {path: "detailsAnime/:id", component: AnimeDetailsPage },
    {path: "create", component: FormAnimePage},
    {path: "loginForm", component: LoginFormPage},
    {path:"registerForm", component:RegisterFormPage},
    {path: "edit/:id", component: EditPage}];
