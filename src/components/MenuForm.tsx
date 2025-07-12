// src/components/MenuForm.tsx
"use client";

import { useState } from "react";

interface MenuFormProps {
  onAdd: (menu: { name: string; groupId: number }) => void;
  setShowForm: (show: boolean) => void;
  groupMenus: { id: number; name: string }[];
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
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama menu tidak boleh kosong.");
      return;
    }
    if (!groupId) {
      setError("Pilih group menu terlebih dahulu.");
      return;
    }
    setError("");
    onAdd({ name: name.trim(), groupId });
    setName("");
    setGroupId(groupMenus.length > 0 ? groupMenus[0].id : 0);
    setShowForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-md mx-auto space-y-4"
    >
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-gray-700 mb-1 font-semibold">
          Nama Menu
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Masukkan nama menu"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1 font-semibold">
          Group Menu
        </label>
        <select
          value={groupId}
          onChange={(e) => setGroupId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {groupMenus.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 justify-end">
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
