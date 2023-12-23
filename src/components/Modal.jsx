import CloseIcon from "../../public/images/CloseIcon.svg";

export default function Modal({ closeHandler, children }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
			<div className="relative h-[300px] w-[480px] rounded-xl bg-white p-6 shadow-xl transition-all">
				<button
					className="absolute right-3 top-3 h-10 w-10 rounded-full px-2 outline-none hover:bg-[#F5F4F9] focus:bg-[#F5F4F9]"
					onClick={closeHandler}
				>
					<img src={CloseIcon} alt="Close Icon" />
				</button>
				{children}
			</div>
		</div>
	);
}
