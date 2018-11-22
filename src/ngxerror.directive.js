import { Directive, forwardRef, HostBinding, Inject, Input } from "@angular/core";
import { combineLatest, Subject } from "rxjs";
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { NgxErrorsDirective } from "./ngxerrors.directive";
import { toArray } from "./utils/toArray";
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
        this._states = new Subject();
        this.states = this._states.asObservable().pipe(distinctUntilChanged());
        var errors = this.ngxErrors.subject
            .pipe(filter(Boolean))
            .pipe(filter(function (obj) { return !!~_this.errorNames.indexOf(obj.errorName); }));
        var states = this.states.pipe(map(function (states) { return _this.rules.every(function (rule) { return !!~states.indexOf(rule); }); }));
        this.subscription = combineLatest(states, errors)
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
        { type: Directive, args: [{
                    selector: "[ngxError]",
                },] },
    ];
    /** @nocollapse */
    NgxErrorDirective.ctorParameters = function () { return [
        { type: NgxErrorsDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxErrorsDirective; }),] }] }
    ]; };
    NgxErrorDirective.propDecorators = {
        ngxError: [{ type: Input }],
        when: [{ type: Input }],
        hidden: [{ type: HostBinding, args: ["hidden",] }]
    };
    return NgxErrorDirective;
}());
export { NgxErrorDirective };
//# sourceMappingURL=ngxerror.directive.js.map