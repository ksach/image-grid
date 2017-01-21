(function() {
	var grid = document.querySelector('.grid');
	var data = ['images/1.png',
		'images/2.png',
		'images/3.png',
		'images/4.png',
		'images/5.png',
		'images/6.png',
		'images/7.png',
		'images/8.png',
		'images/9.png',
		'images/10.png',
		'images/11.png',
		'images/12.png'
		];
	var boxes = initializeGrid(grid, data);
	initializeEventListeners();

	function initializeEventListeners() {
		document.addEventListener("dragstart", drag, false);
		document.addEventListener("dragover", allowDrop, false);
		document.addEventListener("dragenter", highlightDrop, false);
		document.addEventListener("dragleave", endHighlightDrop, false);
		document.addEventListener("drop", drop, false);
		document.addEventListener("dragend", endDrag, false);
	}

	function initializeGrid(container, data) {
		var boxes = [];
		var node, i, box;
		for (i = 0; i < data.length; i++) {
			node = document.createElement('div');
			node.className = 'box';
			node.setAttribute('id', i);
			node.setAttribute('style', 'background: gray no-repeat center url("' + data[i] + '"); background-size: contain; order: ' + i);
			node.setAttribute('draggable', 'true');
			node = container.appendChild(node);
			box = {
				x: node.offsetLeft,
				y: node.offsetTop,
				node: node,
				rank: i,
				imageUrl: data[i],
				id: i
			};
			if (i > 0) {
				box.previous = boxes[i-1];
				box.previous.next = box;
			}
			boxes.push(box);
		} 
		return boxes;
	}

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

	function drop(ev) {
		ev.preventDefault();
		if (ev.target.className === 'box highlight') {
			ev.target.className = 'box';
			var dragBox = boxes[ev.dataTransfer.getData('id')];
			var targetBox = boxes[ev.target.id];
			moveBox(dragBox, targetBox);
			dropDragBox(dragBox, ev);
		}
	}

	function endDrag(ev) {
		ev.preventDefault();
		ev.target.style.opacity = 1;
	}

	function moveBox(dragBox, targetBox) {
		var movedBoxes = [];
		var nextBox, previousBox;
		var direction, nextKey, previousKey;

		if (dragBox.rank === targetBox.rank) {
			return;
		}

		if (dragBox.rank < targetBox.rank) {
			direction = -1;
			nextKey = 'next';
			previousKey = 'previous';
		} else {
			direction = 1;
			nextKey = 'previous';
			previousKey = 'next';
		}

		nextBox = dragBox[nextKey];
		previousBox = dragBox[previousKey];
		nextBox[previousKey] = previousBox;
		if (previousBox) {
			previousBox[nextKey] = nextBox;
		}
		while (true) {
			nextBox.rank += direction;
			nextBox.node.style.order = nextBox.rank;
			movedBoxes.push(nextBox);
			if (nextBox.id === targetBox.id) {
				break;
			}
			nextBox = nextBox[nextKey];
		}
		dragBox.rank = targetBox.rank - direction;
		dragBox.node.style.order = dragBox.rank;
		dragBox[nextKey] = targetBox[nextKey];
		dragBox[previousKey] = targetBox;
		if (dragBox[nextKey]) {
			dragBox[nextKey][previousKey] = dragBox;
		}
		targetBox[nextKey] = dragBox;
		
		updateBoxPositions(movedBoxes);
	}

	function dropDragBox(dragBox, ev) {
		var lastX = ev.pageX - ev.dataTransfer.getData('offsetX');
		var lastY = ev.pageY - ev.dataTransfer.getData('offsetY');
			
		dragBox.x = dragBox.node.offsetLeft;
		dragBox.y = dragBox.node.offsetTop;

		var start = {x: lastX - dragBox.x, y: lastY - dragBox.y};  
		ksAnimate.animatedTranslate(dragBox.node, start, {x: 0, y: 0}, 500);
	}

	function updateBoxPositions(movedBoxes) {
		var i;
		for (i = 0; i < movedBoxes.length; i++) {			
			var box = movedBoxes[i];
				
			var lastX = box.x;
			var lastY = box.y;
			
			box.x = box.node.offsetLeft;
			box.y = box.node.offsetTop;

			if (lastX === box.x && lastY === box.y) continue;

			if (lastY < box.y) {
				lastX = box.x - box.node.clientWidth;
				lastY = box.y;
			} else if (lastY > box.y) {
				lastX = box.x + box.node.clientWidth;
				lastY = box.y;
			}
			
			var start = {x: lastX - box.x, y: lastY - box.y};  

			ksAnimate.animatedTranslate(box.node, start, {x: 0, y: 0}, 800);
		}
	}
})();