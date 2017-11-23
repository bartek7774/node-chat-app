const expect = require('chai').expect;
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate corrent message object', () => {
    let from = 'admin',
      text = 'welcome';
    let result = generateMessage(from, text);
    expect(result).to.include({ from, text });
    expect(result.createdAt).to.be.a('number');
  });
});