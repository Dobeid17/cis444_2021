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
console.log("BEFORE LOGIN")

function login(){
	console.log("LOGGING IN")
        $.post("/open_api/login", { "username": $('#logUser').val(), "password":$('#logPass').val() }, function(data){
	jwt = data.token;
	console.log("LOGIN TEST");
	console.log(jwt);
	getBooks();
	}, "json").fail( function(response) {
	//this gets called if the server throws an error
	console.log("error");
	console.log(response);
	});
	
	return false;
}

function getBooks(){
	secure_get_with_token("/secure_api/get_books", {}, function(data)
		{console.log("got books")
		loadBook(data.books);
		showBook();
	},function(err){console.log(err)}) 

}

function loadBook(books) {
	var allBooks = books;

	$('#bname1').html(allBooks[0][1]);
        $('#bname2').html(allBooks[1][1]);
        $('#bname3').html(allBooks[2][1]);
        $('#bname4').html(allBooks[3][1]);
        $('#bprice1').html('$' + allBooks[0][2]);
        $('#bprice2').html('$' + allBooks[1][2]);
        $('#bprice3').html('$' + allBooks[2][2]);
        $('#bprice4').html('$' + allBooks[3][2]);

        $('#bn1').val(allBooks[0][1]);
        $('#bn2').val(allBooks[1][1]);
        $('#bn3').val(allBooks[2][1]);
        $('#bn4').val(allBooks[3][1]);

        $('#bp1').val(allBooks[0][2]);
        $('#bp2').val(allBooks[1][2]);
        $('#bp3').val(allBooks[2][2]);
        $('#bp4').val(allBooks[3][2]);
}

function showBook(){
$('#loginForm').hide();
$('#bookstore').show();
}

console.log("BEFORE BUYING")

function buyBook1(){
	secure_get_with_token("/secure_api/buy", {"bookName":$('#bn1').val(), "price":$('#bp1').val()},
		function(data){
		console.log(data)
                console.log("buying book one");
		},
		function(err){
			console.log(err)
		});
	return false;
}

function buyBook2(){
        secure_get_with_token("/secure_api/buy", {"bookName":$('#bn2').val(), "price":$('#bp2').val()},
                function(data){
                console.log(data)
                console.log("buying book two");
                },
                function(err){
                        console.log(err)
                });
        return false;
}

function buyBook3(){
        secure_get_with_token("/secure_api/buy", {"bookName":$('#bn3').val(), "price":$('#bp3').val()},
                function(data){
                console.log(data)
                console.log("buying book three");
                },
                function(err){
                        console.log(err)
                });
        return false;
}

function buyBook4(){
        secure_get_with_token("/secure_api/buy", {"bookName":$('#bn4').val(), "price":$('#bp4').val()},
                function(data){
                console.log(data)
                console.log("buying book four");
                },
                function(err){
                        console.log(err)
                });
        return false;
}



