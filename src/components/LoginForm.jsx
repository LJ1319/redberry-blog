import InfoIcon from "../../public/images/InfoIcon.svg";
import TickIcon from "../../public/images/TickIcon.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schemas/schemas.js";

import axios from "axios";
import Modal from "@/components/Modal.jsx";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { classNames } from "@/helpers.js";
import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
	const formData = await request.formData();
	const postData = Object.fromEntries(formData);

	let responseStatus = {
		code: "",
		message: "",
	};

	try {
		const resp = await axios.post("/login", postData);
		responseStatus.code = resp.status;
		responseStatus.message = "წარმატებული ავტორიზაცია";
	} catch (error) {
		responseStatus.code = error.response.status;
		responseStatus.message = "ელ-ფოსტა ვერ მოიძებნა";
	}

	return responseStatus;
}

export default function LoginForm({ closeHandler }) {
	const responseStatus = useActionData();
	const { setIsAuthorized } = useAuth();

	const {
		register,
		setFocus,
		formState: { errors, isValid, isValidating, dirtyFields },
	} = useForm({
		resolver: yupResolver(LoginSchema),
		mode: "onChange",
	});

	useEffect(() => {
		setFocus("email");
	}, [setFocus]);

	useEffect(() => {
		if (responseStatus && responseStatus.code === 204) {
			setIsAuthorized(true);
		}
	}, [responseStatus, setIsAuthorized]);

	useEffect(() => {
		if (responseStatus && isValidating) {
			responseStatus.code = "";
			responseStatus.message = "";
		}
	}, [responseStatus, isValidating]);

	function formSubmitHandler(event) {
		if (!isValid) {
			event.preventDefault();
		}
	}

	return (
		<Modal
			closeHandler={() => {
				if (responseStatus) {
					responseStatus.code = "";
					responseStatus.message = "";
				}
				closeHandler();
			}}
		>
			{responseStatus && responseStatus.code === 204 ? (
				<div className="pt-8">
					<div className="flex flex-col items-center gap-4">
						<img src={TickIcon} alt="Tick Icon" />
						<p className="text-xl font-bold">{responseStatus.message}</p>
					</div>
					<button
						className="mt-12 h-11 w-full rounded-lg bg-[#5D37F3] text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]"
						onClick={closeHandler}
					>
						კარგი
					</button>
				</div>
			) : (
				<>
					<p className="my-6 text-center text-2xl font-bold">შესვლა</p>
					<Form method="post">
						<label htmlFor="email" className="text-sm font-medium">
							ელ-ფოსტა
						</label>
						<div>
							<input
								{...register("email")}
								id="email"
								name="email"
								placeholder="Example@redberry.ge"
								className={classNames(
									errors.email
										? "border-[#EA1919] bg-[#FAF2F3]"
										: responseStatus && responseStatus.code === 422
											? "border-[#EA1919] bg-[#FAF2F3]"
											: !errors.email && dirtyFields.email
												? "border-[#14D81C] bg-[#F8FFF8]"
												: "border-[#E4E3EB] bg-[#FCFCFD]",
									"my-2 h-11 w-full rounded-xl border px-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
								)}
							/>
							{errors.email && (
								<div className="flex h-5 items-center gap-2">
									<img src={InfoIcon} alt="Info Icon" />
									<p className="text-xs text-[#EA1919]">
										{errors.email.message}
									</p>
								</div>
							)}
						</div>
						{responseStatus && responseStatus.code === 422 && (
							<div className="flex h-5 items-center gap-2">
								<img src={InfoIcon} alt="Info Icon" />
								<p className="text-xs text-[#EA1919]">
									{responseStatus.message}
								</p>
							</div>
						)}
						<button
							className="mt-6 h-11 w-full rounded-lg bg-[#5D37F3] p-1 text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]"
							onClick={formSubmitHandler}
						>
							შესვლა
						</button>
					</Form>
				</>
			)}
		</Modal>
	);
}
