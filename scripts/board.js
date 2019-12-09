if (window.matchMedia("(min-width: 992px)").matches) {
	$("[data-toggle=popover]").popover();
	$('[data-toggle="tooltip"]').tooltip();
}
$("#logOutButton").click(function() {
	sessionStorage.removeItem("1");
	location.href = "index.html";
});
var parent;
var savedLists = [];
function ListSetup() {
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
	$("#changeTitle").click(function() {
		let modal = $("#ListSettings");
		modal.find("#ListTitle").prop("readonly", false);
	});
	$("#saveListTitle").click(function() {
		let modal = $("#ListSettings");
		let listNewTitle = modal.find("#ListTitle").val();
		parent
			.parents(".ListHeader")
			.children(".ListHeaderText")
			.text(listNewTitle);
		$("#ListSettings").modal("hide");
	});
	$(".SaveListToggle").click(".appDetails", function() {
		parent = $(this);
		$("#SaveList").modal();
	});
	$("#saveList").click(function() {
		let listTitle = parent
			.parents(".ListHeader")
			.children(".ListHeaderText")
			.text();
		savedLists.push(listTitle);
		parent.parents(".List").remove();
		$("#SaveList").modal("hide");
	});
	$(".removeListToggle").click(".appDetails", function() {
		parent = $(this);
		$("#RemoveList").modal();
	});
	$("#removeList").click(function() {
		parent.parents(".List").remove();
		$("#RemoveList").modal("hide");
	});
}
ListSetup();
//AddList addTitle ListaddTitle
$("#AddListToggle").click(function() {
	$("#AddList").modal();
});
$("#addList").click(function() {
	let modal = $("#AddList");
	let listTitle = modal.find("#ListaddTitle").val();
	let list = `<div class="List bg-color-green "><div class="ListHeader bg-color-green text-color-white-bone"><h4 class="ListHeaderText">${listTitle}</h4><i class="fas fa-bars ListOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="-220,0" ></i> <div class="dropdown-menu"> <div class="dropdown-item SaveListToggle"> Save List</div><div class="dropdown-item removeListToggle">Remove List </div><div class="dropdown-item ListSettingsToggle"> List Settings </div></div> </div> <div class="Events"> </div><div class="ListFooter bg-color-pine-green text-color-white-bone"><i class="fas fa-plus ListFooterOption"></i></div></div>`;
	$("#board").append(list);
	ListSetup();
	interactionUI();
	$("#AddList").modal("hide");
});
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
$(".searchElement").click(function() {
	$(this).removeClass("searchedElement");
});
// addEventToggle

$(".addEventToggle").click(".appDetails", function() {
	parent = $(this);
	$("#AddEvent").modal();
});

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
//reload lists
$("#reloadLists").click(function() {
	$("#reloadModal").modal();
});
// EditEvent EditEvent
function EventOptions() {
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

	$("#changeDescription").click(function() {
		let modal = $("#EditEventModal");
		modal.find("#EventDescription").prop("readonly", false);
	});

	$("#changeDate").click(function() {
		let modal = $("#EditEventModal");
		modal.find("#EventDate").prop("readonly", false);
	});

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
	$("#removeEvent").click(function() {
		parent.parents(".card").remove();
		$("#EditEventModal").modal("hide");
	});

	$(".priority").click(function() {
		if ($(this).hasClass("bg-success")) {
			$(this).toggleClass("bg-success");
			$(this).addClass("bg-warning");
		} else if ($(this).hasClass("bg-warning")) {
			$(this).toggleClass("bg-warning");
			$(this).addClass("bg-danger");
		} else if ($(this).hasClass("bg-danger")) {
			$(this).toggleClass("bg-danger");
			$(this).addClass("bg-secondary");
		} else if ($(this).hasClass("bg-secondary")) {
			$(this).toggleClass("bg-secondary");
			$(this).addClass("bg-success");
		}
	});
}
EventOptions();
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
interactionUI();
