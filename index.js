const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5554

// Access-Control-Allow-Origin
app.use(cors())

// MONGO DB
mongoose.connect('connect to your mongodb database', () => {
   console.log('connected to mongodb')
})

// GRAPHQL
app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true
}))

app.listen(PORT, () => {
   console.log('server is now listening for requests on port', PORT)
})