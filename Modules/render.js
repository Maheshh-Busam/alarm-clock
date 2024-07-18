// Importing the displayCurrentTime function and time from app.js
import { displayCurrentTime, time } from "./app.js";


// Fteching the HTML Elements..
const setAlarmButton = document.querySelector(".set-alarm-btn");
const inputGroupDivElement = document.querySelector(".input-group");
const alarmListUlElement = document.getElementById('alarms-list');
const currentTimeDivElement = document.getElementById('current-time');
const noAlarmsTextH2Element = document.querySelector('.no-alarms-text');

// Function to display the current real time.. 
function updateTime() {
    displayCurrentTime();
    currentTimeDivElement.textContent = time;
}

// Set the time running with seconds..
setInterval(updateTime, 1000);
updateTime();


// On click of Set Alarm button ask time from user...as input..
setAlarmButton.addEventListener("click", () => {
    setAlarmButton.style.display = "none";
    const hrsInputelement = document.createElement("input");
    hrsInputelement.id = "hours";
    hrsInputelement.type = "number";
    hrsInputelement.min = 1;
    hrsInputelement.max = 12;
    hrsInputelement.required = true;
    hrsInputelement.placeholder = "00";

    const minsInputelement = document.createElement("input");
    minsInputelement.id = "minutes";
    minsInputelement.type = "number";
    minsInputelement.min = 1;
    minsInputelement.max = 59;
    minsInputelement.required = true;
    minsInputelement.placeholder = "00";

    const secsInputelement = document.createElement("input");
    secsInputelement.id = "seconds";
    secsInputelement.type = "number";
    secsInputelement.min = 1;
    secsInputelement.max = 59;
    secsInputelement.required = true;
    secsInputelement.placeholder = "00";

    const amPmInputelement = document.createElement("select");
    amPmInputelement.id = "ampm";

    const amOptionElement = document.createElement("option");
    amOptionElement.value = "AM";
    amOptionElement.textContent = "AM";

    const pmOptionElement = document.createElement("option");
    pmOptionElement.value = "PM";
    pmOptionElement.textContent = "PM";
    amPmInputelement.appendChild(amOptionElement);
    amPmInputelement.appendChild(pmOptionElement);

    const setAlarmButtonelement = document.createElement("button");
    setAlarmButtonelement.id = "submit-btn";
    setAlarmButtonelement.textContent = "Set Alarm";

    const closeBtnElement = document.createElement("button");
    closeBtnElement.className = "close-btn";
    closeBtnElement.textContent = "X";

    const colonSpanElement1 = document.createElement('span');
    colonSpanElement1.textContent = ":";
    colonSpanElement1.className = 'colon';

    const colonSpanElement2 = document.createElement('span');
    colonSpanElement2.textContent = ":";
    colonSpanElement2.className = 'colon';

    const colonSpanElement3 = document.createElement('span');
    colonSpanElement3.textContent = ":";
    colonSpanElement3.className = 'colon';

    inputGroupDivElement.appendChild(hrsInputelement);
    inputGroupDivElement.appendChild(colonSpanElement1);
    inputGroupDivElement.appendChild(minsInputelement);
    inputGroupDivElement.appendChild(colonSpanElement2);
    inputGroupDivElement.appendChild(secsInputelement);
    inputGroupDivElement.appendChild(colonSpanElement3);
    inputGroupDivElement.appendChild(amPmInputelement);
    inputGroupDivElement.appendChild(setAlarmButtonelement);
    inputGroupDivElement.appendChild(closeBtnElement);

    // Calling function to clear the time input element...
    clearInputFieldOnClickClose(closeBtnElement);

    // Calling the function to get the Alarm Details as per the user input...
    getAlarmDetails(setAlarmButtonelement, hrsInputelement, minsInputelement, secsInputelement, amPmInputelement);

    // Calling the function to limit the inputs for hours, minutes and seconds..
    setInputimeLimit(hrsInputelement, minsInputelement, secsInputelement);
});


