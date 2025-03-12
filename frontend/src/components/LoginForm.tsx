import { ReactElement, useActionState } from 'react';
import { login } from '../api';

export default function LoginForm(): ReactElement {
  const [message, action, isPending] = useActionState(
    submitHandler,
    'Waiting for log in',
  );

  async function submitHandler(_: any, formData: FormData) {
    // TODO: do I need to add `user server` here? why?
    const email = formData.get('email');
    const password = formData.get('password');

    // only allow formData with string values (not File)
    if (typeof email !== 'string' || typeof password !== 'string')
      throw new Error('Form only accepts string');

    // TODO: add boundary for component when fetch error
    const data = await login({ email, password });

    // (for test purpose) add noticeable 1s pause
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return data;
  }

  return (
    <form action={action}>
      <div>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
      </div>
      <p>{message}</p>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
