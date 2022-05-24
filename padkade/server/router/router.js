const route = require('express').Router()
const static = require('express').static
const controller=require('../controller/controller')
const store=require('../middleware/multer')
const bodyparser = require('body-parser')

// routes
route.use(bodyparser.urlencoded())
route.get('/',controller.home);
route.post('/uploadmultiple', store.array('images',12), controller.uploads)
route.use('/image' , static('./uploads2'))
route.use('/image/*' , static('./uploads2'))
route.post('/delete', controller.delete)

module.exports=route;
