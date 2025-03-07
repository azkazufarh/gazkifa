const Button = (props) => {
  const {
    type = "submit",
    id,
    onclick,
    children,
    bg = "bg-[#56E39F]",
    size,
  } = props;
  return (
    <button
      type={type}
      className={`${bg} ${size} text-center p-2 rounded font-bold mt-2 `}
      id={id}
      onClick={onclick}
    >
      {children}
    </button>
  );
};
export default Button;
