/* Javascrtip media qerey to disable the popovers on small screens
 as they get in the way of the input box */
if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
	$('[data-toggle="tooltip"]').tooltip();
}
/* Button log-out is pressed redirect to index page */
$("#logOutButton").click(function() {
	sessionStorage.removeItem("1");
	location.href = "index.html";
});
/* This varible is used to store the caller element when toggling a modal */
var parent;
/* This list will be used to store the saved lists titles */
savedLists = [];
/* This function adds all the functionality regarding the dropdown menu of the lists */
function ListSetup() {
	/* Toggle the list settings modal, inside the modal 
		the current title of the list is displayed*/
	$(".ListSettingsToggle").click(".appDetails", function() {
		let listTitle = $(this)
			.parents(".ListHeader")
			.children(".ListHeaderText")
			.text();
		parent = $(this);
		$("#ListSettings").modal();
		let modal = $("#ListSettings");
		modal.find("#ListTitle").val(listTitle);
	});
	/* Inside the list settings modal allow the title to be changed */
	$("#changeTitle").click(function() {
		let modal = $("#ListSettings");
		modal.find("#ListTitle").prop("readonly", false);
	});
	/* Inside the the list settings modal save the changes made to the list */
	$("#saveListTitle").click(function() {
		let modal = $("#ListSettings");
		let listNewTitle = modal.find("#ListTitle").val();
		parent
			.parents(".ListHeader")
			.children(".ListHeaderText")
			.text(listNewTitle);
		$("#ListSettings").modal("hide");
	});
	/* Toggle the list save modal */
	$(".SaveListToggle").click(".appDetails", function() {
		parent = $(this);
		$("#SaveList").modal();
	});
	/* inside the list save modal save the list and remove from the boarc */
	$("#saveList").click(function() {
		let listTitle = parent
			.parents(".ListHeader")
			.children(".ListHeaderText")
			.text();
		savedLists.push(listTitle);
		parent.parents(".List").remove();
		$("#SaveList").modal("hide");
	});
	/* Toggle the remove list modal */
	$(".removeListToggle").click(".appDetails", function() {
		parent = $(this);
		$("#RemoveList").modal();
	});
	/* Inside the remove list modal remove the list from the board */
	$("#removeList").click(function() {
		parent.parents(".List").remove();
		$("#RemoveList").modal("hide");
	});
	/* Toggle the add event modal */
	$(".addEventToggle").click(".appDetails", function() {
		parent = $(this);
		$("#AddEvent").modal();
	});
}
/* Call the function so that it is executed the first time the script loads */
ListSetup();
/* Inside the add event modal add an event to the list, by adding a description and
		a date */
$("#addEvent").click(function() {
	let modal = $("#AddEvent");
	let eventDescription = modal.find("#EventaddDescription").val();
	let eventDate = modal.find("#EventaddDate").val();
	let event = `<div class="card border-0"><div class="card-header"><div class="priority bg-success" data-toggle="tooltip" data-container="body" data-placement="right" title="Click to change task priority"></div><h5 class="searchElement card-text">${eventDescription}</h5></div><div class="card-body EventItems"><div class="EventDateComments"><div class="badge date searchElement EventItem mr-3">${eventDate}</div><i class="fas fa-comment EventItem"> </i><span class="badge badge-success EventItem">0</span></div><i class="fas fa-edit EditEvent EventItem"></i></div></div> `;
	parent
		.parents(".List")
		.find(".Events")
		.append(event);
	EventOptions();
	$("#AddEvent").modal("hide");
});
/* Toggle the add list modal */
$("#AddListToggle").click(function() {
	$("#AddList").modal();
});
/* Inside the add list modal add a new list, by adding a title to the list */
$("#addList").click(function() {
	let modal = $("#AddList");
	let listTitle = modal.find("#ListaddTitle").val();
	let list = `<div class="List bg-color-green "><div class="ListHeader bg-color-green text-color-white-bone"><h4 class="ListHeaderText">${listTitle}</h4><i class="fas fa-bars ListOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="-220,0" ></i> <div class="dropdown-menu"> <div class="dropdown-item SaveListToggle"> Save List</div><div class="dropdown-item removeListToggle">Remove List </div><div class="dropdown-item ListSettingsToggle"> List Settings </div></div> </div> <div class="Events"> </div><div class="ListFooter bg-color-pine-green text-color-white-bone addEventToggle"><i class="fas fa-plus ListFooterOption"></i></div></div>`;
	$("#board").append(list);
	ListSetup();
	interactionUI();
	$("#AddList").modal("hide");
});
/* When the search toggle is pressed, go through the nodes marked as search
	elements and if the input string matches the nodes text add a css class
	which changes the background and text to highlight them as marked*/
