import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "artify",
  description: "Discover and share art",
};
const layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
