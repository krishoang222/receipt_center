import { useActionState } from 'react';
import { signin } from '../api';
import { useAuth } from '../context/authContext';
import { Button, Label, TextInput } from 'flowbite-react';

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
    <form action={action} className="w-[30vw] m-auto">
      <div className="flex flex-col gap-y-2 mb-4">
        <div>
          <Label htmlFor="email">Email:</Label>
          <TextInput type="email" name="email" id="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <TextInput type="password" name="password" id="password" required />
        </div>
      </div>
      <div className="flex flex-col">
        <pre className="text-center">Status: {message}</pre>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
