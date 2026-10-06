const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('orders').insert({
    user_id: null,
    product_title: 'Test Guest Order',
    product_size: '10x10',
    quantity: 1,
    unit_price: 10,
    total_price: 10,
    shipping_name: 'Test',
    shipping_address: 'Test',
    shipping_city: 'Test',
    shipping_postal: '12345',
    status: 'pending'
  }).select();
  console.log('Error:', error);
  console.log('Data:', data);
}
test();
