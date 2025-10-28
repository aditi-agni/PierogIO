const { discounts } = require('../../src/discounts');

describe('discounts - FIRST10 coupon (regression tests)', () => {
  it('applies FIRST10 as 10% for orders $20 or more', () => {
    const order = {
      items: [
        { sku: 'P12-POTATO', qty: 1, unitPriceCents: 2500 } // subtotal = 2500
      ]
    };
    const profile = { tier: 'guest' };
    const coupon = 'FIRST10';

    const expected = Math.floor(2500 * 0.10); // 10% of subtotal
    const d = discounts(order, profile, coupon);
    expect(d).toBe(expected); // will fail if implementation returns negative value
  });

  it('does not apply FIRST10 for orders under $20 (2000 cents)', () => {
    const order = {
      items: [
        { sku: 'P6-POTATO', qty: 1, unitPriceCents: 1500 } // subtotal = 1500
      ]
    };
    const profile = { tier: 'guest' };
    const coupon = 'FIRST10';

    const d = discounts(order, profile, coupon);
    expect(d).toBe(0); // will fail if negative or non-zero
  });

  it('never returns a negative discount for FIRST10 (safety)', () => {
    const order = {
      items: [
        { sku: 'P24-POTATO', qty: 1, unitPriceCents: 5000 } // large subtotal
      ]
    };
    const profile = { tier: 'guest' };
    const coupon = 'FIRST10';

    const d = discounts(order, profile, coupon);
    expect(d).toBeGreaterThanOrEqual(0); // ensures no negative discounts
  });
});