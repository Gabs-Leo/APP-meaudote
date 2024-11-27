import { CircularProgress } from "@mui/material"

export const Loading = () => {
    return (<>
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
            <CircularProgress color="success" />
        </div>
    </>)
}