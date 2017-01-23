var ksGrid = (function () {
	var service = {};

	service.initializeGrid = function (container, data) {
		var boxes = [];
		var node, i, box;
		for (i = 0; i < data.length; i++) {
			node = document.createElement('div');
			node.className = 'box';
			node.setAttribute('id', i);
			node.setAttribute('style', 'background: gray; order: ' + i);
			node.setAttribute('draggable', 'true');
			node = container.appendChild(node);
			box = {
				node: node,
				imageUrl: data[i],
				imageLoaded: false,
				id: i
			};
			boxes.push(box);
		}
		return ksLinkedList.linkedListFromArray(boxes);
	};

	service.getInitialBoxPositions = function(boxes) {
		var i;
		for (i = 0; i < boxes.length; i++) {
			boxes[i].x = boxes[i].node.offsetLeft;
			boxes[i].y = boxes[i].node.offsetTop;
		}
	};

	service.updateFlexboxOrder = function(movedBoxes, dragBox) {
		var i;
		for (i = 0; i < movedBoxes.length; i++) {
			movedBoxes[i].node.style.order = movedBoxes[i].rank;
		}
		dragBox.node.style.order = dragBox.rank;
	};

	service.animateDrop = function(dragBox, ev) {
		var start = {
			x: ev.pageX - ev.dataTransfer.getData('offsetX'),
			y: ev.pageY - ev.dataTransfer.getData('offsetY')
		};
		dragBox.x = dragBox.node.offsetLeft;
		dragBox.y = dragBox.node.offsetTop;
		var duration = 500;
		ksAnimate.animateFrom(dragBox.node, start, duration);
	};

	service.animateBoxPositions = function(movedBoxes) {
		var i, box, start, end;

		for (i = 0; i < movedBoxes.length; i++) {
			box = movedBoxes[i];
			start = { x: box.x, y: box.y };
			end = { x: box.node.offsetLeft, y: box.node.offsetTop };
			box.x = end.x;
			box.y = end.y;
			if (start.x === end.x && start.y === end.y) {
				continue;
			}
			if (start.x !== end.x) {
				if (start.y < end.y) {
					start.x = end.x - box.node.clientWidth;
					start.y = end.y;
				} else if (start.y > end.y) {
					start.x = end.x + box.node.clientWidth;
					start.y = end.y;
				}
			}
			var duration = 800;
			ksAnimate.animateFrom(box.node, start, duration);
		}
	}

	return service;
		
})();
