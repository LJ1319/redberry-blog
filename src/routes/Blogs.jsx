import BlogPicture from "../../public/images/BlogPicture.svg";

import axios from "axios";
import {
	classNames,
	filterBlogsByCategories,
	getPublishedBlogs,
} from "@/helpers.js";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

	return { categories, publishedBlogs };
}

export default function Blogs() {
	const { categories, publishedBlogs } = useLoaderData();
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedCategories = searchParams.get("selectedCategories");

	function categoryClickHandler(category) {
		setSearchParams(
			(prev) => {
				if (
					prev.get("selectedCategories") &&
					prev.get("selectedCategories").includes(category)
				) {
					prev.set(
						"selectedCategories",
						[...prev.values()][0]
							.split(",")
							.filter((item) => item !== category)
							.toString(),
					);
				} else {
					prev.set(
						"selectedCategories",
						[...prev.values(), category]
							.filter((item) => item !== "")
							.toString(),
					);
				}

				return prev;
			},
			{ replace: true },
		);
	}

	useEffect(() => {
		setFilteredBlogs([
			...filterBlogsByCategories(publishedBlogs, selectedCategories),
		]);
	}, [selectedCategories, publishedBlogs]);

	return (
		<div className="m-auto w-11/12 py-16">
			<div className="flex items-center justify-between">
				<h1 className="text-[64px] font-bold">ბლოგი</h1>
				<img src={BlogPicture} alt="Blog Picture" />
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
							className={classNames(
								selectedCategories?.includes(category.title)
									? "ring-offset ring-1 ring-black"
									: "ring-0",
								"h-8 rounded-full p-2 text-xs font-medium",
							)}
							onClick={() => categoryClickHandler(category.title)}
						>
							{category.title}
						</button>
					))}
				</div>
			)}

			{filteredBlogs.length > 0 ? (
				<div className="grid grid-cols-3 gap-x-8 gap-y-14">
					{filteredBlogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			) : (
				<div className="grid grid-cols-3 gap-x-8 gap-y-14">
					{publishedBlogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
}
