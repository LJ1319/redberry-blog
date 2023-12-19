import { useRouteError } from "react-router-dom";

export default function Error() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="font-noto flex h-96 w-full flex-col items-center justify-center gap-3 text-gray-800">
			<h1 className="text-3xl font-bold">Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p className="text-gray-600">
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
