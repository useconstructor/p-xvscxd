import { db } from '@/lib/db';

export async function GET() {
  await db.execute(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    is_featured INTEGER DEFAULT 0,
    is_deal INTEGER DEFAULT 0,
    discount_percent INTEGER DEFAULT 0,
    available INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  const { rows } = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  await db.execute(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    is_featured INTEGER DEFAULT 0,
    is_deal INTEGER DEFAULT 0,
    discount_percent INTEGER DEFAULT 0,
    available INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute({
    sql: 'INSERT INTO products (name, price, description, category, image_url, is_featured, is_deal, discount_percent, available) VALUES (?,?,?,?,?,?,?,?,?)',
    args: [
      body.name,
      body.price ?? null,
      body.description ?? null,
      body.category ?? null,
      body.image_url ?? null,
      body.is_featured ?? 0,
      body.is_deal ?? 0,
      body.discount_percent ?? 0,
      body.available ?? 1
    ]
  });

  return Response.json({ ok: true });
}
