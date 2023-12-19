import { useParams } from "react-router-dom";

export default function BlogDetails() {
	let { id } = useParams();

	return <div>Blog {id} Details</div>;
}
