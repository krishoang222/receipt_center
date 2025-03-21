// Source: https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js

export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ email, password }),
  });

  const data = await res.json();
  return data;
}

export async function signup({
  email,
  password,
  firstName,
}: {
  email: string;
  password: string;
  firstName: string;
}) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ email, password, firstName }),
  });

  const data = await res.json();
  return data;
}

type UploadBillImageParams = {
  formData: FormData;
  accessToken: string;
};

export async function uploadBillImage({
  formData,
  accessToken,
}: UploadBillImageParams) {
  const res = await fetch('/api/bills/upload', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data;
}
