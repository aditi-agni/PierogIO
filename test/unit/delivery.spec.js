const { deliveryFee } = require('../../src/delivery');
const { subtotal } = require('../../src/subtotal');
const { discounts } = require('../../src/discounts');

describe('Delivery Fee Calculations', () => {
  describe('deliveryFee', () => {
    it('should apply correct base fee by zone', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO',
            title: '6-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 1,
            unitPriceCents: 699,
            addOns: []
          }
        ]
      };

            const profile = { tier: 'guest' };
      const localDelivery = { zone: 'local', rush: false };
      const outerDelivery = { zone: 'outer', rush: false };

      const localFee = deliveryFee(order, localDelivery, profile);
      const outerFee = deliveryFee(order, outerDelivery, profile);

      expect(localFee).toBeLessThan(outerFee);
      expect(Number.isInteger(localFee)).toBe(true);
      expect(Number.isInteger(outerFee)).toBe(true);
    });

    it('should waive delivery fee for guests when subtotal after discounts >= $50', () => {
      const order = {
        items: [
          {
            sku: 'P24-POTATO',
            title: '24-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 3,
            unitPriceCents: 2399,
            addOns: []
          }
        ]
      };

      const profile = { tier: 'guest' };
      const delivery = { zone: 'local', rush: false };

      const fee = deliveryFee(order, delivery, profile);
      expect(fee).toBe(0);
    });

    it('should waive delivery fee for regular customers when subtotal after discounts >= $40', () => {
      const order = {
        items: [
          {
            sku: 'P24-POTATO',
            title: '24-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 2,
            unitPriceCents: 2399,
            addOns: []
          }
        ]
      };

      const profile = { tier: 'regular' };
      const delivery = { zone: 'local', rush: false };

      const fee = deliveryFee(order, delivery, profile);
      expect(fee).toBe(0);
    });

    it('should waive delivery fee for VIP customers when subtotal after discounts >= $30', () => {
      const order = {
        items: [
          {
            sku: 'P24-POTATO',
            title: '24-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 2,
            unitPriceCents: 2399,
            addOns: []
          }
        ]
      };

      const profile = { tier: 'vip' };
      const delivery = { zone: 'local', rush: false };

      const fee = deliveryFee(order, delivery, profile);
      expect(fee).toBe(0);
    });

    it('should add rush fee when rush delivery is requested', () => {
      const order = {
        items: [
          {
            sku: 'P6-POTATO',
            title: '6-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 1,
            unitPriceCents: 699,
            addOns: []
          }
        ]
      };

      const profile = { tier: 'guest' };
      const normalDelivery = { zone: 'local', rush: false };
      const rushDelivery = { zone: 'local', rush: true };

      const normalFee = deliveryFee(order, normalDelivery, profile);
      const rushFee = deliveryFee(order, rushDelivery, profile);

      expect(rushFee - normalFee).toBe(299); // $2.99 rush fee
    });

    it('should apply rush fee even when base delivery fee is waived', () => {
      const order = {
        items: [
          {
            sku: 'P24-POTATO',
            title: '24-pack Potato',
            kind: 'hot',
            filling: 'potato',
            qty: 3,
            unitPriceCents: 2399,
            addOns: []
          }
        ]
      };

      const profile = { tier: 'guest' };
      const delivery = { zone: 'local', rush: true };

      const fee = deliveryFee(order, delivery, profile);
      expect(fee).toBe(299); // Only rush fee should be applied
    });
  });
});