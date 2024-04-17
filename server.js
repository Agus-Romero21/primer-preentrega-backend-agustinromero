import express from 'express'
import productsRouter from './src/routes/product.router.js'
import cartRouter from './src/routes/cart.router.js'
import { __dirname } from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/static', express.static(__dirname + '/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


app.listen(8080, error =>{
    if (error) console.log(error)
    console.log('server escuchando en el puerto 8080')
})

