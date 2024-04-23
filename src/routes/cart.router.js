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
    const {id, products} = req.body
    console.log(req.body)
    
    if(!products) return res.send({status: 'error', error: 'el carrito no fue ingresado'})
    
    const response = await carts.addCart({
        id,
        products
    })

    res.send({status: 'success', payload: response})
})

router.get('/:cid', async (req, res)=> {
    const {cid} = req.params

    const cartFound = await carts.getCartById(parseInt(cid))
    if(cartFound) return res.send(cartFound) 

    re.json('No se encontro el carrito')
     return console.log('el carrito no fue encontrado')
})
//---------------------------------------------------------------

router.post('/:cid/product/:pid', async (req, res, next)=> {
  try{
    const {cid} = req.params
    const {pid} = req.params
    const {productID, quantity} = req.body
    
    const response = await carts.addProductToCart(parseInt(cid), parseInt(pid),
      {
        productID: parseInt(pid),
        quantity: 1
      }
    )
    
    res.send({status: 'success', payload: response})

  } catch(error){
    next(error)
  }
  
})



export default router 