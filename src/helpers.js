export function getPublishedBlogs(blogs) {
	return blogs.filter((blog) => Date.now() > Date.parse(blog.publish_date));
	// .sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
}

export function filterBlogsByCategories(blogs, categories) {
	const filteredBlogs = new Set();

	if (blogs && categories) {
		// console.log(blogs);
		// console.log(categories);
		blogs.forEach((blog) => {
			for (const element of blog.categories) {
				if (categories.includes(Object.values(element)[1])) {
					filteredBlogs.add(blog);
				}
			}
		});
	}

	// console.log(filteredBlogs);
	return filteredBlogs;
}

export function getSimilarBlogs(blogId, blogs, categories) {
	const similarBlogs = new Set();

	if (blogId && blogs && categories) {
		// console.log(blogs);
		// console.log(categories);
		blogs.forEach((blog) => {
			if (blog.id !== +blogId) {
				for (const element of blog.categories) {
					categories.forEach((category) => {
						if (category.title === Object.values(element)[1]) {
							similarBlogs.add(blog);
						}
					});
				}
			}
		});
	}

	// console.log(similarBlogs);
	return similarBlogs;
}

export function formatDate(publishDate) {
	return new Date(publishDate).toLocaleDateString("en-GB").replaceAll("/", ".");
}

export function extractExcerpt(text) {
	const numOfWords = text.split(" ").length;

	return numOfWords > 15
		? text.split(" ").slice(0, 15).join(" ") + "..."
		: text;
}

export function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
