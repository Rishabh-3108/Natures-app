// ============ CART ============
const Cart = {
  get() { return JSON.parse(localStorage.getItem('nt_cart') || '[]'); },
  save(items) { localStorage.setItem('nt_cart', JSON.stringify(items)); Cart.updateBadge(); },
  add(product) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) items[idx].qty += 1;
    else items.push({ ...product, qty: 1 });
    Cart.save(items);
    showToast('🛒 Added to cart!');
  },
  remove(id) { Cart.save(Cart.get().filter(i => i.id !== id)); },
  updateQty(id, qty) {
    qty = parseInt(qty);
    if (isNaN(qty) || qty < 1) qty = 1;
    if (qty > 50) qty = 50;

    const items = Cart.get();
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) { items[idx].qty = qty; }
    Cart.save(items);
  },
  total() { return Cart.get().reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return Cart.get().reduce((s, i) => s + i.qty, 0); },
  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = Cart.count();
    badges.forEach(b => {
      if (b) {
        b.textContent = count;
        b.style.display = count > 0 ? 'flex' : 'none';
      }
    });
  },
  clear() { localStorage.removeItem('nt_cart'); Cart.updateBadge(); }
};
