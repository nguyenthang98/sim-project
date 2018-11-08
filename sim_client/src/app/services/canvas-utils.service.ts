import { Injectable } from '@angular/core';
import { Shape } from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CanvasUtilsService {
  constructor() {
  }

  isShape(object) {
    if(!object) return false;
    return object instanceof Shape;
  }
}