import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { AuctionService } from '../../core/services/auction.service';
import { RouterLink } from '@angular/router';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [
    CommonModule, // Für *ngFor und *ngIf
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // Für mat-select
    MatOptionModule, // Für mat-option
    MatDatepickerModule, // Vollständiges Datepicker Module
    MatNativeDateModule, // Für native Date-Adapter
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    // Entfernt: einzelne Datepicker-Komponenten, da sie im MatDatepickerModule enthalten sind
  ],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.scss',
})
export class CreateAuctionComponent {
  newAuction: AuctionArticle = {
    articleId: 0,
    ownerId: this.userService.user.userId,
    owner: this.userService.user,
    articleName: '',
    category: '',
    endDate: new Date(),
    description: '',
    pictures: [] as string[],
    bid: 0,
  };

  timeList: string[] = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  selectedTime: string = '';

  constructor(
    public auctionService: AuctionService,
    public imageService: ImageUploadService,
    public userService: UserService,
  ) {}

  onSubmit() {
    console.log(this.newAuction);

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

  setTimeToDate(time: string) {
    this.newAuction.endDate = new Date(this.newAuction.endDate);
    const [hours, minutes] = time.split(':').map(Number);
    this.newAuction.endDate.setHours(hours, minutes, 0, 0);
    console.log(`Endzeit gesetzt auf: ${this.newAuction.endDate}`);
  }
}
