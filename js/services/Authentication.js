app.factory('Authentication', function(FIREBASE_URL, $firebaseAuth, $rootScope) {


	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);


	return {
		registerUser: function(user, callback) {

			ref.createUser({
			  email    : user.email,
			  password : user.password
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    callback(userData.uid);
			  }
			});

		},
		signInUser: function(user) {

			ref.authWithPassword({
			  email    : user.email,
			  password : user.password
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
			});

		},
		logoutUser: function() {
			ref.unauth();
		},
		resetPassword: function(email) {

			ref.resetPassword({
			    email : email
			}, function(error) {
				if (error === null) {
					console.log("Password reset email sent successfully");
				} else {
					console.log("Error sending password reset email:", error);
				}
			});

		},
		checkAuth: function() {
			auth.$onAuth(function(authUser) {
				if (authUser) {
					console.log(authUser);

					$rootScope.currentUserUid = authUser.uid;

				} else {
					console.log('no logged in user');
				}
			})
		}


	}

});