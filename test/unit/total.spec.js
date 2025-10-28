const { total } = require('../../src/total');
const { subtotal } = require('../../src/subtotal');
const { discounts } = require('../../src/discounts');
const { deliveryFee } = require('../../src/delivery');
const { tax } = require('../../src/tax');

const mockOrderCouponsBOGO = {
  items: [
    { name: 'Pierogi 6-pack', unitPriceCents: 500, qty: 6 }, 
    { name: 'Pierogi 6-pack', unitPriceCents: 500, qty: 6 }, 
    { name: 'Pierogi 6-pack', unitPriceCents: 500, qty: 6 }, 
    { name: 'Soda', unitPriceCents: 150, qty: 4 }, 
  ]
};
const mockProfileGuest = { tier: 'guest' };

describe('Order Calculations', () => {
  
  describe('total', () => {
    it('should calculate complete order total', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO', // could be any valid SKU (see README.md for examples)
            title: '6-pack Potato',
            kind: 'hot', // could be 'hot' or 'frozen'
            filling: 'potato', // could be 'potato', 'cheese', 'meat', etc.
            qty: 6, // quantity of this item
            unitPriceCents: 699, // price per unit in cents
            addOns: [], // could include 'sour-cream', 'fried-onion', 'bacon-bits'
          }
        ]
      };
      
      const context = {
        profile: { tier: 'guest' }, // could be 'guest', 'regular', or 'vip'
        delivery: {
          zone: 'local', // could be 'local' or 'outer'
          rush: false, // boolean indicating rush delivery
        },
        // coupon is optional and omitted here
      };
      
      const orderTotal = total(order, context);
      expect(orderTotal).toBeGreaterThan(0);
      expect(Number.isInteger(orderTotal)).toBe(true);
    });
  });

  describe('discounts', () => {
   
    it('B3: PIEROGI-BOGO coupon should apply 50% off to ALL subsequent 6-packs after the first (multiple application)', () => {
      const expectedDiscount = 3000;

      const result = discounts(mockOrderCouponsBOGO, mockProfileGuest, 'PIEROGI-BOGO');
      expect(result).toBe(expectedDiscount);
    });
  });

});
