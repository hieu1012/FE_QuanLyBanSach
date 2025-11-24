// services/auth.service.ts
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseHttpService {

    getProduct(): Observable<any> {    
            return this.get('products', {}  );
        }

}