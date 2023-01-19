import { Autocomplete, Card, Grid, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import useContextForm from "../hook/useContextForm";
import * as Styled from "../styles/home/styles";

export default function Home() {
	const {
		brands,
		models,
		years,
		modelCode,
		isFilled,
		resultValue,
		setBrandCode,
		setModelCode,
		setYearCode,
	} = useContextForm();

	return (
		<Container>
			<Grid
				container
				gap={2}
				flexDirection="column"
				alignItems="center"
				sx={{ mt: 10 }}
			>
				<Styled.Title variant="h4">Tabela Fipe</Styled.Title>
				<Styled.Subtitle variant="subtitle1">
					Consulte o valor de um veículo de forma gratuita
				</Styled.Subtitle>
				<Card sx={{ minWidth: 600 }}>
					<Styled.CardContent>
						<Box
							sx={{
								maxWidth: 500,
								width: "100%",
							}}
							component="form"
							display="flex"
							flexDirection="column"
							gap={3}
						>
							<Grid item lg={12} xs={12}>
								<Autocomplete
									disablePortal
									options={brands ?? []}
									disabled={!brands}
									getOptionLabel={(option) => option?.nome}
									noOptionsText="Selecione um marca válida"
									isOptionEqualToValue={(option, value) =>
										option?.nome === value?.nome
									}
									onChange={(_, value) => setBrandCode(value?.codigo ?? "")}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Marca"
											fullWidth
											size="small"
										/>
									)}
								/>
							</Grid>

							<Grid item lg={12} xs={12}>
								<Autocomplete
									disablePortal
									options={models?.modelos ?? []}
									disabled={!models?.modelos}
									getOptionLabel={(option) => option?.nome}
									noOptionsText="Selecione um modelo válido"
									isOptionEqualToValue={(option, value) =>
										option.nome === value.nome
									}
									onChange={(_, value) => setModelCode(value?.codigo ?? "")}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Modelo"
											fullWidth
											size="small"
										/>
									)}
								/>
							</Grid>

							{modelCode && (
								<Grid item lg={12} xs={12}>
									<Autocomplete
										disablePortal
										options={years ?? []}
										disabled={!years}
										getOptionLabel={(option) => option?.nome}
										noOptionsText="Selecione um ano válido"
										isOptionEqualToValue={(option, value) =>
											option.nome === value.nome
										}
										onChange={(_, value) => setYearCode(value?.codigo ?? "")}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Ano"
												fullWidth
												size="small"
											/>
										)}
									/>
								</Grid>
							)}

							<Styled.Button
								variant="contained"
								fullWidth
								type="button"
								key="validateButton"
								disabled={!isFilled}
								onClick={() => resultValue()}
							>
								Consultar preço
							</Styled.Button>
						</Box>
					</Styled.CardContent>
				</Card>
			</Grid>
		</Container>
	);
}
