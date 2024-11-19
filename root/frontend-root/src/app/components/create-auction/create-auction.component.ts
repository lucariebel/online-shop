import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { AuctionService } from '../../core/services/auction.service';
import { RouterLink } from '@angular/router';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { ImageUploadService } from '../../core/services/image-upload.service';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    FormsModule,
  ],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.scss',
})
export class CreateAuctionComponent {
  articleForm: FormGroup;
  newAuction: AuctionArticle = {
    articleId: 0,
    userId: 0,
    articleName: '',
    category: '',
    endDate: new Date(),
    description: '',
    pictures: [] as string[],
    bid: 0,
  };

  constructor(
    private fb: FormBuilder,
    public auctionService: AuctionService,
    public imageService: ImageUploadService,
  ) {
    this.articleForm = this.fb.group({
      articleName: [''],
      category: [''],
      endDate: [''],
      price: [''],
      pictures: [] as string[],
      description: [''],
    });
  }

  onSubmit() {
    console.log('article:', this.articleForm.value);
    this.postAuction();
    console.log(this.auctionService.auctionArticles);
  }

  private postAuction() {
    this.auctionService.postAuction(this.newAuction).then((data) => {
      this.auctionService.auctionArticles.push(data);
    });
  }

  addImgToArticle() {
    this.imageService.compressMultipleFiles().then((data) => {
      data.forEach((item) => {
        this.newAuction.pictures.push(item);
      });
    });
  }
}
