import fs from 'fs'

export default class ProductsManager{
    constructor(path){
        this.path = path
        this.product = []
        this.readFile()
    }

    readFile = async () => {
        try{
            const dataJson = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(dataJson)   
            return this.products
        } catch (error){
            await fs.promises.readFile(this.path,JSON.stringify(this.products, null, '\t' ), 'utf-8')
        }
    }
    

    addProduct = async (product) => {
        try{
            const productsDB = this.products

            //validar code
            const productFound = productsDB.find(prod => product.code === prod.code)
            if(productFound) return 'ya existe el producto'
            //asignar Id
            if(productsDB.length === 0){
                product.id= 1
            } else {
                product.id = productsDB[productsDB.length -1]. id +1
            }

            productsDB.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsDB, null, '\t'),'utf-8')
            //agregar el producto
            return productsDB

        } catch(error){
            console.log (error)
        }
    }
    //-----------------------------------------------------------------------
    getProducts = async () => {
        try{
            return this.products
        } catch (error){
            console.log(error)
        }
    }
    //-----------------------------------------------------------------------
    getProductById = async (pid) => {
        try{
            const productsDB = this.products
            const product = productsDB.find(prod => prod.id === pid)

            if (!product) return 'no esta el producto soilicitado'

            return product

        } catch (error){
            return console.log(error)
        }
    }
    //-----------------------------------------------------------------------
    updateProduct = async (pid, productToUpDate) => {
        try{
            const productsDB = this.products
            const product = productsDB.find(prod => prod.id === pid)
            const productDate = productToUpDate

            if (!product) return 'no esta el producto soilicitado'

            this.products.push(productDate)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, {id: parseInt(pid), ...productDate} , '\t'), 'utf-8') 
            console.log("corregimos el elemento")
            return console.log(productDate)
        } catch (error){
            return console.log(error)
        }
        
    }
    //-----------------------------------------------------------------------
    deleteProduct = async (pid) => {
        try{
            const productsDB = this.products
            const product = productsDB.filter(prod => prod.id !== pid)
            
            console.log (product)

            if (!product) return 'no esta el producto soilicitado'

            await fs.promises.writeFile(this.path,JSON.stringify(product, null , '\t'),'utf-8')
            return product
        } catch (error){
            return console.log(error)
        }
    }
}



// este proyecto me quedo sin terminar, voy a hacer la entrega y ir actualizandolo
