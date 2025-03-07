import InputForm from "../../molecules/InputForm.jsx";
import SelectForm from "../../molecules/SelectForm.jsx";
import Button from "../../atoms/Button.jsx";
import { newCustomer, updateCustomer } from "../../../../services/customer.js";
import PropTypes from "prop-types";

const Form = (props) => {
  const { type, modal, setModal, customer } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("userId", e.target.userId.value);
    data.append("fullname", e.target.fullname.value);
    data.append("address", e.target.address.value);
    data.append(
      "category",
      type === "Customer" ? e.target.category.value : "Agen"
    );
    data.append("price", e.target.price.value);

    if (customer) {
      updateCustomer(data, (response) => {
        console.log(response.data);
        // window.location.reload();
      });
    } else {
      type === "Customer" && data.append("image", e.target.image.files[0]);
      data.append("type", type);
      newCustomer(data, (response) => {
        console.log(response.data);
        window.location.reload();
      });
    }
  };

  return (
    <>
      {/* Modal */}
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              {type === "Customer" ? (
                <h3 className="text-lg font-semibold">Daftar Pelanggan Baru</h3>
              ) : (
                <h3 className="text-lg font-semibold">Daftar Agen Baru</h3>
              )}
              <button
                onClick={() => setModal(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}

            {type === "Customer" ? (
              <form className="p-4" onSubmit={handleSubmit}>
                {/* Your form fields go here */}
                <InputForm
                  id="userId"
                  label="NIK"
                  type="text"
                  placeholder="Nomor NIK..."
                  value={customer ? customer.userId : ""}
                />
                <InputForm
                  id="fullname"
                  label="Nama"
                  type="text"
                  placeholder="Nama Pelanggan..."
                  value={customer ? customer.fullname : ""}
                />
                <InputForm
                  id="address"
                  label="Alamat"
                  type="text"
                  placeholder="Alamat Pelanggan..."
                  value={customer ? customer.address : ""}
                />
                <SelectForm id="category" label="Pilih Kategori">
                  <option value={customer ? customer.category : ""}>
                    {customer ? customer.category : "Pilih Kategori"}
                  </option>
                  <option value="Perorangan">Perorangan</option>
                  <option value="Warung">Warung</option>
                  <option value="UMKM">UMKM</option>
                </SelectForm>
                <InputForm
                  id="price"
                  label="Harga per Tabung"
                  type="number"
                  placeholder="18000"
                  value={customer ? customer.price : ""}
                />
                {!customer && (
                  <InputForm id="image" label="Foto KTP" type="file" />
                )}
                <Button type="submit" id="btnLogin" size="w-full">
                  Submit
                </Button>
              </form>
            ) : (
              <form className="p-4" onSubmit={handleSubmit}>
                {/* Your form fields go here */}
                <InputForm
                  id="userId"
                  label="Nomor Agen"
                  type="text"
                  placeholder="Nomor Agen..."
                  value={customer ? customer.userId : ""}
                />
                <InputForm
                  id="fullname"
                  label="Nama Agen"
                  type="text"
                  placeholder="Nama Agen..."
                  value={customer ? customer.fullname : ""}
                />
                <InputForm
                  id="address"
                  label="Alamat"
                  type="text"
                  placeholder="Alamat Agen..."
                  value={customer ? customer.address : ""}
                />
                <InputForm
                  id="price"
                  label="Harga per Tabung"
                  type="number"
                  placeholder="16000"
                  value={customer ? customer.price : ""}
                />
                <Button type="submit" id="btnLogin" size="w-full">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </div>

      )}
    </>
  );
};

Form.propTypes = {
  type: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  customer: PropTypes.object,
};

export default Form;
