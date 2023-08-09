// main.js

// Get a reference to the Firebase Database object
const database = firebase.database().ref();

// Get const references to the elements
const allMessages = document.getElementById('all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

// Use lowercase 'click' for the event name and assign the updateDB function
sendBtn.addEventListener('click', updateDB);

// Function to update the database
function updateDB(event) {
    event.preventDefault();

    const username = usernameElem.value;
    const message = messageElem.value;
    usernameElem.value = '';
    messageElem.value = '';

    console.log(username + ' : ' + message);

    const value = {
        USERNAME: username,
        MESSAGE: message
    };

    database.push(value);
}

// Function to add a message to the board
function addMessageToBoard(rowData) {
    const data = rowData.val();
    let singleMessageElem = makeSingleMessageHTML(data.USERNAME, data.MESSAGE);
    allMessages.appendChild(singleMessageElem);
}

// Function to create a single message HTML element
function makeSingleMessageHTML(usernameTxt, messageTxt) {
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('single-message');

    let usernameP = document.createElement('p');
    usernameP.classList.add('single-message-username');
    usernameP.innerHTML = usernameTxt;

    let messageP = document.createElement('p');
    messageP.innerHTML = messageTxt;

    parentDiv.appendChild(usernameP);
    parentDiv.appendChild(messageP);

    return parentDiv;
}

// Set up the child_added event listener
database.on('child_added', addMessageToBoard);
