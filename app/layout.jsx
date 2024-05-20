import "@styles/globals.css"

export const metadata={
    title:"artify",
    description: "Discover and share art"
}
const layout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <main>
                {children}
            </main>
        </body>
    </html>
  )
}

export default layout