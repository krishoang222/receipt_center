import { useActionState } from 'react';
import { signup } from '../api';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

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
    <form action={action} className="w-[30vw] m-auto">
      <div className="flex flex-col gap-y-2 mb-4">
        <div>
          <Label htmlFor="firstName">First Name:</Label>
          <Input type="text" name="firstName" id="firstName" required />
        </div>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" name="email" id="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input type="password" name="password" id="password" required />
        </div>
      </div>
      <pre>Status: {message}</pre>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
