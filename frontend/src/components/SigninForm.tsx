import { useActionState } from 'react';
import { signin } from '../api';
import { useAuth } from '../context/authContext';

export function SigninForm() {
  const { action: authAction } = useAuth();

  const [message, action, isPending] = useActionState(
    submitHandler,
    "Let's log in",
  );

  async function submitHandler(_: any, formData: FormData) {
    // TODO: do I need to add `user server` here? why?
    const email = formData.get('email');
    const password = formData.get('password');

    // only allow formData with string values (not File)
    if (typeof email !== 'string' || typeof password !== 'string')
      throw new Error('Form only accepts string');

    const data = await signin({ email, password });
    const { accessToken } = data;

    if (!!accessToken) {
      authAction.setAccessToken_(accessToken);
      return 'Login Sucessfully';
    } else {
      console.error({ data });
      return 'Login Failed';
    }
  }

  return (
    <form action={action} className="flex flex-col gap-4 w-[40vw] m-auto">
      <div className="flex flex-col gap-2 ">
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
