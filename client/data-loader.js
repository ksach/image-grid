var ksDataLoader = (function () {
	
	function get(url, callback, error) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.addEventListener('load', function() {
			callback(request.responseText)
		});
		request.addEventListener('error', function() {
			error(request.statusText)
		});
		request.send();
	}
	 
	return {
		loadData: get
	};
	
})();