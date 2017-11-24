const expect = require('chai').expect;
const { generateMessage,generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate corrent message object', () => {
    let from = 'admin',
      text = 'welcome';
    let result = generateMessage(from, text);
    expect(result).to.include({ from, text });
    expect(result.createdAt).to.be.a('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate corrent location message object', () => {
    let from = 'admin',
      latitude = 13, longitude=33;
    let url=`https://www.google.com/maps?q=${latitude},${longitude}`;
    let result = generateLocationMessage(from, latitude,longitude);
    expect(result).to.include({ from, url });
    expect(result.createdAt).to.be.a('number');
  });
});