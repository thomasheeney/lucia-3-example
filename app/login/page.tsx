import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import {LoginForm} from '@/components/LoginForm';

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/");
	}
	return (
		<>
			<h1>Sign in</h1>
			<LoginForm />
		</>
	);
}