class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}


/**
 * push
 * unshift 
 * 
 * pop
 * shift 
 * 
 * get
 * set 
 * insert 
 * remove
 * 
 * reverse 
 */
class Linkedlist {
    constructor(value){
        if(value){
            this.head = new Node(value)
            this.tail = this.head 
            this.length = 1
        }else{
            this.head = null
            this.tail = null
            this.length = 0
        }
    }

    push(value){
        const newNode = new Node(value)
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        }else{
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length ++
        return newNode
    }

    unshift(value){
        const newNode = new Node(value)
        if(!this.head){
            this.head = newNode
            this.tail = newNode
        }else{
            newNode.next = this.head 
            this.head = newNode
        }
        this.length ++
        return newNode
    }

    pop(){
        if(!this.head) return undefined
        let pre = this.head
        let next =  this.head
        while(next.next){
            pre = next 
            next = next.next 
        }
        pre.next = null
        this.tail = pre
        this.length --
        if(this.length === 0){
            this.head = null
            this.tail = null
        }
        return next
    }

    shift(){
        if(!this.head) return undefined
        let temp = this.head 
        this.head = this.head.next 
        temp.next = null
        this.length --
        if(this.length === 0){
            this.tail = null
        }
        return temp 
    }

    get(index){
        if(index < 0 || index >= this.length) return undefined
        let temp = this.head 
        while(index > 0){
            index --
            temp = temp.next 
        }
        return temp 
    }

    set(index, value){
        let tempNode = this.get(index)
        if(tempNode){
            tempNode.value = value
            return true
        }              
        return false  
    }

    insert(index, value){
        if(index < 0 || index > this.length ) return false
        if(index === 0) return this.unshift(value) ?  true : false
        if(index === this.length) return this.push(value) ?  true : false
        let newNode = new Node(value)
        let tempNode = this.get(index - 1)
        newNode.next  = tempNode.next
        tempNode.next = newNode
        this.length ++
        return true
    }

    remove(index){
        if(index < 0 || index >= this.length) return undefined
        if(index === 0) return this.shift()
        if(index === this.length - 1) return this.pop()
        let preEl = this.get(index - 1)
        let currentEl = preEl.next 
        if(preEl){
            preEl.next = currentEl.next 
            this.length --
            currentEl.next = null
            return currentEl
        }    
        return false
    }

    reverse(){
        let temp = this.head 
        this.head = this.tail 
        this.tail = temp 
        let pre = null
        let next = null
        for(let i = 0 ; i < this.length ; i++){
            next = temp.next
            temp.next = pre
            pre = temp  
            temp = next 
        }
    }
}

// Test cases for LinkedList

// Helper function to create a linked list with multiple elements
function createLinkedList(values) {
    const list = new Linkedlist(values[0]);
    for (let i = 1; i < values.length; i++) {
        list.push(values[i]);
    }
    return list;
}

// Test case 1: Pop from a list with multiple elements
function testPopMultipleElements() {
    const list = createLinkedList([1, 2, 3, 4]);
    const popped = list.pop();
    console.assert(popped.value === 4, "Should pop the last element (4)");
    console.assert(list.length === 3, "Length should be 3 after pop");
    console.assert(list.tail.value === 3, "New tail should be 3");
}

// Test case 2: Pop from a list with one element
function testPopOneElement() {
    const list = new Linkedlist(1);
    const popped = list.pop();
    console.assert(popped.value === 1, "Should pop the only element (1)");
    console.assert(list.length === 0, "Length should be 0 after pop");
    console.assert(list.head === null, "Head should be null");
    console.assert(list.tail === null, "Tail should be null");
}

// Test case 3: Pop from an empty list
function testPopEmptyList() {
    const list = new Linkedlist(1);
    list.pop(); // Make the list empty
    const popped = list.pop();
    console.assert(popped === undefined, "Should return undefined when popping from an empty list");
    console.assert(list.length === 0, "Length should remain 0");
}

