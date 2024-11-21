import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { NgFor, NgIf } from '@angular/common';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookDetailPageComponent } from '../book-detail-page/book-detail-page.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgIf, NgFor, BookDetailPageComponent, BookDetailsComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush strategy for efficient updates
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);
  books = this.bookService.books;

  // Signals for selected book, view mode, and edit mode
  selectedBook = signal<Book | null>(null);
  isEditing = signal(false);
  isViewing = signal(false); // New signal for view mode

  ngOnInit() {
    this.bookService.fetchBooks();
  }

  addBook() {
    const newBook: Book = {
      id: 0,
      title: 'New Book',
      author: 'New Author',
      bookInfo: 'Description of the new book.',
    };
    this.bookService.addBook(newBook);
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
  }

  // Select a book for editing
  editBook(book: Book) {
    this.selectedBook.set(book);
    this.isEditing.set(true); // Enable edit mode
    this.isViewing.set(false); // Disable view mode
  }

  // Select a book for viewing details only
  selectBookView(book: Book) {
    this.selectedBook.set(book);
    this.isViewing.set(true); // Enable view mode
    this.isEditing.set(false); // Disable edit mode
  }

  saveBookChanges() {
    if (this.selectedBook()) {
      this.bookService.updateBook(this.selectedBook()!);
      this.isEditing.set(false); // Exit edit mode after saving
    }
  }

  cancelEditOrView() {
    this.selectedBook.set(null); // Clear the selection
    this.isEditing.set(false); // Disable edit mode
    this.isViewing.set(false); // Disable view mode
  }
}
