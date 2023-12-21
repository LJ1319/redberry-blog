export function formatDate(publishDate) {
	return new Date(publishDate).toLocaleDateString("en-GB").replaceAll("/", ".");
}

export function getPublishedBlogs(blogs) {
	return blogs
		.filter((blog) => Date.now() > Date.parse(blog.publish_date))
		.sort((a, b) => Date.parse(a.publish_date) - Date.parse(b.publish_date));
}

export function extractExcerpt(description) {
	const numOfWords = description.split(" ").length;

	return numOfWords > 15
		? description.split(" ").slice(0, 15).join(" ") + "..."
		: description;
}

export function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
