import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isOpen = false;

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
}
