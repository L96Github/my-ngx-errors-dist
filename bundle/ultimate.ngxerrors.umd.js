(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('rxjs-compat/BehaviorSubject')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/forms', 'rxjs-compat/BehaviorSubject'], factory) :
	(factory((global.ngxerrors = global.ngxerrors || {}),global._angular_core,global.rxjs,global.rxjs_operators,global._angular_forms,global.rxjsCompat_BehaviorSubject));
}(this, (function (exports,_angular_core,rxjs,rxjs_operators,_angular_forms,rxjsCompat_BehaviorSubject) { 'use strict';

var toArray = function (value) { return Array.isArray(value) ? value : [value]; };

var NgxErrorsDirective = /** @class */ (function () {
    function NgxErrorsDirective(form) {
        this.form = form;
        this.subject = new rxjsCompat_BehaviorSubject.BehaviorSubject(null);
        this.ready = false;
    }
    Object.defineProperty(NgxErrorsDirective.prototype, "errors", {
        get: function () {
            if (!this.ready) {
                return;
            }
            return this.control.errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxErrorsDirective.prototype, "hasErrors", {
        get: function () {
            return !!this.errors;
        },
        enumerable: true,
        configurable: true
    });
    NgxErrorsDirective.prototype.hasError = function (name, conditions) {
        return this.checkPropState("invalid", name, conditions);
    };
    NgxErrorsDirective.prototype.isValid = function (name, conditions) {
        return this.checkPropState("valid", name, conditions);
    };
    NgxErrorsDirective.prototype.getError = function (name) {
        if (!this.ready) {
            return;
        }
        return this.control.getError(name);
    };
    NgxErrorsDirective.prototype.ngOnChanges = function () {
        this.control = this.form.control.get(this.controlName);
    };
    NgxErrorsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.checkStatus();
            _this.control.statusChanges.subscribe(_this.checkStatus.bind(_this));
        });
    };
    NgxErrorsDirective.prototype.ngOnDestroy = function () {
        this.subject.unsubscribe();
    };
    NgxErrorsDirective.prototype.checkPropState = function (prop, name, conditions) {
        var _this = this;
        if (!this.ready) {
            return;
        }
        var controlPropsState = (!conditions || toArray(conditions).every(function (condition) { return _this.control[condition]; }));
        if (name.charAt(0) === "*") {
            return this.control[prop] && controlPropsState;
        }
        return (prop === "valid" ? !this.control.hasError(name) : this.control.hasError(name) && controlPropsState);
    };
    NgxErrorsDirective.prototype.checkStatus = function () {
        var control = this.control;
        var errors = control.errors;
        this.ready = true;
        if (!errors) {
            return;
        }
        for (var errorName in errors) {
            this.subject.next({ control: control, errorName: errorName });
        }
    };
    NgxErrorsDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: "[ngxErrors]",
                    exportAs: "ngxErrors",
                },] },
    ];
    /** @nocollapse */
    NgxErrorsDirective.ctorParameters = function () { return [
        { type: _angular_forms.FormGroupDirective }
    ]; };
    NgxErrorsDirective.propDecorators = {
        controlName: [{ type: _angular_core.Input, args: ["ngxErrors",] }]
    };
    return NgxErrorsDirective;
}());

// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
var NgxErrorDirective = /** @class */ (function () {
    function NgxErrorDirective(ngxErrors) {
        this.ngxErrors = ngxErrors;
        this.hidden = true;
        this.rules = [];
        this.errorNames = [];
    }
    Object.defineProperty(NgxErrorDirective.prototype, "ngxError", {
        set: function (value) {
            this.errorNames = toArray(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxErrorDirective.prototype, "when", {
        set: function (value) {
            this.rules = toArray(value);
        },
        enumerable: true,
        configurable: true
    });
    NgxErrorDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._states = new rxjs.Subject();
        this.states = this._states.asObservable().pipe(rxjs_operators.distinctUntilChanged());
        var errors = this.ngxErrors.subject
            .pipe(rxjs_operators.filter(Boolean))
            .pipe(rxjs_operators.filter(function (obj) { return !!~_this.errorNames.indexOf(obj.errorName); }));
        var states = this.states.pipe(rxjs_operators.map(function (states) { return _this.rules.every(function (rule) { return !!~states.indexOf(rule); }); }));
        this.subscription = rxjs.combineLatest(states, errors)
            .subscribe(function (_a) {
            var states = _a[0], errors = _a[1];
            _this.hidden = !(states && errors.control.hasError(errors.errorName));
        });
    };
    NgxErrorDirective.prototype.ngDoCheck = function () {
        var _this = this;
        this._states.next(this.rules.filter(function (rule) { return _this.ngxErrors.control[rule]; }));
    };
    NgxErrorDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    NgxErrorDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: "[ngxError]",
                },] },
    ];
    /** @nocollapse */
    NgxErrorDirective.ctorParameters = function () { return [
        { type: NgxErrorsDirective, decorators: [{ type: _angular_core.Inject, args: [_angular_core.forwardRef(function () { return NgxErrorsDirective; }),] }] }
    ]; };
    NgxErrorDirective.propDecorators = {
        ngxError: [{ type: _angular_core.Input }],
        when: [{ type: _angular_core.Input }],
        hidden: [{ type: _angular_core.HostBinding, args: ["hidden",] }]
    };
    return NgxErrorDirective;
}());

var dependencies = [
    NgxErrorsDirective,
    NgxErrorDirective,
];
var NgxErrorsModule = /** @class */ (function () {
    function NgxErrorsModule() {
    }
    NgxErrorsModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: dependencies.slice(),
                    exports: dependencies.slice(),
                },] },
    ];
    return NgxErrorsModule;
}());

exports.NgxErrorDirective = NgxErrorDirective;
exports.NgxErrorsDirective = NgxErrorsDirective;
exports.NgxErrorsModule = NgxErrorsModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
