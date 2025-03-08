import { useFormStatus } from 'react-dom';

export default function LogInForm() {
  const SubmitButton = () => {
    // (?) weird that useFormStatus's 'method' value return the value of the <form/> element, whose method prop is being overriden when action is a function. Meaning `method` always return 'get'
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    );
  };
  const submitHandler = (formData: FormData) => {
    const convertFormDatatoJSON = (
      formData: FormData,
    ): Record<string, string> => {
      // Source: https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
      // convert to JSON in order to use with `new URLSearchParams()`
      const formDataJSON: Record<string, string> = {};
      for (const [key, value] of formData.entries()) {
        // hard code .toString() with assumption this form only have text inputs
        formDataJSON[key] = value.toString();
      }
      return formDataJSON;
    };

    fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(convertFormDatatoJSON(formData)),
    });
  };

  return (
    <form action={submitHandler}>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Password:
        <input type="text" name="password" />
      </label>
      <label>
        First Name:
        <input type="text" name="firstName" />
      </label>
      <SubmitButton />
    </form>
  );
}
