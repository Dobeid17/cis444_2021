var jwt = null


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
	$('#login').toggle();
	$('#signup').toggle();
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
	console.log("ADD CARD")
	var playername = $('#playername').val()
	var cardmaker = $('#cardmaker').val()
	var number = $('#number').val()
	var sport = $('#sport').val()
	var grade = $('#grade').val()
	
	console.log(playername + cardmaker + number + sport + grade)

	secure_get_with_token("/secure_api/addcard", {'playername': playername ,'cardmaker': cardmaker ,'number': number, 'sport': sport, 'grade': grade },
	function(data){
	console.log("addcard success")
	get_cards()
	
	},function(response) {
        //this gets called if the server throws an error
        console.log("addcard() error");
        console.log(response);
        });
	setTimeout(function(){ },10000);
        return false;
}


function get_cards(){
	/*
	var list1 = [];
	var list2 = [];
	var list3 = [];
	var list4 = [];
	var list5 = [];

	var n = 1;
	var x = 0;
	
	var add_to_list = document.getElementByID('show');
	var newRow = add_to_list.insertRow(n);

	list1[x] = document.getElementByID("playername").value;
	list2[x] = document.getElementByID("cardmaker").value;
	list3[x] = document.getElementByID("number").value;
	list4[x] = document.getElementByID("sport").value;
	list5[x] = document.getElementByID("grade").value;

	var cel1 = newRow.insertCell(0);
	var cel2 = newRow.insertCell(1);
	var cel3 = newRow.insertCell(2);
	var cel4 = newRow.insertCell(3);
	var cel5 = newRow.insertCell(4);

	cel1.innerHTML = list1[x];
	cel2.innerHTML = list2[x];
	cel3.innerHTML = list3[x];
	cel4.innerHTML = list4[x];
	cel5.innerHTML = list5[x];

	n++;
	x++;
*/
}






