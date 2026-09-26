import { db } from '@/lib/db';

const seedProducts = [
  { name: 'Taladro Percutor DeWalt DCD771C2', price: 189900, description: 'Ideal para albañiles y constructores', category: 'Herramientas Eléctricas', is_featured: 1, available: 1 },
  { name: 'Cemento Gris Tipo I Argos', price: 28500, description: 'Saco de 50kg, máxima resistencia', category: 'Materiales de Construcción', is_featured: 1, available: 1 },
  { name: 'Pintura Látex Blanca Comex', price: 64200, description: '1 galón, acabado mate interior', category: 'Pinturas y Acabados', is_featured: 1, available: 1 },
  { name: 'Sierra Circular Bosch GKS 150', price: 245000, description: '7 1/4", motor 1050W para cortes precisos', category: 'Herramientas Eléctricas', is_featured: 1, available: 1 },
  { name: 'Martillo Demoledor Makita HM0870C', price: 890000, description: 'Para trabajos pesados de demolición', category: 'Herramientas Eléctricas', is_featured: 0, available: 1 },
  { name: 'Tubo PVC 4" x 3m Pavco', price: 42000, description: 'Para instalaciones sanitarias', category: 'Plomería', is_featured: 0, available: 1 },
  { name: 'Cable Eléctrico 12 AWG 100m', price: 185000, description: 'Cobre puro, uso residencial', category: 'Electricidad', is_featured: 0, available: 1 },
  { name: 'Tornillos Drywall Caja x 1000', price: 38500, description: '6x1", cabeza plana fosfatada', category: 'Tornillería', is_featured: 0, available: 1 },
  { name: 'Amoladora Angular DeWalt DWE4120', price: 175000, description: '4 1/2", 900W, trabajo continuo', category: 'Herramientas Eléctricas', is_deal: 1, discount_percent: 15, available: 1 },
  { name: 'Varilla Corrugada 1/2" x 6m', price: 18500, description: 'Acero grado 60, alta resistencia', category: 'Materiales de Construcción', is_deal: 1, discount_percent: 10, available: 1 },
  { name: 'Impermeabilizante Sika 5 galones', price: 325000, description: 'Para techos y terrazas', category: 'Pinturas y Acabados', is_deal: 1, discount_percent: 20, available: 1 },
  { name: 'Llave de Paso 1/2" Grival', price: 32000, description: 'Bronce cromado, alta durabilidad', category: 'Plomería', is_deal: 1, discount_percent: 12, available: 1 },
  { name: 'Breaker 20A Siemens', price: 28000, description: 'Protección termomagnética', category: 'Electricidad', is_deal: 1, discount_percent: 18, available: 1 },
];

export async function POST() {
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

  const { rows } = await db.execute('SELECT COUNT(*) as count FROM products');
  const count = (rows[0] as { count: number }).count;

  if (count === 0) {
    for (const product of seedProducts) {
      await db.execute({
        sql: 'INSERT INTO products (name, price, description, category, is_featured, is_deal, discount_percent, available) VALUES (?,?,?,?,?,?,?,?)',
        args: [product.name, product.price, product.description, product.category, product.is_featured, product.is_deal ?? 0, product.discount_percent ?? 0, product.available]
      });
    }
    return Response.json({ ok: true, seeded: seedProducts.length });
  }

  return Response.json({ ok: true, seeded: 0, message: 'Products already exist' });
}
