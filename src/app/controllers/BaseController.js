function BaseController() {
    var vm = this;

    // Basic Page links
    vm.navigation = [
         { name: 'Home', link: '#!/' },
         { name: 'Search', link: '#!/search' }
    ];
}

angular
    .module('app')
    .controller('BaseController', BaseController);