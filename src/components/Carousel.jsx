import PrevIcon from "../../public/images/PrevIcon.svg";
import NextIcon from "../../public/images/NextIcon.svg";

import { useEffect, useState } from "react";
import Blog from "@/components/Blog.jsx";
import { classNames } from "@/helpers.js";
import { useLocation } from "react-router-dom";

export default function Carousel({ title, similarBlogs }) {
	const location = useLocation();

	const [index, setIndex] = useState(0);
	const [isPrevDisabled, setIsPrevDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);

	function prevClickHandler() {
		if (index > 0) {
			setIndex((prevState) => prevState - 1);
		}
	}

	function nextClickHandler() {
		if (index < similarBlogs.length - 3) {
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

	useEffect(() => {
		if (similarBlogs.length === 0) {
			setIsPrevDisabled(true);
			setIsNextDisabled(true);
		}
	}, [similarBlogs]);

	useEffect(() => {
		setIndex(0);
	}, [location]);

	return (
		<div className="my-24 space-y-10">
			<div className="flex justify-between">
				<p className="text-[32px] font-bold leading-10">{title}</p>
				<div className="flex gap-6">
					<button
						className={classNames(
							isPrevDisabled
								? "bg-[#E4E3EB] hover:bg-[#E4E3EB] focus:bg-[#E4E3EB]"
								: "bg-[#5D37F3] hover:bg-[#512BE7] focus:bg-[#512BE7]",
							"flex h-11 w-11 items-center justify-center rounded-full  outline-none ",
						)}
						onClick={prevClickHandler}
					>
						<img src={PrevIcon} alt="Back Icon" />
					</button>
					<button
						className={classNames(
							isNextDisabled
								? "bg-[#E4E3EB] hover:bg-[#E4E3EB] focus:bg-[#E4E3EB]"
								: "bg-[#5D37F3] hover:bg-[#512BE7] focus:bg-[#512BE7]",
							"flex h-11 w-11 items-center justify-center rounded-full  outline-none ",
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
