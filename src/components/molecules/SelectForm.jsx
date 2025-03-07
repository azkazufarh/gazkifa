import {forwardRef} from 'react'
import Label from "../atoms/Label.jsx";
import Select from "../atoms/Select.jsx";

const SelectForm = forwardRef((props, ref) => {
    const {label, id, children, onChange} = props;

    return (
        <div className="flex flex-col mb-2 w-full">
            <Label htmlFor={id}>{label}</Label>
            <Select id={id} ref={ref} onChange={onChange}>{children}</Select>
        </div>
    )
})

export default SelectForm;
