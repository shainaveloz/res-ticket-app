function() {
    'use strict';

    angular
        .controller('ticketApp', UserService);
// An Angular service that talks to Express
    UserService.$inject = ['$http', '$state'];

    function UserService($http, $state) {

        this.onSignIn(googleUser) = function{

            var gapi = gapi.load('auth2', function() {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2 = gapi.auth2.init({
                    client_id: '932569619900-24714d0s0kddfcs5hebhnl6tj2qv87rc.apps.googleusercontent.com',
                    fetch_basic_profile: false,
                    scope: 'profile'

                    // Sign the user in, and then retrieve their ID.
                    auth2.signIn().then(function() {
                    console.log(auth2.currentUser.get().getId());
                });
            });

                function signOut() {
                    auth2.signOut().then(function () {
                        console.log('User signed out.');
                    });
                });

        }
          function getBasicProfile() = gapi.auth2.BasicProfile;

            var profile = googleUser.getBasicProfile();

            var id_token = googleUser.getAuthResponse().id_token;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://localhost:8080/tokensignin');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                console.log('Signed in as: ' + xhr.responseText);
            };
            xhr.send('idtoken=' + id_token);
        };


    }
}

/**
 * The Sign-In client object.
 */
var auth2;

/**
 * Initializes the Sign-In client.
 */
var initClient = function() {
    gapi.load('auth2', function(){
        /**
         * Retrieve the singleton for the GoogleAuth library and set up the
         * client.
         */
        auth2 = gapi.auth2.init({
            client_id: 'CLIENT_ID.apps.googleusercontent.com'
        });

        // Attach the click handler to the sign-in button
        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
    });
};

/**
 * Handle successful sign-ins.
 */
var onSuccess = function(user) {
    console.log('Signed in as ' + user.getBasicProfile().getName());
};

/**
 * Handle sign-in failures.
 */
var onFailure = function(error) {
    console.log(error);
};