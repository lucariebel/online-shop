import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(public imageCompress: NgxImageCompressService) {}

  async compressMultipleFiles() {
    let images: string[] = [];
    await this.imageCompress.uploadMultipleFiles().then(
      async (
        arrayOfFiles: {
          image: string;
          fileName: string;
          orientation: number;
        }[],
      ) => {
        for (const file of arrayOfFiles) {
          const compressedImage = await this.imageCompress.compressFile(
            file.image,
            file.orientation,
            50,
            50,
          ); // 50% ratio, 50% quality
          images.push(compressedImage);
        }
      },
    );
    return images;
  }
}
