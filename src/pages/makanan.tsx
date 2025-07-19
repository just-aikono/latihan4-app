'use client'
import { useState, useEffect } from 'react';

export default function MakananPage() {
  const [makanan, setMakanan] = useState([]);
  const [form, setForm] = useState({ nama_makanan: '', porsi: '', jumlah_kalori: '' });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchMakanan();
  }, []);

  async function fetchMakanan() {
    const res = await fetch('/api/makanan');
    const data = await res.json();
    setMakanan(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/makanan/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditId(null);
    } else {
      await fetch('/api/makanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ nama_makanan: '', porsi: '', jumlah_kalori: '' });
    fetchMakanan();
  }

  async function handleDelete(id) {
    await fetch(`/api/makanan/${id}`, { method: 'DELETE' });
    fetchMakanan();
  }

  function handleEdit(m) {
    setForm(m);
    setEditId(m.id);
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Daftar Makanan</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          placeholder="Nama Makanan"
          value={form.nama_makanan}
          onChange={(e) => setForm({ ...form, nama_makanan: e.target.value })}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Porsi"
          value={form.porsi}
          onChange={(e) => setForm({ ...form, porsi: e.target.value })}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Jumlah Kalori"
          value={form.jumlah_kalori}
          onChange={(e) => setForm({ ...form, jumlah_kalori: e.target.value })}
          required
          type="number"
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <ul>
        {makanan.map((m) => (
          <li key={m.id} className="flex justify-between border-b py-2">
            <div>
              <strong>{m.nama_makanan}</strong> - {m.porsi} - {m.jumlah_kalori} kal
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(m)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(m.id)} className="text-red-500">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
