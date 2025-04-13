import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() ariaLabel: string = 'Buscar';
  @Output() searchChange = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch(): void {
    this.searchChange.emit(this.searchTerm);
  }
}
