import * as yup from "yup";

const redberryEmailRegex = /^\w[\w.-]{0,25}@(redberry)\.ge$/;

export const LoginSchema = yup.object({
	email: yup
		.string()
		.email("უნდა იყოს ვალიდური ელ-ფოსტა")
		.required("სავალდებულო")
		.matches(redberryEmailRegex, {
			message: "უნდა მთავრებოდეს @redberry.ge-ით",
		}),
});
