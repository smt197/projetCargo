class Produit {
    id;
    libelle;
    poids;
    static find;
    constructor(id, libelle, poids) {
        this.id = Math.floor(Math.random() * 1000000000);
        this.libelle = libelle;
        this.poids = poids;
    }
}
class ProduitAlimentaire extends Produit {
    constructor(id, libelle, poids) {
        super(id, libelle, poids);
        // Initialisations spécifiques à Produit Alimentaire 
    }
}
class ProduitChimique extends Produit {
    toxicite;
    constructor(id, libelle, poids, toxicite) {
        super(id, libelle, poids);
        if (toxicite < 1 || toxicite > 10) {
            throw new Error("Le degré de toxicité doit être entre 1 et 10.");
        }
        this.toxicite = toxicite;
    }
}
class ProduitMateriel extends Produit {
    constructor(id, libelle, poids) {
        super(id, libelle, poids);
        // Initialisations spécifiques à Produit Matériel 
    }
}
class ProduitFragile extends ProduitMateriel {
    constructor(id, libelle, poids) {
        super(id, libelle, poids);
        // Initialisations spécifiques à Produit Fragile 
    }
}
class ProduitIncassable extends ProduitMateriel {
    constructor(id, libelle, poids) {
        super(id, libelle, poids);
        // Initialisations spécifiques à Produit Incassable 
    }
}
export { Produit, ProduitAlimentaire, ProduitChimique, ProduitMateriel, ProduitFragile, ProduitIncassable };
