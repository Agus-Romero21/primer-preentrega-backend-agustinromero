import fs from 'fs'

export default class ProductsManager{
    constructor(path){
        this.path = path
    }

    readFile = async () => {
        try{
            const dataJson = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(dataJson)
        } catch (error){
            return []
        }
    }
    

    addProduct = async (product) => {
        try{
            const productsDB = await this.readFile()

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
            return await this.readFile()
        } catch (error){
            console.log(error)
        }
    }
    //-----------------------------------------------------------------------
    getProductById = async (pid) => {
        try{
            const productsDB = await this.readFile()
            const product = productsDB.find(prod => prod.id === pid)

            if (!product) return 'no esta el producto soilicitado'

            return product

        } catch (error){
            return console.log(error)
        }
    }
    //-----------------------------------------------------------------------
    updateProduct = async (pid) => {
        try{
            const productsDB = await this.readFile()
            const product = productsDB.find(prod => prod.id === pid)

            if (!product) return 'no esta el producto soilicitado'

            productsDB.push(product)
            await fs.promises.appendFile(this.path, JSON.stringify(productsDB, {id: parseInt(uid), ...userToUpdate} , '\t'), 'utf-8') 
            console.log("corregimos el elemento")
            return console.log(product)
        } catch (error){
            return console.log(error)
        }
        
    }
    //-----------------------------------------------------------------------
    deleteProduct = async (pid) => {
        try{
            const productsDB = await this.readFile()
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
