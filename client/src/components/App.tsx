import React, { Fragment, useEffect, useReducer, useRef, useState } from "react";

import { motion } from "framer-motion";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineTranslate } from "react-icons/md";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { Footer, Header } from "./page";
import { useToast } from "../context/ToastContext";
import { Button, ProgressBar, Tooltip } from "./shared";
import { makeRequest, handleClipboard, handleTranslator } from "../utils";

import { mainChildrenVariants, mainSection } from "./app.animations";
import type { StateType, ActionType, APIResponse } from "../types";

import { Dialog, Transition } from "@headlessui/react";
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
			return { isConverting: false, convertingProgress: 0, ocrText: undefined };
		default:
			return state;
	}
}

function App() {
	const initialState = {
		isConverting: false,
		convertingProgress: 0,
		ocrText: undefined
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const intervalID = useRef() as React.MutableRefObject<number | undefined>;
	const editableDiv = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;

	const { ocrText, isConverting, convertingProgress } = state;
	const { addToast } = useToast();
	const [history, setHistory] = useLocalStorage("history", "");

	const handleConvert = () => {
		if (!editableDiv.current!.hasChildNodes()) {
			addToast("There is no picture in the zone!", "danger");
			return;
		}
		const imageReference = editableDiv.current!.children[0] as HTMLImageElement;
		if (!imageReference || !imageReference.src) {
			addToast("Content to convert is invalid. Change it!", "danger");
			return;
		}
		dispatch({ type: "request" });

		makeRequest({ imageUrl: imageReference.src }, (error: unknown) =>
			addToast(`Internal server error, message: ${error}`, "error")
		)
			.then((data: APIResponse) => {
				addToast("The photo was converted correctly!", "success");
				setHistory((previousState) => [
					JSON.stringify({ ...data, date: new Date(Date.now()) }),
					...previousState
				]);
				dispatch({ type: "success", result: data! });
			})
			.catch((error: unknown) =>
				addToast(`Something went wrong, error message: ${error}`, "error")
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
			addToast("The result was not copied to the clipboard. Error occured.", "danger")
		)
			.then(() => {
				addToast("The text was successfully copied to the clipboard!", "success");
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
		<main className="relative overflow-x-hidden bg-white font-mono dark:bg-gray-800">
			<SlideButtonOpen setOpen={setOpen} />
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
}

export default App;

const SlideButtonOpen: React.FC<{
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
	return (
		<div className="absolute right-0 z-50 flex h-screen w-8 items-center justify-center">
			<div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
				<div className="relative h-8 w-full bg-fuchsia-400">
					<div
						style={{
							borderBottomRightRadius: "100%"
						}}
						className="absolute top-[-1px] left-[-1px] z-10 h-[34px] w-full border-0 bg-white dark:bg-gray-800"
					></div>
				</div>
				<p
					className="z-30 rotate-180 transform cursor-pointer rounded-r-lg bg-fuchsia-400 px-3 py-4 font-sans text-xs font-semibold leading-3 text-gray-800 dark:text-white"
					style={{ writingMode: "vertical-rl" }}
				>
					History
				</p>
				<div className="relative h-8 w-full bg-fuchsia-400">
					<div
						style={{
							borderTopRightRadius: "100%"
						}}
						className="absolute bottom-[-1px] left-[-1px] h-[34px] w-full bg-white dark:bg-gray-800"
					></div>
				</div>
			</div>
		</div>
	);
};

const SlideOver: React.FC<{
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	history: Array<string>;
}> = ({ open, setOpen, history }) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50 font-sans" onClose={setOpen}>
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
														className="rounded-md bg-white text-gray-400 outline-none hover:text-gray-500"
														onClick={() => setOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<AiOutlineClose className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6">
											{/* Replace with your content */}
											{!history && <SlideOverEmptyState />}
											<ul className="divide-y divide-gray-200">
												{history &&
													history.map((his, index) => {
														const element: { result: string; date: string } = JSON.parse(his);

														return (
															<li key={index} className="py-4">
																<time
																	dateTime={element.date}
																	className="block whitespace-nowrap text-right text-sm text-gray-500"
																>
																	{new Date(element.date).toLocaleDateString()}
																</time>
																<div className="mt-1">
																	<p className="text-sm text-gray-600 line-clamp-2">
																		{element.result}
																	</p>
																</div>
															</li>
														);
													})}
											</ul>
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
};
