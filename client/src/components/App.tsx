import { Fragment, useEffect, useReducer, useRef, useState } from "react";

import { motion } from "framer-motion";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineTranslate } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

import { Footer, Header } from "./page";
import { useToast } from "../context/ToastContext";
import { Button, ProgressBar, Tooltip } from "./shared";
import { makeRequest, handleClipboard, handleTranslator } from "../utils";

import { mainChildrenVariants, mainSection } from "./app.animations";
import type { StateType, ActionType, APIResponse } from "../types";

import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { useLocalStorage } from "./hooks/useLocalStorage";

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

		makeRequest({ imageUrl: imageRef.src }, (error: unknown) =>
			addToast(`Internal server error, message: ${error}`, "error")
		)
			.then((data: APIResponse | void) => {
				addToast("The photo was converted correctly!", "success");
				dispatch({ type: "success", result: data! });
			})
			.catch((err: unknown) =>
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

	const copyToClipboard = () =>
		handleClipboard(ocrText!.result, () =>
			addToast(
				"The result was not copied to the clipboard. Error occured.",
				"danger"
			)
		)
			.then(() => {
				addToast(
					"The text was successfully copied to the clipboard!",
					"success"
				);
			})
			.catch(() => {
				addToast("Something went wrong while copying the result!", "error");
			});

	const openTextInTranslator = () =>
		handleTranslator(ocrText!.result, () =>
			addToast("The result text is not converted yet!", "danger")
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
		<main className="dark:bg-gray-800 font-mono bg-white relative overflow-x-hidden">
			<SlideButtonOpen setOpen={setOpen} />
			<SlideOver open={open} setOpen={setOpen} />
			<Header />
			<motion.div
				variants={mainSection}
				initial="hidden"
				animate="show"
				exit="exit"
				className="flex relative z-20 items-center"
			>
				<div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
					<div className="flex flex-col">
						<motion.h2
							variants={mainChildrenVariants}
							className="max-w-3xl text-2xl md:text-3xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2"
						>
							<span className="text-fuchsia-400">MY-OCR-FRIEND</span> is a web
							app allowing you to convert image into text.
							<br />
							<span className="text-fuchsia-300">
								Try it out, just paste image!
							</span>
						</motion.h2>
						<motion.div variants={mainChildrenVariants}>
							<p className="text-lg my-8 font-medium text-center dark:text-white">
								Your image needs to be on your&#x27;s clipboard!
							</p>
							<p className="text-sm -mt-8 font-extralight text-center dark:text-white">
								The written text should be in English.
							</p>
						</motion.div>
						<motion.div variants={mainChildrenVariants} className="my-8">
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
							</motion.div>
						)}
					</div>
				</div>
			</motion.div>
			<Footer />
		</main>
	);
}

export default App;

const SlideButtonOpen: React.FC<{
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
	return (
		<div className="absolute right-0 h-screen w-8 z-50 flex items-center justify-center">
			<div
				onClick={() => setOpen(true)}
				className="inline-block cursor-pointer"
			>
				<div className="h-8 w-full bg-fuchsia-400 relative">
					<div
						style={{
							borderBottomRightRadius: "100%"
						}}
						className="absolute top-0 left-0 w-8 h-8 dark:bg-gray-800 bg-white"
					></div>
				</div>
				<p
					className="transform cursor-pointer rotate-180 px-3 py-4 rounded-r-lg bg-fuchsia-400 dark:text-white text-gray-800 text-xs leading-3 font-sans font-semibold"
					style={{ writingMode: "vertical-rl" }}
				>
					History
				</p>
				<div className="h-8 w-full bg-fuchsia-400 relative">
					<div
						style={{
							borderTopRightRadius: "100%"
						}}
						className="absolute bottom-0 left-0 w-8 h-8 dark:bg-gray-800 bg-white"
					></div>
				</div>
			</div>
		</div>
	);
};

const SlideOver: React.FC<{
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
	const [history, setHistory] = useLocalStorage("history", "");

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Converted text history
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
														onClick={() => setOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<AiOutlineClose
															className="h-6 w-6"
															aria-hidden="true"
														/>
													</button>
												</div>
											</div>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6">
											{/* Replace with your content */}
											{!history && <SlideOverEmptyState />}
											{/* <div className="absolute inset-0 px-4 sm:px-6">
												<div
													className="h-full border-2 border-dashed border-gray-200"
													aria-hidden="true"
												/>
											</div> */}
											{/* /End replace */}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

const SlideOverEmptyState = () => {
	return (
		<div className="flex flex-col items-center sth-full text-center">
			<svg
				className="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					vectorEffect="non-scaling-stroke"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
				/>
			</svg>
			<h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
			<p className="mt-1 text-sm text-gray-500">
				Get started by creating a new project.
			</p>
			<div className="mt-6">
				<button
					type="button"
					className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<AiOutlinePlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
					New Project
				</button>
			</div>
		</div>
	);
};
