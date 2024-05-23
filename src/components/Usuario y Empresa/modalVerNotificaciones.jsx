import { useEffect } from "react";

const ModalVerNotificaciones = ({ open, onClose }) => {
  if (!open) return null;
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isNotificaciones = event.target.closest(".bg-slate-100");

      if (open && !isNotificaciones) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);
  return (
    <>
      <div className="absolute  w-full top-0  z-10 flex items-end justify-end">
        <div className="relative top-20 right-24    flex justify-end items-center">
          <div className="bg-slate-100 w-96 p-4 flex flex-col gap-2 cursor-pointer  rounded-lg">
            <div className="rounded-lg p-3 flex flex-col  bg-slate-100 hover:bg-slate-200">
              <div className="self-end text-gray-400 text-xs">20/12/2024</div>
              <div>Hey ponte pilas a subir evidencias</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVerNotificaciones;
