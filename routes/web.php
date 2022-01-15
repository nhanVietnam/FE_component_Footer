<?php
/**
 * This file contains all the routes for the project
 */

use Demo\Router;

Router::csrfVerifier(new \Demo\Middlewares\CsrfVerifier());

Router::setDefaultNamespace('\Demo\Controllers');

Router::group(['exceptionHandler' => \Demo\Handlers\CustomExceptionHandler::class], function () {
    // API
	Router::group(['prefix' => '/api', 'middleware' => \Demo\Middlewares\ApiVerification::class], function () {
        Router::get('/', 'ApiController@index')->setName('api.index');
	});
	// Web
	Router::get('/', 'DefaultController@index')->setName('index');
	Router::get('/footer', 'DefaultController@footer')->setName('footer');
});