// Test case 4: Pop multiple times
function testPopMultipleTimes() {
    const list = createLinkedList([1, 2, 3, 4, 5]);
    for (let i = 5; i > 0; i--) {
        const popped = list.pop();
        console.assert(popped.value === i, `Should pop ${i}`);
        console.assert(list.length === i - 1, `Length should be ${i - 1}`);
    }
    console.assert(list.head === null, "Head should be null after popping all elements");
    console.assert(list.tail === null, "Tail should be null after popping all elements");
}

function testPush() {
    // Test pushing to an empty list
    const list1 = new Linkedlist(1);
    list1.pop(); // Make the list empty
    const pushed1 = list1.push(2);
    console.assert(list1.length === 1, "Length should be 1 after pushing to empty list");
    console.assert(list1.head.value === 2, "Head should be 2");
    console.assert(list1.tail.value === 2, "Tail should be 2");
    console.assert(pushed1.value === 2, "Push should return the new node");

    // Test pushing to a non-empty list
    const list2 = createLinkedList([1, 2, 3]);
    const pushed2 = list2.push(4);
    console.assert(list2.length === 4, "Length should be 4 after pushing");
    console.assert(list2.tail.value === 4, "Tail should be 4");
    console.assert(pushed2.value === 4, "Push should return the new node");

    // Test pushing multiple elements
    const list3 = new Linkedlist(1);
    list3.push(2)
    list3.push(3)
    list3.push(4);
    console.assert(list3.length === 4, "Length should be 4 after pushing multiple elements");
    console.assert(list3.head.value === 1, "Head should still be 1");
    console.assert(list3.tail.value === 4, "Tail should be 4");
    console.assert(list3.head.next.value === 2, "Second node should be 2");
    console.assert(list3.head.next.next.value === 3, "Third node should be 3");
    console.assert(list3.head.next.next.next === list3.tail, "Fourth node should be the tail");
}



// Test cases for unshift method
function testUnshift() {
    // Test unshifting to an empty list
    const list1 = new Linkedlist(1);
    list1.pop(); // Make the list empty
    const unshifted1 = list1.unshift(2);
    console.assert(list1.length === 1, "Length should be 1 after unshifting to empty list");
    console.assert(list1.head.value === 2, "Head should be 2");
    console.assert(list1.tail.value === 2, "Tail should be 2");
    console.assert(unshifted1.value === 2, "Unshift should return the new node");

    // Test unshifting to a non-empty list
    const list2 = createLinkedList([2, 3, 4]);
    const unshifted2 = list2.unshift(1);
    console.assert(list2.length === 4, "Length should be 4 after unshifting");
    console.assert(list2.head.value === 1, "Head should be 1");
    console.assert(unshifted2.value === 1, "Unshift should return the new node");

    // Test unshifting multiple elements
    const list3 = new Linkedlist(4);
    list3.unshift(3)
    list3.unshift(2)
    list3.unshift(1);
    console.assert(list3.length === 4, "Length should be 4 after unshifting multiple elements");
    console.assert(list3.head.value === 1, "Head should be 1");
    console.assert(list3.tail.value === 4, "Tail should still be 4");
}

// Test cases for shift method
function testShift() {
    // Test shifting from a list with multiple elements
    const list1 = createLinkedList([1, 2, 3, 4]);
    const shifted1 = list1.shift();
    console.assert(shifted1.value === 1, "Should shift the first element (1)");
    console.assert(list1.length === 3, "Length should be 3 after shift");
    console.assert(list1.head.value === 2, "New head should be 2");

    // Test shifting from a list with one element
    const list2 = new Linkedlist(1);
    const shifted2 = list2.shift();
    console.assert(shifted2.value === 1, "Should shift the only element (1)");
    console.assert(list2.length === 0, "Length should be 0 after shift");
    console.assert(list2.head === null, "Head should be null");
    console.assert(list2.tail === null, "Tail should be null");

    // Test shifting from an empty list
    const list3 = new Linkedlist(1);
    list3.shift(); // Make the list empty
    const shifted3 = list3.shift();
    console.assert(shifted3 === undefined, "Should return undefined when shifting from an empty list");
    console.assert(list3.length === 0, "Length should remain 0");

    // Test shifting multiple times
    const list4 = createLinkedList([1, 2, 3, 4, 5]);
    for (let i = 1; i <= 5; i++) {
        const shifted = list4.shift();
        console.assert(shifted.value === i, `Should shift ${i}`);
        console.assert(list4.length === 5 - i, `Length should be ${5 - i}`);
    }
    console.assert(list4.head === null, "Head should be null after shifting all elements");
    console.assert(list4.tail === null, "Tail should be null after shifting all elements");
}

