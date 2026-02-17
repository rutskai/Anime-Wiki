import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CollectionPage } from './pages/collection-page/collection-page';
import { AnimeDetailsPage } from './pages/anime-details-page/anime-details-page';

export const routes: Routes = [
    {path:"", component: HomePage},
    {path: "collectionPage", component: CollectionPage},
    {path: "detailsAnime/:id", component: AnimeDetailsPage }];
