if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
}

if (localStorage.getItem("email") != null) {
	$("#emailInput").val(localStorage.getItem("email"));
	localStorage.removeItem("email");
}
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
