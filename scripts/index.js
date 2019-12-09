if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
}

$("#heroRegister").click(function() {
	let email = $("#heroEmailFormRegister").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		localStorage.setItem("email", email);
		location.href = "signup.html";
	} else {
		$("#heroEmailFormRegister").val("You dead");
	}
});
$("#heroRegister2").click(function() {
	let email = $("#heroEmailFormRegister2").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		localStorage.setItem("email", email);
		location.href = "signup.html";
	} else {
		$("#heroEmailFormRegister2").val("Email must be name@domain.extension");
	}
});
