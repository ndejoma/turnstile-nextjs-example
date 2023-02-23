# Cloudflare Turnstile Next.js Example

## Getting Started

-   ### Clone this this repository

    ```sh
      git clone -b main https://github.com/ndejoma/turnstile-nextjs-example
    ```
- Install all the dependencies and devDependencies and make sure your `NODE_ENV` is `development`, if not, the `devDependencies` will not be installed
    ```sh
        pnpm install
    ```

-   ### Run the development server:

    ```sh
      pnpm run dev
    ```

## Creating a new Turnstile Project
- Create a Cloudflare account [signup](https://dash.cloudflare.com/sign-up) if you don't have one

- Create a new Turnstile Project by [turnstil/add](https://dash.cloudflare.com/cd271685e78e47cb541a1951420378b5/turnstile/add)
![create-project](https://user-images.githubusercontent.com/97474001/220921501-60697816-aea5-4246-aca5-4160ceebbd67.png)


- Create  `.env.production.local` and `.env.development.local` file, then copy and paste the contents of the `.env.example` file into each of the file. Then add your `siteKey` and the `secretKey` from your dashboard into the `.env.production.local` and the `.env.development.local` file.

- `NOTE ` DO NOT add the script as it injected into `head` by `@marsidev/react-turnstile` package. Otherwise a warning will be thrown shown in your Browser console
