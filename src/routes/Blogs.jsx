import Blog from "../../public/images/Blog.svg";
import { axiosFetch } from "@/axios/axiosFetch.js";
import { useLoaderData } from "react-router-dom";

export async function loader() {
	const categoriesResponse = await axiosFetch("/categories");
	const categories = categoriesResponse.data.data;

	if (!categories) {
		throw new Response("", {
			status: 404,
			statusText: "Categories Not Found",
		});
	}

	const blogsResponse = await axiosFetch("/blogs");
	const blogs = blogsResponse.data.data;

	if (!blogs) {
		throw new Response("", {
			status: 404,
			statusText: "Blogs Not Found",
		});
	}

	return { categories, blogs };
}

export default function Blogs() {
	const { categories, blogs } = useLoaderData();
	console.log(categories);
	console.log(blogs);

	return (
		<div className="m-auto w-11/12 py-16">
			<div className="flex items-center justify-between">
				<h1 className="text-[64px] font-bold">ბლოგი</h1>
				<img src={Blog} alt="" />
			</div>
			{categories.length > 0 && (
				<div className="my-16 flex justify-center gap-3">
					{categories.map((category) => (
						<button
							key={category.id}
							style={{
								color: category.text_color,
								backgroundColor: category.background_color,
							}}
							className="h-8 rounded-full p-2 text-xs"
						>
							{category.title}
						</button>
					))}
				</div>
			)}

			{blogs.length > 0 && (
				<div className="flex justify-center gap-3">
					{blogs.map((blog) => (
						<div key={blog.id}>
							<img src={blog.image} alt="" />
							<p>{blog.title}</p>
							<p>{blog.description}</p>
							<p>{blog.author}</p>
							<p>{blog.publish_date}</p>
							<div className="flex justify-between gap-3">
								{blog.categories.map((category) => (
									<p key={category.id}>{category.title}</p>
								))}
							</div>
							<p>{blog.email}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
