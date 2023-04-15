import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PokemonsComponent } from './pokemons.component'
import { PokemonsRoutingModule } from './pokemons-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { PokemonsService } from './pokemons.service'


@NgModule({
  declarations: [
    PokemonsComponent
  ],
  imports: [
    PokemonsRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    PokemonsService
  ]
})
export class PokemonsModule { }
