$("[data-toggle=popover]").popover();

$("#heroRegister").click(function() {
	let email = $("#heroEmailFormRegister").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		localStorage.setItem("email", email);
		location.href = "signup.html";
	} else {
		$("#heroEmailFormRegister").val("You dead");
	}
});
