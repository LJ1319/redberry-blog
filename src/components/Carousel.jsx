import Blog from "@/components/Blog.jsx";

export default function Carousel({ title, data }) {
	return (
		<div className="my-24 space-y-10">
			<p className="text-3xl font-bold">{title}</p>
			<div className="grid grid-cols-3 gap-x-8 gap-y-14">
				<Blog blog={data} />
				<Blog blog={data} />
				<Blog blog={data} />
			</div>
		</div>
	);
}
