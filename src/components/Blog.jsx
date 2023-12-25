import ArrowIcon from "../../public/images/ArrowIcon.svg";

import { extractExcerpt, formatDate } from "@/helpers.js";
import { Link } from "react-router-dom";

export default function Blog({ blog }) {
	return (
		<div className="w-full">
			<img
				src={blog.image}
				alt={blog.description}
				className="h-80 w-full rounded-xl object-cover"
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
				<div className="text-sm font-medium text-[#5D37F3]">
					<Link to={`/blogs/${blog.id}`} className="flex items-center gap-1">
						სრულად ნახვა
						<img src={ArrowIcon} alt="Arrow Icon" />
					</Link>
				</div>
			</div>
		</div>
	);
}
