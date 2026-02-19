/**
 * Interfaz que define la estructura de un objeto Anime
 * Representa los datos de un anime en el sistema
 */

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