import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseData<T = any> {
  data: T;
  result: T;
  isOk: boolean;
}

export const createRequestOption = (req?: any): HttpParams => {
  let options = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key === 'sort') {
        if (Array.isArray(req[key])) {
          req[key].forEach((val: string) => options = options.append('sort', val));
        }
      } else if (req[key] !== undefined && req[key] !== null) {
        options = options.set(key, req[key].toString());
      }
    });
  }
  return options;
};

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected http = inject(HttpClient);

  // Cấu hình URL backend (Tùy bạn sử dụng proxy/angular environment)
  protected baseUrl = 'http://localhost:8081';
  protected prefix = ''; // các service con override nếu cần

  protected url(path: string = ''): string {
    const p = this.prefix ? `${this.prefix}/` : '';
    const full = `${this.baseUrl}/${p}${path}`.trim();
    return full.replace(/([^:])(\/\/+)/g, '$1/'); // loại bớt dấu //
  }

  // ------ LẤY ACCESS TOKEN từ localStorage ------
  protected getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // ------ TẠO HEADER AUTHORIZATION ------
  protected createAuthHeaders(extraHeaders: { [key: string]: string } = {}): HttpHeaders {
    let headers = new HttpHeaders(extraHeaders);
    const token = this.getAccessToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // ------ HTTP GET ------
  protected get<T>(path: string, params?: any, isCache = false): Observable<T> {
    const url = this.url(path);
    const baseHeaders: { [key: string]: string } = { 'Read': 'true' };
    if (isCache) baseHeaders['cache-response'] = 'true';
    const headers = this.createAuthHeaders(baseHeaders);
    return this.http.get<T>(url, {
      headers,
      params: createRequestOption(params),
    });
  }

  // ------ HTTP POST ------
  protected post<T>(path: string, body?: any, isStopLoading = false): Observable<ResponseData<T>> {
    const url = this.url(path);
    const headers = this.createAuthHeaders({ 'Read': isStopLoading ? 'true' : 'false' });
    return this.http.post<ResponseData<T>>(url, body, { headers });
  }

  // ------ HTTP PUT ------
  protected put<T>(path: string, body?: any, isStopLoading = false): Observable<T> {
    const url = this.url(path);
    const headers = this.createAuthHeaders({ 'Read': isStopLoading ? 'true' : 'false' });
    return this.http.put<ResponseData<T>>(url, body, { headers })
      .pipe(map(res => res.result));
  }

  // ------ HTTP DELETE ------
  protected delete<T>(path: string, body?: any, isStopLoading = false): Observable<T> {
    const url = this.url(path);
    const headers = this.createAuthHeaders({
      'Content-Type': 'application/json',
      'Read': isStopLoading ? 'true' : 'false'
    });

    return this.http.delete<ResponseData<T>>(url, { headers, body })
      .pipe(map(res => res.result));
  }

  // ------ HTTP READ (POST for data query) ------
  protected read<T>(path: string, body?: any, isCache = false): Observable<T> {
    const url = this.url(path);
    const baseHeaders: { [key: string]: string } = { 'Read': 'true' };
    if (isCache) baseHeaders['cache-response'] = 'true';
    const headers = this.createAuthHeaders(baseHeaders);

    return this.http.post<ResponseData<T>>(url, body, { headers })
      .pipe(map(res => res.result));
  }
}
