let messages = [];
let count = 0;

document.getElementById("userMessageField").addEventListener("keyup", function(e) { 
   
    if(e.key == "Enter"){
        sendMessage();
    }
})

const socket = io(window.location.href);


socket.on('message', (data) => { 
    messages.push(data);
    document.getElementById('icon').setAttribute("href", "./noti_icon.png")
    document.querySelector("title").innerHTML = "📨 New Note"

})

// socket.on('connection', () => {
//     document.getElementById('last-online').innerHTML = 'Note Online <span id="info" style="color: #00ff91"> ⬤</span>';
//     document.getElementById('last-online').style.display = "inline";
   
//     //document.querySelector("span#info").style.color = ""
// })

// socket.on('disconnect', () => {
//     const disconnectTime = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
//     document.getElementById('last-online').innerHTML = `Last online at ${disconnectTime}`;
//     document.getElementById('last-online').style.display = "inline";
// })

// const alerter = () => { 
//     if(messages.length > 0){
//         for(let msg of messages) { 
//             alert(msg);
//         }
//     }
//     messages = [];
// }

document.querySelector("body").addEventListener("click", () => { 
    alerter();
    document.querySelector("title").innerHTML = "Note Taker";
    document.querySelector("#icon").setAttribute("href", "./default_icon.png");
})

function showText(){ 
    count ++;
    
    document.getElementById("show").innerHTML = "Hide";
    document.getElementById("userMessageField").setAttribute("type", "text");
    
    
    document.getElementById("show").setAttribute("onclick", "hideText()")
    
    if(count >= 4){
        document.getElementById("show").innerHTML = "bitch make up your mind";
    }
}

const hideText = () => { 
    document.getElementById("userMessageField").setAttribute("type", "password");
    document.getElementById("show").innerHTML = "Show";
    document.getElementById("show").setAttribute("onclick", "showText()")
}



const sendMessage = () => { 
    const time = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    document.querySelector("#send").disabled = true;
    const userMessage = document.getElementById("userMessageField").value;
    socket.emit('message', `Sent at ${time}\n\n${userMessage}`);
    const success = document.createElement('p');
    success.style.marginLeft = '20px'
    success.innerHTML = "Successfully saved";
    success.setAttribute("id", "success-msg")
    document.querySelector(".main").appendChild(success)
    
    setTimeout(() => {
        document.querySelector("#send").disabled = false;
        document.querySelector("#success-msg").remove();
        
    }, 1500);
}

