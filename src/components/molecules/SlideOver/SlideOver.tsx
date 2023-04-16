import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { SlideOverProps } from "./SlideOver.props";
import SliderEmptyState from "~/components/atoms/SliderEmptyState";
import SliderButton from "~/components/atoms/SliderButton";

const SlideOver: React.FC<SlideOverProps> = ({ open, setOpen, history }) => (
	<>
		<SliderButton setOpen={setOpen} text={"History"} />
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
									<div className="flex h-full flex-col overflow-y-scroll border-l-4 border-fuchsia-400 bg-white py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Converted text history
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-white text-gray-400 outline-none transition-colors duration-200 ease-in-out hover:text-fuchsia-400"
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
											{!history && <SliderEmptyState onClick={() => setOpen(false)} />}
											<ul className="divide-y divide-gray-200">
												{history &&
													history.map((his, index) => {
														const element: { result: string; date: string } = JSON.parse(his);
														//TODO: create separate component with SliderItem
														//TODO: add feature of "opening" history item to see full text, add button to delete item, copy and translate
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
	</>
);

export default SlideOver;
