import { DoCheck, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { NgxErrorsDirective } from "./ngxerrors.directive";
import { ErrorOptions } from "./ngxerrors";
export declare class NgxErrorDirective implements OnInit, OnDestroy, DoCheck {
    private ngxErrors;
    ngxError: ErrorOptions;
    when: ErrorOptions;
    hidden: boolean;
    rules: string[];
    errorNames: string[];
    subscription: Subscription;
    _states: Subject<string[]>;
    states: Observable<string[]>;
    constructor(ngxErrors: NgxErrorsDirective);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
}
