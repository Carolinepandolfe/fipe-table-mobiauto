import { useContext } from "react";

import { FormContext } from "context/FormContext";

const useContextForm = () => {
	const contexts = useContext(FormContext);
	return contexts;
};

export default useContextForm;
