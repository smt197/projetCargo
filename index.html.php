<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Cargaisons</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">

    <!-- <link rel="stylesheet" href=".dist/style.css"> -->
    <style>

        .sidebar {
            width: 16rem;
            transition: width 0.3s;
        }

        .sidebar.reduced {
            width: 4rem;
        }

        .sidebar ul {
            transition: opacity 0.3s;
            overflow: hidden;
        }

        .sidebar.reduced ul {
            opacity: 0;
        }

        .sidebar ul li {
            display: flex;
            align-items: center;
        }

        .sidebar ul li i {
            width: 2rem;
            text-align: center;
        }

        .sidebar ul li span {
            transition: opacity 0.3s;
        }

        .sidebar.reduced ul li span {
            opacity: 0;
            visibility: hidden;
        }

        .main-content {
            transition: margin-left 0.3s;
        }

        .main-content.shifted {
            margin-left: 16rem;
        }

        .main-content.reduced {
            margin-left: 4rem;
        }

        .submenu {
            display: none;
            margin-left: 2rem;
        }

        .submenu li {
            display: flex;
            align-items: center;
        }

        .submenu li i {
            width: 1rem;
            text-align: center;
        }

        /* Style pour les sous-menus */
        .sub-menu {
            display: none;
            list-style-type: none;
            padding: 0;
        }

        /* Style pour afficher les sous-menus lorsque l'élément parent est ouvert */
        .open {
            display: block !important;
        }

        /* Style pour la flèche */
        /* .arrow {
    margin-left: 5px;
}

.rotate {
    transform: rotate(180deg);
} */

        /* Style pour les sous-menus */
        .sub-menu {
            display: none;
            list-style-type: none;
            padding: 0;
            position: absolute;
        }

        .dropdown-bottom {
            bottom: 530px;
            left: 110px;
        }
    </style>
</head>

