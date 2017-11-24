let generateMessage = (from, text) => {
  return {
    text, from, createdAt: new Date().getTime()
  }
}

let generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}


module.exports = { generateMessage, generateLocationMessage };