console.log("Client side js loaded!");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
weatherForm.addEventListener('submit', (event) => {

    event.preventDefault();
    const location = search.value;
    fetch('http://localhost:4200/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
             messageTwo.innerHTML = data.error; 
             messageOne.innerHTML = "";
        }
        else {
            messageOne.innerHTML = "The location is " + data.location + ". " + data.forecast;
            messageTwo.innerHTML = ""; 
        }
    });
});
});