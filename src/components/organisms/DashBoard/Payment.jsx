import React from 'react'
import {FaCheckCircle} from "react-icons/fa";

const Payment = (props) => {
    const {nik} = props;
    return (
        <div className="max-w-sm bg-white rounded shadow p-6 relative top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col">
            <FaCheckCircle className="text-[#56E39F] text-center text-8xl" />
            <h1 className="font-bold text-2xl text-center">Transaksi Berhasil</h1>
            <p className="text-center text-gray-300">{new Date().toLocaleString()}</p>

            <table className="w-full">
                <tbody>
                    <tr>
                        <td className="font-bold">ID Pelanggan</td>
                        <td className="ms-4">{nik}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Kategori</td>
                        <td className="ms-4">{nik}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Harga</td>
                        <td className="ms-4">{nik}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Jumlah Tabung</td>
                        <td className="ms-4">{nik}</td>
                    </tr>
                </tbody>
            </table>

            <Button>34</Button>
        </div>
    )
}
export default Payment
