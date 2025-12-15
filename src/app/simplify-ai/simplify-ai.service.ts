import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { filter, switchMap, map, tap } from 'rxjs/operators';


export interface SimplifiedSentence {
  splittedSentence: string;
  simplifyed: string;
  wordExpl: {
    word: string;
    expl: string;
  }[];
}



@Injectable({
  providedIn: 'root'
})




export class SimplifyAiService {

    private apiUrl = 'http://localhost:3000';
    
    
    constructor(private http: HttpClient) {}


    public SendRequest(content: string): Observable<string> {
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





    public SendSimplifyRequest(
        content: string,
        simplified: string,
        keypoints: string,
        language: string
    ): Observable<SimplifiedSentence[]> {

        const payload = {
            text: content,
            simplified,
            keypoints,
            language
        };

        console.log(payload)


        return this.http
            .post<SimplifiedSentence[]>(
            `${this.apiUrl}/simplify/generateSimplifyResponse`,
            payload // ✅ KEIN { prompt: payload }
            )
            .pipe(
            tap(response => {
                console.log('RAW AI RESPONSE', response);
            }),
            map(response => {
                // Optional: Validierung
                if (!Array.isArray(response)) {
                throw new Error('Invalid AI response format');
                }
                return response;
            }),
            catchError(error => {
                console.error('AI request failed', error);
                return throwError(() => error);
            })
        );

        /*return this.http
        .post<{ result: string }>(`${this.apiUrl}/simplify/generateSimplifyResponse`, { prompt: payload })
        .pipe(
            map(response => {
                console.log(response.result);
                return response.result;
            }),
            catchError(error => {
            console.error('AI request failed', error);
            return throwError(() => error);
            })
        );*/
    }







}