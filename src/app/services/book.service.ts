import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = 'http://localhost:3000/books';
  private http = inject(HttpClient);
  books = signal<Book[]>([]);

  fetchBooks() {
    this.http.get<Book[]>(this.baseUrl).subscribe({
      next: (data) => this.books.set(data),
      error: (err) => console.error('Error fetching books', err),
    });
  }

  addBook(book: Book) {
    this.http.post<Book>(this.baseUrl, book).subscribe({
      next: (newBook) => this.books.set([...this.books(), newBook]),
      error: (err) => console.error('Error adding book', err),
    });
  }

  // Update book on the server and update the signal
  updateBook(book: Book) {
    return this.http.put<Book>(`${this.baseUrl}/${book.id}`, book);
  }

  
  deleteBook(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        const updatedBooks = this.books().filter((book) => book.id !== id);
        this.books.set(updatedBooks);
      },
      error: (err) => console.error('Error deleting book', err),
    });
  }
}
