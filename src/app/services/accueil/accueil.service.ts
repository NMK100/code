import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Env } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class AccueilService {
  constructor(private http: HttpClient, private data: DataService) {}

  getRecommandation() {
    return this.data.getData(Env.GETRECOMMADATION);
  }
}
