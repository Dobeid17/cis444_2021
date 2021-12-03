var jwt = null
console.log("ARE YOU EVEN HERE")
function swaplogin() {
	$('#loginForm').toggle();
	$('#signupForm').toggle();
}

function secure_get_with_token(endpoint, data_to_send, on_success_callback, on_fail_callback){
	xhr = new XMLHttpRequest();
	function setHeader(xhr) {
		xhr.setRequestHeader('Authorization', 'Bearer:'+jwt);
	}
	function get_and_set_new_jwt(data){
		console.log(data);
		jwt  = data.token
		on_success_callback(data)
	}
	$.ajax({
		url: endpoint,
		data : data_to_send,
		type: 'GET',
		datatype: 'json',
		success: on_success_callback,
		error: on_fail_callback,
		beforeSend: setHeader
	});
}
console.log("BEFORE SIGNUP")

function signup(){
	console.log("Signing up")
	$.post("/open_api/signup", { "username": $('#newUser').val(), "password":$('#newPass').val() }, function(signup){
	console.log("success");

	}, "json").fail( function(response) {
        //this gets called if the server throws an error
        console.log("error");
        console.log(response);
        });
	return false;
}
