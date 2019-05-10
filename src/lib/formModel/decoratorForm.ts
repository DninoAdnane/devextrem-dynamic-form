import { FormField } from './formField';

export function FormDeco(formField : FormField) {
    if (!formField.datas) formField.datas = [];
    if (!formField.defaultValue) formField.defaultValue=null;
    if (!formField.required) formField.required = false;
    if (!formField.disabled) formField.disabled = false;
    if (!formField.multiple) formField.multiple = false;
    if (formField.min == undefined) formField.min = null;
    if (formField.max == undefined) formField.max = null;
    if (!formField.step) formField.step = null;
    if (!formField.valueTextUrl) formField.valueTextUrl = null;
    if (!formField.patternExpr) formField.patternExpr = null;
    if (!formField.lengthString) formField.lengthString = false;
    if (!formField.isEmail) formField.isEmail = false;

    return function (target : any, key : string) {
        target[key] = formField;
    }
}

export function SectionForm(sct : string) {
    return function (target : any, key : string) {
        target[key]=sct;
    }
}