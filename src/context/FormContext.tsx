import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "../service";

type FormContextProviderProps = {
	children: ReactNode;
};

type ResponseProps = {
	nome: string;
	codigo: string;
};

type Brands = ResponseProps;

type Models = {
	modelos: ResponseProps[];
};

type Years = ResponseProps;

type Value = {
	Valor: string;
	Marca: string;
	Modelo: string;
	AnoModelo: number;
	Combustivel: string;
	CodigoFipe: string;
	MesReferencia: string;
	TipoVeiculo: string;
	SiglaCombustivel: string;
};

type FormContextProps = {
	brands: Brands[] | undefined;
	models: Models | undefined;
	years: Years[] | undefined;
	value: Value | undefined;
	modelCode: string;
	isFilled: boolean;
	setBrandCode: Dispatch<SetStateAction<string>>;
	setModelCode: Dispatch<SetStateAction<string>>;
	setYearCode: Dispatch<SetStateAction<string>>;
	resultValue: () => void;
	clearField: () => void;
};

export const FormContext = createContext({} as FormContextProps);

export function FormContextProvider({ children }: FormContextProviderProps) {
	const [brandCode, setBrandCode] = useState("");
	const [modelCode, setModelCode] = useState("");
	const [yearCode, setYearCode] = useState("");
	const navigate = useRouter();

	const { data: brands } = useQuery<Brands[]>(["brands"], async () => {
		const response = await api.get("/carros/marcas");
		return response.data;
	});

	const { data: models, refetch: modelsRefetch } = useQuery<Models>(
		["models"],
		async () => {
			const response = await api.get(`/carros/marcas/${brandCode}/modelos`);
			return response.data;
		},
		{ enabled: false }
	);

	const { data: years, refetch: yearsRefetch } = useQuery<Years[]>(
		["years"],
		async () => {
			const response = await api.get(
				`/carros/marcas/${brandCode}/modelos/${modelCode}/anos`
			);
			return response.data;
		},
		{ enabled: false }
	);

	const { data: value, refetch: valueRefetch } = useQuery<Value>(
		["value"],
		async () => {
			const response = await api.get(
				`/carros/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
			);
			return response.data;
		},
		{ enabled: false }
	);

	const isFilled = !!brandCode && !!modelCode && !!yearCode;

	const resultValue = () => {
		valueRefetch();
		navigate.push("/resultado");
	};

	const clearField = useCallback(() => {
		setBrandCode("");
		setModelCode("");
		setYearCode("");
	}, []);

	useEffect(() => {
		if (brandCode) {
			modelsRefetch();
		}
		if (modelCode) {
			yearsRefetch();
		}
	}, [brandCode, modelCode, modelsRefetch, yearsRefetch]);

	return (
		<FormContext.Provider
			value={{
				brands,
				models,
				years,
				value,
				modelCode,
				isFilled,
				setBrandCode,
				setModelCode,
				setYearCode,
				resultValue,
				clearField,
			}}
		>
			{children}
		</FormContext.Provider>
	);
}
