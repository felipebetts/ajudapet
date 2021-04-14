import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  }))(Button);

const CustomButton = ({ children, onClick, current , donate, contained, fullWidth, isLoading }) => {

    if (current) {
        return (
            <ColorButton size="large" variant="contained">{ isLoading ? <CircularProgress color="inherit" size={21} /> : children}</ColorButton>
        )
    }

    if (donate) {
        return (
            <ColorButton size="large" fullWidth variant="contained" onClick={onClick}>{ isLoading ? <CircularProgress color="inherit" size={21} /> : children}</ColorButton>
        )
    }

    if (contained) {
      return <ColorButton size="large" variant="contained" onClick={onClick}>{ isLoading ? <CircularProgress color="inherit" size={21} /> : children}</ColorButton>
    }

    return (
        <ColorButton size="large" fullWidth={fullWidth} variant="outlined" onClick={onClick}>{ isLoading ? <CircularProgress color="inherit" size={21} /> : children}</ColorButton>
    )
}

export default CustomButton