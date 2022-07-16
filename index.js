// import express
const express = require('express')

// use express
const app = express()

// handlebars view
app.set('view engine', 'hbs');

app.use('/public', express.static('public'))

//body parser
app.use(express.urlencoded({ extended: false })) 

const islogin = true

// endpoimt
app.get('/home', function (req, res) {
    res.render('index')
})

app.get('/contact-me', function (req, res) {
    res.render('contact-me')
})

app.get('/project', function (req, res) {
    if(islogin){
        res.render('add-project')
    } else
    {
        res.redirect('/home')
    }
})

app.get('/project/:id', function (req, res) {
    let id = req.params.id
    res.render('detail-project')
})

// post project

app.post('/project', function (req, res) {
    let {title} = req.body;
    let {dateStart} = req.body;
    let {dateEnd} = req.body;
    let {description} = req.body;
    let duration = countDuration(new Date(dateStart), new Date(dateEnd));
    
    function countDuration(dateStart, dateEnd) {
        const result =
        dateEnd.getMonth()-
        dateStart.getMonth();
        return Math.abs(result);
      }

    console.log(title,dateStart, dateEnd, duration, description);
   
    res.redirect('/home')
})



// port
const port = 3000
app.listen(port, function () {
    console.log(`server running on port : ${port}`);
})