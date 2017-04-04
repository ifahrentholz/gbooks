import {Component} from "@angular/core";


@Component({
  selector: 'tutor',
  template: `
    <div class="test">
      <ul>
        <li *ngFor="let item of componentItems; let i = index">
          {{item}}
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class TutorComponent {
  componentItems: ['Fick', 'dich'];
  name: string = "Ingo";

  constructor() {}

  getItems() {
    return this.componentItems;
  }
}
