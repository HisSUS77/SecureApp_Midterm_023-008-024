// Usage: node scripts/seedAdmin.js <username> <password>
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) throw new Error('MONGODB_URI not set in .env.local');

const adminSchema = new mongoose.Schema({ user: String, pass: String });
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function main() {
  const [,, username, password] = process.argv;
  if (!username || !password) {
    console.error('Usage: node scripts/seedAdmin.js <username> <password>');
    process.exit(1);
  }
  await mongoose.connect(MONGO_URI);
  const hash = await bcrypt.hash(password, 10);
  const existing = await Admin.findOne({ user: username });
  if (existing) {
    existing.pass = hash;
    await existing.save();
    console.log('Updated password for existing admin:', username);
  } else {
    await Admin.create({ user: username, pass: hash });
    console.log('Created new admin:', username);
  }
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
