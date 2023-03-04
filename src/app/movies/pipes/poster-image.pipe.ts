import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'posterImage',
})
export class PosterImagePipe implements PipeTransform {
  private url: string = environment.imagesUrl;
  transform(imageUrl: string, size: string = 'original'): unknown {
    return `${this.url}/${size}${imageUrl}`;
  }
}