"use client";

import { useEffect, useState } from "react";
import GroupMenuForm from "./GroupMenuForm";
import GroupMenuTable from "./GroupMenuTable";

interface GroupMenu {
  id: number;
  name: string;
}

export default function GroupMenuSection() {
  const [groupMenus, setGroupMenus] = useState<GroupMenu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // Ambil data dari localStorage saat pertama kali load
  useEffect(() => {
    const stored = localStorage.getItem("groupMenus");
    if (stored) {
      setGroupMenus(JSON.parse(stored));
    }
  }, []);

  // Fungsi menambah group menu dengan validasi
  const handleAdd = (groupMenu: GroupMenu) => {
    if (!groupMenu.name.trim()) {
      setError("Nama group menu tidak boleh kosong.");
      return;
    }

    const isDuplicate = groupMenus.some(
      (g) => g.name.toLowerCase() === groupMenu.name.toLowerCase()
    );
    if (isDuplicate) {
      setError("Nama group menu sudah ada.");
      return;
    }

    const updated = [...groupMenus, groupMenu];
    setGroupMenus(updated);
    localStorage.setItem("groupMenus", JSON.stringify(updated));
    setError("");
  };

  // Fungsi hapus group menu
  const handleDelete = (id: number) => {
    const updated = groupMenus.filter((g) => g.id !== id);
    setGroupMenus(updated);
    localStorage.setItem("groupMenus", JSON.stringify(updated));
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Group Menu</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showForm ? "Batal" : "+ Tambah"}
        </button>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {showForm && (
        <GroupMenuForm onAdd={handleAdd} setShowForm={setShowForm} />
      )}

      <GroupMenuTable data={groupMenus} onDelete={handleDelete} />
    </section>
  );
}
