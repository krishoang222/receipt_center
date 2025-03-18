import { useActionState } from 'react';
import { signup } from '../api';

export function SignupForm() {
  const [message, action, isPending] = useActionState(
    submitHandler,
    "Let's sign up",
  );

  async function submitHandler(_: any, formData: FormData) {
    // TODO: do I need to add `user server` here? why?
    const email = formData.get('email');
    const password = formData.get('password');
    const firstName = formData.get('firstName');

    // only allow formData with string values (not File)
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof firstName !== 'string'
    )
      throw new Error('Form only accepts string');

    const data = await signup({ email, password, firstName });
    // (temp) use email to validate request success
    const { email: res_email } = data;

    if (!!res_email) {
      return 'Sign Up Successfully';
    } else {
      console.error({ data });
      return 'Sign Up Failed';
    }
  }

  return (
    <form action={action} className="flex flex-col gap-4 w-[40vw] m-auto">
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            required
            className="bg-gray-50 border-gray-300 text-black"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            className="bg-gray-50 border-gray-300 text-black"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required
            className="bg-gray-50 border-gray-300 text-black "
          />
        </div>
      </div>
      <p>{message}</p>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
