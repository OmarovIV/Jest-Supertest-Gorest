require('dotenv').config();

const config = {
    url: "",
    env: process.env.ENV,
    accessToken: process.env.ACCESS_TOKEN,
  };
  
  switch (config.env) {
    case 'main':
      config.url = "gorest.co.in";
      break;
    default:
      config.url = "gorest.co.in";
      break;
  }
  
  module.exports = config;
