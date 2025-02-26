import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

export const RoutesConfig = () => {
    return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<p>Home</p>} />
      <Route path="*"  element={<Navigate to="/"/>}/>
    </Routes>
  </BrowserRouter>
    )
}
