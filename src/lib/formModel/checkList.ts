export class CheckListType {
    value : any;
    text : string;

    constructor(value? : any, text? : string) {
        if (value) this.value = value;
        if (text) this.text = text;
    }
}