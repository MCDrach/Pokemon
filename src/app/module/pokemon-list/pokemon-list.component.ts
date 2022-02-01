import {  Component, HostListener, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { pokemon } from 'src/app/shared/models/pokemon.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  listaPokemon: pokemon[] = [];
  offSet= 0;
  limit!: number;
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
    this.pokemonService.getpokemons(this.offSet)
    .pipe(finalize(() => { this.flat = true}))
    .subscribe(
      (pokemons: any) => {
        console.log('subscribe');
        this.limit = pokemons.
        pokemons.results.forEach((data: any) => {
          this.obtenerPokemon(data.url);
        });
        
      }
    );
  }

  obtenerPokemon(url: string){
     
    this.pokemonService.getpokemonById(url).subscribe(
      x => { 
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
