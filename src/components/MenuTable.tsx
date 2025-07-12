"use client";

interface Menu {
  id: number;
  name: string;
  groupId: number;
}

interface GroupMenu {
  id: number;
  name: string;
}

interface MenuTableProps {
  data: Menu[];
  groupMenus: GroupMenu[];
  onDelete: (id: number) => void;
}

export default function MenuTable({
  data,
  groupMenus,
  onDelete,
}: MenuTableProps) {
  const getGroupName = (groupId: number) => {
    const group = groupMenus.find((g) => g.id === groupId);
    return group ? group.name : "(Tidak diketahui)";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left mt-4 border border-gray-300 rounded shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Nama Menu</th>
            <th className="px-4 py-2 border">Group</th>
            <th className="px-4 py-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Belum ada data menu.
              </td>
            </tr>
          ) : (
            data.map((menu, idx) => (
              <tr
                key={`${menu.id}-${menu.name}`}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{menu.name}</td>
                <td className="px-4 py-2 border">
                  {getGroupName(menu.groupId)}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => onDelete(menu.id)}
                    className="text-sm text-red-600 hover:text-red-800 hover:underline transition"
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
