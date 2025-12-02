import { Injectable } from '@angular/core';
import { BaseHttpService } from './base.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseHttpService {

  getCategoriesHasPage(
    page: number = 0,
    size: number = 20,
    sort: string[] = [],
    keyword?: string
  ): Observable<any> {
    const params: any = {
      page,
      size
    };
    if (sort && sort.length) params.sort = sort;
    if (keyword) params.keyword = keyword;
    return this.get('categories/hasPage', params);
  }

  addCategory(category: any): Observable<any> {
    return this.post<any>('categories', category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.put<any>(`categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.delete<any>(`categories/${id}`);
  }

}
