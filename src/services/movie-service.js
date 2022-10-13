export default class MovieService {

    _apiBase = 'https://api.themoviedb.org/3';
  
    async getResources (query) {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie/?query=result&api_key=2f155ce3e1b51e0739a7c8e01279b635`)
      if(!res.ok) {
        throw new Error(res.status)
      }
      const body = await res.json();
      return body.results;
    }
  
  }