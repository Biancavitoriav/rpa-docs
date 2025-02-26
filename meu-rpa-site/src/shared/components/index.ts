import { Route, Routes, Navigate } from "react-router"

export const RoutesConfig = () => {
    return(
        <Routes>
            <Route path="/" element={<p>llllllllllll</p>} />
            <Route path="*" element={<Navigate to="/"/>}/>

        </Routes>
    )
}