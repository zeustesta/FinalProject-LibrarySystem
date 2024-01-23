import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any{
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  updateItem(key: string, value: any): void{
    if(localStorage.getItem(key)){
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: string){
    localStorage.removeItem(key);
  }
}
