import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isAccountHeaderExpanded = false;
  constructor() {}
}
