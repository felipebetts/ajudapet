import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const ColorButton = withStyles(() => ({
    root: {
      color: "#070707",
      backgroundColor: "#45ffb3",
      '&:hover': {
        backgroundColor: "#45ffb3",
        backgroundColor: "#33c588",
      },
      font: "inherit",
      fontWeight: 700,
      margin: "0.3rem",
      width: "100px"
    },
    outlined: {
      color: "#45ffb3",
      backgroundColor: "inherit",
      '&:hover': {
        // backgroundColor: "#33c588",
        color: "#070707",
        fontWeight: 600,
      },
      '&:active': {
        backgroundColor: "#45ffb3",
      },
      border: "solid 1px #45ffb3",
      fontWeight: 500,
    },
    fullWidth: {
        width: "100%"
    },
  }))(MuiButton);

const CustomButton = ({ children, onClick, fullWidth, isLoading = false, variant = "outlined", type = "button", width, size = "large" }) => {

    return (
      <ColorButton 
        size={size}
        fullWidth={fullWidth}
        variant={variant}
        onClick={onClick}
        type={type}
        style={{ width }}
      >
        { isLoading ? <CircularProgress color="inherit" size={21} /> : children}
      </ColorButton>
    ) 
}

export default CustomButton