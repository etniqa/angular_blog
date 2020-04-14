import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  // create new post
  // .../posts.json === say that we work with json
  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      }));
  }

  getById(id: string): Observable<Post> {
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
          ...post,
          id,
          date: new Date(post.date)
        };
      }));
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/posts.json`) // here we get one great object with posts
      .pipe(
        // (key === id of post:
        // 'asdlfjiasodfj': {...})
        map((response: {[key: string]: any}) => {
          // start ot move on every post getting keys
          return Object.keys(response)
            .map((key) => ({
              ...response[key],  // copy all properties
              id: key,
              date: new Date(response[key].date)
            }));
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  update(post: Post) {
    return this.http.patch(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }
}
