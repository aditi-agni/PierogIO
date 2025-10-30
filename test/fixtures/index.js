/**
 * Test fixtures for PierogI/O testing
 * 
 * This module provides reusable test data and helper functions to make
 * writing tests easier and more consistent.
 */

// ============================================================================
// MENU ITEMS - Based on actual menu pricing
// ============================================================================

const MENU_ITEMS = {
  POTATO_6: {
    sku: 'P6-POTATO',
    title: '6-pack Potato',
    kind: 'hot',
    filling: 'potato',
    qty: 6,
    unitPriceCents: 699,
    addOns: []
  },
  POTATO_12: {
    sku: 'P12-POTATO',
    title: '12-pack Potato',
    kind: 'hot',
    filling: 'potato',
    qty: 12,
    unitPriceCents: 1299,
    addOns: []
  },
  POTATO_24: {
    sku: 'P24-POTATO',
    title: '24-pack Potato',
    kind: 'hot',
    filling: 'potato',
    qty: 24,
    unitPriceCents: 2399,
    addOns: []
  },
  SAUER_6: {
    sku: 'P6-SAUER',
    title: '6-pack Sauerkraut',
    kind: 'frozen',
    filling: 'sauerkraut',
    qty: 6,
    unitPriceCents: 749,
    addOns: []
  },
  CHEESE_6: {
    sku: 'P6-CHEESE',
    title: '6-pack Sweet Cheese',
    kind: 'hot',
    filling: 'sweet-cheese',
    qty: 6,
    unitPriceCents: 699,
    addOns: []
  },
  MUSHROOM_12: {
    sku: 'P12-MUSHROOM',
    title: '12-pack Mushroom',
    kind: 'frozen',
    filling: 'mushroom',
    qty: 12,
    unitPriceCents: 1299,
    addOns: []
  }
};

// ============================================================================
// ADD-ONS - With pricing
// ============================================================================

const ADD_ONS = {
  SOUR_CREAM: 'sour-cream',   // $0.99
  FRIED_ONION: 'fried-onion', // $1.49
  BACON_BITS: 'bacon-bits'    // $1.99
};

const ADD_ON_PRICES = {
  [ADD_ONS.SOUR_CREAM]: 99,
  [ADD_ONS.FRIED_ONION]: 149,
  [ADD_ONS.BACON_BITS]: 199
};

// ============================================================================
// CUSTOMER PROFILES
// ============================================================================

const PROFILES = {
  GUEST: { tier: 'guest' },
  REGULAR: { tier: 'regular' },
  VIP: { tier: 'vip' }
};

// ============================================================================
// DELIVERY OPTIONS
// ============================================================================

const DELIVERY = {
  LOCAL: {
    zone: 'local',
    rush: false
  },
  LOCAL_RUSH: {
    zone: 'local',
    rush: true
  },
  OUTER: {
    zone: 'outer',
    rush: false
  },
  OUTER_RUSH: {
    zone: 'outer',
    rush: true
  }
};

// ============================================================================
// COUPONS
// ============================================================================

const COUPONS = {
  BOGO: 'PIEROGI-BOGO',  // Buy one 6-pack, get one 50% off (same filling)
  FIRST10: 'FIRST10'     // 10% off orders ≥ $20
};

// ============================================================================
// COMPLETE CONTEXTS - Combinations of profile, delivery, and coupons
// ============================================================================

const CONTEXTS = {
  GUEST_LOCAL: {
    profile: PROFILES.GUEST,
    delivery: DELIVERY.LOCAL
  },
  GUEST_LOCAL_RUSH: {
    profile: PROFILES.GUEST,
    delivery: DELIVERY.LOCAL_RUSH
  },
  GUEST_OUTER: {
    profile: PROFILES.GUEST,
    delivery: DELIVERY.OUTER
  },
  REGULAR_LOCAL: {
    profile: PROFILES.REGULAR,
    delivery: DELIVERY.LOCAL
  },
  REGULAR_LOCAL_WITH_BOGO: {
    profile: PROFILES.REGULAR,
    delivery: DELIVERY.LOCAL,
    coupon: COUPONS.BOGO
  },
  VIP_LOCAL: {
    profile: PROFILES.VIP,
    delivery: DELIVERY.LOCAL
  },
  VIP_OUTER_RUSH: {
    profile: PROFILES.VIP,
    delivery: DELIVERY.OUTER_RUSH
  }
};

