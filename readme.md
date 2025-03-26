# learn auth via jwt

## JWT/JWS Structure
a jwt consists of 3 parts: header, payload, and signature.

### Header  
The header is a JSON element that describes the type of token and the signature method used.  

| Field  | Name          | Meaning  |  
|--------|--------------|----------|  
| `typ`  | Type         | Describes the IANA media type of the token. This value is always JWT to indicate the media type `application/jwt`. |  
| `cty`  | Content Type | This field is needed if the JWT contains another JWT as its payload. In this case, it is set to `JWT`. Otherwise, this field should be omitted. |  
| `alg`  | Algorithm    | Describes the signature method used. Typically, HMAC with SHA-256 (`HS256`) or RSA with SHA-256 (`RS256`) is used. It is possible to use no signature (`none`), but this is not recommended. The possible values are standardized by JSON Web Encryption (JWE) according to [RFC 7516](https://datatracker.ietf.org/doc/html/rfc7516). |  

An example of a header looks as follows:  

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
The payload is a JSON element that describes the claims.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

reserved claims as per [IANA](https://www.iana.org/assignments/jwt/jwt.xhtml).

| Field  | Name           | Meaning  |  
|--------|---------------|----------|  
| `iss`  | Issuer        | The issuer of the token. |  
| `sub`  | Subject       | Defines the subject for which the claims apply. The `sub` field specifies for whom or what the claims are made. |  
| `aud`  | Audience      | The target domain for which the token was issued. |  
| `exp`  | Expiration Time | The expiration time of the token in Unix time, i.e., the number of seconds since `1970-01-01T00:00:00Z`. |  
| `nbf`  | Not Before    | The Unix time from which the token is valid. |  
| `iat`  | Issued At     | The Unix time when the token was issued. |  
| `jti`  | JWT ID        | A unique case-sensitive string that uniquely identifies the token. This helps prevent token replication. It can be a sequential number, a GUID, or a hash value. If the token recipient receives tokens from multiple issuers, the JWT ID might not be unique. By combining the issuer (`iss`) and JWT ID (`jti`), uniqueness can be ensured. ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) |  

 

### Signature
defined as per [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515).

created by hashing and encrypting the Base64-encoded header and payload, separated by a dot (`.`), using the specified hash method (e.g., SHA-256) and encryption (e.g., HMAC):

```javascript
var encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload);
var signature = HMACSHA256(encodedString, secret);
```

##

## how to run

prerequisites:

- [node.js 22.x](https://nodejs.org/en/download)
- [pnpm 9.x](https://pnpm.io/installation)

> [!TIP]
>
> you can use `pnpm` to install the required node.js version with `pnpm env use 22 --global`

set required environment variables in `.env.local`:

```bash
cp .env.local.example .env.local
```
