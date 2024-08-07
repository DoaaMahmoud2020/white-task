import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api-end-points.constant';
import { Observable } from 'rxjs/internal/Observable';
import { IListPayload, ISinglePayload } from '@app/shared/models/payload.model';
import { IComment } from '@app/modules/post/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _httpClient: HttpClient = inject(HttpClient);

  public getAll(apiUrl: string): Observable<any> {
    const endpointUrl = `${API_URL(apiUrl)}`;
    return this._httpClient.get<IListPayload<any>>(endpointUrl);
  }
  public getItemById(id: number, apiUrl: string): Observable<any> {
    const endpointUrl = `${API_URL(apiUrl)}/${id}`;
    return this._httpClient.get<any>(endpointUrl);
  }
  public getAllCommentsByPostId(postId:number, apiUrl: string): Observable<IComment[]> {
    const endpointUrl = `${API_URL(apiUrl)}`;
    return this._httpClient.get<IComment[]>(endpointUrl,{params:{postId}});
  }
}
