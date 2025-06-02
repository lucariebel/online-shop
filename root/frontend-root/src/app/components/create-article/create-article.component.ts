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
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { ArticleService } from '../../core/services/article.service';
import { RouterLink } from '@angular/router';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  newArticle: DirectBuyArticle = {
    articleId: 0,
    ownerId: this.authService.user.userId,
    owner: this.authService.user,
    articleName: '',
    category: '',
    description: '',
    pictures: [] as string[],
    price: 0,
    isAvailable: true,
  };

  constructor(
    private fb: FormBuilder,
    public articleService: ArticleService,
    public imageService: ImageUploadService,
    public authService: UserService,
  ) {
    this.articleForm = this.fb.group({
      articleName: [''],
      category: [''],
      price: [''],
      pictures: [''],
      description: [''],
    });
  }

  onSubmit() {
    console.log('article:', this.articleForm.value);
    this.postArticle();
    console.log(this.articleService.directBuyArticles);
  }

  private postArticle() {
    this.articleService.postArticle(this.newArticle).then((data) => {
      this.articleService.directBuyArticles.push(data);
    });
  }

  addImgToArticle() {
    this.imageService.compressMultipleFiles().then((data) => {
      data.forEach((item) => {
        this.newArticle.pictures.push(item);
      });
    });
  }
}
