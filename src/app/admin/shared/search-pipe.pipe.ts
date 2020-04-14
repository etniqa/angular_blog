import { Pipe, PipeTransform } from '@angular/core';
import {Post} from '../../shared/interfaces';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(posts: Post[], search: string): Post[] {
    if (!search.trim()) {
      return posts;
    } else {
      return  posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
