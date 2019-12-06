$("[data-toggle=popover]").popover();

if (localStorage.getItem("email") != null) {
	$("#emailInput").val(localStorage.getItem("email"));
	localStorage.removeItem("email");
}
$("#heroRegister").click(function() {
	let name = $("#usernameInput").val();
	if (name === null) {
		$("#usernameInput").val("Must be a valid username");
		return;
	}
	let email = $("#emailInput").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	} else {
		$("#emailInput").addClass("incorrectFormInput");
		return;
	}
	let password = $("#passwordInput").val();
	if (password.lenght < 8) {
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
});

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
