const socket = io()

const messageForm = document.getElementById("menssage-form")
const chat = document.getElementById("chat")
const message = document.getElementById("menssage")

messageForm.addEventListener("submit", async(e) => {
    e.preventDefault()

    let objetoLocalStorage = await JSON.parse(localStorage.getItem("chat-app-email"))

let data= {
    email:objetoLocalStorage,
    message: message.value
}
    socket.emit("send-message",data)
    message.value=""
})

socket.on("new-message", (data) => {
    chat.innerHTML+=`<b>${data.email}</b>: <p>${data.message}</p>`
})

socket.on("load-old-messages",(data)=>{
    data.map((el)=>{
        render(el)
    })
})

const render = (data)=>{
    chat.innerHTML+=`<p>${data.email}: ${data.message}</p>`
}