import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userDetails: any;
  constructor() {
    const user = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(user || '{}');
  }
}
