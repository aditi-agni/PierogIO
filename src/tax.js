const { TaxAPI } = require('../apis/tax-api');

/**
 * Calculate tax for an order
  * 
 * @param {Object} order - The order object with items array
 * @param {Object} delivery - Delivery information
 * @returns {number} - Tax amount in cents
 */
function tax(order, orderDelivery) {
  let hasHotItems = false;
  let totalTax = 0;

  for (const item of order.items) {
    const itemTotal = item.unitPriceCents * item.qty;

    const taxRate = TaxAPI.lookup(item.kind);
    const itemTax = Math.floor(itemTotal * taxRate / 10000);
    totalTax += itemTax;
    hasHotItems = false;
    
    if (item.kind === 'hot') {
      hasHotItems = true;
    }
  }
  if (hasHotItems) {
    const deliveryTaxRate = TaxAPI.lookup('hot');
    const deliveryTax = Math.floor(orderDelivery * deliveryTaxRate / 10000);
    totalTax += deliveryTax;
  }
  return totalTax;
}

module.exports = { tax };
