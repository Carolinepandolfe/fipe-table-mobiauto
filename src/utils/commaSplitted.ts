export const commaSplitted = (value: string) => {
	const splitted = value?.split(",", 1)[0].split(" ");
	return splitted;
};
