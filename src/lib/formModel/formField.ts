import { FormTypes } from './formType';
import { CheckListType } from './checkList';
import { UrlKeys } from './urlKeys';


export interface FormField {
    label : string;
    type : FormTypes;
    datas? : string[] | CheckListType[] | URL,
    defaultValue? : string | Date | Number | any[],
    required?: boolean/* = false*/;
    disabled? : boolean/* = false*/;
    multiple? : boolean ;
    valueTextUrl? : UrlKeys;
}