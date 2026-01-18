import { Injectable } from '@angular/core';
import { SimplifiedText } from './responseData.model';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ResponseDataService {
  
  
    private responseData?: SimplifiedText


    public storeData(response: SimplifiedText) {
      this.responseData = response
      console.log('DATA STORED!' + this.responseData)
    }

    public getStoredData(): SimplifiedText | undefined
    {
      return this.responseData
    }




}