import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Env } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class AccueilService {
  constructor(private http: HttpClient, private data: DataService) {}

  readonly url = Env.GETRECOMMADATION;

  getRecommandation(id: number) {
    return this.data.getData(`${this.url}/${id}`);
  }
}
