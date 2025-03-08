export default function LogInForm() {

    const formHandler = (formData: FormData) => {
        for (const i of formData.entries()) {
            console.log(i)
        }
    }

    return <form action={'/api/auth/signin'} method="post">
        <label >
            Email:
            <input type="email" name="email" />
        </label>
        <label >
            Password:
            <input type="text" name="password" />
        </label>
        <label >
            First Name:
            <input type="text" name="firstName" />
        </label>
        <button type="submit">Submit</button>
    </form>
}

