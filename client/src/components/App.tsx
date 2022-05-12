import { useEffect, useReducer, useRef } from "react";

import { IoMdCopy } from "react-icons/io";
import { MdOutlineTranslate } from "react-icons/md";

import { useToast } from "./context/ToastContext";
import { makeRequest } from "./helpers/makeRequest";
import { Footer, Header } from "./pageElements";
import { Button, ProgressBar, Tooltip } from "./shared";

import type { StateType, ActionType } from "../types";

function reducer(state: StateType, action: ActionType): StateType {
	switch (action.type) {
		case "request":
			return { ...state, isConverting: true };
		case "progressIncrease":
			return { ...state, convertingProgress: action.percent };
		case "success":
			return {
				isConverting: false,
				convertingProgress: 100,
				ocrText: action.result
			};
		case "reset":
			return { isConverting: false, convertingProgress: 0, ocrText: null };
		default:
			return state;
	}
}

function App() {
	const initialState = {
		isConverting: false,
		convertingProgress: 0,
		ocrText: null
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const intervalID = useRef(undefined) as React.MutableRefObject<
		number | undefined
	>;
	const editableDiv = useRef(
		null
	) as React.MutableRefObject<HTMLDivElement | null>;

	const { ocrText, isConverting, convertingProgress } = state;
	const { addToast } = useToast();

	const handleConvert = () => {
		if (!editableDiv.current!.hasChildNodes()) {
			addToast("There is no picture in the zone!", "danger");
			return;
		}
		const imageRef = editableDiv.current!.children[0] as HTMLImageElement;
		if (!imageRef || !imageRef.src) {
			addToast("Content to convert is invalid. Change it!", "danger");
			return;
		}
		dispatch({ type: "request" });

		makeRequest({ imageUrl: imageRef.src }, (error) =>
			addToast(`Internal server error, message: ${error}`, "error")
		)
			.then((data) => {
				addToast("The photo was converted correctly!", "success");
				dispatch({ type: "success", result: data! });
			})
			.catch((err) =>
				addToast(`Something went wrong, error message: ${err}`, "error")
			);
	};

	const handleReset = () => {
		if (intervalID.current !== null) clearInterval(intervalID.current);
		if (editableDiv.current!.hasChildNodes()) {
			Array.from(editableDiv.current!.children).forEach((child) =>
				child.remove()
			);
		}
		dispatch({ type: "reset" });
	};

	const copyToClipboard = () => {
		if (ocrText) {
			if (!navigator.clipboard) {
				addToast(
					"The result was not copied to the clipboard. Error occured.",
					"danger"
				);
				return;
			}
			navigator.clipboard
				.writeText(ocrText.result)
				.then(() => {
					addToast(
						"The text was successfully copied to the clipboard!",
						"success"
					);
				})
				.catch((err) => {
					addToast("Something went wrong while copying the result!", "error");
				});
		} else {
			addToast("The result text is not converted yet!", "danger");
		}
	};

	const openTextInTranslator = () => {
		if (ocrText) {
			window.open(
				`https://www.deepl.com/translator#en/pl/${encodeURIComponent(
					ocrText.result
				)}`,
				"_blank"
			);
		} else {
			addToast("The result text is not converted yet!", "danger");
		}
	};

	useEffect(() => {
		if (isConverting) {
			intervalID.current = window.setInterval(
				() =>
					dispatch({
						type: "progressIncrease",
						percent: convertingProgress < 100 ? convertingProgress + 1 : 100
					}),
				250
			);
		}
		return () => clearInterval(intervalID.current);
	}, [isConverting, convertingProgress]);

	return (
		<main className="dark:bg-gray-800 font-mono bg-white relative">
			<Header />
			<section className="flex relative z-20 items-center">
				<div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
					<div className="flex flex-col">
						<h2 className="max-w-3xl text-2xl md:text-3xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
							<span className="text-fuchsia-400">MY-OCR-FRIEND</span> is a web
							app allowing you to convert image into text.
							<br />
							<span className="text-fuchsia-300">
								Try it out, just paste image!
							</span>
						</h2>

						<p className="text-lg my-8 font-medium text-center dark:text-white">
							Your image needs to be on your&#x27;s clipboard!
						</p>
						<p className="text-sm -mt-8 font-extralight text-center dark:text-white">
							The written text should be in English.
						</p>
						<div className="my-8">
							<label
								className="text-xs font-extrabold text-fuchsia-400 py-2"
								htmlFor="content"
							>
								Paste image here:
							</label>
							<div
								id="content"
								className="h-28 max-w-3xl mb-8 mt-0 p-4 border border-fuchsia-500 shadow-lg outline-none overflow-y-scroll"
								contentEditable={true}
								ref={editableDiv}
							></div>
						</div>

						{isConverting ? (
							<ProgressBar progress={convertingProgress} />
						) : (
							!ocrText && <Button onclick={handleConvert} text="CONVERT" />
						)}

						{ocrText?.result && (
							<>
								<div className="flex flex-row justify-between items-center">
									<label
										className="text-md font-extrabold text-fuchsia-400 pt-2"
										htmlFor="content"
									>
										Result:
									</label>
									<div className="flex flex-row gap-4">
										<Tooltip tooltipText="Copy to clipboard">
											<div
												onClick={copyToClipboard}
												className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300 transition-all duration-100 p-2 rounded-lg shadow-md cursor-pointer"
											>
												<span className="text-gray-800 dark:text-gray-200">
													<IoMdCopy />
												</span>
											</div>
										</Tooltip>
										<Tooltip tooltipText="Translate text">
											<div
												onClick={openTextInTranslator}
												className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300 transition-all duration-100 p-2 rounded-lg shadow-md cursor-pointer"
											>
												<span className="text-gray-800 dark:text-gray-200">
													<MdOutlineTranslate />
												</span>
											</div>
										</Tooltip>
									</div>
								</div>
								<div className="max-w-3xl my-4 p-2 border border-fuchsia-500 shadow-lg outline-none relative">
									<span className="font-medium text-lg text-black dark:text-white">
										{ocrText.result}
									</span>
								</div>
								<Button onclick={handleReset} text="START OVER" />
							</>
						)}
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}

export default App;
