import React from 'react';

const IncomeCard = ({ title, amount }) => {
    const formatToIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0, // No decimals
        }).format(amount);
    };

    return (
        <div className="drop-shadow-md rounded bg-[#56E39F] p-6">
            <p>{title}</p>
            <h2 className="text-2xl font-bold">{formatToIDR(amount)}</h2>
        </div>
    );
};

export default IncomeCard;
