import blog from "../../public/images/blog.svg";
import arrow from "../../public/images/arrow.svg";

import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { extractExcerpt, getPublishedBlogs, formatDate } from "@/helpers.js";
import Blog from "@/components/Blog.jsx";

export async function loader() {
	const categoriesResponse = await axios("/categories");
	const categories = categoriesResponse.data.data;

	if (!categories) {
		throw new Response("", {
			status: 404,
			statusText: "Categories Not Found",
		});
	}

	const blogsResponse = await axios("/blogs");
	const blogs = blogsResponse.data.data;

	if (!blogs) {
		throw new Response("", {
			status: 404,
			statusText: "Blogs Not Found",
		});
	}

	const publishedBlogs = getPublishedBlogs(blogs);

	// console.log(categories);
	// console.log(blogs);
	// console.log(publishedBlogs);

	return { categories, publishedBlogs };
}

export default function Blogs() {
	const { categories, publishedBlogs } = useLoaderData();

	return (
		<div className="m-auto w-11/12 py-16">
			<div className="flex items-center justify-between">
				<h1 className="text-[64px] font-bold">ბლოგი</h1>
				<img src={blog} alt="blog" />
			</div>
			{categories.length > 0 && (
				<div className="my-16 flex justify-center gap-6">
					{categories.map((category) => (
						<button
							key={category.id}
							style={{
								color: category.text_color,
								backgroundColor: category.background_color,
							}}
							className="h-8 rounded-full p-2 text-xs font-medium"
						>
							{category.title}
						</button>
					))}
				</div>
			)}

			{publishedBlogs.length > 0 && (
				<div className="grid grid-cols-4 gap-x-8 gap-y-14">
					{publishedBlogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
}
