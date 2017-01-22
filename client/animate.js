var ksAnimate = (function () {
	var frameRate = 50;

	function animateTick(node, start, end, delta) {
		var next = { x: start.x + delta.x, y: start.y + delta.y };
		if (delta.x * next.x < delta.x * end.x || delta.y * next.y < delta.y * end.y) {
			node.style.transform = 'translate(' + next.x + 'px, ' + next.y + 'px)';
			setTimeout(function () {
				animateTick(node, next, end, delta);
			}, 1000 / frameRate);
		}
		else {
			node.style.transform = 'translate(' + end.x + 'px, ' + end.y + 'px)';
		}
	}

	return {
		animateFrom: function (node, start, duration) {
			var end = { x: node.offsetLeft, y: node.offsetTop };
			var startTranslation = {
				x: start.x - end.x,
				y: start.y - end.y
			};
			var endTranslation = { x: 0, y: 0 };
			node.style.transform =
				'translate(' + startTranslation.x + 'px, ' + startTranslation.y + 'px)';
			var numFrames = duration / frameRate;
			var delta = {
				x: -startTranslation.x / numFrames,
				y: -startTranslation.y / numFrames
			};

			animateTick(node, startTranslation, endTranslation, delta);
		}
	};
})();