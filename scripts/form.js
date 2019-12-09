/* Javascrtip media qerey to disable the popovers on small screens
 as they get in the way of the input box */

if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
}
/* Get the item email stored in the index page on the local storage */

if (localStorage.getItem("email") != null) {
	$("#emailInput").val(localStorage.getItem("email"));
	localStorage.removeItem("email");
}
/* when Register button is pressed perform form validation on 
	the inputs, then store the values as JSON securely using a sha256 algorithm.
	Then once the user has been registered redirect to the login page 
	If the inputs are set incorrectly we change the input background*/

$("#heroRegister").click(function() {
	let name = $("#usernameInput").val();
	if (name.length == 0) {
		$("#usernameInput").addClass("incorrectFormInput");
		$("#usernameInput").val("You must use a username");
		return;
	}
	let email = $("#emailInput").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	} else {
		$("#emailInput").addClass("incorrectFormInput");
		$("#emailInput").val("name@domain.extension");
		return;
	}
	let password = $("#passwordInput").val();
	if (password.length < 8) {
		$("#passwordInput").addClass("incorrectFormInput");
		return;
	}
	let checkbox = $("#checkboxInput:checked").val();
	if (checkbox != "on") {
		$("#chekboxText").addClass("incorrectCheckbox");
		return;
	}
	let JSONObject = {
		userName: name,
		userEmail: email,
		userPassword: password
	};
	let myJSON = JSON.stringify(JSONObject);
	sha256(email.concat(password)).then(hash => {
		localStorage.setItem(hash, myJSON);
	});
	location.href = "login.html";
});

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
