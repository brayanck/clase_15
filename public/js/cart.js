const socket = io()
const carro = document.getElementById("carro")
const id = async()=>{
  let objetoLocalStorage = await JSON.parse(localStorage.getItem("chat-app-email"))
  socket.emit('client:send-emailname', objetoLocalStorage);
}
id()
const agregarCarro = document.getElementById("agregar_carrito")
const name = document.getElementById("name")
const cantidad = document.getElementById("cantidad")
socket.on("server:load-cart",(data)=>{
    renderProducts(data)
})
agregarCarro.addEventListener("submit", async(e) => {
    e.preventDefault()
    let objetoLocalStorage = await JSON.parse(localStorage.getItem("chat-app-email"))
    let data= {
        usuario:objetoLocalStorage,
        name:name.value,
        count: cantidad.value
    }
    socket.emit("cliente:send-product",data)
    name.value=""
    cantidad.value=""
})

const loadProduct = (callback) => {
  socket.on("server:load-cart",callback);
}

function render (data){

    const div = document.createElement("div")
    div.innerHTML = `
    <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">precio:$${data.count}</p>
      </div>
      <div class="card-footer">
      <button class="btn btn-danger delete" data-id="${data._id}">eliminar</button>
      </div>
    </div>
  </div>`
  const btnDelete=div.querySelector(".delete")
  
  btnDelete.addEventListener("click",()=>{
    deleteProduct(btnDelete.dataset.id)
  })
  return div
}
const deleteProduct=(id)=>{
  console.log(id)
  socket.emit("client:deleteProduct",id)
}
const renderProducts = (products)=>{
  carro.innerHTML=""
  products.forEach(element => {
    carro.append(render(element))
  });
}
const appendProduct=(product)=>{
  carro.append(render(product))
}
loadProduct(renderProducts)