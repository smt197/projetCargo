<?php
// api.php

// Fonction pour lire un fichier JSON
function readJSON($filename) {
    if (!file_exists($filename)) {
        return ['cargaisons' => []];
    }
    $json_data = file_get_contents($filename);
    return json_decode($json_data, true);
}

// Fonction pour écrire dans un fichier JSON
function writeJSON($filename, $data) {
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json_data);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action === 'addCargaison') {
        $newCargaison = [
            "idcargo" => uniqid(),
            "numero" => $_POST['numero'],
            "poids_max" => $_POST['poids_max'],
            "prix_total" => $_POST['prix_total'],
            "lieu_depart" => $_POST['lieu_depart'],
            "lieu_arrivee" => $_POST['lieu_arrivee'],
            "distance_km" => $_POST['distance_km'],
            "type" => $_POST['type'],
            "etat_avancement" => $_POST['etat_avancement'],
            "etat_globale" => $_POST['etat_globale']
        ];

        $data = readJSON('cargaisons.json');
        $data['cargaisons'][] = $newCargaison;
        writeJSON('cargaisons.json', $data);

        echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
        exit;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['type'])) {
    $type = $_GET['type'];
    $data = readJSON('cargaisons.json');
    $filteredCargaisons = array_filter($data['cargaisons'], function($cargaison) use ($type) {
        return $cargaison['type'] === $type;
    });
    echo json_encode(array_values($filteredCargaisons));
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readJSON('cargaisons.json');
    echo json_encode($data['cargaisons']);
    exit;
}

echo json_encode(["status" => "error", "message" => "Requête non valide"]);
?>
