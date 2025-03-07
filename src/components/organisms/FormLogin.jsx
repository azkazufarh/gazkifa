import { useEffect, useRef } from "react";
import InputForm from "../molecules/InputForm.jsx";
import Button from "../atoms/Button.jsx";
import { login } from "../../../services/auth.js";

const FormLogin = () => {
  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const hanleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    login(data, (status, res) => {
      if (status === 200) {
        console.log(res);
        localStorage.setItem("token", res.token);
        window.location.href = "/admin/dashboard";
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <form className="w-full my-4 " onSubmit={hanleLogin}>
      <InputForm
        id="username"
        label="Username"
        type="text"
        placeholder="jonhdoe"
        ref={usernameRef}
      />
      <InputForm
        id="password"
        label="Password"
        type="password"
        placeholder="*******"
      />
      <Button type="submit" id="btnLogin" size="w-full">
        Login
      </Button>
    </form>
  );
};
export default FormLogin;
