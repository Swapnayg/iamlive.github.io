window.onload = function() {
  var chatname = "chat123";
  function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      console.log("123");
  }
  function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  function unsetCookie() {
      setCookie('token', '', 0);
      setCookie('auth', '', 0);
  }
  fetch('/api/webapi/GetUserInfo')
      .then(response => response.json())
      .then(data => {
          $('.Loading').fadeOut(100);
          if (data.status === false) {
              unsetCookie();
              return false;
          };
          $('.name').text(data.data.name_user);
          chatname = data.data.name_user;
          console.log("123");
          console.log(chatname);
          var firebaseConfig = {
apiKey: "AIzaSyDRtK5Z_TAgMUhDIBAV2X_psj4n5D09iqw",
authDomain: "live-chess-dede7.firebaseapp.com",
databaseURL: "https://live-chess-dede7-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "live-chess-dede7",
storageBucket: "live-chess-dede7.firebasestorage.app",
messagingSenderId: "1002758569165",
appId: "1:1002758569165:web:5af6a95b24f5de03913d84",
measurementId: "G-ZSNFPJ63B8"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// This is very IMPORTANT!! We're going to use "db" a lot.

var db = firebase.database()

// We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol

class MEME_CHAT{

// Home() is used to create the home page

home(){

// First clear the body before adding in

// a title and the join form

document.body.innerHTML = ''

//this.create_title()
this.chat()

}

// chat() is used to create the chat page

chat(){

this.create_title()

this.create_chat()

}

// create_title() is used to create the title

create_title(){

// This is the title creator. 🎉

var title_container = document.createElement('div')

title_container.innerHTML = '<button class="btn"><i class="fa fa-home"></i> Home</button>'

title_container.setAttribute('id', 'title_container')

var title_inner_container = document.createElement('div')

title_inner_container.setAttribute('id', 'title_inner_container')


var title = document.createElement('h1')

title.setAttribute('id', 'title')

title_container.setAttribute('onclick', "location.href='/home'")
title.textContent = 'SandGame'


title_inner_container.append(title)

title_container.append(title_inner_container)

document.body.append(title_container)

}



// create_load() creates a loading circle that is used in the chat container

create_load(container_id){

// YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.

var parent = this;


// This is a loading function. Something cool to have.

var container = document.getElementById(container_id)

//container.innerHTML = ''


var loader_container = document.createElement('div')

loader_container.setAttribute('class', 'loader_container')


var loader = document.createElement('div')

loader.setAttribute('class', 'loader')


loader_container.append(loader)

container.append(loader_container)


}

// create_chat() creates the chat container and stuff

create_chat(){

// Again! You need to have (parent = this)

var parent = this;

// GET THAT MEMECHAT HEADER OUTTA HERE

var title_container = document.getElementById('title_container')

var title = document.getElementById('title')

title_container.classList.add('chat_title_container')

// Make the title smaller by making it 'chat_title'

title.classList.add('chat_title')

//title.innerHTML = `<i class="fa fa-arrow-circle-left" style="font-size:24px">   SandGame Chat</i>`

var chat_container = document.createElement('div')

chat_container.setAttribute('id', 'chat_container')


var chat_inner_container = document.createElement('div')

chat_inner_container.setAttribute('id', 'chat_inner_container')


var chat_content_container = document.createElement('div')

chat_content_container.setAttribute('id', 'chat_content_container')


var chat_input_container = document.createElement('div')

chat_input_container.setAttribute('id', 'chat_input_container')


var chat_input_send = document.createElement('button')

chat_input_send.setAttribute('id', 'chat_input_send')

chat_input_send.setAttribute('disabled', true)

chat_input_send.innerHTML = `<i class="material-icons">&#xe163;</i>`


var chat_input = document.createElement('input')

chat_input.setAttribute('id', 'chat_input')

// Only a max message length of 1000

chat_input.setAttribute('maxlength', 1000)

// Get the name of the user

chat_input.placeholder = `${chatname}. Say something...`

chat_input.onkeyup  = function(){

if(chat_input.value.length > 0){

  chat_input_send.removeAttribute('disabled')

  chat_input_send.classList.add('enabled')

  chat_input_send.onclick = function(){

    chat_input_send.setAttribute('disabled', true)

    chat_input_send.classList.remove('enabled')

    if(chat_input.value.length <= 0){

      return

    }

    // Enable the loading circle in the 'chat_content_container'

    parent.create_load('chat_content_container')

    // Send the message. Pass in the chat_input.value

    parent.send_message(chat_input.value)

    // Clear the chat input box

    chat_input.value = ''

    // Focus on the input just after

    chat_input.focus()

  }

}else{

  chat_input_send.classList.remove('enabled')

}

}



chat_input_container.append(chat_input, chat_input_send)

chat_inner_container.append(chat_content_container, chat_input_container)

chat_container.append(chat_inner_container)

document.body.append(chat_container)

// After creating the chat. We immediatly create a loading circle in the 'chat_content_container'

parent.create_load('chat_content_container')

// then we "refresh" and get the chat data from Firebase

parent.refresh_chat()

}

// Save name. It literally saves the name to localStorage

save_name(name){

// Save name to localStorage

localStorage.setItem('name', name)

}

// Sends message/saves the message to firebase database

send_message(message){

var parent = this

// if the local storage name is null and there is no message

// then return/don't send the message. The user is somehow hacking

// to send messages. Or they just deleted the

// localstorage themselves. But hacking sounds cooler!!

if(parent.get_name() == null && message == null){

return

}


// Get the firebase database value

db.ref('chats/').once('value', function(message_object) {

// This index is mortant. It will help organize the chat in order

var index = parseFloat(message_object.numChildren()) + 1

db.ref('chats/' + `message_${index}`).set({

  name: chatname,

  message: message,

  index: index

})

.then(function(){

  // After we send the chat refresh to get the new messages

  parent.refresh_chat()

})

})

}

// Get name. Gets the username from localStorage

get_name(){

// Get the name from localstorage

if(localStorage.getItem('name') != null){

return localStorage.getItem('name')

}else{

this.home()

return null

}

}

// Refresh chat gets the message/chat data from firebase

refresh_chat(){

var chat_content_container = document.getElementById('chat_content_container')


// Get the chats from firebase

db.ref('chats/').on('value', function(messages_object) {

// When we get the data clear chat_content_container

chat_content_container.innerHTML = ''

// if there are no messages in the chat. Retrun . Don't load anything

if(messages_object.numChildren() == 0){

  return

}


// OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE

// SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!


// convert the message object values to an array.

var messages = Object.values(messages_object.val());

var guide = [] // this will be our guide to organizing the messages

var unordered = [] // unordered messages

var ordered = [] // we're going to order these messages


for (var i, i = 0; i < messages.length; i++) {

  // The guide is simply an array from 0 to the messages.length

  guide.push(i+1)

  // unordered is the [message, index_of_the_message]

  unordered.push([messages[i], messages[i].index]);

}


// Now this is straight up from stack overflow 🤣

// Sort the unordered messages by the guide

guide.forEach(function(key) {

  var found = false

  unordered = unordered.filter(function(item) {

    if(!found && item[1] == key) {

      // Now push the ordered messages to ordered array

      ordered.push(item[0])

      found = true

      return false

    }else{

      return true

    }

  })

})


// Now we're done. Simply display the ordered messages

ordered.forEach(function(data) {

  var name = data.name

  var message = data.message


  var message_container = document.createElement('div')

  message_container.setAttribute('class', 'message_container')


  var message_inner_container = document.createElement('div')

  message_inner_container.setAttribute('class', 'message_inner_container')


  var message_user_container = document.createElement('div')

  message_user_container.setAttribute('class', 'message_user_container')


  var message_user = document.createElement('span')

  message_user.setAttribute('class', 'message_user')
 
  message_user_container.innerHTML = '<i class="material-icons">person</i>'

  message_user.textContent = `${name}`


  var message_content_container = document.createElement('div')

  message_content_container.setAttribute('class', 'message_content_container')


  var message_content = document.createElement('p')

  message_content.setAttribute('class', 'message_content')

  message_content.textContent = `${message}`


  message_user_container.append(message_user)

  message_content_container.append(message_content)

  message_inner_container.append(message_user_container, message_content_container)

  message_container.append(message_inner_container)


  chat_content_container.append(message_container)

});

// Go to the recent message at the bottom of the container

chat_content_container.scrollTop = chat_content_container.scrollHeight;

})


}

}

var app = new MEME_CHAT()

// If we have a name stored in localStorage.

// Then use that name. Otherwise , if not.

// Go to home.

if(app.get_name() != null){

app.chat()

}
          $('.profile .id').text(data.data.id_user);
          $('.profile .number').text("+91 " + data.data.phone_user);
      });

     

}