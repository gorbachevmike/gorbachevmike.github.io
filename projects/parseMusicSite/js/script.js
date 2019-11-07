var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://api.deezer.com/chart");
xhr.setRequestHeader("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "0681a163f9msh4e6138dfc479579p1acdecjsn5ddba8e31d26");

xhr.send(data);