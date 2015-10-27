
angular.module('personApp',['ui.router','ngResource','personApp.controllers','personApp.services']);

angular.module('personApp').config(function($stateProvider,$httpProvider){
    $stateProvider.state('persons',{
        url:'/persons',
        templateUrl:'customers/partials/persons.html',
        controller:'PersonListController'
    }).state('viewPerson',{
       url:'/persons/:id/view',
       templateUrl:'customers/partials/person-view.html',
       controller:'PersonViewController'
    }).state('newPerson',{
        url:'/persons/new',
        templateUrl:'customers/partials/persons-add.html',
        controller:'PersonCreateController'
    }).state('editPerson',{
        url:'/persons/:id/edit',
        templateUrl:'customers/partials/person-edit.html',
        controller:'PersonEditController'
    });
}).run(function($state){
   $state.go('persons');
});