export interface Anime {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  episodes: number;
  score: number;
  status: 'En emisión' | 'Finalizado' | 'Pendiente';
  imageUrl: string;
  year: number;
}