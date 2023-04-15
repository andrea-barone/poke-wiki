import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface PaginatedResponse {
  count: number;
  next?: string;
  previous?: string;
  results: any[];
}

@Injectable()
export class PokemonsService {
  private baseUrl = `https://pokeapi.co/api/v2/pokemon`
  constructor(private _http: HttpClient) { }

  public getPokemons (limit: number, offset: number) {
    return this._http.get<PaginatedResponse>(`${this.baseUrl}/?offset=${offset}&limit=${limit}`)
  }

  public getPokemondetailsFromUrl (url: string) {
    return this._http.get<any>(url)
  }
}
