(function() {
    'use strict';

    angular.module('app', [
        'app.core',
		'app.auth',
		'app.nav',

        /*
         * Feature areas
         */
		 'app.home',
		 'app.profile'

    ]);

})();
