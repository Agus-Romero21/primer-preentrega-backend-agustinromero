import fs from 'fs'

export default class CartManager{
    constructor (path){
        this.path = path
        this.carts = []
        this.readFile()
    }


readFile = async () => {
    try{
        const dataJson = await fs.promises.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(dataJson)
        return this.carts
    } catch (error){
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), 'utf-8')
    }
}

addCart = async (cart) => {
    try{
        if(this.carts.length === 0) {
            cart.id = 1
        } else{
            cart.id = this.carts [this.carts.length - 1].id + 1
        }

        this.carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), 'utf-8')
        return this.carts
    } catch(error){
        console.log (error)
    }
}
//-----------------------------------------------------------------------
getCarts = async () => {
    try{
        return this.carts
    } catch (error){
        console.log(error)
    }
}
//-----------------------------------------------------------------------
getCartById = async (cid) => {
    try{
        const cartsDB = this.carts
        const cart = cartsDB.find(cart => cart.id === cid)

        if (!cart) return 'no esta el carrito soilicitado'

        return cart

    } catch (error){
        return console.log(error)
    }
}
//-----------------------------------------------------------------------
addProductToCart = async (cid, pid, prod) => {
    try{
        const cartsDB = this.carts
        let cart = cartsDB.find(cart => cart.id === cid)

        //asignar quantity
        if(cart.productID !== parseInt(pid)){
            cart.products.push(prod)
        } else {
            const newCart = cart.product.quantity ++
            cart= newCart
            this.carts.push(cart)
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), 'utf-8')
        return this.carts
        
    } catch (error){
        return console.log('el error es ' + error)
    }       
}


}