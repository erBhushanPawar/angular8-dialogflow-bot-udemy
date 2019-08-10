export class BaseMessage {
    botImg: string = 'https://angular8-dialogflow-richmessage-bot.bhushan.now.sh/assets/images/bot.png';
    userImg: string = 'https://lh5.googleusercontent.com/-zB1nDMFHCGo/AAAAAAAAAAI/AAAAAAAAAAk/d2j98crIx5k/s150-c/photo.jpg';
    sentBy: string = 'bot';
    sentOn = new Date().getTime()
}

export class RichMessage extends BaseMessage {
    type: string;
    imageUrl: string;
    text: string;
    videoUrl: string;
    audioUrl: string;
    webUrl: string;
    docUrl: string;
    chips: Chip[];
    requestWindow: string;
    constructor(o) {
        super();
        this.type = o.type;
        this.text = o.text;
        this.imageUrl = o.imageUrl;
        this.videoUrl = o.videoUrl;
        this.audioUrl = o.audioUrl;
        this.webUrl = o.webUrl;
        this.docUrl = o.docUrl;
        if (o.chips && o.chips.length) {
            this.chips = [];
            o.chips.forEach(chip => {

                this.chips.push(new Chip(chip));
            });

        }
        this.requestWindow = o.requestWindow;
        this.sentBy = o.sentBy;
    }
}

export class Chip {
    type: string = 'webUrl';
    text: string = '';
    hintMsg: string;
    imageUrl: string;
    videoUrl: string;
    audioUrl: string;
    webUrl: string;
    docUrl: string;
    constructor(o) {
        this.text = o.text;
        this.imageUrl = o.imageUrl;
        this.videoUrl = o.videoUrl;
        this.audioUrl = o.audioUrl;
        this.webUrl = o.webUrl;
        this.docUrl = o.docUrl;
        this.type = o.type;
        this.hintMsg = o.hintMsg || o.input;
    }
}