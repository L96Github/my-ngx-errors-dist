import { Directive, Input } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { toArray } from "./utils/toArray";
var NgxErrorsDirective = /** @class */ (function () {
    function NgxErrorsDirective(form) {
        this.form = form;
        this.subject = new BehaviorSubject(null);
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
        { type: Directive, args: [{
                    selector: "[ngxErrors]",
                    exportAs: "ngxErrors",
                },] },
    ];
    /** @nocollapse */
    NgxErrorsDirective.ctorParameters = function () { return [
        { type: FormGroupDirective }
    ]; };
    NgxErrorsDirective.propDecorators = {
        controlName: [{ type: Input, args: ["ngxErrors",] }]
    };
    return NgxErrorsDirective;
}());
export { NgxErrorsDirective };
//# sourceMappingURL=ngxerrors.directive.js.map
