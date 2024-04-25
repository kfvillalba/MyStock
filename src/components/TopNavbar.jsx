import React from "react";

const TopNavbar = () => {
  return (
    <div className="h-20 shadow-sm bg-slate-200 shadow-gray-700 flex p-3 justify-between items-center ">
      <section className="flex items-center pl-5">
        <button>
          <img
            className="rounded-full size-14"
            src={"../src/assets/en-stock.png"}
            alt="avatar"
          />
        </button>
        <h1 className="pl-5 text-center  text-purple-light text-5xl ">
          MyStock
        </h1>
      </section>

      <button className="Profile flex flex-wrap items-center rounded-full border-2 border-purple-dark">
        <img
          className="rounded-full size-14"
          src={localStorage.getItem("photoURL") || "../src/assets/perfil.png"}
          alt="avatar"
        />
      </button>
    </div>
  );
};

export default TopNavbar;
