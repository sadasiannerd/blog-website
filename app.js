const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');
const { Schema } = require('mongoose')
const app = express();

// view engine set up
app.set('view engine', 'ejs');

// app configuration

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// database set up
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/postDB');
}

const postSchema = new mongoose.Schema({
  post_title: String,
  post_body: String
})

const posts = new mongoose.model('post', postSchema)

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.get('/', async (req, res) =>
{
  const all_posts = await posts.find({})
  res.render('home', {display_content: homeStartingContent, blogs: all_posts});
})

app.get('/posts/:postId', async (req, res) =>
{
  let blog_id = req.params.postId
  let the_blog = await posts.find({_id: blog_id})
  res.render("post", {postTitle: the_blog[0].post_title, postBody: the_blog[0].post_body})
})
app.get('/about', async (req, res) =>
{
  res.render('about', {display_content: aboutContent})
})
app.get('/contact', async (req, res) =>
{
  res.render('contact', {display_content: contactContent})
})
app.get('/compose', async (req, res) =>
{ 
  res.render('compose')
})
app.post('/compose', async (req, res) =>
{
    const composeData = {
      post_body: req.body.postBody,
      post_title: req.body.postTitle,
    }
    await posts.insertMany([composeData])
    res.redirect('/')
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
