import type { Metadata } from "next";
import {AuthProvider} from '@/contexts/AuthContext';

export const metadata: Metadata = {
	title: "Lucia example"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
		<body>
			<AuthProvider>{children}</AuthProvider>
		</body>
		</html>
	);
}
