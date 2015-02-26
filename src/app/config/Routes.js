function Routes($routeProvider, $locationProvider, VIEWS) {

    /*
     * Set hashbang for web crawlers
     * https://developers.google.com/webmasters/ajax-crawling/docs/getting-started
     */
    $locationProvider.hashPrefix('!');


    $routeProvider
        .when('/', {
            templateUrl : VIEWS + 'home.html',
            controller  : 'HomeController',
            controllerAs: 'Home'
        })
        .when('/search', {
            templateUrl : VIEWS + 'search.html',
            controller  : 'SearchController',
            controllerAs: 'Search'
        })
        .otherwise({
            redirectTo: '/'
        });
}

angular
    .module('app')
    .config(Routes);