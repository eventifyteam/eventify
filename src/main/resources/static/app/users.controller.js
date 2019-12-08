(function () {

    'use strict';

    angular.module('app').controller('UserController', UserController);

    UserController.$inject = ['$http'];

    function UserController($http) {
        var obj = this;
        obj.users = [];

        init();

        function init() {
            getAll();
        }

        function getAll() {
            var url = "/users/all";
            $http.get(url).then(function (response) {
                obj.users = response.data;
            });
        }

        function add() {
            var url = "/users/add";
            $http.get(url).then(function (response) {
                obj.users = response.data;
            });
        }
    }
})();