var jwt = null
/*
$('#signupNlogin').show();
$('div:not(#signupNlogin)').hide();
*/
console.log("ARE YOU EVEN HERE")
function cssTest() {
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

}

function swaplogin() {
	$('#welcome-page').toggle();
	$('#adding').toggle();
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
	//$('#signupNlogin').show();
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
console.log("BEFORE LOGIN")

function login(){
	console.log("LOGGING IN")
        $.post("/open_api/login", { "username": $('#logUser').val(), "password":$('#logPass').val() }, function(data){
	jwt = data.token;
	console.log("LOGIN TEST");
	console.log(jwt);
	}, "json").fail( function(response) {
	//this gets called if the server throws an error
	console.log("error");
	console.log(response);
	});
	
	return false;
}
console.log("BEFORE ADD CARD")

function addcard(){
//	$('#signupNlogin').hide();
//	$('#Adding').show();

	console.log("ADD CARD")
	var playername = $('#playername').val()
	var cardmaker = $('#cardmaker').val()
	var number = $('#number').val()
	var sport = $('#sport').val()
	var grade = $('#grade').val()
	
	get_cards();

	secure_get_with_token("/secure_api/addcard", {'playername': playername ,'cardmaker': cardmaker ,'number': number, 'sport': sport, 'grade': grade },
	function(data){
	console.log("addcard success")
	
	},function(response) {
        //this gets called if the server throws an error
        console.log("addcard() error");
        console.log(response);
        });
	setTimeout(function(){ },10000);
        return false;
}


function get_cards(){
secure_get_with_token("/secure_api/get_cards", {}, function(data)
		{console.log("got cards")
		loadCards(data.cards);
	},function(err){console.log(err)}) 
	

}

function loadCards(cards){
	var allcards = cards;

	$('#playername').append(allcards);
	$('#cardmaker').append(allcards);
	$('#number').append(allcards);
	$('#sport').append(allcards);
	$('#grade').append(allcards);
}






