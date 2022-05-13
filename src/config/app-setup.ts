import express, { Application } from "express";

export const appSetup = (app: Application): boolean => {
	if (!app) {
		return false;
	}

	try {
		app.use(express.json({ limit: "250mb" }));
		app.use(express.urlencoded({ limit: "250mb", extended: true }));

		return true;
	} catch {
		return false;
	}
};
