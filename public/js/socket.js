const socket = io();

const loadProduct = (callback) => {
    socket.on("server:load-Products",callback);
}
const saveProduct = (name, price, description, category, stock,image) => {
    socket.emit("cliente:new-product", {
        name,
        price,
        description,
        category,
        stock,
        image,
    });
};

const onNewProduct =(callback)=>{
    socket.on("servidor:newProduct",callback)
}

const deleteProduct=(id)=>{
    socket.emit("client:deleteProduct",id)
}
const getProductById=(id)=>{
    socket.emit("client:getProduct",id)
}

const selectedProduct = (callback)=>{
    socket.on("server:slectedProduct",callback)
}
const updateProduct = (id,name,description,image,price,category)=>{
    socket.emit("client:updateProduct",{
        _id:id,
        name,
        description,
        image,
        price,
        category

    })

}
