import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoInternalService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-table-constructor',
  imports: [CommonModule, SearchComponent, FormsModule],
  templateUrl: './table-constructor.component.html',
  styleUrl: './table-constructor.component.css',
})
export class TableConstructorComponent {
  @Input() columns: { key: string; label: string; tooltip?: string }[] = [];
  @Input() data: any[] = [];
  @Input() deleteFunction: (row: any) => void = () => {};

  constructor(
    private router: Router,
    private productoService: ProductoInternalService
  ) {}

  selectedResults: number = 5;
  resultOptions = [5, 10, 20];

  openMenuIndex: number | null = null;

  toggleMenu(index: number) {
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.action-menu');
    const clickedpoint = (event.target as HTMLElement).closest('.action-icon');
    if (!clickedInside && !clickedpoint) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.openMenuIndex = null;
  }

  editItem(row: any) {
    this.productoService.setProducto(row);
    this.router.navigate(['/add']);
  }

  deleteItem(row: any) {
    this.deleteFunction(row);
  }
}
