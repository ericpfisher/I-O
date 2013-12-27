// content.js
function logStuff(technician, user, ticket) {
	console.log(technician + " - " + user + " - " + ticket);
};

chrome.runtime.onMessage.addListener(function(message, sender, response) {
	if (message.data == "log stuff") {
		var technician = null;
		var user_name = null;
		var ticket_num = null;
		// get value of assigned to field from ticket page
		if (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_display.original.incident.assigned_to')) {
			technician = (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_display.original.incident.assigned_to').value);
		} else if (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_display.original.sc_task.assigned_to')) {
			technician = (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_display.original.sc_task.assigned_to').value);
		} else {
			technician = "Not assigned?";
		}
		// get value of user
		if (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_display.incident.caller_id')) {
			user_name = (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_display.incident.caller_id').value);
		} else if (document.getElementById('gsft_main').contentWindow.document.getElementById('incident.caller_id_label')) {
			user_name = (document.getElementById('gsft_main').contentWindow.document.getElementById('incident.caller_id_label').value);
		} else if (document.getElementById('gsft_main').contentWindow.document.getElementsByClassName("questionsetreference").length > 0) {
			user_name = (document.getElementById('gsft_main').contentWindow.document.getElementsByClassName("questionsetreference")[0].value);
		} else {
			user_name = "No user.";
		}
		// get value of ticket number
		if (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_readonly.incident.number')) {
			ticket_num = (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_readonly.incident.number').value);
		} else if (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_readonly.sc_task.number')) {
			ticket_num = (document.getElementById('gsft_main').contentWindow.document.getElementById('sys_readonly.sc_task.number').value);
		} else {
			ticket_num = "No INC.";
		}
		logStuff(technician, user_name, ticket_num);
		response({data: "Message received.",tech: technician, user: user_name, ticket: ticket_num});
	}
});
