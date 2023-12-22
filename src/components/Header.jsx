import logo from "../../public/images/logo.svg";

import { useState } from "react";
import LoginForm from "@/components/LoginForm.jsx";

export default function Header() {
	const [openModal, setOpenModal] = useState(false);

	function openModalHandler() {
		setOpenModal(true);
	}

	function closeModalHandler() {
		setOpenModal(false);
	}

	return (
		<div className="bg-white">
			<div className="m-auto flex h-20 w-11/12 items-center justify-between">
				<img src={logo} alt="logo" />
				<button
					className="h-10 w-24 rounded-lg bg-[#5D37F3] text-sm font-medium text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]"
					onClick={openModalHandler}
				>
					შესვლა
				</button>
			</div>

			{openModal && <LoginForm closeHandler={closeModalHandler} />}
		</div>
	);
}
