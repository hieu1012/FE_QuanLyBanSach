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
        return this.get('products', {});
    }

    getProductById(id: number): Observable<any> {
        return this.get(`products/${id}`, {});
    }

    getProductsHasPage(
        page: number = 0,
        size: number = 20,
        sort: string[] = [],
        keyword?: string,
        categoryId?: number,
        minPrice?: number,
        maxPrice?: number,
        minStock?: number
    ): Observable<any> {
        const params: any = {
            page,
            size,
        };
        if (sort.length) params.sort = sort;
        if (keyword) params.keyword = keyword;
        if (categoryId !== undefined) params.categoryId = categoryId;
        if (minPrice !== undefined) params.minPrice = minPrice;
        if (maxPrice !== undefined) params.maxPrice = maxPrice;
        if (minStock !== undefined) params.minStock = minStock;
        return this.get('products/hasPage', params);
    }

    addProduct(product: any): Observable<any> {
        return this.post<any>('products', product);
    }

    updateProduct(id: number, product: any): Observable<any> {
        return this.put<any>(`products/${id}`, product);
    }

    deleteProduct(id: number): Observable<any> {
        return this.delete<any>(`products/${id}`);
    }

}
