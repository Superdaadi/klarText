import { Injectable } from '@angular/core';
import { Sentence } from './responseData.model';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ResponseDataService {
  
  
    private responseData: Sentence[] = []


    public storeData(response: Sentence[]) {
      this.responseData = response
      console.log('DATA STORED!' + this.responseData)
    }

    public getStoredData(): Sentence[]
    {
      return this.responseData
    }




}