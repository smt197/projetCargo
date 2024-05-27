import { Cargaison, CargaisonMaritime, CargaisonAérienne, CargaisonRoutière } from './Model/Cargaison.js';
const gestionCargaisons = new Cargaison("", "", 0, 0, "", "", "", "", "", "");
const pageSize = 5;
let currentPage = 1; // Page actuelle
let currentType; // Type de cargaison actuel
// Fonction pour afficher les cargaisons
function afficherCargaisons(cargaisons, page = 1, pageSize = 5) {
    // Calculez l'index de début et de fin des éléments à afficher en fonction de la page et de la taille de la page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    // Obtenez les cargaisons à afficher pour la page actuelle
    const cargaisonsToShow = cargaisons.slice(startIndex, endIndex);
    const cargaisonList = document.getElementById('cargaison-list');
    if (!cargaisonList)
        return;
    cargaisonList.innerHTML = '';
    cargaisonsToShow.forEach(cargaison => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.numero}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.type}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.poids_max}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_depart}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.lieu_arrivee}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance_km}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" data-id="${cargaison.idcargo}">voir</button></td>
    `;
        cargaisonList.appendChild(row);
    });
    // Ajouter des événements aux boutons "voir"
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target;
            const cargaisonId = target.getAttribute('data-id');
            afficherDetailsCargaison(cargaisonId);
        });
    });
}
// Fonction pour afficher les détails d'une cargaison (vide pour le moment)
function afficherDetailsCargaison(cargaisonId) {
    console.log('Afficher les détails pour la cargaison:', cargaisonId);
}
// Fonction pour récupérer les cargaisons de l'API
function fetchCargaisons(type, page = 1, pageSize = 5) {
    let url = 'api.php';
    if (type) {
        url += `?type=${type}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
        afficherCargaisons(data, page, pageSize);
    })
        .catch(error => console.error('Erreur:', error));
}
// Ajout des écouteurs d'événements pour la pagination
document.getElementById('btn-prev')?.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCargaisons(currentType, currentPage, pageSize);
    }
});
document.getElementById('btn-next')?.addEventListener('click', () => {
    currentPage++;
    fetchCargaisons(currentType, currentPage, pageSize);
});
// Ajout des écouteurs d'événements pour les filtres
document.getElementById('btn-filter-maritime')?.addEventListener('click', () => {
    currentType = "Maritime";
    currentPage = 1;
    fetchCargaisons(currentType, currentPage, pageSize);
});
document.getElementById('btn-filter-aerienne')?.addEventListener('click', () => {
    currentType = "Aérienne";
    currentPage = 1;
    fetchCargaisons(currentType, currentPage, pageSize);
});
document.getElementById('btn-filter-routiere')?.addEventListener('click', () => {
    currentType = "Routière";
    currentPage = 1;
    fetchCargaisons(currentType, currentPage, pageSize);
});
// Initialiser l'affichage avec toutes les cargaisons
fetchCargaisons();
document.getElementById('btn-add')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal)
        modal.classList.remove('hidden');
});
document.getElementById('btn-close-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal)
        modal.classList.add('hidden');
});
// Evenement pour la select type plein
document.getElementById('type-plein')?.addEventListener('change', (event) => {
    const typePlein = event.target.value;
    const poidsField = document.getElementById('poids-produit');
    const nombreField = document.getElementById('nombre-produit');
    const poidsLabel = document.getElementById('label-poids-produit');
    const nombreLabel = document.getElementById('label-nombre-produit');
    if (typePlein === 'poids') {
        poidsField.classList.remove('hidden');
        nombreField.classList.add('hidden');
        poidsLabel.classList.remove('hidden');
        nombreLabel.classList.add('hidden');
    }
    else {
        poidsField.classList.add('hidden');
        nombreField.classList.remove('hidden');
        poidsLabel.classList.add('hidden');
        nombreLabel.classList.remove('hidden');
    }
});
document.getElementById('form-add-cargaison')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const typeCargaison = document.getElementById('type-cargaison').value;
    const typePlein = document.getElementById('type-plein').value;
    const poids_max = typePlein === 'poids' ? parseFloat(document.getElementById('poids-produit').value) : 0;
    const nombre_produits = typePlein === 'nombre' ? parseInt(document.getElementById('nombre-produit').value) : 0;
    const numero = "CRG" + Math.floor(Math.random() * 1000); // Générer un numéro aléatoire pour la cargaison
    // const poids_max = parseFloat((document.getElementById('poids-produit') as HTMLInputElement).value);
    const prix_total = poids_max * 10;
    const lieu_depart = document.getElementById('depart').value;
    const lieu_arrivee = document.getElementById('arrivee').value;
    const distance_km = document.getElementById('distance').value;
    const etat_avancement = "en attente";
    const etat_globale = "ouvert";
    // Recuperation des span error
    const typeCargaisonError = document.getElementById('type-cargaison-error');
    const poidsSuporterError = document.getElementById('poids-cargaison-error');
    const departError = document.getElementById('depart-error');
    const arriveeError = document.getElementById('arrivee-error');
    const distanceError = document.getElementById('distance-error');
    let newCargaison;
    if (typeCargaison === "Maritime") {
        newCargaison = new CargaisonMaritime(numero, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, etat_avancement, etat_globale);
    }
    else if (typeCargaison === "Aérienne") {
        newCargaison = new CargaisonAérienne(numero, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, etat_avancement, etat_globale);
    }
    else {
        newCargaison = new CargaisonRoutière(numero, numero, poids_max, prix_total, lieu_depart, lieu_arrivee, distance_km, etat_avancement, etat_globale);
    }
    const formData = new FormData();
    formData.append('action', 'addCargaison');
    formData.append('id', newCargaison.idcargo);
    formData.append('numero', newCargaison.numero);
    formData.append('poids_max', newCargaison.poids_max.toString());
    formData.append('prix_total', newCargaison.prix_total.toString());
    formData.append('lieu_depart', newCargaison.lieu_depart);
    formData.append('lieu_arrivee', newCargaison.lieu_arrivee);
    formData.append('distance_km', newCargaison.distance_km.toString());
    formData.append('type', newCargaison.type);
    formData.append('etat_avancement', newCargaison.etat_avancement);
    formData.append('etat_globale', newCargaison.etat_globale);
    fetch('api.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
        if (data.status === "success") {
            alert(data.message);
            // afficherCargaisons();
            fetchCargaisons();
            const modal = document.getElementById('modal');
            if (modal)
                modal.classList.add('hidden');
        }
        else {
            alert('Erreur lors de l\'ajout de la cargaison');
        }
    })
        .catch(error => console.error('Erreur:', error));
});
document.getElementById('btn-list')?.addEventListener('click', () => {
    fetchCargaisons();
});
// document.getElementById('btn-filter-maritime')?.addEventListener('click', () => {
//   currentPage = 1;
//   fetchCargaisons("Maritime", currentPage, pageSize);
// });
// document.getElementById('btn-filter-aerienne')?.addEventListener('click', () => {
//   currentPage = 1;
//   fetchCargaisons("Aérienne", currentPage, pageSize);
// });
// document.getElementById('btn-filter-routiere')?.addEventListener('click', () => {
//   currentPage = 1;
//   fetchCargaisons("Routière", currentPage, pageSize);
// });
// Filtrage cargaison
// document.getElementById('btn-list')?.addEventListener('click', () => {
//   // Afficher toutes les cargaisons
// afficherCargaisons(Cargaison.listerCargaisons());
// });
// document.getElementById('btn-filter-maritime')?.addEventListener('click', (e) => {
//   console.log(e.target);
//   // Afficher les cargaisons maritimes
// Cargaison.filtrerCargaisonsParType("Maritime").then((cargaisons: Cargaison[]) => afficherCargaisons(cargaisons));
// });
// document.getElementById('btn-filter-aerienne')?.addEventListener('click', () => {
//   // Afficher les cargaisons aériennes
//   Cargaison.filtrerCargaisonsParType("Aérienne").then((cargaisons: Cargaison[]) => afficherCargaisons(cargaisons));
// });
// document.getElementById('btn-filter-routiere')?.addEventListener('click', () => {
//   // Afficher les cargaisons routières
//   Cargaison.filtrerCargaisonsParType("Routière").then((cargaisons: Cargaison[]) => afficherCargaisons(cargaisons));
// });
// ---------------Fonction Voir Detail-------------------------------------------------
// function afficherDetailsProduit(produitId: string | null, typeCargaison: string | null) {
//   if (!produitId || !typeCargaison) return;
//   const produit = gestionCargaisons.listerCargaisons().flatMap(cargaison => cargaison.produits).find(p => p.id.toString() === produitId);
//   if (!produit) return;
//   const modal = document.getElementById('modal');
//   if (modal) {
//       modal.classList.remove('hidden');
//       // modal.classList.add('disabled');
//       // Remplir les détails du produit dans le modal
//       (document.getElementById('type-cargaison') as HTMLSelectElement).value = typeCargaison;
//       (document.getElementById('type-produit') as HTMLSelectElement).value = produit.constructor.name;
//       (document.getElementById('libelle-produit') as HTMLInputElement).value = produit.libelle;
//       (document.getElementById('poids-produit') as HTMLInputElement).value = produit.poids.toString();
//       const toxiciteField = document.getElementById('toxicite-field');
//       if (produit instanceof ProduitChimique) {
//           if (toxiciteField) toxiciteField.classList.remove('hidden');
//           (document.getElementById('toxicite-produit') as HTMLInputElement).value = produit.toxicite.toString();
//       } else {
//           if (toxiciteField) toxiciteField.classList.add('hidden');
//       }
//   }
// }
// // Attacher les événements de clic aux boutons "voir"
// document.querySelectorAll('.table tbody .btn-view').forEach(button => {
//   button.addEventListener('click', (event) => {
//       const target = event.target as HTMLElement;
//       const produitId = target.getAttribute('data-id');
//       const typeCargaison = target.getAttribute('data-type');
//       afficherDetailsProduit(produitId,typeCargaison);
//   });
// });
// console.log(cargaisonMaritime);
// console.log(cargaisonAérienne);
// console.log(cargaisonRoutière);
