import { useEffect, useState } from "react";
import "./App.css";
import { onValue, push, ref, update } from "firebase/database";
import { db, usersRef } from "./firebase";
import Modal from "./components/modal";
import CreateUserForm from "./components/create-user-form";
import { notification } from "antd";

interface User {
  id?: string;
  mssv: string;
  name: string;
  email: string;
  unit: string;
  isChecked?: boolean;
  isNew?: boolean;
}

export default function AttendanceSystem() {
  const [users, setUsers] = useState<User[]>([]);
  const [idInput, setIdInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);

        if (data) {
          // Chuyển object sang mảng:
          const userList = Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as User),
          }));
          console.log(userList);
          setUsers(userList);
        }
      } else {
        setUsers([]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCheckIn = () => {
    console.log(users);
    const userUpdated = users.filter((user) => user.mssv === idInput);
    if (userUpdated.length === 0) {
      api.error({
        message: "Điểm danh thất bại",
        description: <div>Không tìm thấy MSSV</div>,
        placement: "topRight",
      });
      return;
    }

    update(ref(db, `user/${userUpdated[0].id}`), {
      isChecked: true,
    });

    setIdInput("");
    api.success({
      message: "Điểm danh thành công",
      description: <div>Điểm danh thành công</div>,
      placement: "topRight",
    });
  };

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateUser = (userData: Omit<User, "isChecked" | "isNew">) => {
    if (users.some((user) => user.mssv === userData.mssv)) {
      api.error({
        message: "Tạo người dùng thất bại",
        description: <div>MSSV đã tồn tại</div>,
        placement: "topRight",
      });
      return false;
    }
    push(usersRef, userData);

    api.success({
      message: "Tạo người dùng thành công",
      description: <div>Tạo người dùng thành công</div>,
      placement: "topRight",
    });
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {contextHolder}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2 text-gray-700">
          Mã số cán bộ/ Mã số sinh viên
        </h2>
        <div className="flex flex-col gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Nhập mã số cán bộ hoặc mã số sinh viên vào đây"
              className="w-full px-4 py-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleCheckIn}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Điểm danh
            </button>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Tạo mới
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Người đã điểm danh
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left border-b">MSSV</th>
                <th className="py-3 px-4 text-left border-b">Họ và tên</th>
                <th className="py-3 px-4 text-left border-b">Email</th>
                <th className="py-3 px-4 text-left border-b">Đơn vị</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.mssv} className="hover:bg-gray-200">
                  <td className="py-3 px-4 border-b">{item.mssv}</td>
                  <td className="py-3 px-4 border-b">{item.name}</td>
                  <td className="py-3 px-4 border-b">{item.email}</td>
                  <td className="py-3 px-4 border-b">{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Tạo người dùng mới"
      >
        <CreateUserForm
          onSubmit={handleCreateUser}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

