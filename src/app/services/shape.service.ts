import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  constructor(private http: HttpClient) {}
  getStateShapes() {
    return this.http.get('../../assets/data/custom.geo.json');
  }
}
