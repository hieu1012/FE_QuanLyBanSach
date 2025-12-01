// core/services/base-http.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseData<T = any> {
    result: T;
    isOk: boolean;
    // errorMessages?: any[];
    // warningMessages?: any[];
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

    // QUAN TRỌNG: DÙNG PROXY → KHÔNG ĐƯỢC ĐỂ http://localhost:8081 ở đây!!!
    protected baseUrl = 'http://localhost:8081'; // ← Your backend API address
    // protected baseUrl = '/api'; // nếu backend có prefix /api thì dùng cái này

    protected prefix = ''; // mỗi service con sẽ override (ví dụ: 'auth', 'course', 'hoc-vien'...)

    protected url(path: string = ''): string {
        const p = this.prefix ? `${this.prefix}/` : '';
        const full = `${this.baseUrl}/${p}${path}`.trim();
        // Xóa nhiều dấu / liên tiếp, nhưng giữ lại http:// hoặc https://
        return full.replace(/([^:])(\/\/+)/g, '$1/');
    }

    // GET - siêu gọn
    protected get<T>(path: string, params?: any, isCache = false): Observable<T> {
        const url = this.url(path);
        let headers = new HttpHeaders().set('Read', 'true');
        if (isCache) headers = headers.set('cache-response', 'true');
        return this.http.get<T>(url, {
            headers,
            params: createRequestOption(params),
        });
    }

    // POST - siêu gọn
    protected post<T>(path: string, body?: any, isStopLoading = false): Observable<ResponseData<T>> {
        const url = this.url(path);
        const headers = new HttpHeaders({
            Read: isStopLoading ? 'true' : 'false'
        });

        return this.http.post<ResponseData<T>>(url, body, { headers });
    }

    // PUT
    protected put<T>(path: string, body?: any, isStopLoading = false): Observable<T> {
        const url = this.url(path);
        const headers = new HttpHeaders({
            Read: isStopLoading ? 'true' : 'false'
        });

        return this.http.put<ResponseData<T>>(url, body, { headers })
            .pipe(map(res => res.result));
    }

    // DELETE
    protected delete<T>(path: string, body?: any, isStopLoading = false): Observable<T> {
        const url = this.url(path);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Read: isStopLoading ? 'true' : 'false'
        });

        return this.http.delete<ResponseData<T>>(url, { headers, body })
            .pipe(map(res => res.result));
    }

    // READ (dùng POST để lấy dữ liệu phức tạp)
    protected read<T>(path: string, body?: any, isCache = false): Observable<T> {
        const url = this.url(path);
        let headers = new HttpHeaders().set('Read', 'true');
        if (isCache) headers = headers.set('cache-response', 'true');

        return this.http.post<ResponseData<T>>(url, body, { headers })
            .pipe(map(res => res.result));
    }
}