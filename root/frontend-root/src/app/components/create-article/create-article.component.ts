import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { ArticleService } from '../../core/services/article.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  newArticle: DirectBuyArticle = {
    articleId: 0,
    userId: 0,
    articleName: '',
    category: '',
    description: '',
    pictures: ['test'],
    price: 0,
  };

  constructor(
    private fb: FormBuilder,
    public articleService: ArticleService,
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
    this.articleService.directBuyArticles.push(this.newArticle);
    console.log(this.articleService.directBuyArticles);
  }
}
