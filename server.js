import express from express

const app = express()

app.get('/', (res,req)=> {
    res.send('hola coders')
})

app.listen(8080, error)