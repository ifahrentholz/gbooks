import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {MdSidenav, MdDialog, MdSlider} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('slider') slider: MdSlider;
  slidesPerRow: number = 5;
  books: Array<any>;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get("https://www.googleapis.com/books/v1/volumes?q=stephen%20king")
      .map(response => response.json())
      .subscribe((res) => {
        this.books = res.items;
      });
  }

  likeMe(i) {
    const spaceScreen = this.books[i];
    return spaceScreen.liked = !spaceScreen.liked
  }

  deleteMe(i) {
    this.books.splice(i, 1);
    console.log(i);
  }

  openSidenav() {
    this.sidenav.open();
  }

  changeNumberOfBooksPerLine() {
    if(!this.slider.value) return;
    this.slidesPerRow = this.slider.value;
  }
}
