
import './App.css'
import { RoutesConfig } from './routes'
import { ThemeProvider } from "@emotion/react"
import { LightTheme } from "./shared/themes"
function App() {
  

  return (
    <>
      <ThemeProvider theme={LightTheme}>
        <RoutesConfig/>
      </ThemeProvider>
    </>
  )
}

export default App
