const express	 = require('express'),
	  bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      users      = require('./models/user'),
      consts     = require('./models/const'),
	  app	 	 = express(),
	  port		 = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get('/' ,
    (req,res) =>{
    res.sendFile(`${__dirname}/index.html`);
    });

app.get('/includes/style.css',
    (req,res) =>{
    res.sendFile(`${__dirname}/includes/style.css`);
    });

// sending all Users
app.get('/getAllUsers', (req, res) =>{ 
    mongoose.connect(consts.mlab_key).then(() => {
            users.find({}, (err, user) => {
                if (err)
                 res.status(500).send({ "Message": `query error: ${err}`});

            res.status(200).json(user);
            mongoose.disconnect();
            });
        },
        err => {
            res.status(500).send({"Message": `connection error: ${err}`});
    });
}); 

// sending favorite books of the User by id
app.post('/getFavoritesById/',(req, res) =>{ 
    mongoose.connect(consts.mlab_key).then(() => {
            users.findOne({'user_id': req.body.user_id}, (err, user) => {
                if (err)
                    res.status(500).send({"Message": `query error: ${err}`});

            res.status(200).json(user);
            mongoose.disconnect();
            });
        },
        err => {
             res.status(500).send({"Message": `connection error: ${err}`});
    });           
});

// sending array of favorite books by genre of the User by id 
app.get ('/user_favorite_genre/:user_id/:genre' ,(req, res) =>{
        mongoose.connect(consts.mlab_key).then(() => {
            genres = Array();
            users.findOne({
                'user_id': req.params.user_id,
                'favorites.genre': req.params.genre
              }, (err, user) => {
                if (err)
                 res.status(500).send({"Message": `query error: ${err}`});
                       
                for(let i in user.favorites){
                    if(req.params.genre == user.favorites[i].genre)
                        genres.push(user.favorites[i]);             
                } 
                res.status(200).json(genres);             
                mongoose.disconnect();
            });
        },
        err => {
            res.status(500).send({"Message": `connection error: ${err}`});
    });
}); 

app.put ('/user_favorite_genre/:user_id/:genre' ,(req, res) =>{ 
        mongoose.connect(consts.mlab_key).then(() => {
            genres = Array();
            users.findOne({
                'user_id': req.params.user_id,
                'favorites.genre': req.params.genre
              }, (err, user) => {
                if (err)
                 res.status(500).send({"Message": `query error: ${err}`});
                       
                for(let i in user.favorites){
                    if(req.params.genre == user.favorites[i].genre)
                        genres.push(user.favorites[i]);             
                } 
                res.status(200).json(genres);             
                mongoose.disconnect();
            });
        },
        err => {
            res.status(500).send({"Message": `connection error: ${err}`});
    });
}); 

app.post ('/user_favorite_genre/' ,(req, res) =>{ 
        mongoose.connect(consts.mlab_key).then(() => {
            genres = Array();
            users.findOne({
                'user_id': req.body.user_id,
                'favorites.genre': req.body.genre
              }, (err, user) => {
                if (err)
                 res.status(500).send({"Message": `query error: ${err}`});
                       
                for(let i in user.favorites){
                    if(req.body.genre == user.favorites[i].genre)
                        genres.push(user.favorites[i]);             
                } 
                res.status(200).json(genres);             
                mongoose.disconnect();
            });
        },
        err => {
            res.status(500).send({"Message": `connection error: ${err}`});
    });
}); 

app.all('*', (req, res) => {
	res.json('worng rout');
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

