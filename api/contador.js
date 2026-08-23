import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    // Busca la llave 'visitas-portafolio' y le suma 1. Si no existe, la crea en 1.
    const count = await kv.incr('visitas-portafolio');
    res.status(200).json({ visitas: count });
  } catch (error) {
    console.error("Error conectando a KV:", error);
    res.status(500).json({ visitas: 0 });
  }
}