import ArrowIcon from "../../public/images/ArrowIcon.svg";

import { extractExcerpt, formatDate } from "@/helpers.js";
import { Link } from "react-router-dom";

export default function Blog({ blog }) {
	return (
		<div>
			<img
				src={blog.image}
				alt={blog.description}
				className="object-fit h-80 w-full rounded-xl"
				// className="aspect-square rounded-xl object-fill"
			/>
			<div className="mt-6 space-y-4">
				<div>
					<p className="font-medium">{blog.author}</p>
					<p className="text-xs text-[#85858D]">
						{formatDate(blog.publish_date)}
					</p>
				</div>
				<p className="text-xl	font-medium">{blog.title}</p>
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
				<p>{extractExcerpt(blog.description)}</p>
				<div className="flex items-center gap-1 text-sm font-medium text-[#5D37F3]">
					<Link to={`/blogs/${blog.id}`}>სრულად ნახვა</Link>
					<img src={ArrowIcon} alt="Arrow Icon" />
				</div>
			</div>
		</div>
	);
}
