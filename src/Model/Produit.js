"use strict";
// interface typeProduit{
//     libelle: string;
//     poids: number;
//     toxicite: number;
//     fragile: boolean;
//     incassable: boolean;
//     alimentaire: boolean;
//     chimique: boolean;
//     matériel: boolean;
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
exports.ProduitIncassable = exports.ProduitFragile = exports.ProduitMateriel = exports.ProduitChimique = exports.ProduitAlimentaire = exports.Produit = void 0;
// }
var Produit = /** @class */ (function () {
    function Produit(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    return Produit;
}());
exports.Produit = Produit;
var ProduitAlimentaire = /** @class */ (function (_super) {
    __extends(ProduitAlimentaire, _super);
    function ProduitAlimentaire() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProduitAlimentaire;
}(Produit));
exports.ProduitAlimentaire = ProduitAlimentaire;
var ProduitChimique = /** @class */ (function (_super) {
    __extends(ProduitChimique, _super);
    function ProduitChimique(libelle, poids, toxicite) {
        var _this = _super.call(this, libelle, poids) || this;
        if (toxicite < 1 || toxicite > 10) {
            throw new Error("Le degré de toxicité doit être entre 1 et 10.");
        }
        _this.toxicite = toxicite;
        return _this;
    }
    return ProduitChimique;
}(Produit));
exports.ProduitChimique = ProduitChimique;
var ProduitMateriel = /** @class */ (function (_super) {
    __extends(ProduitMateriel, _super);
    function ProduitMateriel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProduitMateriel;
}(Produit));
exports.ProduitMateriel = ProduitMateriel;
var ProduitFragile = /** @class */ (function (_super) {
    __extends(ProduitFragile, _super);
    function ProduitFragile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProduitFragile;
}(ProduitMateriel));
exports.ProduitFragile = ProduitFragile;
var ProduitIncassable = /** @class */ (function (_super) {
    __extends(ProduitIncassable, _super);
    function ProduitIncassable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProduitIncassable;
}(ProduitMateriel));
exports.ProduitIncassable = ProduitIncassable;