$("#searchToggle").click(function() {
	let searchterm = $("#search").val();
	if (searchterm == 0) {
		return;
	}
	let listText = $("body").find(".searchElement");
	for (ii = 0; ii < listText.length; ii++) {
		let element = $("body").find(".searchElement")[ii];
		let elementText = $(element).text();
		if (elementText.toLowerCase().search(searchterm.toLowerCase()) != -1) {
			$(element).addClass("searchedElement");
		}
	}
});
/* Remove the css class of the element which has been marked by the search */
$(".searchElement").click(function() {
	$(this).removeClass("searchedElement");
});
/* Reload the lists. Basic reload of the html so that all changes are reverted */
$("#reloadLists").click(function() {
	$("#reloadModal").modal();
});
/* This function adds all the functionality regarding the editing if the events*/
function EventOptions() {
	/* Toogle the event edit modal, inside the modal 
		the current values of the event are displayed*/
	$(".EditEvent").click(function() {
		$("#EditEventModal").modal();
		let modal = $("#EditEventModal");
		parent = $(this);
		let eventdescription = parent
			.parents(".card")
			.find(".card-text")
			.text()
			.trim();
		let eventdate = parent
			.parents(".card")
			.find(".date")
			.text()
			.trim();
		modal.find("#EventDescription").val(eventdescription);
		modal.find("#EventDate").val(eventdate);
	});
	/* inside the modal allow the event description to be changed */
	$("#changeDescription").click(function() {
		let modal = $("#EditEventModal");
		modal.find("#EventDescription").prop("readonly", false);
	});
	/* inside the modal allow the event date to be changed */
	$("#changeDate").click(function() {
		let modal = $("#EditEventModal");
		modal.find("#EventDate").prop("readonly", false);
	});
	/* Save the current changes made to the event */
	$("#SaveEvent").click(function() {
		let modal = $("#EditEventModal");
		let newDescription = modal.find("#EventDescription").val();
		let newDate = modal.find("#EventDate").val();
		parent
			.parents(".card")
			.find(".card-text")
			.text(newDescription);
		parent
			.parents(".card")
			.find(".date")
			.text(newDate);
		$("#EditEventModal").modal("hide");
	});
	/* inside the modal allow for the removal of the event */
	$("#removeEvent").click(function() {
		parent.parents(".card").remove();
		$("#EditEventModal").modal("hide");
	});
	/* This function sets the color priority of the events
		it allows you to cycle between the different priorities*/
	$(".priority").click(function() {
		if ($(this).hasClass("bg-primary")) {
			$(this).toggleClass("bg-primary");
			$(this).addClass("bg-warning");
		} else if ($(this).hasClass("bg-warning")) {
			$(this).toggleClass("bg-warning");
			$(this).addClass("bg-danger");
		} else if ($(this).hasClass("bg-danger")) {
			$(this).toggleClass("bg-danger");
			$(this).addClass("bg-secondary");
		} else if ($(this).hasClass("bg-secondary")) {
			$(this).toggleClass("bg-secondary");
			$(this).addClass("bg-primary");
		}
	});
}
/* Call the function so that it is executed the first time the script loads */
EventOptions();
/* This function gives the drag and drop functionality using JQUERY.UI 
	Events can be dragged and dropped between list and lists can be moved around */
function interactionUI() {
	$(".Events").sortable({
		helper: "clone",
		cancel: ".ListHeader",
		connectWith: ".Events",
		scroll: false,
		appendTo: "body",
		forceHelperSize: true,
		tolerance: "pointer",
		zIndex: 10000
	});

	$("#board").sortable({
		helper: "clone",
		scroll: false,
		appendTo: "body",
		forceHelperSize: true,
		tolerance: "pointer",
		opacity: 1,
		zIndex: 10000
	});
}
/* Call the function so that it is executed the first time the script loads */
interactionUI();
