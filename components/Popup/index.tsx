import Image from "next/image";
import CloseIcon from '../../assets/images/close.svg';

function Popup(props: any) {
  const { title, children, onClose } = props;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-zinc-900 bg-opacity-50 z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-zinc-500 bg-zinc-800 rounded-lg min-w-[25rem]">
        <div className="flex justify-between p-8">
          <h2 className="text-2xl self-center font-bitter font-semibold">{title}</h2>
          <button className="hover:bg-zinc-700 p-2 rounded-full" onClick={onClose}>
            <Image src={CloseIcon} alt="close" width={28} />
          </button>
        </div>
        <div className="p-8 pt-0">{children}</div>
      </div>
    </div>
  );
}

export default Popup;
