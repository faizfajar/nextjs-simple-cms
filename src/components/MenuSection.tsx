"use client";

import { useEffect, useState } from "react";
import MenuForm from "./MenuForm";
import MenuTable from "./MenuTable";

interface Menu {
  id: number;
  name: string;
  groupId: number;
}

interface GroupMenu {
  id: number;
  name: string;
}

export default function MenuSection() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [groupMenus, setGroupMenus] = useState<GroupMenu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedMenus = localStorage.getItem("menus");
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    }

    const storedGroups = localStorage.getItem("groupMenus");
    if (storedGroups) {
      setGroupMenus(JSON.parse(storedGroups));
    }
  }, []);

  const handleAdd = (menu: Omit<Menu, "id">) => {
    if (!menu.name.trim()) {
      setError("Nama menu tidak boleh kosong.");
      return;
    }

    const isDuplicate = menus.some(
      (m) =>
        m.name.toLowerCase() === menu.name.toLowerCase() &&
        m.groupId === menu.groupId
    );
    if (isDuplicate) {
      setError("Menu sudah ada di grup ini.");
      return;
    }

    const newMenu = { ...menu, id: Date.now() };
    const updated = [...menus, newMenu];
    setMenus(updated);
    localStorage.setItem("menus", JSON.stringify(updated));
    setError("");
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    const updated = menus.filter((m) => m.id !== id);
    setMenus(updated);
    localStorage.setItem("menus", JSON.stringify(updated));
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showForm ? "Batal" : "+ Tambah"}
        </button>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {showForm && (
        <MenuForm
          onAdd={handleAdd}
          setShowForm={setShowForm}
          groupMenus={groupMenus}
        />
      )}

      <MenuTable data={menus} groupMenus={groupMenus} onDelete={handleDelete} />
    </section>
  );
}
