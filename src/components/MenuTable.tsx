"use client";

import { useState } from "react";

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
  const [collapsedGroups, setCollapsedGroups] = useState<number[]>([]);

  const toggleCollapse = (groupId: number) => {
    setCollapsedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const groupedMenus = groupMenus.reduce((acc, group) => {
    acc[group.id] = {
      groupName: group.name,
      menus: data.filter((menu) => menu.groupId === group.id),
    };
    return acc;
  }, {} as Record<number, { groupName: string; menus: Menu[] }>);

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(groupedMenus).map(([groupIdStr, group]) => {
        const groupId = Number(groupIdStr);
        const isCollapsed = collapsedGroups.includes(groupId);
        return (
          <div key={groupId} className="border rounded-lg shadow-sm">
            <div
              className="flex items-center justify-between bg-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-200 rounded-t-lg"
              onClick={() => toggleCollapse(groupId)}
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Group: {group.groupName}
              </h3>
              <span className="text-gray-500 text-sm">
                {isCollapsed ? "+ Tampilkan" : "− Sembunyikan"}
              </span>
            </div>

            {!isCollapsed && (
              <div className="p-4">
                {group.menus.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Tidak ada menu dalam grup ini.
                  </p>
                ) : (
                  <table className="w-full text-left border border-gray-300 rounded">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 border text-sm text-gray-600">
                          #
                        </th>
                        <th className="px-4 py-2 border text-sm text-gray-600">
                          Nama Menu
                        </th>
                        <th className="px-4 py-2 border text-sm text-gray-600 text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.menus.map((menu, idx) => (
                        <tr key={menu.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border text-sm">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-2 border text-sm">
                            {menu.name}
                          </td>
                          <td className="px-4 py-2 border text-center">
                            <button
                              onClick={() => onDelete(menu.id)}
                              className="text-sm text-red-600 hover:underline hover:text-red-800 transition"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
