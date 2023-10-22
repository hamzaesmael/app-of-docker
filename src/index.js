const express = require ('express');
const redis = require ('redis');
const {client} = require ('pg');

const PORT = process.env.PORT || 4000;
const app = express ();


const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';


const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on('error',(err) => console.log('redis client error',err));
redisClient.on('connect',() => console.log('connect to redis '));
redisClient.connect();

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
  connectionString: URI,
});
client
  .connect(URI)
  .then(() => console.log('connected to postgres..'))
  .catch((err) => console.log('failed to connect to postgres db:',err));

app.get('/',(req,res) => {
  redisClient.set('products', 'products...');
  res.send('<h1> hamza mooza </h1>');
});
  
app.get('/data', async (req,res) => {
  const products = await redisClient.get('products');
  res.send(`<h1> hamza mooza </h1> <h2> ${products} </h2>`);
});

app.listen(PORT,() => console.log(`app is running:${PORT}`));