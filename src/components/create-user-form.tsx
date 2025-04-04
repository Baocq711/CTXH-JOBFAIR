import { AutoComplete, AutoCompleteProps, Input } from "antd";
import type React from "react";

import { useState } from "react";
import listUnit from "../listUnit";

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
  });
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { mssv, name, email, unit } = userData;
    const isSuccess = onSubmit({
      mssv,
      name,
      email,
      unit,
      isChecked: true,
      isNew: true,
    });
    if (isSuccess)
      setUserData({
        email: "",
        mssv: "",
        name: "",
        unit: "",
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
    });
  };

  const getPanelValue = (searchText: string) => {
    if (!searchText) return [];
    return listUnit
      ?.filter(
        (item) =>
          typeof item.value === "string" &&
          item.value.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((item) => ({ value: item.value }));
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
        <Input
          type="text"
          id="mssv"
          name="mssv"
          value={userData.mssv}
          onChange={handleChange}
          required
          className="flex py-2"
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
        <Input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
          className="flex py-2"
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
        <Input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          className="flex py-2"
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
        <AutoComplete
          id="unit"
          value={userData.unit}
          options={options}
          onChange={(value) =>
            setUserData((prev) => ({ ...prev, unit: value }))
          }
          onSearch={(text) => setOptions(getPanelValue(text))}
          onSelect={(value) =>
            setUserData((prev) => ({ ...prev, unit: value }))
          }
          className="flex h-10"
          placeholder="Nhập đơn vị"
          popupMatchSelectWidth={false}
          getPopupContainer={(trigger) =>
            trigger.parentElement || document.body
          }
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
