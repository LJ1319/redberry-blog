import * as yup from "yup";

const geoRegex = /^[ა-ჰ\s]*$/;
const wordCountRegex = /^[ა-ჰ]+(?:\s[ა-ჰ]+){1,}$/gm;
const redberryEmailRegex = /^\w[\w.-]{0,25}@(redberry)\.ge$/;

export const LoginSchema = yup.object({
	email: yup
		.string()
		.email("უნდა იყოს ვალიდური ელ-ფოსტა")
		.matches(redberryEmailRegex, {
			message: "უნდა მთავრებოდეს @redberry.ge-ით",
		})
		.required("სავალდებულო"),
});

export const BlogSchema = yup.object({
	// image: yup.string().required("სავალდებულო"),
	title: yup.string().min(2, "მინიმუმ 2 სიმბოლო").required("სავალდებულო"),
	description: yup.string().min(2, "მინიმუმ 2 სიმბოლო").required("სავალდებულო"),
	author: yup
		.string()
		.matches(geoRegex, { message: "მხოლოდ ქართული სიმბოლოები" })
		.min(4, "მინიმუმ 4 სიმბოლო")
		.matches(wordCountRegex, { message: "მინიმუმ ორი სიტყვა" })
		.required("სავალდებულო"),
	publish_date: yup.date().required("სავალდებულო"),
	// categories: yup.object({
	// 	id: yup.string().required(),
	// 	title: yup.string().required(),
	// 	text_color: yup.string().required(),
	// 	background_color: yup.string().required(),
	// }),
	email: yup
		.string()
		.email("უნდა იყოს ვალიდური ელ-ფოსტა")
		.matches(redberryEmailRegex, {
			message: "უნდა მთავრებოდეს @redberry.ge-ით",
		}),
});
