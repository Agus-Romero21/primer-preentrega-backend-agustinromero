import { Router } from 'express'
import CartManager from '../managers/cartManager.js'

const router = new Router()

const path = './file/Carts.json'
const carts = new CartManager(path)

//--------------------------------------------------------------------
//--------------------------------------------------------------------

//ENDPOINTS DE CRUD DE CARRITOS

router.get('/', async (req,res)=> {
    const {limit} = req.query
    const response = await carts.getCarts()

    if(!limit) return res.send(response)
    const cartFound = response.filter (c => c.id === parseInt(limit))
    res.send(cartFound)
})


router.post('/', async (req,res)=> {
    const {id, product} = req.body
    console.log(req.body)
    
    if(!product) return res.send({status: 'error', error: 'el carrito no fue ingresado'})
    
    const response = await carts.addCart({
        id,
        product
    })

    res.send({status: 'success', payload: response})
})

router.get('/:cid', async (req, res)=> {
    const {cid} = req.params

    const cartFound = await carts.getCartById(parseInt(cid))
    if(cartFound) return res.send(cartFound) 

     return console.log('el carrito no fue encontrado')
})
//---------------------------------------------------------------

router.post('/:cid/product/:pid', async (req, res, next)=> {
  try{
    const {cid} = req.params
    const{pid} = req.params
    
    // if(!productID) return res.send({status: 'error', error: 'el carrito no fue ingresado'})
    
    const response = await carts.addProductToCart(parseInt(cid), parseInt(pid))

    res.send({status: 'success', payload: response})






    // const {cid} = req.params.cid
    // const{pid} =req.params.pid

    // const {productID, quantity} = req.body

    // if (quantity > 1){
    // const cart = await carts.addProductToCart(parseInt(cid), parseInt(pid))
    // if (cart) return res.send(cart)
    // } else {
      
    // }

  } catch(error){
    next(error)
  }
  
})



export default router 