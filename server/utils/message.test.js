const expect = require('expect'),
      { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'John';
    const text = 'Buy lunch';
    const res = generateMessage(from, text);
    expect(res).toBeTruthy();
    expect(res).toMatchObject({ from, text });
    expect(typeof res.createdAt).toBe('number');
  });
});