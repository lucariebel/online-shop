import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { AuctionService } from '../../core/services/auction.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.scss'
})
export class CreateAuctionComponent {
  articleForm: FormGroup;
  newArticle: AuctionArticle = {
    articleId: 0,
    userId: 0,
    articleName: '',
    category: '',
    endDate: '',
    description: '',
    pictures: ['test'],
    price: 0,
  };

  constructor(
    private fb: FormBuilder,
    public auctionService: AuctionService,
  ) {
    this.articleForm = this.fb.group({
      articleName: [''],
      category: [''],
      endDate: [''],
      price: [''],
      pictures: [''],
      description: [''],
    });
  }

  onSubmit() {
    console.log('article:', this.articleForm.value);
    this.postArticle();
    console.log(this.auctionService.auctionArticles);
  }

  private postArticle() {
    this.auctionService.postAuction(this.newArticle).then((data) => {
      this.auctionService.auctionArticles.push(data);
    });
  }
}
