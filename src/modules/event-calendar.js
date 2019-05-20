
class EventCalendar {

    constructor(eventList) {

        this.eventList = eventList;
        this.totalWidth = 600;
        this.totalHeight = 1440;
        this.htmlContainer = "div.calender-content";
    }

    renderEvents() {

        let events = this.drawEventList();
        document.querySelector(this.htmlContainer).innerHTML = '';

        events.forEach((event) => {
            let eventBox = this.renderEventBox(event);
            document.querySelector(this.htmlContainer).appendChild(eventBox);
        });
    }

    /** 
   * Create event element.
   */
    renderEventBox(event) {
        let eventDiv = document.createElement("div"),
            eventTitle = document.createElement("span");

        eventDiv.classList.add("event-box");
        eventDiv.style.left = `${event['left']}px`;
        eventDiv.style.bottom = `${event['top']}px`;
        eventDiv.style.height = `${event['height']}px`;
        eventDiv.style.backgroundColor = `${event['color']}`;
        eventDiv.style.width = `${event['width']}px`;

        eventTitle.innerText = event['id'];
        eventDiv.appendChild(eventTitle);

        return eventDiv;
    }

    /** 
   * Calculate position of the events in the calendar.
   */
    drawEventList() {


        let FinalEventListObject = this.calcEventsPosition();
        let finalEventArray = [];

        Object.keys(FinalEventListObject).forEach(key => {
            let event = this.eventList.find(ele => {
                return ele.id == key;
            }) || {};
            event['width'] = FinalEventListObject[key]['width'];
            event['left'] = FinalEventListObject[key]['left'];
            finalEventArray.push(event);
        });

        finalEventArray.forEach((ele) => {
            ele['top'] = ele['start'] * 2;
            ele['height'] = (ele['end'] - ele['start']) * 2;
            ele['color'] = this.getRandomColor();
        });
        return finalEventArray;
    }


    /** 
       * Get event list with positions.
       * {id: 'event 1', width: xxx, left: xxx}
       */
    calcEventsPosition() {

        let sortedheightList = this.sortByHeight(this.eventList, false),
            eventGroupList = {}, eventsWithLength = {};
        sortedheightList.forEach(singleObj => {
            let obj = this.eventList.find(ele => {
                return ele.id == singleObj['id'];
            });
            if (!this.checkIngroup(eventGroupList, singleObj)) {
                eventGroupList[singleObj['id']] = this.groupEvent(obj);
            }
        });
        eventsWithLength = this.getDivideCount(eventGroupList);
        return this.getEventPositionList(eventGroupList, eventsWithLength);

    }

    /** 
   * Sort events by height
   * Returns an object with heights
   */
    sortByHeight(eventList, sortOrder) {

        let mappedList = eventList.map(val => {
            let obj = { id: val.id, height: val.end - val.start };
            return obj;
        }).sort((val1, val2) => {
            if (sortOrder) {
                return val1['height'] < val2['height'];
            } else {
                return val1['height'] > val2['height'];
            }
        });
        return mappedList;
    }

    checkIngroup(groupsMap, element) {

        let result = false;
        Object.keys(groupsMap).forEach(key => {
            (groupsMap[key] || []).forEach(ele => {
                if (ele.id == element['id']) {
                    result = true;
                }
            });
        });
        return result;
    }

    /** 
     * Returns events with divisor count
     */
    getDivideCount(groupsMap) {

        let list = {};
        this.eventList.forEach(event => {
            let maxCount = 0;
            Object.keys(groupsMap).forEach(key => {
                groupsMap[key].forEach(lineObject => {
                    if (lineObject.id == event.id && maxCount <= groupsMap[key].length) {
                        maxCount = groupsMap[key].length;
                    }
                });
            });
            list[event.id] = maxCount;
        });
        return list;
    }

    /** 
   * Filter one events
   */
    groupEvent(obj) {
        return this.eventList.filter(ele => ((obj['end'] > ele['start']) && (obj['start'] < ele['end'])));
    }


    /** 
     * Get event list with positions.
     * {width: xxx, left: xxx}
     */
    getEventPositionList(groupsMap, divisorList) {

        let eventsWithPosition = {};
        Object.keys(groupsMap).forEach(key => {

            let calendarFullWidth = this.totalWidth, widthCount = 0;
            let eventListByDuration = this.sortByHeight(groupsMap[key], true);

            for (let i = 0; i < eventListByDuration.length; i++) {

                let single = eventListByDuration[i], floatLeft = widthCount;
                if (divisorList[single['id']] != groupsMap[key].length) {

                    let eventBoxWidth = calendarFullWidth / divisorList[single['id']];
                    eventsWithPosition[single['id']] = { width: eventBoxWidth, left: floatLeft };
                    widthCount += eventBoxWidth;
                } else {

                    let eventBoxWidth = (calendarFullWidth - widthCount) / (eventListByDuration.length - i);
                    eventsWithPosition[single['id']] = { width: eventBoxWidth, left: floatLeft };
                    widthCount += eventBoxWidth;
                }
            }
        });
        return eventsWithPosition;
    }


    /** 
   * Random color
   */
    getRandomColor() {
        let letters = '0123456789ABCDEF', color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /** 
   * Add a new event to calender.
   */
    addEvent(event) {
        let newEvent = event;
        let isExists = this.eventList.forEach((event) => {
            return newEvent.id == event.id;
        });

        if (!isExists) {
            this.eventList.push(newEvent);
            this.renderEvents();
            return true;

        }
        return false;
    }

    validateEvent(event) {
        return (event.id).trim() !== '' && (parseInt(event.start) < parseInt(event.end));
    }

    mochaSum(numOne, numTwo) {
        return numOne + numTwo;
    }

}

module.exports = EventCalendar;