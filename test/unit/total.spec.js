const { total } = require('../../src/total');
const { subtotal } = require('../../src/subtotal');
const { discounts } = require('../../src/discounts');
const { deliveryFee } = require('../../src/delivery');
const { tax } = require('../../src/tax');

describe('Order Calculations', () => {
  
  describe('total', () => {
    it('should calculate complete order total', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO', // could be any valid SKU (see README.md for examples)
            title: '6-pack Potato',
            kind: 'frozen', // could be 'hot' or 'frozen'
            filling: 'meat', // could be 'potato', 'cheese', 'meat', etc.
            qty: 1, // quantity of this item -- TEST THE NEW CHANGE BY MAKING THIS 0
            unitPriceCents: 699, // price per unit in cents
            addOns: [], // could include 'sour-cream', 'fried-onion', 'bacon-bits'
          }
        ]
      };
      
      const context = {
        profile: { tier: 'vip' }, // could be 'guest', 'regular', or 'vip'
        delivery: {
          zone: 'outer', // could be 'local' or 'outer'
          rush: true, // boolean indicating rush delivery
          coupon: null, // could be a coupon code string or null
        },
        // coupon is optional and omitted here
      };
      
      // const noQtyItems = order.items.some(item => item.qty === 0);
      
    
      const orderTotal = total(order, context);
      expect(orderTotal).toBeGreaterThan(0);
      expect(Number.isInteger(orderTotal)).toBe(true);

      });

      //new test added to ensure that a quantity of 0 throws an error
    it('should throw error when item qty is 0', () => {
  const order = {
    items: [
      {
        sku: 'P6-POTATO',
        title: '6-pack Potato',
        kind: 'frozen',
        filling: 'meat',
        qty: 0, // Invalid quantity
        unitPriceCents: 699,
        addOns: [],
      }
    ]
  };
  
  const context = {
    profile: { tier: 'vip' },
    delivery: {
      zone: 'outer',
      rush: true,
      coupon: null,
    },
  };
  
  // Assert that calling total() with qty: 0 throws an error
  expect(() => total(order, context)).toThrow('Order must contain at least one item with quantity greater than zero.');
});
    

});  });