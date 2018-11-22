import { NgModule } from "@angular/core";
import { NgxErrorDirective } from "./ngxerror.directive";
import { NgxErrorsDirective } from "./ngxerrors.directive";
var dependencies = [
    NgxErrorsDirective,
    NgxErrorDirective,
];
var NgxErrorsModule = /** @class */ (function () {
    function NgxErrorsModule() {
    }
    NgxErrorsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: dependencies.slice(),
                    exports: dependencies.slice(),
                },] },
    ];
    return NgxErrorsModule;
}());
export { NgxErrorsModule };
//# sourceMappingURL=ngxerrors.module.js.map