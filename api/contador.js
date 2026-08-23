import { createClient } from 'redis';

export default async function handler(req, res) {
  try {
    // Creamos la conexión con la variable secreta de Vercel
    const client = createClient({
      url: process.env.REDIS_URL
    });

    // Nos conectamos a la base de datos
    await client.connect();

    // Sumamos 1 a las visitas
    const count = await client.incr('visitas-portafolio');

    // Cerramos la conexión para no gastar memoria
    await client.disconnect();

    res.status(200).json({ visitas: count });
  } catch (error) {
    console.error("Error en Redis:", error);
    res.status(500).json({ visitas: 0 });
  }
}