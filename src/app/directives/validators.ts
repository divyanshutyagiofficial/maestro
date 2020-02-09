
import * as moment from 'moment';

export class Validator {

    constructor() { }

    prepare(question: any, results: any, callback: Function): Function {
        let validators: any[] = [];

        if (question.isRequired) { // can we make this a validation as well?
            validators.push({ "name": "required", "test": this["required"](), "message": "This field is required" });
        }

        if (question.answerType == 'NUMERIC') { // can we make this a validation as well?
            validators.push({ "name": "numeric", "test": this["numeric"](), "message": "This field must be a number" });
        }

        if (question.validation) {
            if (question.validation.type && (typeof this[question.validation.type.toLowerCase()] == typeof (() => { }))) {
                validators.push({ "name": question.validation.type.toLowerCase(), "test": this[question.validation.type.toLowerCase()](question.validation), "message": question.validation.message })
            }
        }

        return ((value) => {

            let brake: boolean = false; // fail early

            validators.forEach((v) => {
                if (v["test"] && !brake) {

                    results["test"] = v["test"](value);
                    results["message"] = v["message"];
                    results["name"] = v["name"];

                    if (results["test"]) {
                        brake = true;
                    }
                }
            });

            // let errors : any[]= Object.keys(results).map((k) => results[k]).filter((v) => !!v);
            // if(!errors) {
            callback.apply({}, [value, results]);
            // }
            return results;
        });
    }

    // tests return true if test fails else false
    required(v?: any) {
        return (value) => {
            return !value;
        }
    }

    numeric(v?: any) {
        return (value: string) => {
            return !Number(value);
        }
    }

    bp(v: any) {
        return (value: string) => {
            if (/^\d{1,3}\/\d{1,3}$/.test(value)) {
                let h: number = Number(value.split("/")[0]);
                let l: number = Number(value.split("/")[1]);

                if (l < Number(v["min"]) || h > Number(v["max"])) {
                    return true;
                }
            } else {
                return true;
            }
            return false;
        }
    }

    email(v: any) {
        return (value: string) => {
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)) {
                if (value.length < Number(v["min"]) || value.length > Number(v["max"])) {
                    return true;
                }
            } else {
                return true;
            }
            return false;
        }
    }

    name(v: any) {
        return (value: string) => {
            if (/^[a-zA-Z]+$/.test(value)) {
                if (value.length < Number(v["min"]) || value.length > Number(v["max"])) {
                    return true;
                }
            } else {
                return true;
            }
            return false;
        }
    }

    day(v: any) {
        v.message = v.message.replace('${min}', v["min"]);
        return (value: number) => {
            if (value < Number(v["min"]) || value > Number(v["max"])) {
                return true;
            }
            return false;
        }
    }

    age(v: any) {
        v.message = v.message.replace('${min}', v["min"]);
        v.message = v.message.replace('${max}', v["max"]);
        return (value: number) => {
            if (value < Number(v["min"]) || value > Number(v["max"])) {
                return true;
            }
            return false;
        }
    }

    password(v: any) {
        return (value: string) => {
            if (value.length < Number(v["min"]) || value.length > Number(v["max"])) {
                return true;
            }
            return false;
        }
    }

    confirm_password(v: any) {
        return (value: string) => {
            if (value.length < Number(v["min"]) || value.length > Number(v["max"])) {
                return true;
            }
            return false;
        }
    }

    date(v: any) {
        v.message = v.message.replace('${min}', moment(Number(v["min"])).format('DD/MM/YYYY'));
        v.message = v.message.replace('${max}', moment(Number(v["max"])).format('DD/MM/YYYY'));
        return (value: any) => {
            if (moment(Number(value)).isBetween(moment(Number(v["min"])), moment(Number(v["max"])), "day")) {
                return true;
            }
            return false;
        }
    }
}
