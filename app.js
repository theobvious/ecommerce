const express = require("express");
const cors = require('cors')
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path')
var fs = require('fs');
var upload = require('express-fileupload');
var session = require('express-session');

app.use(express.static('uploads'));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(upload());


app.use(express.static('dist/theshop'));

app.use(express.static('dist/theshop/assets/products'));


app.get('/', (req, res) => {
  res.sendFile('/index.html', {
    root: './dist/theshop/'
  });
});


var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'kfirshop'
});

con.connect((err) => {
  if (err) {
    console.log("Cannot connect to database");
    console.log(err);
    return;
  }
  console.log('Connected');
});

app.use(session({
  secret: 'gates',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 2000000),
    maxAge: 2000000
  }
}));

app.get('/getcategories', (req, res) => {
  con.query(`select distinct category from products`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  })
})

app.post('/getproducts', (req, res) => {
  con.query(`select * from products where category="${req.body.category}"`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/getallproducts', (req, res) => {
  con.query(`select * from products`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/getorders', (req, res) => {
  con.query(`select * from orders`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/getproduct', (req, res) => {
  con.query(`select * from products where id=${req.body.id}`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(data[0]);
    }
  });
})

app.get('/users', (req, res) => {
  con.query(`select * from users`, (err, rows) => {
    if (err)
      console.log(err);
    else
      res.send();
  });
});

app.post('/user', (req, res) => {
    req.session.date = req.body.date;
  con.query(`select * from users where username='${req.body.username}' && password='${req.body.password}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      if (rows.length > 0) {
        req.session.role = rows[0].role;
        req.session.username = rows[0].username;
        req.session.name = rows[0].name;
        req.session.authenticated = true;
        res.send(rows[0]);
      } else {
        res.status(400).send('Username and password are incorrect');
      }
    }
  });
});

app.post('/checkexist', (req, res) => {
  con.query(`select * from users where tz=${req.body.tz}`, (err, rows) => {
    if (err)
      console.log(err);
    else if (rows.length > 0) {
      res.send("1");
    } else if (rows.length < 1) {
      res.send("2");
    }
  })
})

app.post('/newuser', (req, res) => {
  con.query(`insert into users (username, password, email, tz, name, city, street, role) 
    values 
    ("${req.body.username}", "${req.body.password}", "${req.body.email}", ${req.body.tz}, "${req.body.name}", "${req.body.city}", "${req.body.street}", "${req.body.role}")`, (err) => {
    if (err)
      console.log(err);
    else res.send();
  })
})

app.post('/closecart', (req, res) => {
      con.query(`update carts set products='' where cartId="${req.session.id}"`, (err) => {
        if (err)
          console.log(err)
        else {
          res.send();
        }
      })
  })

app.get('/cartproducts', (req, res) => {
  con.query(`select * from carts where cartId="${req.session.id}"`, (err, rows) => {
    if (err)
      console.log(err);
    else if (rows.length > 0) {
      res.send(rows[0].products);
    }
  })
})

app.post('/product', (req, res) => {
    con.query(`select * from carts where cartId='${req.session.id}'`, (err, rows) => {
        if (err) {
            console.log(err);
        } else if (rows.length < 1) {
            con.query(`insert into carts (cartId, products) values(${req.session.id}, '${req.body.products}')`, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log('Cart updated with '+req.body.products);
                }
            })
        } else if (rows.length > 0) {
            con.query(`update carts set products='${req.body.products}' where cartId='${req.session.id}'`, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Cart updated');
                    res.send();
                }
            })
        }
    });
});

app.post('/editproduct', (req, res) => {
  con.query(`update products set name='${req.body.name}', price=${req.body.price}, img='${req.body.img}' where id=${req.body.id}`,(err)=>{
    if (err)
      console.log(err);
    else 
      res.send();
  })
})

app.post('/sendproduct', (req, res)=>{
  con.query(`insert into products (name, price, category, img) values ('${req.body.name}', ${req.body.price}, '${req.body.category}', '${req.body.img}')`, (err)=>{
    if (err) console.log(err);
    else res.send();
  })
})

app.post('/order', (req, res) => {
  con.query(`insert into orders (date, name, email, address, phone, products) values ('${req.body.date}', '${req.body.name}', '${req.body.email}', '${req.body.address}', '${req.body.phone}', '${req.body.products}')`, (err) => {
    if (err)
      console.log(err);
    else
      res.send();
  })
})

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  let newimg = req.files.fileKey;
  let filename = req.files.fileKey.name;
  newimg.mv(path.join('./uploads',filename), (err) => {
    if (err)
      return res.status(500).send(err);
    res.json(filename);
  });
});
  
app.post('/logout', (req, res) => {
  console.log('Logged out');
  req.session.destroy();
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile('/index.html', {
    root: './dist/theshop/'
  });
});

app.listen(8080, () => {
  console.log("8080 is ready");
});
