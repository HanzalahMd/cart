const express = require('express')
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({defaultLayout: 'default.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    const cart = [];
    res.status(200);
    res.type('text/html');
    res.render('cart', {
        cartState: JSON.stringify(cart)
    });
})

// const cart = [];

app.post('/', 
    express.urlencoded({extended: true}),
    //express.json,
    (req, res)=>{
    console.log('body: ', req.body);
    // cart.push(req.body)
    const cart = JSON.parse(req.body.cartState);
    cart.push({
        item: req.body.item,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice
    })

    res.status(200);
    res.type('text/html');
    res.render('cart', {
        cart: cart,
        cartState: JSON.stringify(cart)
    });
})

app.use(
    express.static( __dirname + '/static')
)

let PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

app.listen(PORT, ()=>{
    console.log(`Application has started on ${PORT} on ${new Date}`);
})