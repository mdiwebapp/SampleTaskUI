import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NytArticle } from '../models/nyt-article';
import { ApiKeyModel } from '../models/api-key-model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NytApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchTopStories(apiKeyModel: ApiKeyModel): Observable<NytArticle[]> {
    return this.http.post<NytArticle[]>(this.apiUrl,apiKeyModel);
  }
}
