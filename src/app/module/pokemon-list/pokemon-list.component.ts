import {  Component, HostListener, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  listaPokemon: pokemon[] = [];
  offSet= 0;
  flat = true;

  constructor(
    private pokemonService: PokemonService,
    )
    {
      
    }


  ngOnInit(): void {

    this.obtenerListaPokemones();
    
  }
  obtenerListaPokemones(){
    this.pokemonService.getpokemons(this.offSet).subscribe(
      (pokemons: any) => {
        pokemons.results.forEach((data: any) => {
          this.obtenerPokemon(data.url);
        });
        this.flat = true;
      }
    );
  }

  obtenerPokemon(url: string){
     
    this.pokemonService.getpokemonById(url).subscribe(
      x => { 
        let pokemon = this.listaPokemon[this.listaPokemon.length-1];
        
        console.log('pokemon',pokemon);
        if(pokemon?.id < x.id){
          debugger;
        }
        this.listaPokemon.splice((x.id-1),0,x);
      }
    );
  }

  
  @HostListener("window:scroll", ['$event'])
  scroll(event: any){
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && this.flat) {
        this.offSet +=32;
        this.flat = false;
        this.obtenerListaPokemones();

    }
  }
  
}
