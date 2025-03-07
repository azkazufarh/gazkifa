import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, id, placeholder, value } = props;

  return (
    <input
      type={type}
      ref={ref}
      id={id}
      name={id}
      className="border border-[#5A6674] rounded-lg py-2 px-4 w-full"
      placeholder={placeholder}
      defaultValue={value}
    />
  );
});

export default Input;
