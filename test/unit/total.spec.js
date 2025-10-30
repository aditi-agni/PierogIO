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
            qty: 1, // quantity of this item
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
      
      const noQtyItems = order.items.some(item => item.qty === 0);
      
      if (noQtyItems) {
        throw new Error('Order must contain at least one item with quantity greater than zero.');
      } else {
        const orderTotal = total(order, context);
        expect(orderTotal).toBeGreaterThan(0);
        expect(Number.isInteger(orderTotal)).toBe(true);

      }
      

    });
  });

});
