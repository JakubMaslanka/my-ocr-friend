import React from "react";

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
	<div>
		<div className="text-center">
			<span className="inline-block rounded-full bg-fuchsia-400 py-1 px-2 text-xs font-light uppercase text-white ">
				Converting in progress
			</span>
		</div>
		<div className="mt-3 h-4 w-full rounded-full bg-gray-300">
			<div
				style={{ width: `${progress}%` }}
				className="h-full rounded-full bg-fuchsia-400 text-center text-xs text-white"
			>
				{progress}%
			</div>
		</div>
	</div>
);
