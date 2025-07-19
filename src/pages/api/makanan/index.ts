import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await prisma.makanan.findMany();
    res.json(data);
  } else if (req.method === 'POST') {
    const { nama_makanan, porsi, jumlah_kalori } = req.body;
    const data = await prisma.makanan.create({
      data: { nama_makanan, porsi, jumlah_kalori: parseInt(jumlah_kalori) },
    });
    res.json(data);
  } else {
    res.status(405).end();
  }
}
