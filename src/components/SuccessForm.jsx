import Modal from "@/components/Modal.jsx";
import TickIcon from "../../public/images/TickIcon.svg";
import { Link } from "react-router-dom";

export default function SuccessForm({ responseStatus, closeHandler }) {
	return (
		<Modal closeHandler={closeHandler}>
			{responseStatus && responseStatus.code === 204 && (
				<div className="pt-8">
					<div className="flex flex-col items-center gap-4">
						<img src={TickIcon} alt="Tick Icon" />
						<p className="text-xl font-bold">{responseStatus.message}</p>
					</div>
					<button className="mt-12 flex h-10 w-full items-center justify-center rounded-lg bg-[#5D37F3] p-2.5 text-center text-sm font-medium text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]">
						<Link to="/" className="w-full">
							მთავარ გვერდზე დაბრუნება
						</Link>
					</button>
				</div>
			)}
		</Modal>
	);
}
