import type React from "react";

import { useState } from "react";

interface User {
  id?: string;
  mssv: string;
  name: string;
  email: string;
  unit: string;
  isChecked?: boolean;
  isNew?: boolean;
}

interface CreateUserFormProps {
  onSubmit: (userData: User) => boolean;
  onCancel: () => void;
}

export default function CreateUserForm({
  onSubmit,
  onCancel,
}: CreateUserFormProps) {
  const [userData, setUserData] = useState<User>({
    email: "",
    mssv: "",
    name: "",
    unit: "",
    isChecked: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { mssv, name, email, unit, isNew } = userData;
    const isSuccess = onSubmit({
      mssv,
      name,
      email,
      unit,
      isChecked: true,
      isNew,
    });
    if (isSuccess)
      setUserData({
        email: "",
        mssv: "",
        name: "",
        unit: "",
        isNew: false,
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleClear = () => {
    setUserData({
      email: "",
      mssv: "",
      name: "",
      unit: "",
      isNew: false,
    });
  };

  const handleIsNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserData((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="mssv"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mã số sinh viên
        </label>
        <input
          type="text"
          id="mssv"
          name="mssv"
          value={userData.mssv}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập mã số cán bộ hoặc sinh viên"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Họ và tên
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập họ và tên"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập email"
        />
      </div>

      <div>
        <label
          htmlFor="unit"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Đơn vị
        </label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={userData.unit}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập họ và tên"
        />
      </div>
      <div>
        <label
          htmlFor="isNew"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Đã có trong danh sách
        </label>
        <input
          type="checkbox"
          id="isNew"
          name="isNew"
          checked={userData.isNew || false}
          onChange={handleIsNew}
          className="w-5 h-5 flex absolute -translate-y-[22px] translate-x-[152px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Xóa
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Tạo mới
        </button>
      </div>
    </form>
  );
}
