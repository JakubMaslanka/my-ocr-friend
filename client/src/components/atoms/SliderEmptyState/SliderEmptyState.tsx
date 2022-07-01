import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const SliderEmptyState = () => (
	<div className="flex h-full flex-col items-center justify-center text-center">
		<h3 className="mt-2 text-sm font-medium text-gray-900">No history</h3>
		<p className="mt-1 text-sm text-gray-500">
			<span>Looks like your are new here.</span>
			<br />
			<span>Get started by converting a first image.</span>
		</p>
		<div className="mt-6">
			<button
				type="button"
				className="inline-flex items-center rounded-md border border-transparent bg-fuchsia-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-100 ease-in-out hover:bg-fuchsia-700"
			>
				<AiOutlinePlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				Convert Image
			</button>
		</div>
	</div>
);

export default SliderEmptyState;
