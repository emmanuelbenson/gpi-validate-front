(function(){

	// Display either login or register page based on user's action
	$("#login").on('click', function(){
		localStorage.setItem("authAction", "login")

		setTimeout(function(){
			window.location.href = "auth/index.html"
		}, 1000)
	});

	$("#register").on('click', function(){
		localStorage.setItem("authAction", "register")
		
		setTimeout(function(){
			window.location.href = "auth/index.html"
		}, 1000)
	})
})();