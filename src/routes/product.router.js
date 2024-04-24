import {Router} from 'express'
import ProductsManager from '../managers/productManager.js'

const router = Router()

const path = './file/Products.json' 
const products = new ProductsManager(path)

//---------------------------------------------------------
//---------------------------------------------------------

// ENDPOINTS DE CRUDS DE PRODUCTOS

router.get('/', async (req, res)=> {
    const {limit} = req.query
    const response = await products.getProducts()

    if(!limit) return res.send(response)
    const prodFound = response.filter (p => p.id === parseInt(limit))
    res.send(prodFound)
})



router.post('/', async (req, res)=> {
    const {title, description, price, thumbnail, code, stock} = req.body
    console.log(req.body)
    
    if(!title || !description || !price|| !code || !stock) return res.send({status: 'error', error: 'faltan campos por completar'})
    
    const response = await products.addProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    })

    res.send({status: 'success', payload: response})
})

router.get('/:pid', async (req, res)=> {
    const {pid} = req.params

    const productFound = await products.getProductById(parseInt(pid))
    if(productFound) return res.send(productFound) 

     return res.send('el producto no fue encontrado')
})

//QUE USUARIO ACTUALIZO?

router.put('/:pid', async (req, res)=> {
    const { pid } = req.params 
    const productToUpDate = req.body
    console.log(req.body)
    


    const productIndex = products.updateProduct(parseInt(pid), productToUpDate)
    if (!productIndex) return res.status(404). send({status: 'error', error: 'product not found'})

    res.send({ststus: 'success', payload: productIndex})
    
})

router.delete('/:pid', (req, res)=> {
    const { pid } = req.params 
    const productResult = products.deleteProduct(parseInt(pid))


    res.send({status: 'success', payload: productResult})

})

export default router