// SEED DATA — Run this in browser console once to populate demo data
// Or just open the website normally; data builds as you use it.

(function seedDemo() {
  // Sample customers
  const users = JSON.parse(localStorage.getItem('nt_users') || '[]');
  if (users.length === 0) {
    const demo = [
      { name: 'Priya Sharma', email: 'priya@example.com', password: 'test123', role: 'customer', joinDate: '01/03/2025' },
      { name: 'Rahul Patel', email: 'rahul@example.com', password: 'test123', role: 'customer', joinDate: '05/03/2025' },
      { name: 'Anita Desai', email: 'anita@example.com', password: 'test123', role: 'customer', joinDate: '10/03/2025' },
    ];
    localStorage.setItem('nt_users', JSON.stringify(demo));
  }

  // Sample orders
  const orders = JSON.parse(localStorage.getItem('nt_orders') || '[]');
  if (orders.length === 0) {
    const sample = [
      {
        id: 'ORD-1001', date: '15/03/2025', status: 'Delivered',
        items: [{ id: 'p1', name: 'Eco Notebooks', price: 249, qty: 2, img: 'images/notebooks.jpg' }],
        shipping: { name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', address: '12 Park Street, Ahmedabad, Gujarat - 380001' },
        payMethod: 'card', subtotal: 498, shipping: 0, tax: 25, total: 498,
        userId: 'priya@example.com'
      },
      {
        id: 'ORD-1002', date: '18/03/2025', status: 'Shipped',
        items: [{ id: 'p7', name: 'Eco Combo Pack 1', price: 549, qty: 1, img: 'images/everything1.jpg' }],
        shipping: { name: 'Rahul Patel', email: 'rahul@example.com', phone: '+91 87654 32109', address: '45 MG Road, Surat, Gujarat - 395001' },
        payMethod: 'upi', subtotal: 549, shipping: 0, tax: 27, total: 549,
        userId: 'rahul@example.com'
      },
      {
        id: 'ORD-1003', date: '20/03/2025', status: 'Processing',
        items: [
          { id: 'p3', name: 'Seed Pencils', price: 199, qty: 3, img: 'images/pencils1.jpg' },
          { id: 'p4', name: 'Plantable Calendar', price: 349, qty: 1, img: 'images/calender.jpg' }
        ],
        shipping: { name: 'Anita Desai', email: 'anita@example.com', phone: '+91 76543 21098', address: '88 Nehru Nagar, Vadodara, Gujarat - 390001' },
        payMethod: 'cod', subtotal: 946, shipping: 0, tax: 47, total: 946,
        userId: 'anita@example.com'
      }
    ];
    localStorage.setItem('nt_orders', JSON.stringify(sample));
  }

  // Sample reports
  const reports = JSON.parse(localStorage.getItem('nt_reports') || '[]');
  if (reports.length === 0) {
    const sampleReports = [
      { name: 'Mohan Verma', contact: '+91 95678 12345', location: 'Near Chandola Lake, Ahmedabad', type: 'Fallen Tree / Trunk', qty: 'Large (200 kg – 1 tonne)', desc: 'A large neem tree fell during last week\'s storm. Clear access from main road.', date: '12/03/2025', status: 'In Progress' },
      { name: 'Sunita Joshi', contact: 'sunita@gmail.com', location: 'Indroda Nature Park, Gandhinagar', type: 'Large Branches', qty: 'Medium (50–200 kg)', desc: 'Several dried branches scattered near the nature trail.', date: '16/03/2025', status: 'Pending' },
      { name: 'Deepak Nair', contact: '+91 89012 34567', location: 'Aakar Colony, Surat', type: 'Mixed Debris (leaves + wood)', qty: 'Small (less than 50 kg)', desc: 'Post-rain cleanup debris piled up near the park.', date: '21/03/2025', status: 'Pending' },
    ];
    localStorage.setItem('nt_reports', JSON.stringify(sampleReports));
  }

  console.log('✅ Demo data seeded!');
})();
