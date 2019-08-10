import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { plainToClass } from 'class-transformer';
import { RichMessage } from '../model/rich-message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  token: string = 'f5f477cac59143c499bf3efa464256e7';
  client: any;
  chatSubject = new Subject<RichMessage[]>();
  conversation: RichMessage[] = [];
  constructor() { }

  connectToApi() {
    this.client = new ApiAiClient({ accessToken: this.token })
    this.sendToBot({ text: 'contact', sentBy: 'human' });
  }

  sendToBot(messageObject) {
    this.publishMessages(new RichMessage(messageObject));
    this.postToDialogFlow(messageObject.text)
  }

  sendToHuman(messageObject) {
    this.publishMessages(new RichMessage(messageObject));
  }

  postToDialogFlow(messageToSend) {

    this.client.textRequest(messageToSend).then(response => {
      let msg = response.result.fulfillment.speech;
      console.log(messageToSend, msg)
      try {
        msg = msg.replace(/\(/g, '{').replace(/\)/g, '}')
        msg = JSON.parse(`${msg}`)
        msg.sentBy = 'bot';
        msg = new RichMessage(msg);

      } catch (error) {
        msg = new RichMessage({
          text: msg,
          sentBy: 'bot'
        })
      }
      this.publishMessages(msg);
      console.log('>>>', msg)

    })
  }

  publishMessages(rm: RichMessage) {
    this.conversation.push(rm);
    console.log(this.conversation)
    this.chatSubject.next(this.conversation);
  }

}
