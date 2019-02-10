(function(){
	// Check is user is logged in
	// If not logged in, redirect to login or reister page

	if(!localStorage.getItem('token')){
		window.location.replace('/auth')
	}
	
})();