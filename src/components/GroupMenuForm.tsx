"use client";

import { useState, useEffect } from "react";

interface GroupMenu {
  id: number;
  name: string;
}

interface GroupMenuFormProps {
  onAdd: (groupMenu: GroupMenu) => void;
  setShowForm: (show: boolean) => void;
}

export default function GroupMenuForm({
  onAdd,
  setShowForm,
}: GroupMenuFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [existing, setExisting] = useState<GroupMenu[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("groupMenus");
    if (stored) {
      setExisting(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    const isDuplicate = existing.some(
      (g) => g.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      setError("Nama sudah ada.");
      return;
    }

    const newGroupMenu = { id: Date.now(), name: trimmed };
    const updated = [...existing, newGroupMenu];
    localStorage.setItem("groupMenus", JSON.stringify(updated));

    onAdd(newGroupMenu);
    setShowForm(false);
    setName("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white shadow rounded p-4 space-y-4"
    >
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Nama Group Menu
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Masukkan nama group menu"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
