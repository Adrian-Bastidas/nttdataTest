import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string = 'Usuario';
  notifications: number = 3;

  toggleNotifications(): void {
    console.log('Abriendo panel de notificaciones');
  }

  toggleUserMenu(): void {
    console.log('Abriendo menú de usuario');
  }

  logout(): void {
    console.log('Cerrando sesión');
  }
}
