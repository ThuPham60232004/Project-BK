const path = require('path');

module.exports = {
  devServer: {
    allowedHosts: 'all', 
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000, 
  },
};
