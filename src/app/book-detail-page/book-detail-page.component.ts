import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  WritableSignal,
} from '@angular/core';
import { Book } from '../models/book.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-detail-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './book-detail-page.component.html',
  styleUrl: './book-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush strategy for efficiency
})
export class BookDetailPageComponent {
  // @Input() book!: WritableSignal<Book | null>; // Signal-based input

  book = input<Book | null>();
}
