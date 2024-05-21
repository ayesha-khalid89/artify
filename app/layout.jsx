import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "artify",
  description: "Discover and share art",
};
const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
