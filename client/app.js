(function () {
	var grid = document.querySelector('.grid');
	var boxes;

	ksDataLoader.loadData('./data/vegetables.json', function(response) {
		var data = JSON.parse(response).imageUrls;
		boxes = ksGrid.initializeGrid(grid, data);
		ksLazyLoader.setBoxes(boxes);
		ksEventHandler.initializeListeners(dropCallback);
		setTimeout(function() {
			ksGrid.getInitialBoxPositions(boxes);
		}, 0);
	}, function(error) { console.log(error); });

	function dropCallback(dragId, targetId, ev) {
		var dragBox = boxes[dragId];
		var targetBox = boxes[targetId];
		var movedBoxes = ksLinkedList.moveItem(dragBox, targetBox);
		ksGrid.updateFlexboxOrder(movedBoxes, dragBox);
		ksGrid.animateBoxPositions(movedBoxes);
		ksGrid.animateDrop(dragBox, ev);
		ksLazyLoader.updateMovedBoxes(movedBoxes);
	}
})();