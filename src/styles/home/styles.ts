import { LoadingButton } from "@mui/lab";
import { CardContent as CardContentMui, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Title = styled(Typography)({
	fontSize: "30px",
	fontWeight: "bold",
	color: "#424242",
});

export const Subtitle = styled(Typography)({
	fontSize: "20px",
	fontWeight: 600,
	color: "#424242",
});

export const CardContent = styled(CardContentMui)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const Button = styled(LoadingButton)({
	width: "200px",
	alignSelf: "center",
});
