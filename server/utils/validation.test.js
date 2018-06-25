const expect = require('expect'),
      { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(73283)).toBe(false);
    expect(isRealString(undefined)).toBe(false);
    expect(isRealString(3.222)).toBe(false);
    expect(isRealString(NaN)).toBe(false);
    expect(isRealString(null)).toBe(false);
  });

  it('should reject with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  });

  it('should allow with non-space characters', () => {
    expect(isRealString('This is a test')).toBe(true);
    expect(isRealString('    This is a test       ')).toBe(true);
  });
});