import { FormField } from './formField';

export function FormDeco(formField : FormField) {
    if (!formField.datas) formField.datas = [];
    if (!formField.defaultValue) formField.defaultValue=null;
    if (!formField.required) formField.required = false;
    if (!formField.disabled) formField.disabled = false;
    if (!formField.multiple) formField.multiple = false;
    if (!formField.valueTextUrl) formField.valueTextUrl = null;

    return function (target : any, key : string) {
        target[key] = formField;
    }
}

export function SectionForm(sct : string) {
    return function (target : any, key : string) {
        target[key]=sct;
    }
}