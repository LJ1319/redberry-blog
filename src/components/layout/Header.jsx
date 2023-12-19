import Logo from "../../../public/images/LOGO.svg";

export default function Header() {
	return (
		<div className="bg-white">
			<div className="m-auto flex h-20 w-11/12 items-center justify-between">
				<img src={Logo} alt="" />
				<button className="h-10 w-24 rounded-lg bg-[#5D37F3] text-sm text-white">
					შესვლა
				</button>
			</div>
		</div>
	);
}
