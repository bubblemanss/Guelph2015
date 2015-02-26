function SearchController() {
    var vm = this;

    vm.title = 'search';
}

angular
    .module('app')
    .controller('SearchController', SearchController);