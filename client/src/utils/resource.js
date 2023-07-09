import { toast } from "react-toastify";

export async function handleLogin(username, password, navigate) {
	try {
		const request = await fetch("/user/login", {
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
            console.log('Got the token: ', data.data)
            localStorage.setItem('token', data.data)
			//localStorage.setItem("_id", data.data._id);
			//localStorage.setItem("_myEmail", data.data._email);
			navigate("/home");
		}
	} catch (err) {
		console.error(err);
        toast.error("Login failed");
	}
}
export async function handleRegister(email, username, password, navigate) {
    try {
        const request = await fetch("/user/register", {
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

/*export async function handleRegister(email, username, password, navigate) {

        const request = await fetch("/api/register'", {
            method: "POST",
            body: JSON.stringify({
                email,
                username,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await request.json();
        if (data.status === 'ok') {
            window.prompt('Success')
            navigate('/')
        } else {
            window.prompt(data.error)
        }
};*/

