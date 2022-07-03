import React, { useEffect, useReducer, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { motion } from "framer-motion";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineTranslate } from "react-icons/md";

import Header from "components/molecules/Header";
import Footer from "components/molecules/Footer";
import SlideOver from "components/molecules/SlideOver";

import ProgressBar from "components/atoms/ProgressBar";
import Button from "components/atoms/Button";
import Tooltip from "components/atoms/Tooltip";

import { makeRequest, handleClipboard, handleTranslator } from "../utils";

import { mainChildrenVariants, mainSection } from "../components/animationsVariants";
import type { StateType, ActionType, APIResponse } from "../types";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNotification } from "src/hooks/useNotification";

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
			return { isConverting: false, convertingProgress: 0, ocrText: undefined };
		default:
			return state;
	}
}

const ImageConverterPage: React.FC = () => {
	const initialState = {
		isConverting: false,
		convertingProgress: 0,
		ocrText: undefined
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const intervalID = useRef() as React.MutableRefObject<number | undefined>;
	const editableDiv = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;

	const { ocrText, isConverting, convertingProgress } = state;
	const { pushNotification } = useNotification();
	const [history, setHistory] = useLocalStorage("history", "");

	const handleConvert = () => {
		if (!editableDiv.current!.hasChildNodes()) {
			pushNotification("There is no picture in the zone!", "danger");
			return;
		}
		const imageReference = editableDiv.current!.children[0] as HTMLImageElement;
		if (!imageReference || !imageReference.src) {
			pushNotification("Content to convert is invalid. Change it!", "danger");
			return;
		}
		dispatch({ type: "request" });

		makeRequest({ imageUrl: imageReference.src }, (error: unknown) =>
			pushNotification(`Internal server error, message: ${error}`, "error")
		)
			.then((data: APIResponse) => {
				pushNotification("The photo was converted correctly!", "success");
				//TODO: move this function outside
				setHistory((previousState) => [
					JSON.stringify({ ...data, date: new Date(Date.now()), id: uuid() }),
					...previousState
				]);
				dispatch({ type: "success", result: data! });
			})
			.catch((error: unknown) =>
				pushNotification(`Something went wrong, error message: ${error}`, "error")
			);
	};

	const handleReset = () => {
		if (intervalID.current !== null) clearInterval(intervalID.current);
		if (editableDiv.current!.hasChildNodes()) {
			for (const child of editableDiv.current!.children) {
				child.remove();
			}
		}
		dispatch({ type: "reset" });
	};

	const copyToClipboard = () =>
		handleClipboard(ocrText!.result, () =>
			pushNotification("The result was not copied to the clipboard. Error occured.", "danger")
		)
			.then(() => {
				pushNotification("The text was successfully copied to the clipboard!", "success");
			})
			.catch(() => {
				pushNotification("Something went wrong while copying the result!", "error");
			});

	const openTextInTranslator = () =>
		handleTranslator(ocrText!.result, () =>
			pushNotification("The result text is not converted yet!", "danger")
		);

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

	const [open, setOpen] = useState(false);

	return (
		<main className="relative overflow-x-hidden bg-white font-mono dark:bg-gray-800">
			<SlideOver open={open} setOpen={setOpen} history={history} />
			<Header />
			<motion.div
				variants={mainSection}
				initial="hidden"
				animate="show"
				exit="exit"
				className="relative z-20 flex items-center"
			>
				<div className="container relative mx-auto flex flex-col items-center justify-between px-6 py-4">
					<div className="flex flex-col">
						<motion.h2
							variants={mainChildrenVariants}
							className="mx-auto max-w-3xl py-2 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-3xl"
						>
							<span className="text-fuchsia-400">MY-OCR-FRIEND</span> is a web app allowing you to
							convert image into text.
							<br />
							<span className="text-fuchsia-300">Try it out, just paste image!</span>
						</motion.h2>
						<motion.div variants={mainChildrenVariants}>
							<p className="my-8 text-center text-lg font-medium dark:text-white">
								Your image needs to be on your&#x27;s clipboard!
							</p>
							<p className="-mt-8 text-center text-sm font-extralight dark:text-white">
								The written text should be in English.
							</p>
						</motion.div>
						<motion.div variants={mainChildrenVariants} className="my-8">
							<label className="py-2 text-xs font-extrabold text-fuchsia-400" htmlFor="content">
								Paste image here:
							</label>
							<div
								id="content"
								className="mb-8 mt-0 h-28 max-w-3xl overflow-y-scroll border border-fuchsia-500 p-4 shadow-lg outline-none"
								contentEditable={true}
								ref={editableDiv}
							></div>
						</motion.div>

						{isConverting ? (
							<ProgressBar progress={convertingProgress} />
						) : (
							!ocrText && (
								<motion.div variants={mainChildrenVariants}>
									<Button onclick={handleConvert} text="CONVERT" />
								</motion.div>
							)
						)}

						{ocrText?.result && (
							<motion.div variants={mainChildrenVariants}>
								<div className="flex flex-row items-center justify-between">
									<label className="text-md pt-2 font-extrabold text-fuchsia-400" htmlFor="content">
										Result:
									</label>
									<div className="flex flex-row gap-4">
										<Tooltip tooltipText="Copy to clipboard">
											<div
												onClick={copyToClipboard}
												className="cursor-pointer rounded-lg bg-gray-200 p-2 shadow-md transition-all duration-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
											>
												<span className="text-gray-800 dark:text-gray-200">
													<IoMdCopy />
												</span>
											</div>
										</Tooltip>
										<Tooltip tooltipText="Translate text">
											<div
												onClick={openTextInTranslator}
												className="cursor-pointer rounded-lg bg-gray-200 p-2 shadow-md transition-all duration-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
											>
												<span className="text-gray-800 dark:text-gray-200">
													<MdOutlineTranslate />
												</span>
											</div>
										</Tooltip>
									</div>
								</div>
								<div className="relative my-4 max-w-3xl border border-fuchsia-500 p-2 shadow-lg outline-none">
									<span className="text-lg font-medium text-black dark:text-white">
										{ocrText.result}
									</span>
								</div>
								<Button onclick={handleReset} text="START OVER" />
							</motion.div>
						)}
					</div>
				</div>
			</motion.div>
			<Footer />
		</main>
	);
};

export default ImageConverterPage;
