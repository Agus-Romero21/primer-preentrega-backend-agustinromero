import fs from 'fs'

export default class CartManager{
    constructor (path){
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

addCart = async (cart) => {
    try{
        const cartsDB = await this.readFile()

        //asignar Id
        if(cartsDB.length === 0){
            cart.id= 1
        } else {
            cart.id = cartsDB[cartsDB.length -1]. id + 1
        }

        cartsDB.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsDB, null, '\t'),'utf-8')
            //agregar el producto
            return cartsDB
        

    } catch(error){
        console.log (error)
    }
}
//-----------------------------------------------------------------------
getCarts = async () => {
    try{
        return await this.readFile()
    } catch (error){
        console.log(error)
    }
}
//-----------------------------------------------------------------------
getCartById = async (cid) => {
    try{
        const cartsDB = await this.readFile()
        const cart = cartsDB.find(cart => cart.id === cid)

        if (!cart) return 'no esta el carrito soilicitado'

        return cart

    } catch (error){
        return console.log(error)
    }
}
//-----------------------------------------------------------------------
addProductToCart = async (cid, pid) => {
    try{
        const cartsDB = await this.readFile()
        const cart = cartsDB.find(cart => cart.id === cid)

        //asignar quantity
        if(cart.product.productID !== pid ){
            cart.product.push({id: cid, quantity: 1})
                await fs.promises.writeFile(this.path,JSON.stringify(cart, null, '\t'), 'utf-8')
        } else {
             cart.product.push( {productID: cart.id, quantity:cart.quantity ++} )
            await fs.promises.writeFile(this.path,JSON.stringify(cart, null, '\t'), 'utf-8')
        }

        // cart.prod.push({id: cid, quantity: 1})
        //         await fs.promises.writeFile(this.path,JSON.stringify(cartId, null, '\t'), 'utf-8')
            //agregar el producto
            return cart





        // const cartsDB = await this.readFile()
        // const cartId = cartsDB.find(cart => cart.id === cid)
        // console.log(cartId)
        
        // if(cartId){
        //     prod = cartId.procutc.find(prod == prod.id === pid)
        //     caonsole.log(prod)
            
        //     if(prod){
        //         prod.quantity += quantity
        //     } else{
        //         cartId.prod.push({id: cid, quantity: 1})
        //         await fs.promises.writeFile(this.path,JSON.stringify(cartId, null, '\t'), 'utf-8')
        //     }   return cartId
        // } console.log('no encontre el carrito solicitado')
        
    } catch (error){
        return console.log('el error es ' + error)
    }       
}


}