import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormFile } from './formModel/formFile';
import { FormTypes } from './formModel/formType';
import { FormField } from './formModel/formField';
import { DxDynamicFormService } from './libform.service';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'dx-dynamic-form',
  templateUrl: './libform.component.html',
  styleUrls: ['./libform.component.scss']
})
export class DxDynamicFormComponent implements OnInit {
  @ViewChild(DxFormComponent) myform: DxFormComponent;

  @Input()
  nameCls : string;

  @Input()
  handlerInstantition : object;

  @Input()
  width : Number = null;

  titleForm : string;

  validationButton : string ;

  cancelButton : string;

  urlValidation : URL;

  datas : any[] = [];

  private keysClass : string[]=[];

  Types = FormTypes;

  @Input()
  colNumber : Number = 2;



  constructor(private formProvider : DxDynamicFormService) { 
    this.setDataToTable = this.setDataToTable.bind(this);
    this.generateDataToSend = this.generateDataToSend.bind(this);
    this.setAsynDatas = this.setAsynDatas.bind(this);
    setTimeout(()=> {
      this.setDataToTable();
    },0);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
}

private setDataToTable() {
  let  ii = 0; let j=0;
  var classForm = new (<any>this.handlerInstantition)[this.nameCls]();
      let attributeAccess = classForm.__proto__;
      let keys : string[] = this.getAttributeList(attributeAccess);
      let idx = keys.indexOf("headers");
      if (idx > -1) {
        this.titleForm = attributeAccess.headers.title;
        this.validationButton = attributeAccess.headers.saveButton;
        this.cancelButton = attributeAccess.headers.cancelButton;
        this.urlValidation = attributeAccess.headers.url;
        keys.splice(idx,1);

      }
      let formFile : FormFile = null;
      let tabForm : FormField[] = [];
      let lastSection : Boolean = false;
      for (let i=0; i<keys.length;i++) {
        let elmt = keys[i];
        if (typeof attributeAccess[elmt] == "string") {
          if (lastSection == true) {
            formFile.sectionElements = [...tabForm];
            this.datas.push({...formFile});
            ii++;
            j=0;
          }
          formFile = new FormFile(attributeAccess[elmt]);
          tabForm.length = 0;
          tabForm = [];
          lastSection = true;
          keys.splice(i,1);
          i--;
        } else {
          if (lastSection == false) {
            formFile = new FormFile("");
            lastSection = true;
          }
          if (attributeAccess[elmt].type == FormTypes.SELECT) {
            if (attributeAccess[elmt].datas.hostname == undefined)
              if (attributeAccess[elmt].defaultValue) 
                attributeAccess[elmt].selected = attributeAccess[elmt].defaultValue;
              else attributeAccess[elmt].selected =-1;
            else {
              this.setAsynDatas(attributeAccess[elmt],ii,j);
            }
          }
          if (attributeAccess[elmt].type == FormTypes.CHEKBOX) {
              attributeAccess[elmt].datas.forEach(val => val.selected = false);
              attributeAccess[elmt].defaultValue && attributeAccess[elmt].defaultValue.length && attributeAccess[elmt].defaultValue.map(ind => {
              let taille = attributeAccess[elmt].datas.length;
              if ( ind > -1 && ind < taille ) attributeAccess[elmt].datas[ind].selected=true
              });
          }
          if (attributeAccess[elmt].type == FormTypes.RADIO) {
            if (attributeAccess[elmt].defaultValue) attributeAccess[elmt].selected = attributeAccess[elmt].datas[attributeAccess[elmt].defaultValue].value;
            else attributeAccess[elmt].selected =0;
          }
          tabForm.push({...attributeAccess[elmt]});
          j++;
        }
        this.keysClass = keys;
      }
      formFile.sectionElements = [...tabForm];
      this.datas.push({...formFile});
      ii++;
      if (this.datas.length < this.colNumber) {
        this.colNumber = this.datas.length;
      }
}


private setAsynDatas(elmt : any, indexI : any, indexJ : any) {
  elmt.customData = [];
    this.formProvider.getItems(elmt.datas.origin + elmt.datas.port).subscribe(
      res => {
          elmt.customData = res;
          elmt.selected = elmt.defaultValue;
        let id = setInterval(()=> {
          if (this.datas[indexI]!== undefined) {
            Object.assign(this.datas[indexI].sectionElements[indexJ],{...elmt});
            clearInterval(id);
          }
        },400)
      },
      err => console.log(err));
}

private getAttributeList<T>(obj: T) {
  return Object.keys(obj);
}


generateDataToSend() {
  if (!this.myform.instance.validate().isValid) {
    return [];
  }
  let dataToSend : any [] = [];
  let index = 0;
  for (let i =0; i< this.datas.length; i++) {
    let elmts = this.datas[i].sectionElements;
    for (let j=0; j< elmts.length; j++) {
      let formField = elmts[j];
      switch(formField.type) {
        case FormTypes.INPUT : 
          let data = {};
          data[this.keysClass[index]] = formField.defaultValue;
          dataToSend.push(data);
          index ++;
        break;
        case FormTypes.TEXTAREA : 
          let data1 = {};
          data1[this.keysClass[index]] = formField.defaultValue;
          dataToSend.push(data1);
          index ++;
        break;
        case FormTypes.DATE : 
          let data2={};
          data2[this.keysClass[index]] = formField.defaultValue;
          dataToSend.push(data2);
          index ++;
        break;
        case FormTypes.NUMBER_PICKER:
          let data6={};
          data6[this.keysClass[index]] = formField.defaultValue;
          dataToSend.push(data6);
          index++;
        break;
        case FormTypes.RADIO : 
          let data3 = {};
          data3[this.keysClass[index]] = formField.selected;
          dataToSend.push(data3);
          index ++;
        break;
        case FormTypes.CHEKBOX : 
          let data4 = {};
          data4[this.keysClass[index]] = formField.datas.filter(elt => elt.selected == true).map(elmt => elmt.value);
          dataToSend.push(data4);
          index ++;
        break;
        case FormTypes.SELECT : 
          let data5 = {};
          if (formField.multiple) data5[this.keysClass[index]] = formField.defaultValue;
          else data5[this.keysClass[index]] = formField.selected;
          dataToSend.push(data5);
          index ++;
        break;
      }
    }
  }
  return dataToSend;
}

}
