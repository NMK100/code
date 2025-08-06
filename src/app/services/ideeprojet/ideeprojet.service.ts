import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ideeprojet } from '../../models/ideeprojet/ideeprojet';

@Injectable({
  providedIn: 'root'
})
export class IdeeprojetService {

  url='http://localhost:8180/utilisateurs/idees-projet'

  constructor(private http:HttpClient){}
  Recupererideeprojet():Observable<Ideeprojet[]>{
    return this.http.get<Ideeprojet[]>(this.url);
  }
  
}