function testGet() {
    // Create a list with multiple elements
    const list = createLinkedList([10, 20, 30, 40, 50]);
    // console.log(list)
    // Test getting elements at valid indices
    console.assert(list.get(0).value === 10, "Should get the first element (10)");
    console.assert(list.get(2).value === 30, "Should get the middle element (30)");
    console.assert(list.get(4).value === 50, "Should get the last element (50)");

    // Test getting element at invalid indices
    console.assert(list.get(-1) === undefined, "Should return undefined for negative index");
    console.assert(list.get(5) === undefined, "Should return undefined for index equal to length");
    console.assert(list.get(10) === undefined, "Should return undefined for index greater than length");

    // Test getting from an empty list
    const emptyList = new Linkedlist(1);
    emptyList.pop(); // Make the list empty
    console.assert(emptyList.get(0) === undefined, "Should return undefined when getting from an empty list");

    // Test getting from a list with one element
    const singleElementList = new Linkedlist(100);
    console.assert(singleElementList.get(0).value === 100, "Should get the only element (100)");
    console.assert(singleElementList.get(1) === undefined, "Should return undefined for index 1 in a single-element list");
}

function testSet() {
    // Create a list with multiple elements
    const list = createLinkedList([10, 20, 30, 40, 50]);

    // Test setting elements at valid indices
    console.assert(list.set(0, 15) === true, "Should successfully set the first element");
    console.assert(list.get(0).value === 15, "First element should now be 15");

    console.assert(list.set(2, 35) === true, "Should successfully set the middle element");
    console.assert(list.get(2).value === 35, "Middle element should now be 35");

    console.assert(list.set(4, 55) === true, "Should successfully set the last element");
    console.assert(list.get(4).value === 55, "Last element should now be 55");

    // Test setting element at invalid indices
    console.assert(list.set(-1, 100) === false, "Should return false for negative index");
    console.assert(list.set(5, 100) === false, "Should return false for index equal to length");
    console.assert(list.set(10, 100) === false, "Should return false for index greater than length");

    // Test setting in an empty list
    const emptyList = new Linkedlist(1);
    emptyList.pop(); // Make the list empty
    console.assert(emptyList.set(0, 100) === false, "Should return false when setting in an empty list");

    // Test setting in a list with one element
    const singleElementList = new Linkedlist(100);
    console.assert(singleElementList.set(0, 200) === true, "Should successfully set the only element");
    console.assert(singleElementList.get(0).value === 200, "Only element should now be 200");
    console.assert(singleElementList.set(1, 300) === false, "Should return false for index 1 in a single-element list");

    // Verify that the length hasn't changed after set operations
    console.assert(list.length === 5, "Length should still be 5 after set operations");
    console.assert(singleElementList.length === 1, "Length should still be 1 after set operations");
}

