import info from "../../public/images/info.svg";
import tick from "../../public/images/tick.svg";

import axios from "axios";
import { classNames } from "@/helpers.js";
import Modal from "@/components/Modal.jsx";
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
		console.error(error);
	}

	return responseStatus;
}

export default function LoginForm({ closeHandler }) {
	const responseStatus = useActionData();
	return (
		<Modal closeHandler={closeHandler}>
			{responseStatus && responseStatus.code === 204 ? (
				<div className="pt-8">
					<div className="flex flex-col items-center gap-4">
						<img src={tick} alt="tick" />
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
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Example@redberry.ge"
							required
							className={classNames(
								responseStatus &&
									responseStatus.code === 422 &&
									"border-[#EA1919] bg-[#FAF2F3]",
								"radius-xl my-2 h-11 w-full rounded-xl border-2 border-[#E4E3EB] bg-[#FCFCFD] p-2 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
							)}
						/>
						{responseStatus && responseStatus.code === 422 && (
							<div className="flex h-5 items-center gap-2">
								<img src={info} alt="info" />
								<p className="text-xs text-[#EA1919]">
									{responseStatus.message}
								</p>
							</div>
						)}
						<button className="mt-6 h-11 w-full rounded-lg bg-[#5D37F3] text-white outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]">
							შესვლა
						</button>
					</Form>
				</>
			)}
		</Modal>
	);
}
