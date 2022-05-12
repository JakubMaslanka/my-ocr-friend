export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
	<div>
		<div className="text-center">
			<span className="text-xs font-light inline-block py-1 px-2 uppercase rounded-full text-white bg-fuchsia-400 ">
				Converting in progress
			</span>
		</div>
		<div className="w-full h-4 bg-gray-300 rounded-full mt-3">
			<div
				style={{ width: `${progress}%` }}
				className="h-full text-center text-xs text-white bg-fuchsia-400 rounded-full"
			>
				{progress}%
			</div>
		</div>
	</div>
);
