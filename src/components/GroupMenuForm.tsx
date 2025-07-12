"use client";

import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    onAdd({ id: Date.now(), name: trimmed });
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
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ml-2"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
