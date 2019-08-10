import { Component } from '@angular/core';
import { DialogflowService } from './services/dialogflow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-bot';

  constructor(private dfs: DialogflowService) {
    const state = localStorage.getItem('logState');
    if (!state || state !== 'enabled') {
      console.log = () => { }
      console.warn = () => { }
    }

  }
}
