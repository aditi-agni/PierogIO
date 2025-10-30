const { discounts } = require('../../src/discounts');

describe('Discounts', () => {
  
  describe('discounts', () => {
    it('should calculate discounts', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO',
            title: '6-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 6,
            unitPriceCents: 699,
            addOns: []
          }
        ]
      };
      
      const profile = { tier: 'guest' }; // could be 'guest', 'regular', or 'vip'
      const couponCode = null; // could be 'PIEROGI-BOGO' or 'FIRST10'
      
      const discount = discounts(order, profile, couponCode);
      expect(discount).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(discount)).toBe(true);
    });
  });

});
