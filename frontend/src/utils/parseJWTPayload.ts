export function parseJWTPayload(jwt: string) {
  // Source: https://medium.com/@feldjesus/how-to-decode-a-jwt-token-175305335024
  const payload = jwt.split('.')[1];
  const parsedObject = JSON.parse(atob(payload));

  return parsedObject;
}
