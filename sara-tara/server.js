'use strict';

//DONE: Finish out the server code according to the instructions in the lab README

// Load the express dependency - We are telling it to use express 
const express = require('express');

//Instantiate the Express dependency 
const app = express();


//Set a port
const PORT = process.env.PORT || 3000;

//Tell Express where to serve the files from - We are telling Express which source to use 
//DONE: COMMENT: about why our files are in public directory and how ExpressJS serves our local files? Express looks up the files relative to the static directory (in our case it's public) so the name of that directory wont be part of the URL. We are using Express built in middleware static function to do that. 
app.use(express.static('./public'))


//Add a route and callback for the new article form page.
app.get('/form',(request, response)=>{
  response.sendFile('public/new.html', {root: '.',});
});

// REVIEW: POST route needs to parse the body passed in with the request.
// POST middleware 
app.use(express.urlencoded({ extended: true }));

app.post('/articles', (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

// 404 handler
app.use((request, response) =>{
  console.log('Page not found');
  response.send('Page not found');
});

//Tell Express to listen 
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));