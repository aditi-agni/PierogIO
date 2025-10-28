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

  // trying to catch incorrect filling name
  describe('total2', () => {
    it('should calculate complete order total', () => {
      const order2 = {
        items: [
          {
            sku: 'P6-POTATO', // could be any valid SKU (see README.md for examples)
            title: '6-pack Potato',
            kind: 'hot', // could be 'hot' or 'frozen'
            filling: 'POTATOE', // could be 'potato', 'cheese', 'meat', etc.
            qty: 1, // quantity of this item
            unitPriceCents: 50, // price per unit in cents
            addOns: ['sour-cream'], // could include 'sour-cream', 'fried-onion', 'bacon-bits'
          }
        ]
      };
      
      const context2 = {
        profile: { tier: 'vip' }, // could be 'guest', 'regular', or 'vip'
        delivery: {
          zone: 'local', // could be 'local' or 'outer'
          rush: true, // boolean indicating rush delivery
        },
        // coupon is optional and omitted here
      };
      
      const orderTotal = total(order2, context2);
      expect(orderTotal).toBeGreaterThan(0);
      expect(Number.isInteger(orderTotal)).toBe(true);
    });
  });

  // trying to catch incorrect kind type
  describe('total3', () => {
    it('should calculate complete order total', () => {
      const order3 = {
        items: [
          {
            sku: 'P6-POTATO', // could be any valid SKU (see README.md for examples)
            title: '6-pack Potato',
            kind: 'HOTE', // could be 'hot' or 'frozen'
            filling: 'potato', // could be 'potato', 'cheese', 'meat', etc.
            qty: 1, // quantity of this item
            unitPriceCents: 50, // price per unit in cents
            addOns: ['sour-cream'], // could include 'sour-cream', 'fried-onion', 'bacon-bits'
          }
        ]
      };
      
      const context3 = {
        profile: { tier: 'vip' }, // could be 'guest', 'regular', or 'vip'
        delivery: {
          zone: 'local', // could be 'local' or 'outer'
          rush: true, // boolean indicating rush delivery
        },
        // coupon is optional and omitted here
      };
      
      const orderTotal = total(order3, context3);
      expect(orderTotal).toBeGreaterThan(0);
      expect(Number.isInteger(orderTotal)).toBe(true);
    });
  });

});
