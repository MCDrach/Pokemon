import { Component, Input, OnInit } from '@angular/core';
import { TypesEnum } from 'src/app/shared/emun/color.enum';
import { pokemon } from 'src/app/shared/models/pokemon.model';
import { fade } from '../../../../../shared/animations/fade';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  animations:[fade]
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon!: pokemon;

  typeEnum = TypesEnum;
  constructor() { }

  ngOnInit(): void {    
  }
  
  setPokemonCardColor(): any {
    let tipos = this.pokemon.types;
     let colortype1 = Object.entries(this.typeEnum).find(([key, val]) => key === tipos[0].type.name)?.[1];
     let colortype2 = Object.entries(this.typeEnum).find(([key, val]) => key === tipos?.[1]?.type.name)?.[1];

    const color1 =colortype1 ?? 'white';
    const color2 =  colortype2 ?? color1;
    const style = {
      'background-image': `linear-gradient(${color1}, ${color2})`,
    };
    return style;
  }

  setPokemonTypeColor(color: string): any { 
     let typecolor = Object.entries(this.typeEnum).find(([key, val]) => key === color)?.[1];
    color =   typecolor ?? 'white';
    const style = {
      background: color,
      'box-shadow': `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
    };
    return style;
  }

}
