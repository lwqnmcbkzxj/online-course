<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->get('lessons/{id:[0-9]+}', 'LessonsController@getSingle');
$router->post('lessons', 'LessonsController@add');
$router->post('lessons/task', 'LessonsController@addTaskElements');
$router->delete('lessons/task', 'LessonsController@deleteTaskElementSingle');
$router->post('lessons/article', 'LessonsController@addArticleElements');
$router->delete('lessons/article', 'LessonsController@deleteArticleElementSingle');
$router->get('sections', 'SectionController@getSections');
$router->get('tasks', 'LessonsController@getTasks');
$router->post('sections', 'SectionController@add');
$router->delete('sections', 'SectionController@delete');
$router->post('register', 'LoginController@register');
$router->post('login', 'LoginController@login');
$router->post('password-reset', 'LoginController@resetPassword');
$router->post('complete', 'LessonsController@complete');
$router->post('sections/edit', 'SectionController@edit');
$router->post('lessons/edit', 'LessonsController@edit');
$router->post('lessons/article/edit-text', 'LessonsController@editArticleText');
$router->post('lessons/article/edit-media', 'LessonsController@editArticleMedia');
$router->post('lessons/task/edit-text', 'LessonsController@editTaskText');
$router->post('lessons/task/edit-media', 'LessonsController@editTaskMedia');
$router->post('lessons/task/edit-quiz', 'LessonsController@editTaskQuiz');