<body class="bg-gray-100">
    <header id="nav" class="bg-white text-white p-4 flex justify-between items-center shadow-lg">
        <button id="btn-toggle-sidebar" class="text-black text-2xl">☰</button>
        <h1 class="text-2xl font-bold">Gestion des Cargaisons</h1>
        <!-- <div id="distance">Distance: 0 km</div> -->
        <input type="text" placeholder="Rechercher..." class="p-2 rounded">
    </header>

    <div class="flex ">
        <aside id="sidebar" class="sidebar bg-black text-white hidden lg:block h-screen">
            <div class="p-4">
                <img src="/img/logo.jpeg" alt="Logo" class="mb-4 h-10 w-10 mr-2">
                <h2 class="text-xl font-bold mb-4 text-yellow-200">SMT-company</h2>
                <nav>
                    <ul>
                        <li class="mb-2 flex items-center">
                            <i class="fas fa-ship w-6"></i>
                            <a href="#" class="block p-2 ml-2" id="toggle-cargaisons">Gestion Cargaisons <span
                                    class="arrow">&#9660;</span></a>
                            <!-- <ul class="ml-8 sub-menu dropdown-bottom" id="cargaisons-menu">
                                <li><a href="#">
                                        <button id="btn-filter-maritime" class="mt-5">
                                            Filtre-maritime</a></li>
                                </button>
                                <li><a href="#">
                                        <button id="btn-filter-aerienne">
                                            Filtre-aériénne
                                        </button></a></li>
                                <li><a href="#">
                                    <button id="btn-filter-routiere">
                                        Filtre-routiére</button></a></li>
                            </ul> -->
                        </li>
                        <li class="mb-2 flex items-center">
                            <i class="fas fa-box-open w-6"></i>
                            <a href="#" class="block p-2 ml-2">Produits <span
                                    class="arrow">&#9660;</span></a>
                        </li>
                        <li class="mb-2 flex items-center">
                            <i class="fas fa-cogs w-6"></i>
                            <a href="#" class="block p-2 ml-2">Paramètres</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>




        <main id="main-content" class="main-content flex-grow  p-8 shifted">
        
            <div class="container mx-auto">
                <h1 class="text-2xl font-bold mb-4">Gestion des Cargaisons</h1>

                <button class="bg-blue-300 text-white px-1 py-1 rounded btn-view" type="button" id="btn-add">Ajouter</button>
                <button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" id="btn-filter-maritime">filtrerMaritime</button>
                <button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" id="btn-filter-aerienne">filtrerAerienne</button>
                <button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" id="btn-filter-routiere">filtrerRoutiere</button>
                <button id="btn-list" class="bg-blue-500 text-white px-1 py-1 rounded btn-view">All</button>

                <div id="output" class="bg-white p-4 rounded shadow">
                    <table class="min-w-full divide-y divide-gray-200 table">
                        <thead class="bg-gray-100">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Numero</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type_Plein</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Depart</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Arrivee</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Distance</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action</th>
                            </tr>
                        </thead>
                        <tbody id="cargaison-list" class="bg-white divide-y divide-gray-200">
                            <!-- Liste des cargaison -->
                            
                        </tbody>
                    </table>
                    <div id="pagination" class="mt-5">
                        <button id="btn-prev" class="text-puple-800"><i class="fa-solid fa-arrow-left"></i></button>
                        <button id="btn-next" class="text-puple-800"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Modal Cargaison -->
    <div id="modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-white p-8 rounded-lg shadow-lg ">
            <h2 class="text-xl font-bold mb-4">Ajouter une cargaison</h2>
            <form id="form-add-cargaison">
                <!-- <input type="hidden" class="form-control" id="produit-id"> -->
                <div class="mb-4">
                    <label for="type-cargaison" class="block text-sm font-medium text-gray-700">Type de
                        cargaison</label>
                    <select id="type-cargaison" class="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option value="Maritime">Maritime</option>
                        <option value="Aérienne">Aérienne</option>
                        <option value="Routière">Routière</option>
                    </select>
                    <span class="text-red-500 text-sm hidden" id="type-cargaison-error">Type de cargaison est obligatoire</span>
                </div>
                <div class="mb-4">
                    <label for="type-plein" class="block text-sm font-medium text-gray-700">Type
                        de Plein</label>
                    <select id="type-plein" class="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option value="poids">poids</option>
                        <option value="nombre">nombre</option>
                    </select>
                    <span class="text-red-500 text-sm hidden" id="type-plein-error">Type de cargaison est obligatoire</span>
                </div>
                <div class="mb-4">
                    <div mt-1 block w-full p-2 border-gray-300 rounded id="map" style="width: 100%; height: 100px;"></div>
                </div>
                <div class="mb-4">
                    <label id="label-poids-produit" for="poids-produit" class="block text-sm font-medium text-gray-700">Poids
                        (kg)</label>
                    <input type="text" id="poids-produit"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded" step="0.01">
                        <span class="text-red-500 text-sm hidden" id="poids-cargaison-error">Poids obligatoire</span>
                </div>
                <div class="mb-4" id="">
                    <label id="label-nombre-produit" for="nombre-produit" class="block text-sm font-medium text-gray-700 hidden">
                        Nombre total produit</label>
                    <input type="number" id="nombre-produit"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded hidden" min="1" max="10">
                        <span class="text-red-500 text-sm hidden" id="nbre-cargaison-error">Nombre obligatoire</span>
                </div>
                <div class="mb-4">
                    <label for="depart" class="block text-sm font-medium text-gray-700">
                        Depart</label>
                    <input type="text" id="depart"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded" min="1" max="10">
                        <span class="text-red-500 text-sm hidden" id="depart-error">Lieu depart obligatoire</span>
                </div>
                <div class="mb-4">
                    <label for="arrivee" class="block text-sm font-medium text-gray-700">
                        Arrivee</label>
                    <input type="text" id="arrivee"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded" min="1" max="10">
                        <span class="text-red-500 text-sm hidden" id="arrivee-error">Lieu depart obligatoire</span>
                </div>
                <div class="mb-4">
                    <label for="distance" class="block text-sm font-medium text-gray-700">
                        Distance</label>
                    <input type="text" id="distance"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded" min="1" max="10">
                        <span class="text-red-500 text-sm hidden" id="distance-error">Lieu depart obligatoire</span>
                </div>
                <div class="flex justify-end">
                    <button type="button" id="btn-close-modal"
                        class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Annuler</button>
                    <button id="ajouter" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script type="module" src="dist/test.js"></script>
    <script>
        const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
        const sidebar = document.getElementById('sidebar');
        const nav = document.getElementById('nav');
        const mainContent = document.getElementById('main-content');

        btnToggleSidebar.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('shifted');
            nav.classList.toggle('nav');

        });

        document.addEventListener('DOMContentLoaded', function () {
            const toggleCargaisons = document.getElementById('toggle-cargaisons');
            const cargaisonsMenu = document.getElementById('cargaisons-menu');
            const arrow = toggleCargaisons.querySelector('.arrow');

            toggleCargaisons.addEventListener('click', function (event) {
                if (event.target === arrow) { // Vérifie si la flèche a été cliquée
                    cargaisonsMenu.classList.toggle('open');
                    arrow.classList.toggle('rotate');
                } else {
                    cargaisonsMenu.classList.toggle('open');
                }
            });
        });

    </script>

    <script>
        let map, departMarker, arriveeMarker;

        map = L.map("map").setView([0, 0], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(map);

        map.on("click", function(e) {
            if (!departMarker) {
                departMarker = L.marker(e.latlng, {
                        draggable: true
                    }).addTo(map)
                    .bindPopup("Lieu de départ")
                    .openPopup();
                updateInputWithLocationName(e.latlng, "depart");

                departMarker.on('dragend', function(event) {
                    let marker = event.target;
                    let position = marker.getLatLng();
                    updateInputWithLocationName(position, "depart");
                    if (arriveeMarker) {
                        calculateDistance(position, arriveeMarker.getLatLng());
                    }
                });

            } else if (!arriveeMarker) {
                arriveeMarker = L.marker(e.latlng, {
                        draggable: true
                    }).addTo(map)
                    .bindPopup("Lieu d'arrivée")
                    .openPopup();
                updateInputWithLocationName(e.latlng, "arrivee");
                calculateDistance(departMarker.getLatLng(), e.latlng);

                arriveeMarker.on('dragend', function(event) {
                    let marker = event.target;
                    let position = marker.getLatLng();
                    updateInputWithLocationName(position, "arrivee");
                    calculateDistance(departMarker.getLatLng(), position);
                });
            } else {
                arriveeMarker.setLatLng(e.latlng);
                updateInputWithLocationName(e.latlng, "arrivee");
                calculateDistance(departMarker.getLatLng(), e.latlng);
            }
        });

        function updateInputWithLocationName(latlng, inputId) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
                .then(response => response.json())
                .then(data => {
                    if (inputId === "depart") {
                        const country = data.address.country || `${latlng.lat}, ${latlng.lng}`;
                        document.getElementById(inputId).value = country;
                    } else if (inputId === "arrivee") {
                        const country = data.address.country || `${latlng.lat}, ${latlng.lng}`;
                        document.getElementById(inputId).value = country;
                    }
                })
                .catch(error => {
                    console.error('Error fetching location name:', error);
                    document.getElementById(inputId).value = `${latlng.lat}, ${latlng.lng}`;
                });
        }


        function calculateDistance(start, end) {
            const lat1 = start.lat;
            const lon1 = start.lng;
            const lat2 = end.lat;
            const lon2 = end.lng;

            const R = 6371; // Radius of the Earth in km
            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;

            document.getElementById("distance").value = distance.toFixed(2);
        }

        // const choixSelect = document.getElementById("poids-suporter");
        // const champSaisi = document.getElementById("champ-saisi");
        // const labelValeur = document.querySelector("#champ-saisi label");
        // const inputValeur = document.getElementById("valeur");

        // choixSelect.addEventListener("change", function() {
        //     if (this.value === "poids") {
        //         champSaisi.classList.remove("hidden");
        //         labelValeur.textContent = "Poids maximal";
        //         inputValeur.placeholder = "Entrez le poids maximal";
        //     } else if (this.value === "nombre") {
        //         champSaisi.classList.remove("hidden");
        //         labelValeur.textContent = "Nombre maximal de produits";
        //         inputValeur.placeholder = "Entrez le nombre maximal de produits";
        //     } else {
        //         champSaisi.classList.add("hidden");
        //     }
        // });

        // Invalidate the map size to ensure it renders correctly
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    </script>
</body>

</html>