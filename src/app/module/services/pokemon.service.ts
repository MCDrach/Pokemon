import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { pokemon } from 'src/app/shared/models/pokemon.model';
import { environment } from '../../../environments/environment';
const {pokeApi } = environment
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  debounceSearch = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }

  getpokemons(offset: number,limit: number){
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
                      types: data['types'],
                      height: data['height'],
                      weight: data['weight'],
                      Abilities: data['Abilities']
                    }
                  })
                );
  }
/*
  setpokemon(data: any): pokemon{
  return  {
    id: data['id'],
    image : data['sprites']['other']['home'].front_default,
    name: data['name'],
    types: data['types']
  };
  }*/
}
//other','home','front_default'