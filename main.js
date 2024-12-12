// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
//Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
const errorModal = document.getElementById("modal");
errorModal.classList.add('hidden');
// TO - DO 
// When a user clicks on an empty heart:
// Invoke mimicServerCall to simulate making a server request
// When the "server" returns a failure status:
// Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
// Display the error modal by removing the .hidden class
// Display the server error message in the modal
// Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
// When the "server" returns a success status:
// Change the heart to a full heart
// Add the .activated-heart class to make the heart appear red

// To do this we need to select all html elements that has the like gyph in them
//and add a add listener that helps the DOM whenever content is loaded
document.addEventListener('DOMContentLoaded', ()=>{
  const likes = document.querySelectorAll('.like-glyph');

  //Now i will create a foreach function that helps do sth when a visitor like a page or not
  likes.forEach(likey =>{
    //add an event listener for every click on the heart
    //so it takes a string 'click' and a callback function
    likey.addEventListener('click', ()=>{
      //add an if function to set a condition every time an empty heart is clicked to make it full
      if(likey.textContent === EMPTY_HEART){
        //to handle empty heart we mimic server call
        mimicServerCall()
        .then(()=> {
          //The then function after a request is sent to server is to return a full heart
          likey.textContent = FULL_HEART;
          //so we add a class list to html element called activated-heart
          likey.classList.add('activated-heart');
        })
        //however if an error occurs we want to catch it so we add the catch() which holds the error
        .catch(error=>{
          //when error is present it remove the .hidden we added at the 
          //begining to avoid the error message from displaying when the page load
          //this cause the error message to be diplayed
          errorModal.classList.remove('hidden');
          const errorMessage = document.getElementById('modal-message');
          errorMessage.textContent = error;


          //however we don't want this message to there forever so i will add a timeout 
          //this lead to the error message being removed after being diplayed for 3 secs
          setTimeout(()=>{
            errorModal.classList.add('hidden')
          }, 3000);
        });
      } 
      //the second part of our if condition is if the click is not succeesful with no error 
      //the activated message is removed from the class element
      else{
        likey.textContent = EMPTY_HEART;
        likey.classList.remove('activated-heart');
      }
    });
  });
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
