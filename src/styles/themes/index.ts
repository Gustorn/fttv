export interface ThemeProperties {
	[key: string]: string;

	"--app-background": string;
	"--app-text": string;
	"--app-accent": string;
	"--app-divider": string;

	"--balloon-background": string;
	"--balloon-border": string;
	"--balloon-text": string;

	"--button-background": string;
	"--button-background-lighter": string;
	"--button-shadow": string;

	"--navigation-bar-background": string;
	"--navigation-bar-text": string;

	"--viewer-text": string;
}

export interface Theme {
	name: string;
	properties: ThemeProperties;
}

export const themes = [
	"dark",
	"light"
];
