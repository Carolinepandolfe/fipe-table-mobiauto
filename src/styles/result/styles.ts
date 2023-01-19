import { Chip as ChipMui, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Title = styled(Typography)({
	fontSize: "30px",
	fontWeight: "bold",
	color: "#424242",
});

export const Chip = styled(ChipMui)({
	fontSize: "20px",
	fontWeight: "bold",
	height: "50px",
	borderRadius: "32px",
});

export const Text = styled(Typography)({
	fontSize: "15px",
	color: "#9099ae",
});
