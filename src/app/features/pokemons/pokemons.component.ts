import { Component } from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {
  private limit = 20
  private offset = new BehaviorSubject<number>(0)

  protected pokemons$ = this.offset.pipe(
    switchMap((offset) => this._pokemonsService
      .getPokemons(this.limit, offset)),
    tap((r) => console.log(r)),
    map(r => ({
      ...r,
      results: r.results.map(res => ({
        ...res,
        url: this._pokemonsService.getPokemondetailsFromUrl(res.url)
          .pipe(tap(e => console.log(e)))
      }))
    }))
  ) 

  constructor (private _pokemonsService: PokemonsService) {}

  protected next () {
    this.offset.next(this.offset.value + this.limit)
  }

  protected previous () {
    this.offset.next(this.offset.value - this.limit)
  }

  protected transform (o: unknown) {
    return o as any
  }
}
