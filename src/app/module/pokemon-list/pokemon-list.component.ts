import {  Component, HostListener, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { pokemon } from 'src/app/shared/models/pokemon.model';
import { concatMap, finalize, from, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  listaPokemon: pokemon[] = [];
  listaPokemonSearch: pokemon[] = [];
  offSet= 0;
  limit!: number;
  flat = true;
  inputSearch!: string;
  private _subcription: Subscription[] = [];

  constructor(
    private pokemonService: PokemonService,
    )
    {
      this.obtenerListaPokemones();
    }


  ngOnInit(): void {

    this.pokemonService.debounceSearch.pipe(debounceTime(500)).subscribe( input=>{
      this.inputSearch= input;
      if(input){
        this.listaPokemonSearch=[];
        this._subcription.forEach(x => x.unsubscribe());
        this.obtenerListaPokemones(0,this.limit)
      }
    });
  }


  obtenerListaPokemones(offSet: number=0, limit: number=32){
    this.pokemonService.getpokemons(offSet, limit)
    .subscribe(
      (pokemons: any) => {
        //this.limit = pokemons.count;
        let listPokemon:any[] = pokemons.results;

        if(this.inputSearch){
          listPokemon = listPokemon.filter((o: any) => o.name.toLowerCase().includes(this.inputSearch));
        }
        this.obtenerPokemon(listPokemon);

      }
    );
  }

  obtenerPokemon(lista: any[]){ 
    this._subcription.push(from(lista).pipe(concatMap((pokemon: any)=> this.pokemonService.getpokemonById(pokemon.url)))
      .pipe(finalize(()=> {this.flat = true;}),)
      .subscribe((x: any) => {
        if(this.inputSearch) {
          this.listaPokemonSearch.push(x)
        } else{
          this.listaPokemon.splice((x.id-1),0,x)
        }
      }));
  }

  @HostListener("window:scroll", ['$event'])
  scroll(event: any){
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && this.flat && !this.inputSearch) {
        this.offSet +=32;
        this.flat = false;
        this.obtenerListaPokemones(this.offSet);
    }
  }
  
}
