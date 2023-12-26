import BackIcon from "../../public/images/BackIcon.svg";

import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { formatDate } from "@/helpers.js";
import Carousel from "@/components/Carousel.jsx";

export async function loader({ params }) {
	const id = params.id;
	const res = await axios(`/blogs/${id}`);

	// console.log(res.data);

	return res.data;
}

export default function BlogDetails() {
	const blog = useLoaderData();

	return (
		<div className="m-auto w-11/12 py-10">
			<div className="flex justify-start">
				<div className="w-1/4">
					<Link
						to="/"
						className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
					>
						<img src={BackIcon} alt="Back Icon" />
					</Link>
				</div>
				<div className="mx-11 w-1/2">
					<img
						src={blog.image}
						alt={blog.description}
						className="h-96 w-full rounded-xl"
					/>
					<div className="mt-10">
						<p className="font-medium">{blog.author}</p>
						<div className="flex gap-1.5 text-xs text-[#85858D]">
							<p>{formatDate(blog.publish_date)}</p>
							<span>•</span>
							<p>{blog.email}</p>
						</div>
						<p className="my-6 text-xl font-medium">{blog.title}</p>
						<div className="flex flex-wrap gap-4">
							{blog.categories.map((category) => (
								<div
									key={category.id}
									style={{
										color: category.text_color,
										backgroundColor: category.background_color,
									}}
									className="h-8 rounded-full p-2 text-xs font-medium"
								>
									{category.title}
								</div>
							))}
						</div>
						<p className="mt-10">{blog.description}</p>
					</div>
				</div>
			</div>
			<Carousel title="მსგავსი სტატიები" data={blog} />
		</div>
	);
}
