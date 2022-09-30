#Fight Game Frontend

## Getting Started

Install packages

```bash
yarn install
```

Run the development server:

```bash
yarn run dev
```

Open [https://localhost:3000](localhost:3000) with your browser to see the result.

## add on create a cert

```bash
openssl req -x509 -out ./certificates/localhost.crt -keyout ./certificates/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
