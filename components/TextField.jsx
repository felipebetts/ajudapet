import { Input, withStyles, TextField as MuiTextField } from "@material-ui/core";
import { DonationForm, Flex } from "./Containers";

const CustomTextField = withStyles({
  root: {
    '& .MuiInput-input': {
      fontFamily: "Roboto Mono",
      color: "#45ffb3",
      borderBottomColor: '#45ffb3',
      fontSize: "2rem",
      textAlign: "center",
    },
    '& label.Mui-focused': {
      color: '#45ffb3',
    },
    '& .MuiInput-underline:before': {
      //   borderBottomColor: '#45ffb3',
      borderBottom: "#242424",
    },
    '& .MuiInput-underline:hover': {
      //   borderBottomColor: '#45ffb3',
      borderBottomColor: "#33c588",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#45ffb3',
    },
    '& .MuiInputLabel-root': {
      color: "#45ffb3",
      fontFamily: "Roboto Mono",
    },
    '& .MuiOutlinedInput-root': {
      color: "#eee",
      '& fieldset': {
        borderColor: '#45ffb3',
      },
      '&:hover fieldset': {
        borderColor: "#33c588",
      },
      '&.Mui-focused fieldset': {
        border: " 1px solid #45ffb3",
      },
    },
  },
})(MuiTextField)

const TextField = ({
  value,
  onChange,
  type,
  label,
  variant,
  donation,
  fieldWidth,
  fullWidth,
  id = "custom-text-field",
  name
}) => {

  if (!donation) {
    return (
      <Flex margin="20px 10px">
        <CustomTextField
          value={value}
          id={id}
          name={name}
          onChange={e => onChange(e)}
          type={type}
          label={label}
          variant={variant}
          style={{ width: fieldWidth }}
          fullWidth={fullWidth}
        />
      </Flex>
    )
  }

  return (
    <Flex>
      <DonationForm>
      <label style={{ fontSize: "1.3rem"}}>R$</label>
        <CustomTextField
          value={value}
          id={id}
          onChange={e => onChange(e)}
          type={type}
          label={label}
          variant={variant}
          style={{ width: fieldWidth }}
        />
      </DonationForm>
        <label htmlFor={id} style={{ cursor: "pointer" }}>Editar</label>
    </Flex>
  )
}

export default TextField