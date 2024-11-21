import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
  ChangeDetectionStrategy,
  InputSignal,
  input,
} from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Enable OnPush
})
export class BookDetailsComponent {
  private bookService = inject(BookService);

  // Define the book input using Angular's input() API
  book = input<Book | null>(); // Creates an InputSignal<Book | null>

  isEditMode = signal(false); // Local signal for edit mode control

  toggleEditMode() {
    // Update the isEditMode signal
    this.isEditMode.set(!this.isEditMode());
  }

  saveChanges() {
    if (this.book()) {
      // Call the updateBook method to save changes to the server
      this.bookService.updateBook(this.book()!).subscribe({
        next: (updatedBook) => {
          // After successful update, update the input signal with the modified book
          // Since `book` is an InputSignal, we can't call .set() directly. Instead, inform the parent.
          console.log('Book updated successfully:', updatedBook);

          // Exit edit mode
          this.isEditMode.set(false);
        },
        error: (err) => {
          console.error('Error updating book:', err);
        },
      });
    }
  }

  cancelEdit() {
    // Exit edit mode
    this.isEditMode.set(false);

    // Optionally, reset local UI state if needed
  }
}
