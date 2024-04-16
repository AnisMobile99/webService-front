export const dateParser = (seconds: number) => {
	return new Date(seconds * 1000).toLocaleDateString("FR-fr");
};
