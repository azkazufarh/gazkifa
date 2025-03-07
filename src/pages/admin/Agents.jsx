import { useState } from "react";
import Form from "../../components/organisms/Customer/Form.jsx";
import Table from "../../components/organisms/Customer/Table.jsx";

const Agents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold">Daftar Agen</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="block bg-[#56E39F] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Tambah Agen
        </button>
        <Form type="Agen" modal={isModalOpen} setModal={setIsModalOpen} />
      </div>

      <Table type="Agen" />
    </div>
  );
};
export default Agents;
