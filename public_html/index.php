<?php

// load composer dependencies
require __DIR__.'/../vendor/autoload.php';

function srcPath(string $filename = ""){
    return __DIR__.'../src/'.$filename;
}
function publicPath(string $filename = ""){
    return __DIR__.'/'.$filename;
}

if (preg_match('/\.(?:png|jpg|jpeg|gif|svg)$/', $_SERVER["REQUEST_URI"])) {
    $mimeType = mime_content_type(publicPath($_SERVER["REQUEST_URI"]));
    header("Content-type: $mimeType");
    readfile(publicPath($_SERVER["REQUEST_URI"]));
} else if (preg_match('/\.(?:.*)$/', $_SERVER["REQUEST_URI"])) {
    readfile(publicPath($_SERVER["REQUEST_URI"]));
} else { 
    // Start the routing
    \Demo\Router::start();
}