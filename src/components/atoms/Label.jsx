import React from 'react'

const Label = (props) => {
    const { htmlFor, children } = props
    return (
        <label htmlFor={htmlFor} className="text-lg text-[#5A6674] mb-2">{children}</label>
    )
}
export default Label
