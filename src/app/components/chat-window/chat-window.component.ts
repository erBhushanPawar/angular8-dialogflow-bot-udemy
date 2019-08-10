import { Component, OnInit } from '@angular/core';
import { DialogflowService } from 'src/app/services/dialogflow.service';
import { RichMessage } from 'src/app/model/rich-message.model';
declare var $: any;

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  conversation: RichMessage[] = [];
  askInfo = false;
  textMessage: string = ''
  constructor(private dfs: DialogflowService) {

  }

  sendMessage() {
    this.dfs.sendToBot({
      text: this.textMessage,
      sentBy: 'human'
    })
    this.textMessage = ''
  }

  ngOnInit() {

    this.dfs.chatSubject.subscribe((conversation: RichMessage[]) => {

      this.conversation = conversation;
      const lastMsg = conversation[conversation.length - 1]
      this.checkWindows(lastMsg);
      console.log('Got msgs to display', lastMsg)
      setTimeout(() => {
        $(".message-content-inner").stop().animate({ scrollTop: $(".message-content-inner")[0].scrollHeight + 500 }, 100);
      }, 100);
    })
    this.dfs.connectToApi();
  }

  checkWindows(lastMsg: RichMessage) {
    if (lastMsg.requestWindow === 'contact-details')
      setTimeout(() => {
        this.askInfo = true;
      }, 3000);
  }
}
