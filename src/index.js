
import 'bootstrap';
import './css/css.scss';
const EventCalendar = require('../src/modules/event-calendar');


document.addEventListener('DOMContentLoaded', function () {

    let eventList = [
        { id: "New", start: 60, end: 120 },
        { id: "New 1", start: 150, end: 270 },
        { id: "New 2", start: 240, end: 300 },
        { id: "New 3", start: 200, end: 360 },
        { id: "New 4", start: 180, end: 330 }
    ],
        eventCal = new EventCalendar(eventList);
    eventCal.renderEvents();

    /** 
   * To add new event
   */

    document.getElementById("eventSubmit").addEventListener("click", () => {

        let event = {
            id: (document.getElementById("eventTitle").value).trim(),
            start: parseInt(document.getElementById("startTime").value),
            end: parseInt(document.getElementById("endTime").value)
        };

        if (eventCal.addEvent(event)) {
            showMsg('Event has been added successfully.');
            resetFormElement();
        } else {
            showMsg('Your event already there.');
        }
    });

    document.getElementById("eventAdd").addEventListener('change', () => {

        let event = {
            id: (document.getElementById("eventTitle").value).trim(),
            start: parseInt(document.getElementById("startTime").value),
            end: parseInt(document.getElementById("endTime").value)
        };
        showMsg('');
        document.getElementById("eventSubmit").disabled = !(eventCal.validateEvent(event));
    });


});

function resetFormElement() {

    document.getElementById("eventTitle").value = '';
    document.getElementById("endTime").value = 0;
    document.getElementById("startTime").value = 0;
    document.getElementById("eventSubmit").disabled = true;

}

/** 
  * Show message.
  */
function showMsg(message) {

    let msgContainer = document.querySelector("div.msg-container"),
        msgSpan = document.createElement("span");
    msgContainer.innerHTML = '';
    msgSpan.innerText = message;
    msgContainer.appendChild(msgSpan);

}





