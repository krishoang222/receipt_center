// Source: https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, password }),
    });

    const data = await res.json();

    if (!res.ok)
      throw new Error(
        JSON.stringify({
          status: res.status,
          json: data,
        }),
      );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
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
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email, password, firstName }),
    });

    const data = await res.json();

    if (!res.ok)
      throw new Error(
        JSON.stringify({
          status: res.status,
          json: data,
        }),
      );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
