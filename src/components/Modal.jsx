import close from "../../public/images/close.svg";

export default function Modal({ closeHandler, children }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
			<div className="relative h-[300px] w-[480px] rounded-xl bg-white p-6 shadow-xl transition-all">
				<button className="absolute right-6 top-6" onClick={closeHandler}>
					<img src={close} alt="close" />
				</button>
				{children}
			</div>
		</div>
	);
}
