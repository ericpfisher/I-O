// popup.js
document.addEventListener("DOMContentLoaded", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tab = tabs[0];
		chrome.tabs.sendMessage(tab.id, {data: "log stuff"}, function(response) {
			console.log(response.data);
			document.getElementById("tech").value = response.tech;
			document.getElementById("user").value = response.user;
			document.getElementById("inc").value = response.ticket;
		})
	})
});


var xhr = new XMLHttpRequest();
var iosubmit = document.getElementById("iosubmit");
var radios = document.getElementsByName("inorout");

iosubmit.addEventListener("click", function(event) {
	event.preventDefault();
	console.log("Stopped click");
	var radio = null;
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			radio = radios[i].value;
			break;
		}
	}
	xhr.open("POST", "http://10.3.35.30/lco/internal/io.php", true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("tech="+document.getElementById("tech").value+"&user="+document.getElementById("user").value+"&inc="+document.getElementById("inc").value+"&inorout="+radio);
	console.log("In or out: "+radio);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			document.body.innerHTML = xhr.responseText;
		}
	}

});
var inradio = document.getElementById("in");
var outradio = document.getElementById("out");
var passwords = document.getElementById("passwords");
inradio.addEventListener("click", function() {
	passwords.disabled = false;
})
outradio.addEventListener("click", function() {
	passwords.checked = false;
	passwords.disabled = true; 
});
	