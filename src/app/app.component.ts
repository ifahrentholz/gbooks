import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spaceScreens: Array<any>;

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.http.get("./assets/data.json")
      .map(response => response.json().screenshots)
      .subscribe(res => this.spaceScreens = res);
  }

  likeMe(i) {
    const spaceScreen = this.spaceScreens[i];
    return spaceScreen.liked = !spaceScreen.liked
  }

  deleteMe(i) {
    this.spaceScreens.splice(i, 1);
    console.log(i);
  }
}
