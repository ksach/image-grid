var ksEventHandler = (function () {
	var service = {};
	var dropCallback;

	service.initializeListeners = function(callback) {
		document.addEventListener("dragstart", drag, false);
		document.addEventListener("dragover", allowDrop, false);
		document.addEventListener("dragenter", highlightDrop, false);
		document.addEventListener("dragleave", endHighlightDrop, false);
		document.addEventListener("drop", drop, false);
		document.addEventListener("dragend", endDrag, false);
		dropCallback = callback;
	};

	function allowDrop(ev) {
		ev.preventDefault();
	}

	function highlightDrop(ev) {
		ev.preventDefault();
		if (ev.target.className === 'box') {
			ev.target.className = 'box highlight';
		}
	}

	function endHighlightDrop(ev) {
		ev.preventDefault();
		if (ev.target.className === 'box highlight') {
			ev.target.className = 'box';
		}
	}

	function drag(ev) {
		ev.dataTransfer.setData('id', ev.target.id);
		ev.dataTransfer.setData('offsetX', ev.pageX - ev.target.offsetLeft);
		ev.dataTransfer.setData('offsetY', ev.pageY - ev.target.offsetTop);
		ev.target.style.opacity = 0.7;
	}

	function endDrag(ev) {
		ev.preventDefault();
		ev.target.style.opacity = 1;
	}

	function drop(ev) {
		ev.preventDefault();
		if (ev.target.className === 'box highlight') {
			ev.target.className = 'box';
			dropCallback(ev.dataTransfer.getData('id'), ev.target.id, ev);
		}
	}

	return service;
		
})();
