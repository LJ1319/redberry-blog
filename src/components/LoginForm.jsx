import axios from "axios";
import Modal from "@/components/Modal.jsx";
import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
	const formData = await request.formData();
	const postData = Object.fromEntries(formData);

	const res = await axios.post("/login", postData);

	return res.status;
}

export default function LoginForm({ closeHandler }) {
	const res = useActionData();
	if (res) console.log(res);

	return (
		<Modal closeHandler={closeHandler}>
			<p className="my-6 text-center text-2xl font-bold">შესვლა</p>
			<Form method="post">
				<label htmlFor="email" className="text-sm font-medium">
					ელ-ფოსტა
				</label>
				<input
					type="email"
					name="email"
					placeholder="Example@redberry.ge"
					className="radius-xl my-2 h-11 w-full rounded-xl border-2 border-[#E4E3EB] bg-[#FCFCFD] p-2 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]"
				/>
				<button className="mt-6 h-11 w-full rounded-lg bg-[#5D37F3] text-white">
					შესვლა
				</button>
			</Form>
		</Modal>
	);
}
