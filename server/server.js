const express = require('express'),
      path = require('path'),
      app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started @ ${port}`);
});