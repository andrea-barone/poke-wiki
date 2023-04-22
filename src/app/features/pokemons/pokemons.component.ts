import { Component } from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {
  private limit = 20
  private page = new BehaviorSubject<number>(0)

  protected pokemons$ = this.activatedRoute.params.pipe(
    map(p => p?.['page'] || 0),
    tap((page) => this.page.next(Number(page))),
    switchMap((page) => this._pokemonsService
      .getPokemons(this.limit, page * this.limit)),
    tap((r) => console.log(r)),
    map(r => ({
      ...r,
      results: r.results.map(res => ({
        ...res,
        url: this._pokemonsService.getPokemondetailsFromUrl(res.url)
      }))
    }))
  ) 

  constructor (
    private _pokemonsService: PokemonsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  protected next () {
    this.router.navigate(['/pokemons', { page: this.page.value + 1 }])
  }

  protected previous () {
    this.router.navigate(['/pokemons', { page: this.page.value - 1 }])
  }

  protected transform (o: unknown) {
    return o as any
  }
}
