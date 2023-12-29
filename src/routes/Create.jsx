import BackIcon from "../../public/images/BackIcon.svg";
import AddFileIcon from "../../public/images/AddFileIcon.svg";
import ImageIcon from "../../public/images/ImageIcon.svg";
import CloseIcon from "../../public/images/CloseIcon.svg";
import ArrowDownIcon from "../../public/images/ArrowDownIcon.svg";
import InfoIcon from "../../public/images/InfoIcon.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlogSchema } from "@/schemas/schemas.js";
import useFormPersist from "react-hook-form-persist";

import axios from "axios";
import { classNames } from "@/helpers.js";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorage.js";
import { Form, Link, useActionData, useLoaderData } from "react-router-dom";

export async function loader() {
	const categoriesResponse = await axios("/categories");
	const categories = categoriesResponse.data.data;

	if (!categories) {
		throw new Response("", {
			status: 404,
			statusText: "Categories Not Found",
		});
	}

	return categories;
}

export async function action({ request }) {
	const formData = await request.formData();
	const postData = Object.fromEntries(formData);

	const multipartData = JSON.parse(localStorage.getItem("multipartData"));
	const blob = await fetch(multipartData.image).then((res) => res.blob());

	const finalData = {
		...postData,
		...multipartData.categories,
		image: blob,
	};

	let responseStatus = {
		code: "",
		message: "",
	};

	try {
		const resp = await axios.post("/blogs", finalData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		responseStatus.code = resp.status;
		responseStatus.message = "ჩანაწერლი წარმატებით დაემატა";

		localStorage.removeItem("imageName");
		localStorage.removeItem("multi");
		localStorage.removeItem("form");
	} catch (error) {
		responseStatus.code = error.response.status;
		responseStatus.message = error.response.message;
		console.error(error);
	}

	return responseStatus;
}

export default function Create() {
	const categories = useLoaderData();
	const responseStatus = useActionData();

	const [imageName, setImageName] = useLocalStorageState({
		key: "imageName",
		value: "",
	});

	const [imageError, setImageError] = useState(false);

	const [multipartData, setMultipartData] = useLocalStorageState({
		key: "multipartData",
		value: {
			categories: [],
			image: "",
		},
	});

	const {
		register,
		watch,
		setValue,
		formState: { errors, isValid, dirtyFields },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(BlogSchema),
	});

	useFormPersist("form", {
		watch,
		setValue,
		storage: window.localStorage,
	});

	function imageUploadHandler(event) {
		let reader = new FileReader();
		let file = event.target.files[0];

		let pattern = /image-*/;
		if (file && !file.type.match(pattern)) {
			setImageError(true);
			return;
		}

		setImageError(false);
		reader.addEventListener("load", () => {
			setImageName(file.name);
			setMultipartData({
				...multipartData,
				image: reader.result,
			});
		});
		reader.readAsDataURL(file);
	}

	function formSubmitHandler(event) {
		if (
			!isValid ||
			!multipartData.image ||
			multipartData.categories.length === 0
		) {
			event.preventDefault();
		}
	}

	useEffect(() => {
		if (categories) {
			console.log(categories);
		}
	}, [categories]);

	useEffect(() => {
		if (responseStatus) {
			console.log(responseStatus);
		}
	});

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
					<Form method="post">
						<div className="my-10 space-y-6">
							<div>
								<p className="my-2 text-sm font-medium">ატვირთეთ ფოტო</p>
								{multipartData.image ? (
									<div className="flex h-16 items-center justify-between rounded-xl bg-[#F2F2FA] px-4">
										<div className="flex gap-3">
											<img src={ImageIcon} alt="Image Icon" />
											{imageName}
										</div>
										<button
											className="h-10 w-10 rounded-full px-2"
											onClick={() => {
												setMultipartData({
													...multipartData,
													image: "",
												});
												setImageName("");
											}}
										>
											<img src={CloseIcon} alt="Remove Icon" />
										</button>
									</div>
								) : (
									<div
										className={classNames(
											imageError
												? "border-[#EA1919] bg-[#FAF2F3]"
												: "border-[#85858D] bg-[#F4F3FF]",
											"relative h-52 w-full rounded-xl border border-dashed ",
										)}
									>
										<label
											className="my-2 flex h-full w-full flex-col items-center justify-center gap-y-6 py-12"
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
											className="absolute top-0 h-full w-full cursor-pointer opacity-0"
											id="image"
											accept="image/*"
											onChange={imageUploadHandler}
										/>
										{imageError && (
											<div className="flex h-5 items-center gap-2">
												<img src={InfoIcon} alt="Info Icon" />
												<p className="text-xs text-[#EA1919]">
													არასწორი ფორმატი
												</p>
											</div>
										)}
									</div>
								)}
							</div>
							<div className="flex justify-between gap-6">
								<div className="flex w-full flex-col">
									<label htmlFor="author" className="text-sm font-medium">
										ავტორი *
									</label>
									<input
										{...register("author")}
										type="text"
										id="author"
										placeholder="შეიყვანეთ ავტორი"
										className={classNames(
											errors.author
												? "border-[#EA1919] bg-[#FAF2F3]"
												: !errors.author && dirtyFields.author
													? "border-[#14D81C] bg-[#F8FFF8]"
													: "border-[#E4E3EB] bg-[#FCFCFD]",
											"my-2 h-11 w-full rounded-xl border px-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
										)}
									/>
									<ul className="list-disc px-4 text-xs text-[#85858D]">
										<li
											className={classNames(
												errors.author?.message === "მინიმუმ 4 სიმბოლო"
													? "text-[#EA1919]"
													: !errors.author && dirtyFields.author
														? "text-[#14D81C]"
														: "",
											)}
										>
											მინიმუმ 4 სიმბოლო
										</li>
										<li
											className={classNames(
												errors.author?.message === "მინიმუმ ორი სიტყვა"
													? "text-[#EA1919]"
													: !errors.author && dirtyFields.author
														? "text-[#14D81C]"
														: "",
											)}
										>
											მინიმუმ ორი სიტყვა
										</li>
										<li
											className={classNames(
												errors.author?.message === "მხოლოდ ქართული სიმბოლოები"
													? "text-[#EA1919]"
													: !errors.author && dirtyFields.author
														? "text-[#14D81C]"
														: "",
											)}
										>
											მხოლოდ ქართული სიმბოლოები
										</li>
									</ul>
								</div>
								<div className="flex w-full flex-col">
									<label htmlFor="title" className="text-sm font-medium">
										სათური *
									</label>
									<input
										{...register("title")}
										type="text"
										id="title"
										placeholder="შეიყვანეთ სათაური"
										className={classNames(
											errors.title
												? "border-[#EA1919] bg-[#FAF2F3]"
												: !errors.title && dirtyFields.title
													? "border-[#14D81C] bg-[#F8FFF8]"
													: "border-[#E4E3EB] bg-[#FCFCFD]",
											"my-2 h-11 w-full rounded-xl border px-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
										)}
									/>
									<p
										className={classNames(
											errors.title?.message
												? "text-[#EA1919]"
												: !errors.title && dirtyFields.title
													? "text-[#14D81C]"
													: "",
											"text-xs text-[#85858D]",
										)}
									>
										მინიმუმ 2 სიმბოლო
									</p>
								</div>
							</div>
							<div className="flex w-full flex-col">
								<label htmlFor="description" className="text-sm font-medium">
									აღწერა *
								</label>
								<textarea
									{...register("description")}
									name="description"
									id="description"
									cols=""
									rows=""
									placeholder="შეიყვანეთ აღწერა"
									className={classNames(
										errors.description
											? "border-[#EA1919] bg-[#FAF2F3]"
											: !errors.description && dirtyFields.description
												? "border-[#14D81C] bg-[#F8FFF8]"
												: "border-[#E4E3EB] bg-[#FCFCFD]",
										"my-2 h-32 rounded-xl border p-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
									)}
								></textarea>
								<p
									className={classNames(
										errors.description?.message
											? "text-[#EA1919]"
											: !errors.description && dirtyFields.description
												? "text-[#14D81C]"
												: "",
										"text-xs text-[#85858D]",
									)}
								>
									მინიმუმ 2 სიმბოლო
								</p>
							</div>
							<div className="flex justify-between gap-6">
								<div className="flex w-full flex-col">
									<label htmlFor="publish_date" className="text-sm font-medium">
										გამოქვეყნების თარიღი *
									</label>
									<input
										{...register("publish_date")}
										type="date"
										id="publish_date"
										className={classNames(
											dirtyFields.publish_date
												? "border-[#14D81C] bg-[#F8FFF8]"
												: "border-[#E4E3EB] bg-[#FCFCFD]",
											"my-2 h-11 w-full rounded-xl border px-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
										)}
									/>
								</div>
								<div className="flex w-full flex-col">
									<p className="text-sm font-medium">კატეგორია *</p>
									<div className="my-2 flex h-11 w-full items-center justify-between rounded-xl border bg-[#FCFCFD] px-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]">
										<img src={ArrowDownIcon} alt="Arrow Down Icon" />
									</div>
								</div>
							</div>
							<div className="flex w-full flex-col">
								<label htmlFor="email" className="text-sm font-medium">
									ელ-ფოსტა
								</label>
								<input
									{...register("email")}
									type="email"
									id="email"
									placeholder="შეიყვანეთ ელ-ფოსტა"
									className={classNames(
										errors.email
											? "border-[#EA1919] bg-[#FAF2F3]"
											: !errors.email && dirtyFields.email
												? "border-[#14D81C] bg-[#F8FFF8]"
												: "border-[#E4E3EB] bg-[#FCFCFD]",
										"my-2 h-11 w-1/2 rounded-xl border p-4 text-sm outline-none focus:border-[#5D37F3] focus:bg-[#F7F7FF]",
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
						</div>
						<div className="flex justify-end">
							<button
								className={classNames(
									!isValid ||
										!multipartData.image ||
										multipartData.categories.length === 0
										? "bg-[#E4E3EB]"
										: "bg-[#5D37F3] hover:bg-[#512BE7] focus:bg-[#4721DD]",
									"h-10 w-72 rounded-lg text-sm font-medium text-white outline-none",
								)}
								onClick={formSubmitHandler}
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
