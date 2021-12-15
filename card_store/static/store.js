var jwt = null

$('div:not(#signupNlogin)').hide()
$('#signupNlogin').show().find('*').show();
console.log("ARE YOU EVEN HERE")


function swapPage() {
	$('#signupNlogin').hide();
	$('#Adding').show().find('*').show();
	get_cards();
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
	swapPage();
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
	

	secure_get_with_token("/secure_api/addcard", {'playername': playername ,'cardmaker': cardmaker ,'number': number, 'sport': sport, 'grade': grade },
	function(card){
	console.log("addcard success")
		$('#dataTable_wrapper').append('<table id="dataTable" class="table table-bordered table-striped">\
                                <thead>\
                                        <tr>\
                                        <th>' + card.data['playername'] + '</th>\
                                        <th>' + card.data['cardmaker'] + '</th>\
                                        <th>' + card.data['number'] + '</th>\
                                        <th>' + card.data['sport'] + '</th>\
                                        <th>' + card.data['grade'] + '</th>\
                                        </tr>\
                                </thead>\
                                </table>')
	},function(response) {
        //this gets called if the server throws an error
        console.log("addcard() error");
        console.log(response);
        });
	
        return false;
}


function get_cards(){
secure_get_with_token("/secure_api/get_cards", {}, function(data)
		{console.log("got cards")
		console.log(data)
		console.log(data.cards)
		console.log(data.cards[0])
		console.log(data.cards[0][0])
		
		var cards = data.cards;
		console.log(cards.length)
			for(let i = 0; i < cards.length; i++)
			{
				$('#dataTable_wrapper').append('<table id="dataTable" class="table table-bordered table-striped">\
                                <thead>\
                                        <tr>\
                                        <th>' + cards[i][0] + '</th>\
                                        <th>' + cards[i][1] + '</th>\
                                        <th>' + cards[i][2] + '</th>\
                                        <th>' + cards[i][3] + '</th>\
                                        <th>' + cards[i][4] + '</th>\
                                        </tr>\
                                </thead>\
                                </table>')
			}
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

