import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Phoneme, Metadata, PronunciationFeedback } from './pronunciation-feedback.model'

@Injectable({
    providedIn: 'root'
})
export class PronunciationService {

    private apiUrl = 'https://192.168.2.84:8000/get-audio-results';

    constructor(private http: HttpClient) {}

    getResultById(id: string) {
        return this.http.get<PronunciationFeedback>(`${this.apiUrl}/${id}`);
    }
}


