/**
 * Calculate the subtotal for an order (before discounts, delivery, tax)
 * 
 * @param {Object} order - The order object
 * @returns {number} - Subtotal in cents
 */
function subtotal(order) {
  let total = 0;
  const validKinds = ['hot', 'frozen'];
  const validFillings = ['potato', 'sauerkraut', 'sweet-cheese', 'mushroom'];

  for (const item of order.items) {
    // Base item cost
    let itemCost = item.unitPriceCents * item.qty;

    // Add-ons cost (per pack)
    if (item.addOns && item.addOns.length > 0) {
      const addOnPrices = {
        'sour-cream': 99,
        'fried-onion': 149,
        'bacon-bits': 199
      };
      for (const addOn of item.addOns) {
        itemCost += addOnPrices[addOn] * item.qty;
      }
    }


    // Input Validation for Kind & Filling
    if (!validKinds.includes(item.kind)){
      throw new Error("Invalid kind for item:" + item.kind);
    }

    if (!validFillings.includes(item.filling)){
      throw new Error("Invalid filling for item:" + item.filling);
    }


    total += itemCost;
  }

  return total;
}

module.exports = { subtotal };
