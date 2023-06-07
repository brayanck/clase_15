const formAgregar = document.getElementById("form_agregar")
const name = document.getElementById("name")
const price = document.getElementById("price")
const description = document.getElementById("description")
const category = document.getElementById("category")
const stock = document.getElementById("stock")
const image = document.getElementById("image")

let saveId = ""


formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (saveId) {
        updateProduct(saveId,
            name.value,
            price.value,
            description.value,
            category.value,
            stock.value,
            image.value,)
    } else {
        saveProduct(
            name.value,
            price.value,
            description.value,
            category.value,
            stock.value,
            image.value,
        );
    }
            saveId=""
            name.value =""
            price.value =""
            description.value =""
            category.value =""
            stock.value =""
            image.value =""
});
loadProduct(renderProducts)

onNewProduct(appendProduct)

const fillForm = (product) => {
    name.value = product.name;
    price.value = product.price;
    description.value = product.description;
    category.value = product.category;
    stock.value = product.stock;
    image.value = product.image;
    saveId = product._id
}
selectedProduct(fillForm)