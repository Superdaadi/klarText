import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { filter, switchMap, map, tap } from 'rxjs/operators';

import { ResponseDataService } from '../../service/responseData.service';
import { SimplifiedText } from '../../service/responseData.model';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})




export class SimplifyAiService {

    private apiUrl = 'http://localhost:3000';
    
    
    constructor(private http: HttpClient, private responseDataService: ResponseDataService, private router: Router) {}


    public SendRequest(content: string): Observable<string> {
        return this.http
        .post<{ result: string }>(`${this.apiUrl}/simplify/generateSimplifyResponse`, { prompt: content })
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
        lang: string
    ): Observable<SimplifiedText> {

        const payload = {
            text: content,
            lang
        };

        console.log(payload)


        return this.http
            .post<SimplifiedText>( // Hier Text statt Sentence[], falls die API ein Objekt liefert
                `${this.apiUrl}/simplify/generateSimplifyResponse`,
                payload
            )
            .pipe(
                tap(response => {
                    console.log('RAW AI RESPONSE', response);
                    // Falls die API ein Array schickt, hier response[0] nutzen
                    this.responseDataService.storeData(response); 
                    this.router.navigate(['/simplify-ai-result']);
                }),
                catchError(error => {
                    console.error('AI request failed', error);
                    return throwError(() => error);
                })
            );

    }


}



