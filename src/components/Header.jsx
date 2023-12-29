import RedberryLogo from "../../public/images/RedberryLogo.svg";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext.jsx";

import { classNames } from "@/helpers.js";

import LoginForm from "@/components/LoginForm.jsx";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const [openModal, setOpenModal] = useState(false);
	const { isAuthorized } = useAuth();
	const location = useLocation();

	function openModalHandler() {
		setOpenModal(true);
	}

	function closeModalHandler() {
		setOpenModal(false);
	}

	return (
		<div className="fixed z-50 w-full bg-white">
			<div
				className={classNames(
					location.pathname === "/create"
						? "justify-center"
						: "justify-between",
					"m-auto flex h-20 w-11/12 items-center",
				)}
			>
				<Link to="/">
					<img src={RedberryLogo} alt="Redberry Logo" />
				</Link>
				{!isAuthorized ? (
					<button
						className="h-10 w-24 rounded-lg bg-[#5D37F3] text-sm font-medium text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]"
						onClick={openModalHandler}
					>
						შესვლა
					</button>
				) : (
					<Link
						to="create"
						className={classNames(
							location.pathname === "/create" && "hidden",
							"h-10 w-40 rounded-lg bg-[#5D37F3] p-2.5 text-center text-sm font-medium text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]",
						)}
					>
						დაამატე ბლოგი
					</Link>
				)}
			</div>

			{openModal && <LoginForm closeHandler={closeModalHandler} />}
		</div>
	);
}
