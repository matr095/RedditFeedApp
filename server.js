const Reddit = require('reddit')
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')

const reddit = new Reddit({
  username: 'mathieu095',
  password: 'vicecity',
  appId: 'KjXHQyW4qhvhQg',
  appSecret: 'sM4vlk4hAplVG4rKdG65zKQwo7W0Sw'
})  
 
async function getSubReddit(subreddit) {
  const res = await reddit.get('/r/'+subreddit+'/hot', {"limit": 100})
  console.log(res.data)
  return res.data
} 

async function getSubRedditComments(subreddit, article) {
  const res = await reddit.get('/r/'+subreddit+'/comments/'+article, {"limit": 3, "sort": "confidence"})
  console.log("responsa")
  console.log(res[1].data.children) 
  return res[1].data.children
} 
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
 
var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/reddit/:subreddit', function(req, res) {
  var toSend = {};
  getSubReddit(req.params.subreddit).then(function(respon) {
      respon.children.forEach(function(value, index) {
        toSend[index] = {"title" : value.data.title, "text" : value.data.selftext, "id" : value.data.subreddit + "/" + value.data.id}
      });
      res.send(toSend);
  })
});
app.get('/reddit/:subreddit/comments/:article', function(req, res) {
  var toSend = {};
  getSubRedditComments(req.params.subreddit, req.params.article).then(function(respon) {
      respon.forEach(function(value, index) {
        console.log(value)
        toSend[index] = {"title": value.data.body}
      });
      res.send(toSend);
  })
});
app.listen(4000);