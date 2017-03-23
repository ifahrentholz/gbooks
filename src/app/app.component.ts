import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {MdSidenav, MdDialog, MdSlider} from '@angular/material';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('slider') slider: MdSlider;
  @ViewChild('input') input: ElementRef;
  input$: any;
  slidesPerRow: number = 5;
  books: Array<any>;
  author: string = "Stephen King";
  apiUrl: string = "https://www.googleapis.com/books/v1/volumes?q=";

  constructor(private http: Http) {}

  ngOnInit() {
    this.queryAPI(this.author);
    this.input$ = Observable.fromEvent(this.input.nativeElement, 'keyup')
      .debounceTime(300)
      .subscribe(() => {
        this.author = this.input.nativeElement.value;
        this.queryAPI(this.author);
      });
  }

  queryAPI(query) {
    if(!query) return;
    this.http.get(`${this.apiUrl}${query}`)
      .map(response => response.json())
      .subscribe((res) => {
        this.books = res.items;
      });
  }

  openSidenav() {
    this.sidenav.open();
  }

  changeNumberOfBooksPerLine() {
    if(!this.slider.value) return;
    this.slidesPerRow = this.slider.value;
  }
}
