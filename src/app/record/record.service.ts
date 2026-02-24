import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecordService {

    private apiUrl = '/api/process-audio';
    
    constructor(private http: HttpClient) {}

    sendAudio(audioBlob: Blob): Observable<any> {
        const formData = new FormData();

        formData.append('file', audioBlob, 'recording.webm');
        
        return this.http.post(this.apiUrl, formData);
    }
}