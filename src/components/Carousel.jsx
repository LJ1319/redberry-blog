import BackIconLight from "../../public/images/BackIconLight.svg";
import NextIcon from "../../public/images/NextIcon.svg";

import { useState } from "react";
import Blog from "@/components/Blog.jsx";
import { classNames } from "@/helpers.js";

export default function Carousel({ title, similarBlogs }) {
	const [start, setStart] = useState(0);
	const [finish, setFinish] = useState(3);

	function handlePrevClick() {
		setStart((prevState) => prevState - 1);
		setFinish((prevState) => prevState - 1);

		if (start <= 0) {
			setStart(similarBlogs.length - 3);
			setFinish(similarBlogs.length);
		}
	}

	function handleNextClick() {
		setStart((prevState) => prevState + 1);
		setFinish((prevState) => prevState + 1);

		if (finish > similarBlogs.length - 1) {
			setStart(0);
			setFinish(3);
		}
	}

	return (
		<div className="my-24 space-y-10">
			<div className="flex justify-between">
				<p className="text-[32px] font-bold leading-10">{title}</p>
				<div className="flex gap-6">
					<button
						className={classNames(
							similarBlogs.length === 0 &&
								"bg-[#E4E3EB] hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]",
							"flex h-11 w-11 items-center justify-center rounded-full bg-[#5D37F3] outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]",
						)}
						onClick={handlePrevClick}
					>
						<img src={BackIconLight} alt="Back Icon" />
					</button>
					<button
						className={classNames(
							similarBlogs.length === 0 &&
								"bg-[#E4E3EB] hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]",
							"flex h-11 w-11 items-center justify-center rounded-full bg-[#5D37F3] outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]",
						)}
						onClick={handleNextClick}
					>
						<img src={NextIcon} alt="Next Icon" />
					</button>
				</div>
			</div>
			{similarBlogs.length > 0 ? (
				<div className="grid grid-cols-3 gap-x-8 gap-y-14">
					{similarBlogs.slice(start, finish).map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			) : (
				<div className="text-lg font-semibold">
					მსგავსი სტატიები ვერ მოიძებნა
				</div>
			)}
		</div>
	);
}