function testInsert() {
    // Test inserting at the beginning of the list
    const list1 = createLinkedList([2, 3, 4]);
    const inserted1 = list1.insert(0, 1);
    console.assert(inserted1 === true, "Should return true for successful insertion");
    console.assert(list1.get(0).value === 1, "First element should now be 1");
    console.assert(list1.length === 4, "Length should be 4 after insertion");

    // Test inserting in the middle of the list
    const list2 = createLinkedList([1, 2, 4, 5]);
    const inserted2 = list2.insert(2, 3);
    console.assert(inserted2 === true, "Should return true for successful insertion");
    console.assert(list2.get(2).value === 3, "Element at index 2 should now be 3");
    console.assert(list2.length === 5, "Length should be 5 after insertion");

    // Test inserting at the end of the list
    const list3 = createLinkedList([1, 2, 3]);
    const inserted3 = list3.insert(3, 4);
    console.assert(inserted3 === true, "Should return true for successful insertion");
    console.assert(list3.get(3).value === 4, "Last element should now be 4");
    console.assert(list3.length === 4, "Length should be 4 after insertion");

    // Test inserting at invalid indices
    const list4 = createLinkedList([1, 2, 3]);
    const inserted4a = list4.insert(-1, 0);
    console.assert(inserted4a === false, "Should return false for negative index");
    const inserted4b = list4.insert(4, 5);
    console.assert(inserted4b === false, "Should return false for index greater than length");
    console.assert(list4.length === 3, "Length should still be 3 after failed insertions");

    // Test inserting into an empty list
    const emptyList = new Linkedlist();
    const insertedEmpty = emptyList.insert(0, 1);
    console.assert(insertedEmpty === true, "Should return true for insertion into empty list");
    console.assert(emptyList.get(0).value === 1, "First element should now be 1");
    console.assert(emptyList.length === 1, "Length should be 1 after insertion into empty list");

    // Test that the links are correct after insertion
    const list5 = createLinkedList([1, 3]);
    list5.insert(1, 2);
    console.assert(list5.get(0).next.value === 2, "Second element should now be 2");
    console.assert(list5.get(1).next.value === 3, "Third element should still be 3");
}

function testRemove() {
    // Test removing from the beginning of the list
    const list1 = createLinkedList([1, 2, 3, 4]);
    const removed1 = list1.remove(0);
    console.assert(removed1.value === 1, "Should remove and return the first element (1)");
    console.assert(list1.length === 3, "Length should be 3 after removal");
    console.assert(list1.head.value === 2, "New head should be 2");

    // Test removing from the middle of the list
    const list2 = createLinkedList([1, 2, 3, 4, 5]);
    const removed2 = list2.remove(2);
    console.assert(removed2.value === 3, "Should remove and return the middle element (3)");
    console.assert(list2.length === 4, "Length should be 4 after removal");
    console.assert(list2.get(2).value === 4, "Element at index 2 should now be 4");

    // Test removing from the end of the list
    const list3 = createLinkedList([1, 2, 3, 4]);
    const removed3 = list3.remove(3);
    console.assert(removed3.value === 4, "Should remove and return the last element (4)");
    console.assert(list3.length === 3, "Length should be 3 after removal");
    console.assert(list3.tail.value === 3, "New tail should be 3");

    // Test removing at invalid indices
    const list4 = createLinkedList([1, 2, 3]);
    const removed4a = list4.remove(-1);
    console.assert(removed4a === undefined, "Should return undefined for negative index");
    const removed4b = list4.remove(3);
    console.assert(removed4b === undefined, "Should return undefined for index equal to length");
    const removed4c = list4.remove(4);
    console.assert(removed4c === undefined, "Should return undefined for index greater than length");
    console.assert(list4.length === 3, "Length should still be 3 after failed removals");

    // Test removing the only element
    const singleElementList = new Linkedlist(1);
    const removedSingle = singleElementList.remove(0);
    console.assert(removedSingle.value === 1, "Should remove and return the only element (1)");
    console.assert(singleElementList.length === 0, "Length should be 0 after removal");
    console.assert(singleElementList.head === null, "Head should be null");
    console.assert(singleElementList.tail === null, "Tail should be null");

    // Test removing from an empty list
    const emptyList = new Linkedlist();
    const removedEmpty = emptyList.remove(0);
    console.assert(removedEmpty === undefined, "Should return undefined when removing from an empty list");

    // Test that the links are correct after removal
    const list5 = createLinkedList([1, 2, 3, 4]);
    list5.remove(1);
    console.assert(list5.get(0).next.value === 3, "Second element should now be 3");
    console.assert(list5.get(1).next.value === 4, "Third element should be 4");
}
// Run all test cases
function runTests() {
    testPopMultipleElements();
    testPopOneElement();
    testPopEmptyList();
    testPopMultipleTimes();
    testPush();
    testUnshift();
    testPopMultipleElements();
    testPopOneElement();
    testPopEmptyList();
    testPopMultipleTimes();
    testShift();
    testGet();
    testSet();
    testInsert();
    testRemove();
    console.log("All tests completed.");
}


// Run the tests
runTests();