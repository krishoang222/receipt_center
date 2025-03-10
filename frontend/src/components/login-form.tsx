import { useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';

export default function LogInForm() {
  const [_, action] = useActionState(submitHandler, null);

  function submitHandler(_: any, formData: FormData) {
    // only allow formData with string values (not File)
    if (!Array.from(formData).every(([_, value]) => typeof value === 'string'))
      throw new Error('Form only accepts string');

    fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      // TODO: not know why TypeScript not catch the new type of formData after adding the guard clause (to only allow string values)
      body: new URLSearchParams(formData),
    });
  }

  const SubmitButton = () => {
    // TODO: move SubmitButton to its own component to make use of useFormStatus()
    // (?) weird that useFormStatus's 'method' value return the value of the <form/> element, whose method prop is being overriden when action is a function. Meaning `method` always return 'get'
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    );
  };
  return (
    <form action={action}>
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
