const { TaxAPI } = require('../apis/tax-api');

/**
 * Calculate tax for an order.
 * Business rules implemented:
 *  - Only HOT items are taxable.
 *  - If the order contains any HOT items, the delivery fee is taxable too.
 *  - All math is done in integer cents.
 *
 * @param {Object} order   - { items: [{ kind, unitPriceCents, qty }, ...] }
 * @param {Object} delivery - { feeCents?: number }
 * @returns {number} Tax amount in cents
 */
function tax(order, delivery) {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    return 0;
  }

  // Sum subtotal of HOT items in cents
  let hotSubtotalCents = 0;
  for (const item of order.items) {
    if (!item) continue;

    const qty = Math.max(0, Number(item.qty) || 0);
    const unit = Math.max(0, Number(item.unitPriceCents) || 0);

    if (item.kind === 'hot') {
      hotSubtotalCents += unit * qty;
    }
  }

  // If there are hot items, delivery fee (if any) is taxable as well.
  const hasHot = hotSubtotalCents > 0;
  const deliveryFeeCents = hasHot && delivery
    ? Math.max(0, Number(delivery.feeCents) || 0)
    : 0;

  const taxableBaseCents = hotSubtotalCents + deliveryFeeCents;

  if (taxableBaseCents === 0) {
    return 0;
  }

  // Get the correct rate for HOT (e.g., 0.08 for 8%)
  // Fallback to 0 if API returns nothing to avoid NaN.
  const taxRate = Number(TaxAPI.lookup('hot')) || 0;

  // Use Math.round to match currency rounding expectations.
  const totalTaxCents = Math.round(taxableBaseCents * taxRate);
  return totalTaxCents;
}

module.exports = { tax };
