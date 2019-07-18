//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req, res){
  res.render('home', {startingContent: homeStartingContent, userPosts: posts});
});
app.get('/compose', function(req, res){
  res.render('compose');
});
app.get('/about', function(req, res){
  res.render('about', {aboutContent: aboutContent});
});

app.get('/posts/:topic', function(req, res){
  const topic = req.params.topic;  //lower case the title of the post of the url
  posts.forEach(post => {

    if (topic === post.slug){
      res.render('post', {postContent: post});
    } else {
      console.log('Not a match');
    }
  });
})

app.post('/compose', function(req, res){
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    slug: _.kebabCase(req.body.postTitle)
  }
  posts.push(post);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
