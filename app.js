// aws dynamodb list-tables --endpoint-url http://localhost:8080
// java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const GoogleImages = require('google-images')
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": process.env.AWS_REGION,
    "endpoint": process.env.AWS_DYNAMODB_ENDPOINT
}

const dynamodb = new AWS.DynamoDB(config)
const clientdb = new AWS.DynamoDB.DocumentClient(config)

app.post('/images', (req, res) => {
    try {
        const GoogleImagesClient = new GoogleImages(process.env.GOOGLE_CSE, process.env.GOOGLE_API_KEY)
        const page = req.body.page ? req.body.page : 1

        GoogleImagesClient.search(req.body.location, { page: page, size: 'xxlarge', defaultToImageSearch: 'true' }).then(images => {
            return res.json({ status: 'success', images })
        })
    } catch (err) {
        return res.json({ status: 'error', err })
    }

})

app.get('/', async (req, res) => {
    try {
        const data = await clientdb.scan({ TableName: "Locations" }).promise()
        return res.json({ status: 'success', v: 2, locations: data.Items })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})

app.get('/:id', async (req, res) => {
    const params = {
        TableName: 'Locations',
        Key: { 'location_id': req.params.id }
    }

    try {
        const returnedData = await clientdb.get(params).promise()
        return res.json({ status: 'success', location: returnedData.Item })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})

app.post('/', async (req, res) => {
    try {
        const uuid = uuidv4()
        const params = {
            Item: {
                location_id: uuid,
                location: req.body.location,
                image: req.body.image
            },
            TableName: "Locations",
        }

        clientdb.put(params, (err, data) => {
            if (err) return res.json({ status: 'error', err })

            return res.json({ status: 'success', location_id: uuid })
        })
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
})

app.put('/:id', (req, res) => {
    const params = {
        TableName: 'Locations',
        Key: { HashKey: 'hashkey' },
        UpdateExpression: 'set #title = ' + req.body.title
    }

    dynamodb.update(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
})

app.delete('/:id', (req, res) => {
    dynamodb.deleteItem({
        Key: {
            location_id: { S: req.params.id }
        },
        TableName: "Locations",
    }, (err) => {
        if (err) return res.json({ err })

        return res.json({ status: 'success' })
    })
})

app.get('/create-table', (req, res) => {
    const params = {
        "TableName": "Locations",
        "KeySchema": [
            {
                "AttributeName": "location_id",
                "KeyType": "HASH"
            }
        ],
        "AttributeDefinitions": [
            {
                "AttributeName": "location_id",
                "AttributeType": "S"
            }
        ],
        "ProvisionedThroughput": {
            "ReadCapacityUnits": 5,
            "WriteCapacityUnits": 5
        }
    }

    dynamodb.createTable(params, (err, data) => {
        if (err) return res.json({ status: 'error', err })
        return res.json({ status: 'success', data })
    })
})

app.get('/delete-table', (req, res) => {
    dynamodb.deleteTable({ TableName: "Locations" }, (err, data) => {
        if (err) return res.json({ status: 'error', err })

        return res.send({ status: 'success', message: 'Table deleted' })
    })
})

http.createServer(app).listen(process.env.PORT || 8080)