// Function -- On click on 'X' button will clear the input element...
function clearInputFieldOnClickClose(closeBtnElement) {
    closeBtnElement.addEventListener("click", () => {
        inputGroupDivElement.innerHTML = "";
        setAlarmButton.style.display = "block";
    });
}


// Function  -- get the Alarm details as per the user input for adding them to Alarms List...
function getAlarmDetails(setAlarmBtn, hrsElement, minsElement, secsElement, amPmElement) {

    setAlarmBtn.addEventListener("click", () => {

        const hrsValue = hrsElement.value;
        const minsValue = minsElement.value;
        const secsValue = secsElement.value;
        const amPmValue = amPmElement.value;

        // if all inputs like hours, minutes and seconds are in the proper range then only add alarm to Alram list...
        // Else Alert the user to enter valid time..
        if ((hrsValue > 0 && hrsValue <= 12) && (minsValue >= 0 && minsValue < 60) && (secsValue >= 0 && secsValue < 60) && amPmValue) {
            const alarmTime = `${String(hrsValue).padStart(2, "0")}:${String(minsValue).padStart(2, "0")}:${String(secsValue).padStart(2, "0")} ${amPmValue}`;
            addAlramToList(alarmTime);
        }
        else {
            alert("Please enter Valid time to set Alarm..");
        }
    });
}

// Function to Add the Alarm to Alarm List...
function addAlramToList(alarmTime) {

    noAlarmsTextH2Element.style.display = 'none';
    const alarmListItem = document.createElement('li');
    alarmListItem.id = alarmTime;
    alarmListItem.textContent = alarmTime;

    const spanElement = document.createElement('span');
    spanElement.className = 'delete-btn';

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.textContent = 'Delete';

    spanElement.appendChild(deleteButtonElement);
    alarmListItem.appendChild(spanElement);
    alarmListUlElement.appendChild(alarmListItem);

    inputGroupDivElement.innerHTML = "";
    setAlarmButton.style.display = 'block';

    // Clalling function to delete te Alarm...
    deleteAlram(deleteButtonElement, alarmListItem);
}

// Function -- On click on delete button on alaram list item will delete the particualr alarm..
function deleteAlram(deleteBtn, alarmListItem) {
    deleteBtn.addEventListener("click", () => {
        alarmListItem.remove();
        checUlElements();
    })
}

// Function to check if there are any alarms added in the List... if no alarams added display the proper text to set alarm..
function checUlElements() {
    console.log(noAlarmsTextH2Element);
    const alarmUL = document.getElementById('alarms-list');
    if (alarmUL.children.length === 0) {
        noAlarmsTextH2Element.style.display = 'block';
    }
}

// Function to alart message when the time reaches as per the Alarm time.. 
function alertForAlarm() {
    if (alarmListUlElement.children.length != 0) {
        Array.from(alarmListUlElement.children).forEach((li) => {
            const textContent = Array.from(li.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join('');
            if (time === textContent) {
                alert(`Time is ${time}. Please start Your task and finish it..😊`);
            }
        });
    }
}

// Function to set input time limits while giving the times..
function setInputimeLimit(hrsInputelement, minsInputelement, secsInputelement) {
    hrsInputelement.addEventListener("change", () => {
        if(hrsInputelement.value <1 || hrsInputelement.value >12){
            alert("Please Enter hours from 1 to 12");
            hrsInputelement.value = null;
            hrsInputelement.focus();
        }
    });

    minsInputelement.addEventListener("change", () => {
        if(minsInputelement.value < 0 || minsInputelement.value > 59){
            alert("Please Enter Minutes from 0 to 59");
            minsInputelement.value = null;
            minsInputelement.focus();
        }
    });

    secsInputelement.addEventListener("change", () => {
        if(secsInputelement.value < 0 || secsInputelement.value > 59){
            alert("Please Enter Seconds from 0 to 59");
            secsInputelement.value = null;
            secsInputelement.focus();
        }
    });
}

// checking for evry second to chekc the current time match with any alarm in the list...
setInterval(alertForAlarm, 1000);







