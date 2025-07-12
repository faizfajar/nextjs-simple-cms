"use client";

interface GroupMenu {
  id: number;
  name: string;
}

interface GroupMenuTableProps {
  data: GroupMenu[];
  onDelete: (id: number) => void;
}

export default function GroupMenuTable({
  data,
  onDelete,
}: GroupMenuTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left mt-4 border border-gray-300 rounded shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Nama Group Menu</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                Belum ada data.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
