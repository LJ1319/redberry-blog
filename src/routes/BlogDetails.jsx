import BackIcon from "../../public/images/BackIcon.svg";

import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Blog from "@/components/Blog.jsx";
import { formatDate } from "@/helpers.js";

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
				<div className="w-1/3">
					<Link
						to="/"
						className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
					>
						<img src={BackIcon} alt="Back Icon" />
					</Link>
				</div>
				<div className="w-[720px]">
					<img
						src={blog.image}
						alt={blog.description}
						className="h-80 w-full rounded-xl object-cover"
					/>
					<div className="my-6">
						<p className="font-medium">{blog.author}</p>
						<div className="flex gap-1.5 text-xs text-[#85858D]">
							<p>{formatDate(blog.publish_date)}</p>
							<span>•</span>
							<p>{blog.email}</p>
						</div>
						<p className="my-8	text-xl font-medium">{blog.title}</p>
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
						<p className="my-6">{blog.description}</p>
					</div>
				</div>
			</div>
			<div className="my-24 space-y-10">
				<p className="text-3xl font-bold">მსგავსი სტატიები</p>
				<div className="grid grid-cols-4 gap-x-8 gap-y-14">
					<Blog blog={blog} />
					<Blog blog={blog} />
					<Blog blog={blog} />
					<Blog blog={blog} />
				</div>
			</div>
		</div>
	);
}
