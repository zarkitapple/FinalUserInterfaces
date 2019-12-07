if (isLoggedIn(getCookie("remember"))) {
	$("#alreadyLoggedIn").modal();
	let userName = getCookie("remember");
	var modal = $("#alreadyLoggedIn");
	modal.find(".modal-title").text("You are already signed in as : " + userName);
	modal.find(".modal-body").text("Would you like to go to your board ?");
}
if (window.matchMedia("(min-width: 1000px)").matches) {
	$("[data-toggle=popover]").popover();
}
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

function isLoggedIn(value) {
	if (value == "") {
		return false;
	} else if (value != null) {
		return true;
	}
	return false;
}

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
