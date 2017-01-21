var ksLinkedList = (function () {

	function removeItem(item) {
		var nextItem = item.next;
		var previousItem = item.previous;
		if (nextItem) {
			nextItem.previous = previousItem;
		}
		if (previousItem) {
			previousItem.next = nextItem;
		}
	}

	function updateRanks(itemToMove, targetItem, direction) {
		var movedItems = [];
		var nextKey = direction === -1 ? 'next' : 'previous';
		var previousKey = direction === -1 ? 'previous' : 'next';

		var nextItem = itemToMove[nextKey];
		while (true) {
			nextItem.rank += direction;
			movedItems.push(nextItem);
			if (nextItem.id === targetItem.id) {
				break;
			}
			nextItem = nextItem[nextKey];
		}
		itemToMove.rank = targetItem.rank - direction;
		return movedItems;
	}

	function insertItem(itemToMove, targetItem, direction) {
		var nextKey = direction === -1 ? 'next' : 'previous';
		var previousKey = direction === -1 ? 'previous' : 'next';

		itemToMove[nextKey] = targetItem[nextKey];
		itemToMove[previousKey] = targetItem;
		if (itemToMove[nextKey]) {
			itemToMove[nextKey][previousKey] = itemToMove;
		}
		targetItem[nextKey] = itemToMove;
	}

	return {
		linkedListFromArray: function (itemArray) {
			var linkedList = [];
			var i;
			if (!itemArray || !itemArray.length) {
				return linkedList;
			}
			itemArray[0].rank = 0;
			linkedList.push(itemArray[0]);
			for (i = 1; i < itemArray.length; i++) {
				itemArray[i].rank = i;
				itemArray[i].previous = itemArray[i - 1];
				itemArray[i].previous.next = itemArray[i];
				linkedList.push(itemArray[i]);
			}
			return linkedList;
		},
		moveItem: function (itemToMove, targetItem) {
			if (itemToMove.rank === targetItem.rank) {
				return;
			}

			var direction = itemToMove.rank < targetItem.rank ? -1 : 1;

			removeItem(itemToMove);
			var movedItems = updateRanks(itemToMove, targetItem, direction);
			insertItem(itemToMove, targetItem, direction);

			return movedItems;
		}
	};
})();