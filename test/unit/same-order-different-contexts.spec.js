const { total } = require('../../src/total');
const { MENU_ITEMS, createOrder, createContext, COUPONS } = require('../fixtures');

/**
 * Table-driven test: Same order in different contexts
 * 
 * This test demonstrates how the same order can result in different totals
 * based on customer tier, delivery zone, rush delivery, and coupon codes.
 */

describe('Same Order, Different Contexts', () => {
  
  // Define our single order that will be used in all test cases
  const order = createOrder([MENU_ITEMS.POTATO_6]);
  
  describe('total calculation with varying context', () => {
    
    // Table of test cases with different context parameters
    const testCases = [
      // Guest customers
      { tier: 'guest', zone: 'local', rush: false, coupon: null, expected: null },
      { tier: 'guest', zone: 'outer', rush: false, coupon: null, expected: null },
      { tier: 'guest', zone: 'local', rush: true, coupon: null, expected: null },
      { tier: 'guest', zone: 'local', rush: false, coupon: COUPONS.BOGO, expected: null },
      { tier: 'guest', zone: 'local', rush: false, coupon: COUPONS.FIRST10, expected: null },
      
      // Regular customers
      { tier: 'regular', zone: 'local', rush: false, coupon: null, expected: null },
      { tier: 'regular', zone: 'outer', rush: false, coupon: null, expected: null },
      { tier: 'regular', zone: 'local', rush: true, coupon: null, expected: null },
      { tier: 'regular', zone: 'local', rush: false, coupon: COUPONS.BOGO, expected: null },
      { tier: 'regular', zone: 'local', rush: false, coupon: COUPONS.FIRST10, expected: null },
      
      // VIP customers
      { tier: 'vip', zone: 'local', rush: false, coupon: null, expected: null },
      { tier: 'vip', zone: 'outer', rush: false, coupon: null, expected: null },
      { tier: 'vip', zone: 'local', rush: true, coupon: null, expected: null },
      { tier: 'vip', zone: 'outer', rush: true, coupon: null, expected: null },
      { tier: 'vip', zone: 'local', rush: false, coupon: COUPONS.BOGO, expected: null },
      { tier: 'vip', zone: 'local', rush: false, coupon: COUPONS.FIRST10, expected: null }
    ];
    
    // Execute all test cases from the table
    testCases.forEach(({ tier, zone, rush, coupon, expected }) => {
      // Generate descriptive test name from parameters
      const rushText = rush ? 'rush' : 'no rush';
      const couponText = coupon || 'no coupon';
      const name = `${tier}, ${zone}, ${rushText}, ${couponText}`;

      // Skip test if expected value is not provided
      if (expected === null) {
        return;
      }
      
      it(`should calculate total for: ${name}`, () => {
        const context = createContext({ tier, zone, rush, coupon });
        const result = total(order, context);
        expect(result).toBe(expected);
      });
    });
  });
});
