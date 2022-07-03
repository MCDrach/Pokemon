import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/module/services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private servicePokemon: PokemonService
  ) { }

  ngOnInit(): void {
  }

  inputText(value: any){
    this.servicePokemon.debounceSearch.next(value.value);
  }


}
