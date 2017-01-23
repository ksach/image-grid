var ksLazyLoader = (function () {
	var service = {};

	var boxes = [];
	var boxesByRank = {};
	var scrollTop, scrollHeight, scrollFraction, documentHeight;
	var deferred = false;
	var numLoaded;
	var loading = false;

	window.addEventListener('scroll', lazyLoad);
	window.addEventListener('resize', lazyLoad);

	function lazyLoad() {
		if (numLoaded === boxes.length) {
			window.removeEventListener('scroll', lazyLoad);
			window.removeEventListener('resize', lazyLoad);
			return;
		}
		if (loading && !deferred) {
			deferred = true;
			window.setTimeout(function() {
				lazyLoad();
				deferred = false;
			}, 100);
			return;
		}
		if (!loading) {
			loading = true;
			loadImagesInView();
			window.setTimeout(function() {
				loading = false;
			}, 100);
		}
	}

	function updateBoxesByRank(movedBoxes) {
		var i;
		for (i = 0; i < movedBoxes.length; i++) {
			boxesByRank[movedBoxes[i].rank] = movedBoxes[i];
		}
	}

	function loadImagesInView() {
		var foundFirst = false;
		updateScrollStatus();
		var rank = Math.floor(boxes.length * scrollFraction) - 10;
		if (rank < 0) {
			rank = 0;
		}
		var box = boxesByRank[rank];
		while (box) {
			if (!foundFirst && isBoxVisible(box)) {
				foundFirst = true;
			}
			if (foundFirst) {
				if (!isBoxVisible(box)) {
					break;
				}
				if (!box.imageLoaded) {
					
					box.node.setAttribute('style', 'background: gray no-repeat center url("' + box.imageUrl + '"); background-size: contain; order: ' + box.rank);
					box.imageLoaded = true;
					numLoaded++;
				}
			}
			box = box.next;
		}
	}

	function isBoxVisible(box) {
		var documentBottom = scrollTop + documentHeight;
		var boxBottom = box.node.offsetTop + box.node.clientHeight;
		return box.node.offsetTop <= documentBottom && boxBottom >= scrollTop; 
	}

	function updateScrollStatus() {
		var docElement = document.documentElement;
		var body = document.body;
		documentHeight = docElement.clientHeight;
		scrollTop = docElement.scrollTop || body.scrollTop;
		scrollHeight = docElement.scrollHeight || body.scrollHeight;
		scrollFraction = scrollTop / (scrollHeight - documentHeight);
	}
	 
	service.setBoxes = function(inputBoxes) {
		boxes = inputBoxes;
		numLoaded = 0;
		updateBoxesByRank(boxes);
		loadImagesInView();
	};

	service.updateMovedBoxes = updateBoxesByRank;
	
	return service;
	
})();