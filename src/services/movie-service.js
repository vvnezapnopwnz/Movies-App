import {format} from 'date-fns'

export default class MovieService {

  constructor () {
    this.apiBase = 'https://api.themoviedb.org/3';
  }  

    getResources = async (searching, page = 1) => {
      if (searching) {
        const res = await fetch(`${this.apiBase}/search/movie/?query=${searching}&page=${page}&api_key=2f155ce3e1b51e0739a7c8e01279b635`)
        if(!res.ok) {
          throw new Error(res.status)
        }
        const body = await res.json();
        return body;
      }
      const res = await fetch(`${this.apiBase}/search/movie/?query=return&api_key=2f155ce3e1b51e0739a7c8e01279b635`)
      if(!res.ok) {
        throw new Error(res.status)
      }
      const body = await res.json();
      return body;
    }

    _transformMovieData = ({release_date, overview, ...movieData}) => {
      
      const trimText = (text) => {
        return text.slice(0,-200).split(' ').slice(0, -1).join(' ');
      }
      const trimmedDesc = trimText(overview);
      const formattedDate = release_date ? format(new Date(release_date), 'MMMM d, yyyy') : null;

      return {
        id: movieData.id,
        title: movieData.original_title,
        releaseDate: formattedDate,
        description: trimmedDesc,
        posterPath: movieData.poster_path,
        genreIds: movieData.genre_ids,
        voteAverage: movieData.vote_average,
      }
    }
  
  }