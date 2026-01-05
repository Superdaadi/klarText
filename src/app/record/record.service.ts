import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})

export class RecordService {
    private apiUrl = "";

    constructor(private http: HttpClient) {}

    sendAudio(byteArray: Uint8Array) {
        return this.http.post('/upload-audio', byteArray, {
            headers: { 'Content-Type': 'application/octet-stream' },
            responseType: 'text'
        });
    }
}