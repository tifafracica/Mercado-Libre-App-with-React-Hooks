const app = require('./app');
const path = require('path');

// use uncaughtException when an uncaught JavaScript exception reverts to the node.js event loop.
// also to detect and keep track of promises that were
// rejected and whose rejections have not yet been handled.
process.on('uncaughtException', err => {
  console.log('Uncaught Exception! shutting down...')
  console.log(err.name, err.message);
  //shutting down the server and close the process
  process.exit(1);
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
