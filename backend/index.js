var express = require('express');
var mysql = require('mysql')
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser.json())

const con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password :"12345",
    database:'shop',
    port:3306,
})

con.connect(function(err) {
    if (err) {
      console.log(err);
      throw err;
    }
  });

  app.post('/login',function(req,res)
  {
    user = req.body.user
    password = req.body.password
    let query = `SELECT * FROM user where Email = '${user}' and Pwd = '${password}'`
    con.query(query, (err, result)=> {
      if(err) res.send(err)
      res.send(result)
    })
  })

  app.get('/home',function(req,res)
  {
    let query = `select * from product where cat_id = 5`
    con.query(query, (err,result) =>
    {
      if(err) res.send(err)
      res.send(result)
    })
  })

  app.get('/men/images',function(req,res)
  {
    let query = `select * from product where cat_id = 1`
    con.query(query, (err,result) =>
    {
      if(err) res.send(err)
      res.send(result)
    })
  })
  
  app.get('/women/images',function(req,res){

       let query = 'select * from product where cat_id = 2'
       con.query(query,(err,result) =>
       {
         if(err) res.send(err)
         res.send(result)
       })
    })

  app.get('/kid/images',function(req,res)
  {
    let query = 'select * from product where cat_id = 3'
    con.query(query,(err,result) =>
    {
      if(err) res.send(err)
      res.send(result)
    })
  })

  app.get('/cart/:id', function(req,res) {
    var userId = req.params.id
    let query = `select * from cart where userid = ${userId}`
    con.query(query, (err, result) => {
      if(err) res.send(err)
      res.send(result)
    })
  })
  
  app.get('/cart/items/:id', function(req,res) {
    var cartId = req.params.id
    let query = `SELECT * FROM cart_item inner join shop.product where shop.product.Pid = shop.cart_item.pid having cart_id=${cartId}`
    con.query(query, (err, result) => {
      if(err) res.send(err)
      res.send(result)
    })
  }) 

  app.get('/product/:id', function(req, res) {
    var productId = req.params.id
    let query =  `select * from product where Pid=${productId}`
    con.query(query, (err, result) => {
      if(err) res.send(err)
      res.send(result)
    })
  })
  app.post('/cart/add',function(req,res)
  {
    var cartId = req.body.cartId
    var Pid= req.body.ProductId
    console.log(cartId)
    console.log(Pid)
    let query = `insert into cart_item(cart_id,pid,quantity) values(${cartId},${Pid},1)`;
    con.query(query,function(err,result)
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })

  app.post('/cart/delete/:id',function(req,res)
  {
    var productId  = req.params.id
    var cart_id = req.body.cart_id
    console.log(productId)

    let query = `delete from cart_item where pid = ${productId} and cart_id =${cart_id}`
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

    let query = `insert into user(FirstName, LastName, Mobile, Email, Pwd) values('${firstName}','${lastName}',${mobile},'${email}','${password}');`
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

    let query = `update cart_item set quantity=${quantity} where pid=${pid} and cart_id=${cart_id};`
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

    let query = `delete from cart_item where pid=${pid} and cart_id=${cart_id};`
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

    let query = `select * from user where FirstName = 'k';`
    con.query(query, (err,result) =>
    {
      if(err)
      res.send(err)
      res.send(result)
    })
  })

 

app.listen(3000, () => {
  console.log('listening to 3000 via server')
})