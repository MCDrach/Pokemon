import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { pokemon } from 'src/app/shared/models/pokemon.model';
import { environment } from '../../../environments/environment';
const {pokeApi } = environment
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getpokemons(offset: number=0,limit: number=0){
    return this.http.get(`${pokeApi}pokemon/?offset=${offset}&limit=${limit}`);
           /* .pipe(
                map((data: any) => 
                    data.results 
                  )
                );*/
  }


  getpokemonById(url: string):Observable<pokemon>{
    return this.http.get<pokemon>(`${url}`)
            .pipe(
                  map((data: any) => {
                    return {
                      id: data['id'],
                      image : data['sprites']['other']['home'].front_default,
                      name: data['name'],
                      types: data['types']
                    }
                  })
                );
  }

  setpokemon(data: any): pokemon{
  return  {
    id: data['id'],
    image : data['sprites']['other']['home'].front_default,
    name: data['name'],
    types: data['types']
  };
  }
}
//other','home','front_default'