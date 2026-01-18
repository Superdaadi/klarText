import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { filter, switchMap, map, tap } from 'rxjs/operators';

import { ResponseDataService } from '../../service/responseData.service';
import { Sentence } from '../../service/responseData.model';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})




export class SimplifyAiService {

    private apiUrl = 'http://localhost:3000';
    
    
    constructor(private http: HttpClient, private responseDataService: ResponseDataService, private router: Router) {}


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
    ): Observable<Sentence[]> {

        const payload = {
            text: content,
            simplified,
            keypoints,
            language
        };

        console.log(payload)


        return this.http
            .post<Sentence[]>(
                `${this.apiUrl}/simplify/generateSimplifyResponse`,
                payload
            )
            .pipe(
            tap(response => {
                console.log('RAW AI RESPONSE', response);

                this.responseDataService.storeData(response);

                this.router.navigate(['/simplify-ai-result']);
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

    }


}



