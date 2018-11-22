import { AfterViewInit, OnChanges, OnDestroy } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
import { BehaviorSubject } from "rxjs-compat/BehaviorSubject";
import { ErrorDetails, ErrorOptions } from "./ngxerrors";
export declare class NgxErrorsDirective implements OnChanges, OnDestroy, AfterViewInit {
    private form;
    readonly errors: {
        [key: string]: any;
    };
    readonly hasErrors: boolean;
    controlName: string;
    subject: BehaviorSubject<ErrorDetails>;
    control: AbstractControl;
    ready: boolean;
    constructor(form: FormGroupDirective);
    hasError(name: string, conditions: ErrorOptions): boolean;
    isValid(name: string, conditions: ErrorOptions): boolean;
    getError(name: string): any;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private checkPropState(prop, name, conditions);
    private checkStatus();
}
