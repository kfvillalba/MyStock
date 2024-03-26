import React, { useEffect } from "react";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../FireBaseConfig";
import { signInWithPopup } from "firebase/auth";

const LogIn = () => {
  const [google, setGoogle] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    Navigate("/dashboard");
  });

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleShowAuthForm = () => {
    setShowRegisterForm(false);
  };

  const logIngGoogle = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      setGoogle(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setGoogle(localStorage.getItem("email"));
  }, [google]);

  return google ? (
    Navigate("/dashboard")
  ) : (
    <div className="h-screen bg-gradient-to-tl from-purple-dark to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        {showRegisterForm ? (
          <RegisterForm handleShowAuthForm={handleShowAuthForm} />
        ) : (
          <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10">
            <p
              tabIndex="0"
              className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
            >
              Ingresa con tu cuenta
            </p>
            <button
              onClick={logIngGoogle}
              aria-label="Continua con Google"
              role="button"
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
            >
              <GoogleIcon />
              <p className="text-base font-medium ml-4 text-gray-700">
                Continua con Google
              </p>
            </button>
            <button
              aria-label="Continua con Github"
              role="button"
              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
                  fill="#333333"
                />
                {/* Icono de GitHub */}
              </svg>
              <p className="text-base font-medium ml-4 text-gray-700">
                Continua con Github
              </p>
            </button>
            <button
              aria-label="Continua con Facebook"
              role="button"
              className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 25 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#0779e9"
                  d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
                ></path>
              </svg>

              <p className="text-base font-medium ml-4 text-gray-700">
                Continua con Facebook
              </p>
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p
                tabIndex="0"
                className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
              >
                ¿No tienes cuenta?{" "}
                <button
                  onClick={handleShowRegisterForm}
                  className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
                >
                  Regístrate aquí
                </button>
              </p>
              {showRegisterForm && <RegisterForm />}

              <div className="w-full flex items-center justify-between py-5">
                <hr className="w-full bg-gray-400" />
                <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                  O
                </p>
                <hr className="w-full bg-gray-400" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Correo electronico
                </label>
                <input
                  id="email"
                  type="email"
                  className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El correo es obligatorio",
                    },
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                      message: "El correo no es valido",
                    },
                  })}
                />
                {errors.email && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      display: "block",
                    }}
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mt-6 w-full">
                <label
                  htmlFor="pass"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Contraseña
                </label>
                <div className="relative flex items-center justify-center">
                  <input
                    id="pass"
                    type="password"
                    className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "La contraseña es obligatoria",
                      },
                      minLength: {
                        value: 6,
                        message: "La contraseña debe tener minimo 3 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "La contraseña debe tener maximo 20 caracteres",
                      },
                    })}
                  />
                  <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Icono de visibilidad de contraseña */}
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      display: "block",
                    }}
                  >
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="mt-8">
                {/* <Link to={"/dashboard"}> */}
                <button
                  role="button"
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 bg-gray-800 py-3 text-base font-medium rounded-lg w-full text-white"
                  type="submit"
                >
                  Iniciar Sesion
                </button>
                {/* </Link> */}
              </div>
              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  className="text-sm font-medium leading-none text-gray-800 focus:outline-none hover:underline"
                  onClick={handleShowAuthForm}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
