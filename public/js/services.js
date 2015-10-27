

angular.module('personApp.services',[]).factory('Person',function($resource){
    return $resource('/Person/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});