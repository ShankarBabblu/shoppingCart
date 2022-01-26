var express = require('express');
var mysql = require('mysql')
var cors = require('cors')
var bodyParser = require('body-parser');


var app = express()
app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var con = mysql.createConnection({
    host:"localhost",
    password :"12345",
    database:'shop',
    user: "root",
    port:3306,
}
)

con.connect(function(err) {
    if (err) throw err;
  });
  function execute(query, res){
    con.query(query, (err, result)=> {
      if(err) res.send(err)
      res.send(result)
    })
  }

  app.post('/customer',function(req,res)
  {
    var firstName = req.body.first_name
    var lastName = req.body.last_name
    var email = req.body.email
    var mobile= req.body.mobile
    var password = req.body.password
    let query = `insert into shop.user(FirstName, LastName, Mobile, Email, Pwd) values('${firstName}', '${lastName}', ${mobile}, '${email}', '${password}')`
    execute(query, res)
  })

  //for uploading images

  app.get('/category/:id', function(req, res){
    category_id = req.params.id
    let query = `select * from category where category_id = ${category_id}`
    execute(query, res)
  })


  app.get('/categories', function(req, res){
    let query = `select * from Category`
    execute(query, res)
  })

  app.get('/subCategories', function(req, res){
    let query = `select * from sub_category`
    execute(query, res)
  })

  app.get('/subCategories/:id', function(req, res){
    category_id = req.params.id
    let query = `select * from sub_category where category_id = ${category_id}`
    execute(query, res)
  })

  app.get('/productCategories/:id', function(req, res){
    let query = `select * from products_category where sub_category_id = ${req.params.id}`
    execute(query, res)
  })
  app.get('/products/:id', function(req, res) {
    let product_category_id = req.params.id
    let query = `select * from products where product_category_id = ${product_category_id}`
    execute(query, res)
  })

  app.post('/products/upload', function(req, res){
    product_category_id = req.body.product_category_id
    product_title = req.body.product_title
    product_description = req.body.product_description
    product_price = req.body.product_price
    product_image = req.body.product_image


    let query = `insert into shop.products(product_category_id, product_title, product_description, product_image, product_price) values(${product_category_id}, '${product_title}','${product_description}','${product_image}',${product_price});`
    execute(query, res)
  })


   app.get('/product/images',function(req,res)
   {
     let query = `select * from shop.products`
     execute(query,res)
   })
   
  app.post('/login',function(req,res)
  {
    user = req.body.user
    password = req.body.password
    let query = `SELECT * FROM shop.user where Email = '${user}' and Pwd = '${password}'`
    con.query(query, (err, result)=> {
      if(err) res.send(err)
      res.send(result)
    })
  })

  app.get('/home',function(req,res)
  {
    let query = `select * from shop.product where cat_id = 5`
    con.query(query, (err,result) =>
    {
      if(err) res.send(err)
      res.send(result)
    })
  })
  app.get('/cart/:id', function(req,res) {
    var userId = req.params.id
    let query = `select * from shop.cart where user_id = ${userId}`
    con.query(query, (err, result) => {
      if(err) res.send(err)
      res.send(result)
    })
  })

  app.post('/cart', function(req, res){
    userId = req.body.userid
    firstName = req.body.FirstName
    lastName = req.body.LastName
    mobile = req.body.Mobile
    email = req.body.Email
    let query = `insert into cart(user_id, FirstName, LastName, Email, Mobile) values(${userId},'${firstName}', '${lastName}', '${email}', '${mobile}')`
    execute(query, res)
  })
  
  app.get('/cart/items/:id', function(req,res) {
    var cartId = req.params.id
    let query = `SELECT * FROM shop.cart_items inner join products on cart_items.product_id = products.product_id where cart_id=${cartId}`
    con.query(query, (err, result) => {
      if(err) res.send(err)
      res.send(result)
    })
  }) 

  app.get('/product/:id', function(req, res) {
    var productId = req.params.id
    let query =  `select * from shop.product where Pid=${productId}`
    con.query(query, (err, result) => {
      if(err) res.send(err)
      res.send(result)
    })
  })
  app.post('/cart/add',function(req,res)
  {
    var cartId = req.body.cartId
    var productId= req.body.productId
    console.log(cartId)
    console.log(productId)
    let query = `insert into shop.cart_items(cart_id, product_id, quantity) values(${cartId},${productId},1)`;
    con.query(query,function(err,result)
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })

  app.delete('/cart/empty/:cart_id', function(req, res){
    var cart_id = req.params.cart_id
    console.log(cart_id)
    let query = `delete from cart_items where cart_id = ${cart_id}`
    execute(query, res)
  })

  app.post('/cart/delete/:id',function(req,res)
  {
    var productId  = req.params.id
    var cart_id = req.body.cart_id
    console.log(productId)

    let query = `delete from shop.cart_items where product_id = ${productId} and cart_id =${cart_id}`
    con.query(query,(err,result) =>
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })

  app.post('/signin',function(req,res)
  {
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var mobile = req.body.mobilenumber
    var email = req.body.email
    var password = req.body.password
    let query = `insert into shop.user(FirstName,LastName,Mobile,Email,Pwd) values('${firstName}','${lastName}',${mobile},'${email}',${password});`

    con.query(query, (err,result) =>
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })
  

  app.post('/quantity/inc/:pid',function(req,res)
  {
    var pid = req.params.pid
    var quantity = req.body.quantity
    var cart_id = req.body.cart_id

    console.log(pid)
    console.log(quantity)
    console.log(cart_id)

    let query = `update shop.cart_items set quantity=${quantity} where product_id=${pid} and cart_id=${cart_id};`
    con.query(query, (err,result) =>
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })

  app.post('/quantity/dec/:pid',function(req,res)
  {
    var pid = req.params.pid
    var quantity = req.body.quantity
    var cart_id = req.body.cart_id

    console.log(pid)
    console.log(quantity)

    let query = `delete from shop.cart_items where product_id=${pid} and cart_id=${cart_id};`
    con.query(query, (err,result) =>
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })

  app.post('/checkout',function(req,res)
  {
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var mobile = req.body.mobilenumber
    var email = req.body.email
    var address = req.body.address

    let query = `select * from shop.user where FirstName = 'k';`
    con.query(query, (err,result) =>
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })
  
 

app.listen(3000, () => {
  console.log('listening to 3000')
})