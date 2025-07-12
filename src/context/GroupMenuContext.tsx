"use client";

import { useState, useEffect } from "react";
import GroupMenuTable from "@/components/GroupMenuTable";

interface GroupMenu {
  id: number;
  name: string;
}

export default function MenuGroupSection() {
  const [groupMenus, setGroupMenus] = useState<GroupMenu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  // Ambil data dari localStorage saat pertama render
  useEffect(() => {
    const stored = localStorage.getItem("groupMenus");
    if (stored) {
      setGroupMenus(JSON.parse(stored));
    }
  }, []);

  // Simpan data ke localStorage setiap kali data berubah
  const saveToStorage = (data: GroupMenu[]) => {
    localStorage.setItem("groupMenus", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!name.trim()) return;
    const newItem = { id: Date.now(), name };
    const updated = [...groupMenus, newItem];
    setGroupMenus(updated);
    saveToStorage(updated);
    setName("");
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    const updated = groupMenus.filter((g) => g.id !== id);
    setGroupMenus(updated);
    saveToStorage(updated);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Group Menu</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showForm ? "Batal" : "+ Tambah"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded p-4 mb-4">
          <label className="block mb-2 font-medium">Nama Group Menu</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Contoh: Admin, Pengguna, dll"
          />
          <button
            onClick={handleAdd}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      )}

      <GroupMenuTable data={groupMenus} onDelete={handleDelete} />
    </div>
  );
}
