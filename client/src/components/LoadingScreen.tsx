import { Backdrop, CircularProgress } from "@mui/material"

const LoadingScreen = ({ open }: { open: boolean }) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default LoadingScreen
