import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'PUT') {
    const { nama_makanan, porsi, jumlah_kalori } = req.body;
    const data = await prisma.makanan.update({
      where: { id },
      data: { nama_makanan, porsi, jumlah_kalori: parseInt(jumlah_kalori) },
    });
    res.json(data);
  } else if (req.method === 'DELETE') {
    await prisma.makanan.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } else {
    res.status(405).end();
  }
}
