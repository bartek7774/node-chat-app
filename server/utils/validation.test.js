const expect = require('chai').expect;
const { isRealString } = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string values', () => {
    let result=isRealString(1);
    expect(result).to.be.false;
  });
  it('should reject with only spaces', () => {
    let result=isRealString(' ');
    expect(result).to.be.false;
  });
  it('should allow string with non-space characters', () => {
    let result=isRealString('  Mad Max  ');
    expect(result).to.be.true;
  });
});