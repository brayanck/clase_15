const fs = require("fs");

 class ProductManager {
    constructor(path) {
        
        this.path = path;
    }

    static id=0
    writeFile = async(data)=>{
        try{
        await fs.promises.writeFile(this.path,JSON.stringify(data,null,2),"utf-8")
        }catch(err){
            console.log(err)
        } 
        
    }
    getProducts = async()=> {
        try {
            let readProduct = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(readProduct);
        
            
        } catch(err) {
            console.log(err)
        }

    }
    
    addProduct = async (product) => {
        
        try {
            if (
                !product.code ||
                !product.description ||
                !product.price ||
                !product.thumbnail ||
                !product.code ||
                !product.stock
            ) {
                return console.error("falta algun dato");
            }
            let arrayProduct= await this.getProducts()
            if (arrayProduct.some((p) => p.code === product.code)) {
                return console.error("EL PRODUCTO YA EXISTE");
            }
            ProductManager.id++
            const newProduct = {
                id: ProductManager.id,
                ...product,
            };
            
            arrayProduct.push(newProduct);
            
            await this.writeFile(arrayProduct)

        } catch (error) {
            console.log("error al agregar producto");
        }
    }
    

    getProductById = async(id) =>{
        try{
            let arrayProduct= await this.getProducts()
        const product = arrayProduct.find((p) => p.id == id);
        if (!product) {
            return false
        }else{
            return product
        }
        }catch(error){
            console.log("error al traer el producto")
        }
        
    }

    deleteProduct= async (id)=>{
        try{
            let arrayProduct= await this.getProducts()
            let filtro = arrayProduct.filter((ele)=>{
                ele.id !== id
               })
           await this.writeFile(filtro)

        }catch(error){
            console.log("error al eliminar el producto")
        }

    }
    async updateProduct(id,nuevoProducto){
        try{
            let arrayProduct= await this.getProducts()
            let filtro = arrayProduct.filter((ele)=>{
                ele.id !== id
               })
           const product = arrayProduct.find((p) => p.id === id);
           for (let atributo in nuevoProducto) {
            if (product.hasOwnProperty(atributo)) {
                product[atributo] = nuevoProducto[atributo];
            }
          }
           
           const productoActualizado = {
             ...product,
             id:id 
           };
           
           filtro.push(productoActualizado)

           await this.writeFile(filtro)
        }catch(err){
            console.log("eerr")
        }
    }
    
}
module.exports = ProductManager;
