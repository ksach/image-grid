var ksAnimate = (function() {
	var frameRate = 50;

	function animateTick(node, start, end, delta) {
		var next = {x: start.x + delta.x, y: start.y + delta.y};
		if (delta.x * next.x < delta.x * end.x) {
			node.style.transform = 'translate(' + next.x + 'px, ' + next.y + 'px)';
			setTimeout(function() {
				animateTick(node, next, end, delta);
			}, 1000 / frameRate);
		}
		else {
			node.style.transform = 'translate(' + end.x + 'px, ' + end.y + 'px)';
		}
	}

	return {
		animatedTranslate: function (node, start, end, duration) {
			node.style.transform = 'translate(' + start.x + 'px, ' + start.y + 'px)';
			var numFrames = duration / frameRate;
			var delta = {x: (end.x - start.x) / numFrames,
				y: (end.y - start.y) / numFrames};
			
			animateTick(node, start, end, delta);
		}
	};
})();