// ============================================================================
// SAMPLE ORDERS - Common order patterns
// ============================================================================

const ORDERS = {
  EMPTY: {
    items: []
  },
  
  SINGLE_ITEM: {
    items: [{ ...MENU_ITEMS.POTATO_6 }]
  },
  
  SINGLE_ITEM_WITH_ADDONS: {
    items: [
      {
        ...MENU_ITEMS.POTATO_6,
        addOns: [ADD_ONS.SOUR_CREAM, ADD_ONS.BACON_BITS]
      }
    ]
  },
  
  VOLUME_ORDER_12: {
    items: [{ ...MENU_ITEMS.POTATO_12 }]
  },
  
  VOLUME_ORDER_24: {
    items: [{ ...MENU_ITEMS.POTATO_24 }]
  },
  
  MIXED_HOT_AND_FROZEN: {
    items: [
      { ...MENU_ITEMS.POTATO_6 },
      { ...MENU_ITEMS.SAUER_6 }
    ]
  },
  
  MULTIPLE_ITEMS: {
    items: [
      { ...MENU_ITEMS.POTATO_6 },
      { ...MENU_ITEMS.CHEESE_6 },
      { ...MENU_ITEMS.MUSHROOM_12 }
    ]
  },
  
  BOGO_ELIGIBLE: {
    items: [
      { ...MENU_ITEMS.POTATO_6 },
      { ...MENU_ITEMS.POTATO_6 }  // Same filling for BOGO
    ]
  },
  
  LARGE_ORDER: {
    items: [
      { ...MENU_ITEMS.POTATO_24 },
      {
        ...MENU_ITEMS.SAUER_6,
        addOns: [ADD_ONS.SOUR_CREAM]
      },
      {
        ...MENU_ITEMS.CHEESE_6,
        addOns: [ADD_ONS.BACON_BITS, ADD_ONS.FRIED_ONION]
      }
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a custom order item
 * @param {Object} overrides - Properties to override default values
 * @returns {Object} - Order item object
 */
function createItem(overrides = {}) {
  return {
    sku: 'P6-POTATO',
    title: '6-pack Potato',
    kind: 'hot',
    filling: 'potato',
    qty: 6,
    unitPriceCents: 699,
    addOns: [],
    ...overrides
  };
}

/**
 * Create a custom order
 * @param {Array} items - Array of order items
 * @returns {Object} - Order object
 */
function createOrder(items = []) {
  return { items };
}

/**
 * Create a custom context
 * @param {Object} options - Context configuration
 * @param {string} options.tier - Customer tier ('guest', 'regular', 'vip')
 * @param {string} options.zone - Delivery zone ('local', 'outer')
 * @param {boolean} options.rush - Rush delivery flag
 * @param {string} options.coupon - Optional coupon code
 * @returns {Object} - Context object
 */
function createContext({
  tier = 'guest',
  zone = 'local',
  rush = false,
  coupon = null
} = {}) {
  const context = {
    profile: { tier },
    delivery: { zone, rush }
  };
  
  if (coupon) {
    context.coupon = coupon;
  }
  
  return context;
}

/**
 * Clone an order/item with modifications (deep copy)
 * @param {Object} obj - Object to clone
 * @param {Object} overrides - Properties to override
 * @returns {Object} - New object with overrides applied
 */
function clone(obj, overrides = {}) {
  return JSON.parse(JSON.stringify({ ...obj, ...overrides }));
}

/**
 * Add add-ons to an existing item
 * @param {Object} item - Order item
 * @param {Array<string>} addOns - Array of add-on names
 * @returns {Object} - Item with add-ons
 */
function withAddOns(item, addOns = []) {
  return {
    ...item,
    addOns: [...addOns]
  };
}

/**
 * Create multiple items with quantity
 * @param {Object} baseItem - Base item to duplicate
 * @param {number} count - Number of items to create
 * @returns {Array} - Array of items
 */
function multipleItems(baseItem, count) {
  return Array(count).fill(null).map(() => ({ ...baseItem }));
}

module.exports = {
  MENU_ITEMS,
  ADD_ONS,
  ADD_ON_PRICES,
  PROFILES,
  DELIVERY,
  COUPONS,
  CONTEXTS,
  ORDERS,
  
  createItem,
  createOrder,
  createContext,
  clone,
  withAddOns,
  multipleItems
};
