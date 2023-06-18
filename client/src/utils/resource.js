import { toast } from "react-toastify";

export async function handleLogin(username, password, navigate) {
	try {
		const request = await fetch("http://localhost:3000/login", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const data = await request.json();
		if (data.error_message) {
			toast.error(data.error_message);
		} else {
			toast.success(data.message);
			localStorage.setItem("_id", data.data._id);
			localStorage.setItem("_myEmail", data.data._email);
			navigate("/home");
		}
	} catch (err) {
		console.error(err);
	}
}
export async function handleRegister(email, username, password, navigate) {
    try {
        const request = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                username,
                password,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const data = await request.json();
        if (data.error_message) {
            toast.error(data.error_message);
        } else {
            toast.success(data.message);
            navigate("/");
        }
    } catch (err) {
        console.error(err);
        toast.error("Account creation failed");
    }
};


