import { forwardRef } from "react";
import PropTypes from "prop-types";
import Label from "../atoms/Label.jsx";
import Input from "../atoms/Input.jsx";

const InputForm = forwardRef((props, ref) => {
  const { label, id, placeholder, type = "text", value } = props;
  return (
    <div className="w-full flex flex-col mb-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={ref}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
});

InputForm.displayName = "InputForm";

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default InputForm;
