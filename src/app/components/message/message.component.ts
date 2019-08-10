import { Component, OnInit, Input } from '@angular/core';
import { Chip } from 'src/app/model/rich-message.model';
import { DialogflowService } from 'src/app/services/dialogflow.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message;
  constructor(private dfs: DialogflowService) { }

  ngOnInit() {
  }

  chipOperation(chip: Chip) {
    if (chip.hintMsg) {
      this.dfs.sendToBot({
        text: chip.hintMsg,
        sentBy: 'human'
      })
    } else {
      window.open(chip[chip.type], '__blank');
    }

  }
}
