const { TaxAPI } = require('../apis/tax-api');
const { deliveryFee } = require('./delivery'); // 👈 import the delivery fee function

/**
 * Calculate tax for an order
 * 
 * @param {Object} order - The order object with items array
 * @param {Object} delivery - Delivery information
 * @param {Object} profile - Customer profile (needed for deliveryFee)
 * @returns {number} - Tax amount in cents
 */
function tax(order, delivery, profile = { tier: 'guest' }) {
  let totalTax = 0;

  // Calculate delivery fee once for the order
  const fee = deliveryFee(order, delivery, profile);

  // Apply delivery fee proportionally or fully — here we add it fully to the taxable base
  const totalItemSubtotal = order.items.reduce((sum, item) => sum + item.unitPriceCents * item.qty, 0);
  const perItemFee = totalItemSubtotal > 0 ? fee / order.items.length : 0; // optional distribution

  for (const item of order.items) {
    // Include delivery fee portion into taxable total
    const itemTotal = item.unitPriceCents * item.qty + perItemFee;

    if (item.kind === 'hot') {
      const taxRate = TaxAPI.lookup(item.kind) / 10000;
      const itemTax = Math.floor(itemTotal * taxRate);
      totalTax += itemTax;
    }
  }

  return totalTax;
}

module.exports = { tax };
