import logo from "../../public/images/logo.svg";

import { useContext, useState } from "react";
import LoginForm from "@/components/LoginForm.jsx";
import { AuthContext } from "@/context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Header() {
	const [openModal, setOpenModal] = useState(false);
	const { isAuthorized } = useContext(AuthContext);

	function openModalHandler() {
		setOpenModal(true);
	}

	function closeModalHandler() {
		setOpenModal(false);
	}

	return (
		<div className="bg-white">
			<div className="m-auto flex h-20 w-11/12 items-center justify-between">
				<Link to="/">
					<img src={logo} alt="logo" />
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
						className="h-10 w-40 rounded-lg bg-[#5D37F3] p-2.5 text-center text-sm font-medium text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]"
					>
						დაამატე ბლოგი
					</Link>
				)}
			</div>

			{openModal && <LoginForm closeHandler={closeModalHandler} />}
		</div>
	);
}
