import { FormTypes } from './formType';
import { CheckListType } from './checkList';
import { UrlKeys } from './urlKeys';


export interface FormField {
    label : string;
    type : FormTypes;
    datas? : string[] | CheckListType[] | URL,
    defaultValue? : string | Date | Number | any[],
    min? : Number,
    max? : Number,
    step? : Number,
    required?: boolean/* = false*/;
    disabled? : boolean/* = false*/;
    multiple? : boolean ;
    valueTextUrl? : UrlKeys;
    patternExpr? : any,
    patternErroString? : string,
    lengthString? : boolean,
    lengthErrorString? : string,
    isEmail? : boolean,
    isEmailErrorString? : string
}