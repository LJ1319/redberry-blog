import BackIcon from "../../public/images/BackIcon.svg";
import AddFileIcon from "../../public/images/AddFileIcon.svg";
import ImageIcon from "../../public/images/ImageIcon.svg";
import CloseIcon from "../../public/images/CloseIcon.svg";

import { useForm } from "react-hook-form";

import { classNames } from "@/helpers.js";
import { useEffect } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorage.js";
import { Form, Link } from "react-router-dom";

export default function Create() {
	const [imageName, setImageName] = useLocalStorageState({
		key: "imageName",
		value: "",
	});

	const [formValues, setFormValues] = useLocalStorageState({
		key: "Blog",
		value: {
			id: "",
			title: "",
			description: "",
			image: "",
			publish_date: "",
			categories: [
				{
					id: "",
					name: "",
					text_color: "",
					background_color: "",
				},
			],
			author: "",
		},
	});

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	const {
		register,
		formState: { isValid },
	} = useForm({ defaultValues: formValues });

	function imageUploadHandler(event) {
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.addEventListener("load", () => {
			setImageName(file.name);
			setFormValues({
				...formValues,
				image: reader.result,
			});
		});
		reader.readAsDataURL(file);
	}

	return (
		<div className="m-auto w-11/12 py-10">
			<div className="flex justify-start">
				<div className="w-1/4">
					<Link
						to="/"
						className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4E3EB] outline-none hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]"
					>
						<img src={BackIcon} alt="Back Icon" />
					</Link>
				</div>
				<div className="w-2/5">
					<h1 className="text-[32px] font-bold leading-10">ბლოგის დამატება</h1>
					<Form>
						<div className="my-10 space-y-6">
							<div>
								<p className="my-2 text-sm font-medium">ატვირთეთ ფოტო</p>
								{formValues.image ? (
									<div className="flex h-16 items-center justify-between rounded-xl bg-[#F2F2FA] px-4">
										<div className="flex gap-3">
											<img src={ImageIcon} alt="Image Icon" />
											{imageName}
										</div>
										<button
											className="h-10 w-10 rounded-full px-2"
											onClick={() => {
												setFormValues({
													...formValues,
													image: "",
												});
											}}
										>
											<img src={CloseIcon} alt="Remove Icon" />
										</button>
									</div>
								) : (
									<div className="relative h-52 w-full rounded-xl border border-dashed border-[#85858D] bg-[#F4F3FF]">
										<label
											className="flex h-full w-full flex-col items-center justify-center gap-y-6 py-12"
											htmlFor="image"
										>
											<img src={AddFileIcon} alt="Add File Icon" />
											<span className="text-sm">
												ჩააგდეთ ფაილი აქ ან{" "}
												<span className="font-bold underline">
													აირჩიეთ ფაილი
												</span>
											</span>
										</label>
										<input
											type="file"
											className="absolute top-0 h-full w-full opacity-0"
											id="image"
											accept="image/*"
											onChange={imageUploadHandler}
										/>
									</div>
								)}
							</div>
						</div>
						<div className="flex justify-end">
							<button
								className={classNames(
									!isValid
										? "bg-[#E4E3EB]"
										: "bg-[#5D37F3] hover:bg-[#512BE7] focus:bg-[#4721DD]",
									"h-10 w-72 rounded-lg text-sm font-medium text-white outline-none",
								)}
							>
								გამოქვეყნება
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
