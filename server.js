const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const mongodb = require('./config/database')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.error(err)
  } else {
    console.log(`Database is running`)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})