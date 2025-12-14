import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { filter, switchMap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class SimplifyAiService {

    private apiUrl = 'http://localhost:3000';
    
    
    constructor(private http: HttpClient) {}


    SendRequest(content: string): Observable<string> {
        return this.http
        .post<{ result: string }>(`${this.apiUrl}/simplify/generateAIResponse`, { prompt: content })
        .pipe(
            map(response => response.result),
            catchError(error => {
            console.error('AI request failed', error);
            return throwError(() => error);
            })
        );
    }







}