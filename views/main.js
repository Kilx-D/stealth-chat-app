//why the fuck are you here
//get back to fucking class
//or text me :3


let messages = [];
let spamWaitTime = 10000;
let count = 0;
let messagePerMinute = 0;
let recentMessages = [];
const walk = 100;

const messager = `<div>
<div class="main">
        <input class="form-control" type="password" name="message" id="userMessageField"></input>
        
        <button id="send" onclick="sendMessage()" class="btn btn-primary"> Save</button>
        <button id="show" onclick="showText()" class="btn btn-outline-info">Show</button>
        
    </div>
</div>`;



    function shadow(e){
        let text = document.getElementById("stop");
        //gets the width and height of the page 
       const { offsetWidth: width, offsetHeight: height } = document.querySelector("body");
       //gets where in the page the user have their mouse at
       let { offsetX: x, offsetY: y } = e;
       
    
       //if the target is not the hero element
       if(this !== e.target){
           //get our current position in the element plus the width and height of the page
           x = x + e.target.offsetLeft;
           y = y + e.target.offsetTop;
           //this is so that we can continue to tell where the user is on the page without the element disturbing our positions
       }
       
       //sets the x and y values so that the highest is 50 and the loweest is -50
       const xWalk = Math.round((x / width * walk) - (walk / 2))
       const yWalk = Math.round((y / height * walk) - (walk / 2));
    
       //sets the shadows and their values according to the x and y walks
       
       text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(252, 3, 3)`
        // ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7)
    //    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    //    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)`;
    }



const socket = io(window.location.href);


socket.on('message', (data) => { 
    messages.push(data);
    const noti = document.createElement('div');
    noti.innerHTML = 'New Note';
    noti.setAttribute('id', 'noti');
    document.body.appendChild(noti)
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

const alerter = () => { 
    if(messages.length > 0){
        for(let msg of messages) { 
            try {
                document.getElementById("stop").value = msg;
                setTimeout(() => { 

                }, 1000)
            } catch (error) {
                alert(msg)
            }
        }
    }
    
    document.getElementById("noti").remove();
    messages = [];
}

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
    try {
        document.querySelector("#success-msg").remove();
    } catch (e) {}
    
    messagePerMinute++;

    const time = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    document.querySelector("#send").disabled = true;

    const userMessage = document.getElementById("userMessageField").value;
    recentMessages.push(userMessage)
    socket.emit('message', `Sent at ${time}\n\n${userMessage}`);
    document.getElementById("userMessageField").value = "";
    const success = document.createElement('p');
    success.innerHTML = ""
    success.style.marginLeft = '20px'
    success.innerHTML = "Successfully saved";
    success.setAttribute("id", "success-msg")
    document.querySelector(".main").appendChild(success)
    
    setTimeout(() => {
        document.querySelector("#send").disabled = false;
        document.querySelector("#success-msg").remove();
        
    }, 1500);
}





// window.addEventListener('beforeunload', () => {
//     e.preventDefault();
//     e.returnValue = '';
// })

window.onbeforeunload = () => {
    socket.emit("leave", true);
}

function spamMessage(){
    document.querySelector(".main").remove();
    document.querySelector("body").style.padding = "5%";
    document.querySelector("body").innerHTML = '<h1 id="stop">BITCH CHILL</h1>'
    
    setTimeout(() => { 
        document.querySelector("body").style.padding = "20vw";
        document.querySelector("body").innerHTML = messager;
        document.getElementById("userMessageField").onkeyup = e => e.key == "Enter" ? sendMessage() : null;
        spamWaitTime += 6000;
        messagePerMinute = 0;
    recentMessages = [];
     }, spamWaitTime)

    
}

document.getElementById("userMessageField").addEventListener("keyup", function(e) { 
   
    if(e.key == "Enter"){
        sendMessage();
    }
})


const allEqual = arr => arr.every( v => v === arr[0] )
setInterval(x => {
    
    if(messagePerMinute > 2 && allEqual(recentMessages)){
        spamMessage();
    }
}, 50)

setInterval(x => {
    messagePerMinute = 0;
    recentMessages = [];
}, 30000)


document.addEventListener('mousemove', shadow)
