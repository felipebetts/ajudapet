import { Input, withStyles, TextField as MuiTextField } from "@material-ui/core";
import { useEffect } from "react";
import { DonationForm, Flex } from "./Containers";

const CustomTextField = withStyles({
  root: {
    background: "inherit",
    color: "#45ffb3",
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
    '&:-internal-autofill-selected': {
      background: "none"
    }
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
  name,
  payment,
  fontSize = "inherit"
}) => {

  // useEffect(() => {
  //   var min = 100, max = 300, pad_right = 0
  //   const input = document.getElementById(id);

  //   input.style.width = min+'px';
  //   input.onkeypress = input.onkeydown = input.onkeyup = function(){
  //       var input = this;
  //       setTimeout(function(){
  //           var tmp = document.createElement('div');
  //           tmp.style.padding = '0';
  //           if(getComputedStyle)
  //               tmp.style.cssText = getComputedStyle(input, null).cssText;
  //           if(input.currentStyle)
  //               tmp.style.cssText = input.currentStyle.cssText;
  //           tmp.style.width = '';
  //           tmp.style.position = 'absolute';
  //           tmp.innerHTML = input.value.replace(/&/g, "&amp;")
  //                                      .replace(/</g, "&lt;")
  //                                      .replace(/>/g, "&gt;")
  //                                      .replace(/"/g, "&quot;")
  //                                      .replace(/'/g, "&#039;")
  //                                      .replace(/ /g, '&nbsp;');
  //           input.parentNode.appendChild(tmp);
  //           var width = tmp.clientWidth+pad_right+1;
  //           tmp.parentNode.removeChild(tmp);
  //           if(min <= width && width <= max)
  //               input.style.width = width+'px';
  //       }, 1);
  //   }
  // }, [value])

  if (payment) {
    return (
      <Flex margin="20px 10px">
        <CustomTextField
          // value={value}
          id={id}
          name={name}
          // onChange={e => onChange(e)}
          type={type}
          label={label}
          variant={variant}
          style={{ width: fieldWidth, fontSize: fontSize }}
          fullWidth={fullWidth}
        />
      </Flex>
    )
  }
  if (donation) {
    return (
      <Flex
        alignItems="flex-start"
        width="100%"
      >
        <DonationForm>
          <label style={{ fontSize: "1.9rem" }}>R$</label>
          <CustomTextField
            value={value}
            id={id}
            onChange={e => onChange(e)}
            type={type}
            step="0.01"
            label={label}
            variant={variant}
            // inputProps={{ step: 0.01 }}
            // style={{ width: fieldWidth }}
          />
        </DonationForm>
        <label htmlFor={id} style={{ cursor: "pointer", fontSize: "0.8rem" }}>Editar</label>
      </Flex>
    )
  }

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

export default TextField