"use client";

import { useState, useEffect } from "react";

interface Menu {
  id: number;
  name: string;
  groupId: number;
}

interface GroupMenu {
  id: number;
  name: string;
}

interface MenuFormProps {
  onAdd: (menu: Menu) => void;
  setShowForm: (show: boolean) => void;
  groupMenus: GroupMenu[];
}

export default function MenuForm({
  onAdd,
  setShowForm,
  groupMenus,
}: MenuFormProps) {
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState<number>(
    groupMenus.length > 0 ? groupMenus[0].id : 0
  );
  const [menus, setMenus] = useState<Menu[]>([]);

  const [nameError, setNameError] = useState("");
  const [groupError, setGroupError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("menus");
    if (stored) {
      setMenus(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    setNameError("");
    setGroupError("");

    const trimmed = name.trim();

    if (!trimmed) {
      setNameError("Nama menu tidak boleh kosong.");
      valid = false;
    }

    if (!groupId) {
      setGroupError("Pilih group menu terlebih dahulu.");
      valid = false;
    }

    const isDuplicate = menus.some(
      (m) =>
        m.name.toLowerCase() === trimmed.toLowerCase() && m.groupId === groupId
    );
    if (isDuplicate) {
      setNameError("Menu sudah ada dalam group ini.");
      valid = false;
    }

    if (!valid) return;

    const newMenu: Menu = {
      id: Date.now(),
      name: trimmed,
      groupId,
    };
    const updated = [...menus, newMenu];
    localStorage.setItem("menus", JSON.stringify(updated));

    onAdd(newMenu);
    setName("");
    setGroupId(groupMenus.length > 0 ? groupMenus[0].id : 0);
    setShowForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white shadow rounded p-4 space-y-4"
    >
      {/* Input Nama Menu */}
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Nama Menu
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${
            nameError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Masukkan nama menu"
        />
        {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
      </div>

      <div>
        <label htmlFor="group" className="block mb-1 font-medium">
          Group Menu
        </label>
        <select
          id="group"
          defaultValue={""}
          value={groupId}
          onChange={(e) => setGroupId(Number(e.target.value))}
          className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${
            groupError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          {groupMenus.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        {groupError && (
          <p className="text-red-600 text-sm mt-1">{groupError}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
