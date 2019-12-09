/* Javascrtip media qerey to disable the popovers on small screens
 as they get in the way of the input box */

if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
}

/* Fisrt register hero section */
/* Add a on the local storage the value email so that when we redirect that value 
	does not need to be written again */

$("#heroRegister").click(function() {
	let email = $("#heroEmailFormRegister").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		localStorage.setItem("email", email);
		location.href = "signup.html";
	} else {
		$("#heroEmailFormRegister").val("You dead");
	}
});
/* Second register above footer */

/* Add a on the local storage the value email so that when we redirect that value 
	does not need to be written again */
$("#heroRegister2").click(function() {
	let email = $("#heroEmailFormRegister2").val();
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		localStorage.setItem("email", email);
		location.href = "signup.html";
	} else {
		$("#heroEmailFormRegister2").val("Email must be name@domain.extension");
	}
});
