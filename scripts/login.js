/* Used to check if the user is already logged in so that
	he can be redirected to the board page.
	This is made possible by checking the value remember me in 
	the login process */

if (isLoggedIn(getCookie("remember"))) {
	$("#alreadyLoggedIn").modal();
	let userName = getCookie("remember");
	var modal = $("#alreadyLoggedIn");
	modal.find(".modal-title").text("You are already signed in as : " + userName);
	modal.find(".modal-body").text("Would you like to go to your board ?");
}
/* Javascrtip media qerey to disable the popovers on small screens
 as they get in the way of the input box */
if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
}

/* Login button is pressed, then we validate the inputs, if the inputs 
	are invalid we set their background to red. Then both the email and the password 
	are used to create a uuid using the sha256 algorithm, using th uuid we search in the 
	local storage if uuid mathces some key then we check if both the email and password 
	are the same, if they are corret then we validate the user and redirect to board.
	If the user marks the checkbox remember me a cookie is set so that it does not need to
	introduce again their credentials. This process is used to emmualte sercure server
	side login  */
$("#heroRegister").click(function() {
	let email = $("#emailInput").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	} else {
		$("#emailInput").addClass("incorrectFormInput");
		$("#emailInput").val("name@domain.extension");
		return;
	}
	let password = $("#passwordInput").val();
	if (password.lenght < 8) {
		$("#passwordInput").addClass("incorrectFormInput");
		return;
	}
	sha256(email.concat(password))
		.then(hash => {
			sessionStorage.setItem("1", hash);
		})
		.then(() => {
			let uuidInput = sessionStorage.getItem("1");
			let userInfo = checkUser(uuidInput, email, password);
			if (userInfo == null) {
				$("#userDoesNotexist").modal();
				return;
			}
			let checkbox = $("#checkboxInput:checked").val();
			if (checkbox == "on") {
				document.cookie = `remember=${userInfo.userName}; expires=Thu, 20 Dec 2019 12:00:00 UTC`;
			}
			location.href = "board.html";
		});
});
/* Auxiliary function that validates if the input values with, match those 
	that are in the local storage. 
	Returns JSON objtect*/
function checkUser(uuidInput, email, password) {
	let uuid = localStorage.getItem(uuidInput);
	if (uuid == null) {
		return null;
	}
	let JSONObject = JSON.parse(uuid);
	if (JSONObject.userEmail != email || JSONObject.userPassword != password) {
		return null;
	}
	return JSONObject;
}

/* Auxiliary function used to check is the cookie remeber me has been set or not */
function isLoggedIn(value) {
	if (value == "") {
		return false;
	} else if (value != null) {
		return true;
	}
	return false;
}
/* function used to return the value of a cookie by entering a cookie name */
function getCookie(cookiename) {
	// Get name followed by anything except a semicolon
	var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
	// Return everything after the equal sign, or an empty string if the cookie name not found
	return decodeURIComponent(
		!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
	);
}
/* Auxiliary function used to perform the hash encoding of the input
	values to emmulate a server side secure storage */
async function sha256(message) {
	// encode as UTF-8
	const msgBuffer = new TextEncoder("utf-8").encode(message);

	// hash the message
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

	// convert ArrayBuffer to Array
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	// convert bytes to hex string
	const hashHex = hashArray
		.map(b => ("00" + b.toString(16)).slice(-2))
		.join("");
	return hashHex;
}
