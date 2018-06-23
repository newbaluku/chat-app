const expect = require('expect'),
      { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'John';
    const text = 'Buy lunch';
    const res = generateMessage(from, text);
    expect(res).toMatchObject({ from, text });
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('shouold generate correct location object', () => {
    const from = 'Allen';
    const latitude = 1;
    const longitude = 2;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const res = generateLocationMessage(from, latitude, longitude);
    expect(res).toMatchObject({ from, url });
    expect(typeof res.createdAt).toBe('number');
  });
});