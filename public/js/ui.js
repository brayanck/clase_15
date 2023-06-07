const caja = document.getElementById("caja")
function render (data){

    const div = document.createElement("div")
    div.innerHTML = `
    <div class="col">
    <div class="card h-100">
      <img src="${data.image}" class="card-img-top " alt="${data.name}">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">precio:$${data.price}</p>
        <p class="card-text">${data.description}</p>
      </div>
      <div class="card-footer">
      <button class="btn btn-danger delete" data-id="${data._id}">eliminar</button>
      <button class="btn btn-primary update" data-id="${data._id}">update</button>
      </div>
    </div>
  </div>`
  const btnDelete=div.querySelector(".delete")
  const btnUpdate = div.querySelector(".update")
  
  btnDelete.addEventListener("click",()=>{
    deleteProduct(btnDelete.dataset.id)
  })
  btnUpdate.addEventListener("click",()=>{
    getProductById(btnDelete.dataset.id)
  })
  return div
}

const renderProducts = (products)=>{
    caja.innerHTML=""
    products.forEach(element => {
        caja.append(render(element))
    });
}
const appendProduct=(product)=>{
    caja.append(render(product))
}
