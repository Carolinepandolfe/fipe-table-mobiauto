import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import * as Styled from "styles/result/styles";
import { commaSplitted } from "utils/commaSplitted";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useContextForm from "../hook/useContextForm";

export default function Result() {
	const { value, clearField } = useContextForm();
	const navigate = useRouter();

	useEffect(() => {
		clearField();
		if (!value) {
			navigate.push("/");
		}
	}, [clearField]);

	return (
		<Container>
			<Grid
				container
				gap={2}
				flexDirection="column"
				alignItems="center"
				sx={{ mt: 10 }}
			>
				<Styled.Title>
					Tabela Fipe: Preço {value?.Marca} {value?.Modelo} {value?.AnoModelo}
				</Styled.Title>
				<Styled.Chip
					variant="filled"
					color="secondary"
					label={commaSplitted(value?.Valor ?? "")}
				/>
				<Styled.Text variant="caption">
					Este é o preço de compra do veículo
				</Styled.Text>
			</Grid>
		</Container>
	);
}
