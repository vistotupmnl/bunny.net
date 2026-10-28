require('dotenv').config();
const jwt = require('jsonwebtoken');

const payload = { id: 'camera_node_01', role: 'edge_device' };
const token = jwt.sign(payload, process.env.JWT_SECRET || 'visto_super_secret_jwt_key_2026', { expiresIn: '1h' });

console.log('\n--- YOUR JWT TOKEN ---');
console.log(token);
console.log('----------------------\n');
