import Button from "../atoms/Button";
import { FaCircleCheck } from "react-icons/fa6";

const Invoices = ({ id, qty, price, date, onClose }) => {
  // const sendToWa = async () => {
  //   const invoiceElement = document.getElementById("invoice-content");

  //   try {
  //     const image = await toPng(invoiceElement);
  //     const base64Image = image.split(",")[1];
  //     const waMessage = `
  //       Here is your transaction invoice:
  //       - ID Pelanggan: ${id}
  //       - Quantity: ${qty}
  //       - Price: Rp. ${price}
  //       - Total Price: Rp. ${qty * price}
  //     `;

  //     const waUrl = `https://wa.me/?text=${encodeURIComponent(
  //       waMessage
  //     )}&attachment=${encodeURIComponent(
  //       `data:image/png;base64,${base64Image}`
  //     )}`;
  //     window.open(waUrl, "_blank");
  //     document.querySelectorAll(".remove-on-send").forEach((el) => el.remove());
  //   } catch (error) {
  //     console.error("Error generating invoice image:", error);
  //   }
  // };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-full bg-gray-500 bg-opacity-60 flex justify-center items-center">
      <div
        className="min-w-sm rounded bg-white p-4 flex flex-col items-center"
        id="invoice-content"
      >
        <FaCircleCheck size={100} className="text-green-400 text-center mb-2" />
        <h1 className="font-bold text-3xl text-center mb-2">
          Transaksi Berhasil
        </h1>
        <p className="text-center text-base text-gray-500">
          {date ? date : new Date().toLocaleDateString()}
        </p>
        <table className="table-auto text-left">
          <tr>
            <th>ID Pelanggan</th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{qty}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>Rp. {price}</td>
          </tr>
          <tr>
            <th>Total Price</th>
            <td>Rp. {qty * price}</td>
          </tr>
        </table>
        {/* <Button type="button" size="w-full remove-on-send" onclick={sendToWa}>
          Send To Whatsapp
        </Button> */}
        <Button
          type="button"
          size="w-full remove-on-send"
          bg="bg-gray-400"
          onclick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Invoices;
