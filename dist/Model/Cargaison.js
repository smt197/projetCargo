// import { Produit } from "./Produit.js";
class Cargaison {
    idcargo;
    numero;
    poids_max;
    prix_total;
    lieu_depart;
    lieu_arrivee;
    distance_km;
    type;
    etat_avancement;
    etat_globale;
    static cargaisons = [];
    constructor(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, type, etat_avancement, etat_globale) {
        this.idcargo = idcargo;
        this.numero = numero;
        this.poids_max = poids_max;
        this.prix_total = prix_total;
        this.lieu_depart = lieu_depart;
        this.lieu_arrivee = lieu_arrivee;
        this.distance_km = distance_km;
        this.type = type;
        this.etat_avancement = etat_avancement;
        this.etat_globale = etat_globale;
    }
    static ajouterCargaison(cargaison) {
        Cargaison.cargaisons.push(cargaison);
    }
    static listerCargaisons() {
        return Cargaison.cargaisons;
    }
    static filtrerCargaisonsParType(type) {
        return new Promise((resolve, reject) => {
            // Assume that you have an API endpoint that returns a list of cargaisons
            // based on the provided type
            fetch('api.php?type=' + type)
                .then(response => response.json())
                .then(data => {
                resolve(data.cargaisons);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
}
class Validator {
    static validateTypeCargaison(typeCargaison) {
        if (!typeCargaison) {
            throw new Error('Le type de cargaison est requis');
        }
    }
    static validateTypePlein(typePlein) {
        if (!typePlein) {
            throw new Error('Le type de plein est requis');
        }
    }
    static validatePoidsMax(typePlein, poids_max) {
        if (typePlein === 'poids' && (isNaN(poids_max) || poids_max <= 0)) {
            throw new Error('Le poids maximum doit être un nombre positif');
        }
    }
    static validateNombreProduits(typePlein, nombre_produits) {
        if (typePlein === 'nombre' && (isNaN(nombre_produits) || nombre_produits <= 0)) {
            throw new Error('Le nombre de produits doit être un nombre positif');
        }
    }
    static validateLieuDepart(lieu_depart) {
        if (!lieu_depart) {
            throw new Error('Le lieu de départ est requis');
        }
    }
    static validateLieuArrivee(lieu_arrivee) {
        if (!lieu_arrivee) {
            throw new Error('Le lieu d\'arrivée est requis');
        }
    }
    static validateDistanceKm(distance_km) {
        if (isNaN(parseInt(distance_km)) || parseInt(distance_km) <= 0) {
            throw new Error('La distance en kilomètres doit être un nombre positif');
        }
    }
    static validateAll(typeCargaison, typePlein, poids_max, nombre_produits, lieu_depart, lieu_arrivee, distance_km) {
        this.validateTypeCargaison(typeCargaison);
        this.validateTypePlein(typePlein);
        this.validatePoidsMax(typePlein, poids_max);
        this.validateNombreProduits(typePlein, nombre_produits);
        this.validateLieuDepart(lieu_depart);
        this.validateLieuArrivee(lieu_arrivee);
        this.validateDistanceKm(distance_km);
    }
}
class CargaisonMaritime extends Cargaison {
    constructor(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, etat_avancement, etat_globale) {
        super(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, "Maritime", etat_avancement, etat_globale);
    }
}
class CargaisonAérienne extends Cargaison {
    constructor(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, etat_avancement, etat_globale) {
        super(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, "Aérienne", etat_avancement, etat_globale);
    }
}
class CargaisonRoutière extends Cargaison {
    constructor(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, etat_avancement, etat_globale) {
        super(idcargo, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, "Routière", etat_avancement, etat_globale);
    }
}
export { Cargaison, CargaisonMaritime, CargaisonAérienne, CargaisonRoutière };
// export { Cargaison };
