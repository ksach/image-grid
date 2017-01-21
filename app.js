(function () {
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
				imageUrl: data[i],
				id: i
			};
			boxes.push(box);
		}
		return ksLinkedList.linkedListFromArray(boxes);
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

	function endDrag(ev) {
		ev.preventDefault();
		ev.target.style.opacity = 1;
	}

	function drop(ev) {
		ev.preventDefault();
		if (ev.target.className === 'box highlight') {
			ev.target.className = 'box';
			var dragBox = boxes[ev.dataTransfer.getData('id')];
			var targetBox = boxes[ev.target.id];
			var movedBoxes = ksLinkedList.moveItem(dragBox, targetBox);
			updateFlexboxOrder(movedBoxes, dragBox);
			animateBoxPositions(movedBoxes);
			animateDrop(dragBox, ev);
		}
	}

	function updateFlexboxOrder(movedBoxes, dragBox) {
		var i;
		for (i = 0; i < movedBoxes.length; i++) {
			movedBoxes[i].node.style.order = movedBoxes[i].rank;
		}
		dragBox.node.style.order = dragBox.rank;
	}

	function animateDrop(dragBox, ev) {
		var start = {
			x: ev.pageX - ev.dataTransfer.getData('offsetX'),
			y: ev.pageY - ev.dataTransfer.getData('offsetY')
		}
		var duration = 500;
		ksAnimate.animateFrom(dragBox.node, start, duration);
		dragBox.x = dragBox.node.offsetLeft;
		dragBox.y = dragBox.node.offsetTop;
	}

	function animateBoxPositions(movedBoxes) {
		var i, box, start, end;

		for (i = 0; i < movedBoxes.length; i++) {
			box = movedBoxes[i];
			start = { x: box.x, y: box.y };
			end = { x: box.node.offsetLeft, y: box.node.offsetTop };
			if (start.x === end.x && start.y === end.y) {
				continue;
			}
			if (start.y < end.y) {
				start.x = end.x - box.node.clientWidth;
				start.y = end.y;
			} else if (start.y > end.y) {
				start.x = end.x + box.node.clientWidth;
				start.y = end.y;
			}
			var duration = 800;
			ksAnimate.animateFrom(box.node, start, duration);
			box.x = end.x;
			box.y = end.y;
		}
	}
})();