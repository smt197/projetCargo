<?php
    $route = [
        '/cargaison' => 'cargaison',
        '/produit' => 'produits',
    
    ];
    
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    
    if (array_key_exists($uri, $route)) {
            // require 'index.html.php';
            require "template/" . $route[$uri] . ".html.php";
    }    
?>

