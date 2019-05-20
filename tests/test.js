const assert = require('assert');
const EventCalendar = require('../src/modules/event-calendar');

describe('Basic Tests for calender', function () {
    let eventList = [
        { id: "New", start: 60, end: 120 },
        { id: "New 1", start: 150, end: 270 },
        { id: "New 2", start: 240, end: 300 },
        { id: "New 3", start: 200, end: 360 },
        { id: "New 4", start: 180, end: 330 }
    ];
    eventCal = new EventCalendar(eventList);
    it('should return -1 when the value is not present', function () {
        assert.equal(eventCal.mochaSum(1, 2), 3);
    });
    it('should return -1 when the value is not present', function () {
        const sortedArray = eventCal.sortByHeight(eventList, true);
        const firstElement = sortedArray[0];
        const lastElement = sortedArray[4];
        assert.equal(sortedArray[0].id, 'New 3');
        assert.equal(sortedArray[4].id, 'New 2');
    });
});