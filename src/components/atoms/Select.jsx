import React, {forwardRef} from 'react'

const Select = forwardRef((props, ref) => {
    const {id, children, onChange } = props

    return (
        <select onChange={onChange} className="border border-[#5A6674] rounded-full py-2 px-4" id={id} name={id} ref={ref}>
            {children}
        </select>
    )
})

export default Select
