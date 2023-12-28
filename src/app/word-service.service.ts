import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class WordServiceService {
  // https://api.api-ninjas.com/v1/randomword
  constructor(private http: HttpClient) {}
  getOneWord(length: number): Observable<any> {
    const val = this.http.get<any>(
      'https://random-word-api.herokuapp.com/word?length=' + length
    );
    return val;
  }
}
