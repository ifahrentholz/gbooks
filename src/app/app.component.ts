import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { MdSidenav, MdDialog, MdSlider } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('slider') slider: MdSlider;
  @ViewChild('maxResults') maxResults: MdSlider;
  @ViewChild('input') input: ElementRef;
  input$: Subscription;
  selectedBook: any;
  slidesPerRow = 5;
  maxResultValue = 10;
  books: Array<any>;
  author = 'Stephen King';
  apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: Http) {}

  ngOnInit() {
    this.queryAPI(this.author);
    this.input$ = Observable.fromEvent(this.input.nativeElement, 'keyup')
      .debounceTime(400)
      .subscribe(() => {
        this.author = this.input.nativeElement.value;
        this.queryAPI(this.author);
      });
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.input$.unsubscribe;
  }

  queryAPI(query) {
    if(!query) return;
    const url = `${this.apiUrl}?q=${query}&maxResults=${this.maxResultValue}`;
    this.http.get(url)
      .map(response => response.json())
      .subscribe((res) => {
        this.books = res.items;
      });
  }

  openSidenav(book) {
    this.parseSelectedBook(book);
    this.sidenav.open();
  }

  changeNumberOfBooksPerLine() {
    if(!this.slider.value) return;
    this.slidesPerRow = this.slider.value;
  }

  changeNumberOfResults(event) {
    this.maxResultValue = event.value;
    this.queryAPI(this.author);
  }

  getValueByKey(collection, key) {
    if(collection.hasOwnProperty(key)) {
      return collection[key];
    }

    for(let i = 0; i < Object.keys(collection).length; i++) {
      if(typeof collection[Object.keys(collection)[i]] === 'object') {
        return this.getValueByKey(collection[Object.keys(collection)[i]], key);
      }
    }
  }

  parseSelectedBook(book) {
    this.selectedBook = {
      authors: this.getValueByKey(book, 'authors'),
      description: this.getValueByKey(book, 'description'),
      publishedDate: this.getValueByKey(book, 'publishedDate'),
      previewLink: this.getValueByKey(book, 'previewLink'),
      amount: this.getValueByKey(book, 'amount'),
      currencyCode: this.getValueByKey(book, 'currencyCode'),
      identifier: this.getValueByKey(book, 'identifier')
    };
  }
}
