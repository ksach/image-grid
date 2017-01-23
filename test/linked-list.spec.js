(function() {
	var expect = chai.expect;

	describe("Linked List", function() {

		it('linked list from array should have ranks', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var i;
			var item = myLinkedList[0];
			for (i = 0; i < myArray.length; i++) {
				expect(item.rank).to.equal(i);
				item = item.next;
			}
		});

		it('reverse linked list from array should have ranks', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var i;
			var item = myLinkedList[myArray.length - 1];
			for (i = myArray.length - 1; i >= 0; i--) {
				expect(item.rank).to.equal(i);
				item = item.previous;
			}
		});

		it('linked list should remove item', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var item = myLinkedList[0].next.next;
			ksLinkedList.removeItem(item);
			expect(myLinkedList[0].next.next.id).to.equal(3);
		});

		it('linked list should insert item after', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var target = myLinkedList[0].next;
			var newItem = {id: 5};
			ksLinkedList.insertItem(newItem, target, 1);
			expect(myLinkedList[0].next.next.id).to.equal(5);
		});

		it('linked list should insert item before', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var target = myLinkedList[0].next;
			var newItem = {id: 5};
			ksLinkedList.insertItem(newItem, target, -1);
			expect(myLinkedList[0].next.id).to.equal(5);
		});

		it('linked list should update ranks', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var item = myLinkedList[0].next.next;
			var lastItem = myArray[myArray.length - 1];
			ksLinkedList.removeItem(item);
			ksLinkedList.updateRanks(item, lastItem, 1);
			item = myArray[0];
			for (i = 0; i < myArray.length - 1; i++) {
				expect(item.rank).to.equal(i);
				item = item.next;
			}
		});

		it('linked list should move item', function() { 
			var myArray = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}];
			var myLinkedList = ksLinkedList.linkedListFromArray(myArray);
			var item = myLinkedList[0].next;
			var target = item.next.next.next;
			ksLinkedList.moveItem(item, target);
			item = myArray[0];
			expect(myLinkedList[0].id).to.equal(0);
			expect(myLinkedList[0].next.id).to.equal(2);
			expect(myLinkedList[0].next.next.id).to.equal(3);
			expect(myLinkedList[0].next.next.next.id).to.equal(4);
			expect(myLinkedList[0].next.next.next.next.id).to.equal(1);
		});

		
	});
})();
