import { FormField } from './formField';

export class FormFile {
    section : string;
    sectionElements: FormField[];

    constructor(sectionName? : string, elements? : FormField[]) {
        if (sectionName) this.section = sectionName;
        if (elements) this.sectionElements = elements;
    }
}