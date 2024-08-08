let IdText = document.getElementById('dynamicText');
let welcomeMsg = 'Welcome..!';
let i = 0;

function displayCharacter() {
    if (i < welcomeMsg.length) {
        IdText.innerHTML += welcomeMsg[i];
        i++;
        setTimeout(displayCharacter, 200); 
    }
    else{
        i=0;
        IdText.innerHTML="";
         displayCharacter();
    }
}
displayCharacter();