import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {Http} from '@angular/http';
import {MdSidenav, MdDialog, MdSlider} from '@angular/material';
import { Observable, Subscription } from "rxjs";

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
  slidesPerRow: number = 5;
  maxResultValue: number = 10;
  books: Array<any>;
  author: string = "Stephen King";
  apiUrl: string = "https://www.googleapis.com/books/v1/volumes?q=";

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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.input$.unsubscribe;
  }

  queryAPI(query) {
    if(!query) return;
    const url = this.apiUrl + query + '&maxResults=' + this.maxResultValue;
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
    const authors = this.getValueByKey(book, 'authors');
    const description = this.getValueByKey(book, 'description');
    const publishedDate = this.getValueByKey(book, 'publishedDate');
    const previewLink = this.getValueByKey(book, 'previewLink');
    const amount = this.getValueByKey(book, 'amount');
    const currencyCode = this.getValueByKey(book, 'currencyCode');
    const identifier = this.getValueByKey(book, 'identifier');

    this.selectedBook = {
      authors,
      description,
      publishedDate,
      previewLink,
      amount,
      currencyCode,
      identifier
    };
  }
}
