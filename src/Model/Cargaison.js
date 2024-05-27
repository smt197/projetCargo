"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargaisonRoutière = exports.CargaisonAérienne = exports.CargaisonMaritime = exports.Cargaison = void 0;
var Cargaison = /** @class */ (function () {
    function Cargaison(produits) {
        if (produits.length < 1 || produits.length > 10) {
            throw new Error("Une cargaison doit avoir entre 1 et 10 produits.");
        }
        this.produits = produits;
    }
    return Cargaison;
}());
exports.Cargaison = Cargaison;
var CargaisonMaritime = /** @class */ (function (_super) {
    __extends(CargaisonMaritime, _super);
    function CargaisonMaritime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CargaisonMaritime;
}(Cargaison));
exports.CargaisonMaritime = CargaisonMaritime;
var CargaisonAérienne = /** @class */ (function (_super) {
    __extends(CargaisonAérienne, _super);
    function CargaisonAérienne() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CargaisonAérienne;
}(Cargaison));
exports.CargaisonAérienne = CargaisonAérienne;
var CargaisonRoutière = /** @class */ (function (_super) {
    __extends(CargaisonRoutière, _super);
    function CargaisonRoutière() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CargaisonRoutière;
}(Cargaison));
exports.CargaisonRoutière = CargaisonRoutière;
