import "@styles/globals.css";
import Provider from "@components/Provider";
import Head from 'next/head';

export const metadata = {
  title: "artify",
  description: "Discover and share art",
};
const layout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
