const { deliveryFee } = require('../../src/delivery');

describe('Delivery Fee Calculation', () => {
  
  it('should charge local zone fee once, not per item', () => {
    const order = {
      items: [
        {
          qty: 1,
          unitPriceCents: 1000 // total is only $10, below $50 threshold
        }
      ]
    };
    
    const delivery = { zone: 'local', rush: false };
    const profile = { tier: 'guest' };
    
    const result = deliveryFee(order, delivery, profile);
    expect(result).toBe(399);
  });

  it('should charge outer zone fee once, not per item', () => {
    const order = {
      items: [
        {
          qty: 1,
          unitPriceCents: 1000 // total is only $10, below $50 threshold
        }
      ]
    };
    
    const delivery = { zone: 'outer', rush: false };
    const profile = { tier: 'guest' };
    
    const result = deliveryFee(order, delivery, profile);
    expect(result).toBe(699);
  });

  it('should charge delivery fee ONCE per order, not per item', () => {
    const order = {
      items: [
        {
          qty: 3,
          unitPriceCents: 500 // $1.50 per item
        },
        {
          qty: 2,
          unitPriceCents: 800 // $1.60 per item
        }
        // Total: $4.50 + $3.20 = $7.70, well below $50 threshold
      ]
    };
    
    const delivery = { zone: 'local', rush: false };
    const profile = { tier: 'guest' };
    
    const result = deliveryFee(order, delivery, profile);
    expect(result).toBe(399);
  });

  it('should add rush fee on top of delivery fee', () => {
    const order = {
      items: [
        {
          qty: 1,
          unitPriceCents: 1000
        }
      ]
    };
    
    const delivery = { zone: 'local', rush: true };
    const profile = { tier: 'guest' };
    
    const result = deliveryFee(order, delivery, profile);
    // 399 (local) + 299 (rush) = 698 cents
    expect(result).toBe(698);
  });

  it('should apply free delivery when discounted subtotal meets threshold', () => {
    const order = {
      items: [
        {
          qty: 6,
          unitPriceCents: 1200 // $7.20 per unit
        }
      ]
    };
    
    // Guest tier, 24-pack gets 10% off
    // After discount: 6 * 1200 * 0.9 = 6480 cents ($64.80)

    const order2 = {
      items: [
        {
          qty: 24,
          unitPriceCents: 2300 // $23.00 per unit * 24 = $552, 10% off = $496.80
        }
      ]
    };
    
    const delivery = { zone: 'local', rush: false };
    const profile = { tier: 'guest' };
    
    const result = deliveryFee(order2, delivery, profile);
    expect(result).toBe(0);
  });

});
