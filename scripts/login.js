$("#heroRegister").click(function() {
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
	sha256(email.concat(password)).then(hash => {
		sessionStorage.setItem(1, hash);
	});

	var uuid = getCookie("userID");

	if (uuid != sessionStorage.getItem("1")) {
		console.log("fucke you");
		return;
	}

	let JSONObject = JSON.parse(localStorage.getItem(uuid));
	if (JSONObject.userEmail != email || JSONObject.userPassword != password) {
		console.log("fuke you");
		return;
	}
	location.href = "board.html";
});

function getCookie(cookiename) {
	// Get name followed by anything except a semicolon
	var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
	// Return everything after the equal sign, or an empty string if the cookie name not found
	return decodeURIComponent(
		!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
	);
}

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
