import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import theme from "styles/theme/default";
import GlobalStyle from "styles/theme/global";
import { FormContextProvider } from "context/FormContext";
import { queryClient } from "service/queryClient";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();
	const isHome = pathname === "/" ? theme.themeHome : theme.themeResult;

	return (
		<ThemeProvider theme={isHome}>
			<QueryClientProvider client={queryClient}>
				<FormContextProvider>
					<Component {...pageProps} />
				</FormContextProvider>
			</QueryClientProvider>
			<GlobalStyle />
			<CssBaseline />
		</ThemeProvider>
	);
}
