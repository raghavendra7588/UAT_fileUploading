import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

 public isRecord: EventEmitter<boolean>;
  constructor() { 
    this.isRecord = new EventEmitter();
  }
}
