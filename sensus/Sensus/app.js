const express = require('express')
const app = express()
const port = 3000

const DistrictController = require('./controller/district')
const CitizenController = require('./controller/citizen')

// const generate = require('./helpers/generate')

app.set('view engine','ejs')
app.use(express.urlencoded({extended : false}))

// app.locals.formatYear = generate

app.get('/',DistrictController.getRoot)
app.get('/districts',DistrictController.getDistrictList)
app.get('/districts/add', DistrictController.formAdd)
app.post('/districts/add', DistrictController.addDistrict)
app.get('/districts/edit/:id', DistrictController.formEdit)
app.post('/districts/edit/:id', DistrictController.editDistrict)
app.get('/districts/delete/:id', DistrictController.deleteDistrict)
app.get('/districts/addCitizen/:id',DistrictController.listCiti)
app.post('/districts/addCitizen/:id',DistrictController.addCiti)

app.get('/citizens',CitizenController.getCitizenList)
app.get('/citizens/add', CitizenController.formAddCitizen)
app.post('/citizens/add', CitizenController.addCitizen)
app.get('/citizens/edit/:id', CitizenController.formEditCitizen)
app.post('/citizens/edit/:id', CitizenController.editCitizen)
app.get('/citizens/delete/:id', CitizenController.deleteCitizen)
app.get('/citizens/list/:id',CitizenController.listAdmin)


app.listen(port, ()=>{
    console.log('Port Menyala di', port)
})