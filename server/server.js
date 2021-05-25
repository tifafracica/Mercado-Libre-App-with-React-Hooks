const app = require('./app');

// use uncaughtException when an uncaught JavaScript exception reverts to the node.js event loop.
// also to detect and keep track of promises that were
// rejected and whose rejections have not yet been handled.
process.on('uncaughtException', err => {
  console.log('Uncaught Exception! shutting down...')
  console.log(err.name, err.message);
  //shutting down the server and close the process
  process.exit(1);
})

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
