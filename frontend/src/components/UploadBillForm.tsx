import { useActionState, useState } from 'react';
import { uploadBillImage } from '@/api';
import { useAuth } from '@/context/authContext';

export function UploadBillForm() {
  const { accessToken } = useAuth();
  const [previewImageURL, setPreviewImageURL] = useState('');
  const [message, action, isPending] = useActionState(
    submitHandler,
    "Let's upload bill (image)",
  );

  async function submitHandler(_: any, formData: FormData) {
    if (!accessToken) return 'Failed: User is unauthorised!';

    const data = await uploadBillImage({ formData, accessToken });
    console.log({ data });

    // TODO: handle when upload fail
    return 'Upload Bill Image Successfully';
  }

  function uploadPreviewImageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // Source: https://stackoverflow.com/a/14069481/14733188
    if (!e.target.files?.[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewImageURL(url);
  }

  return (
    <form action={action} className="w-[30vw] m-auto">
      <div className="flex flex-col gap-y-2 mb-4">
        <div>
          <label htmlFor="billImage">Bill:</label>
          <input
            type="file"
            name="billImage"
            id="billImage"
            required
            accept="image/png, image/jpeg"
            onChange={uploadPreviewImageHandler}
          />
        </div>
      </div>
      {previewImageURL ? (
        <img
          className="border-solid border-black border"
          src={previewImageURL}
        />
      ) : (
        ''
      )}
      <pre>Status: {message}</pre>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
