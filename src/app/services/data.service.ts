import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Pour la creation des headers :
  private headers = new HttpHeaders();
  userData!:Users;

  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE,PATCH ,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'

    });
    // this.headers = this.headers.set('Authorization', 'Bearer ' + token);
   }

  //Pour la recuperation generale des données via n'importe quel chemin
  getData(url: string) {
    return this.http.get(url,{headers: this.headers});
  }

  //Pour l'insertion avec la methode POST
  postData(url: string, data: any):Observable<any> {
    return this.http.post<any>(url, data,{headers: this.headers});
  }

  //Pour la mise à jour avec la methode PUT
  putData(url: string, data: any) {
    return this.http.put(url, data,{headers: this.headers});
  }

  //Pour la suppression avec la methode DELETE
  deleteData(url: string) {
    return this.http.delete(url,{headers: this.headers});
  }

  //Pour la modification partielle des données avec la methode PATCH
  patchData(url: string, data: any) {
    return this.http.patch(url, data,{headers: this.headers});
  }

  //Pour la recuperation d'une donnée par son ID
  getDataById(url: string, id: number) {
    return this.http.get(`${url}/${id}`,{headers: this.headers});
  }

  //Pour l'insertion, la mise à jour et la suppression de données par ID
  postDataWithId(url: string, id: number, data: any) {
    return this.http.post(`${url}/${id}`, data,{headers: this.headers});
  }

  //Pour la mise à jour des données par ID
  putDataById(url: string, id: number, data: any) {
    return this.http.put(`${url}/${id}`, data,{headers: this.headers});
  }

  //Pour la suppression des données par ID
  deleteDataById(url: string, id: number) {
    return this.http.delete(`${url}/${id}`,{headers: this.headers});
  }

  // Pour l'envoi de fichiers
  uploadFile(url: string, file: File,fileName:any,type:string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('type',type);
    return this.http.post<any>(url, formData, {
      headers: {
        'enctype': 'multipart/form-data',
      }
    });
  }

}
