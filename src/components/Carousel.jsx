import PrevIcon from "../../public/images/PrevIcon.svg";
import NextIcon from "../../public/images/NextIcon.svg";

import { useEffect, useState } from "react";
import Blog from "@/components/Blog.jsx";
import { classNames } from "@/helpers.js";

export default function Carousel({ title, similarBlogs }) {
	const [index, setIndex] = useState(0);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);

	function prevClickHandler() {
		if (index > 0) {
			setIndex((prevState) => prevState - 1);
		}
	}

	function nextClickHandler() {
		if (index !== similarBlogs.length - 3) {
			setIndex((prevState) => prevState + 1);
		}
	}

	useEffect(() => {
		if (index > 0) {
			setIsPrevDisabled(false);
		} else {
			setIsPrevDisabled(true);
		}

		if (index === similarBlogs.length - 3) {
			setIsNextDisabled(true);
		} else {
			setIsNextDisabled(false);
		}
	}, [index, similarBlogs]);

	return (
		<div className="my-24 space-y-10">
			<div className="flex justify-between">
				<p className="text-[32px] font-bold leading-10">{title}</p>
				<div className="flex gap-6">
					<button
						className={classNames(
							similarBlogs.length === 0 &&
								"bg-[#E4E3EB] hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]",
							isPrevDisabled &&
								"bg-[#E4E3EB] hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]",
							"flex h-11 w-11 items-center justify-center rounded-full bg-[#5D37F3] outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]",
						)}
						onClick={prevClickHandler}
					>
						<img src={PrevIcon} alt="Back Icon" />
					</button>
					<button
						className={classNames(
							similarBlogs.length === 0 &&
								"bg-[#E4E3EB] hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]",
							isNextDisabled &&
								"bg-[#E4E3EB] hover:bg-[#D9D8E0] focus:bg-[#D9D8E0]",
							"flex h-11 w-11 items-center justify-center rounded-full bg-[#5D37F3] outline-none hover:bg-[#512BE7] focus:bg-[#512BE7]",
						)}
						onClick={nextClickHandler}
					>
						<img src={NextIcon} alt="Next Icon" />
					</button>
				</div>
			</div>
			{similarBlogs.length > 0 ? (
				<div className="grid grid-cols-3 gap-x-8 gap-y-14">
					{similarBlogs.slice(index, index + 3).map((blog) => (
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
