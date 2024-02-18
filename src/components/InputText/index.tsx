import { FormControl, InputLabel, OutlinedInput } from "@mui/material"

interface Props{
    validate?:boolean,
    value: string,
    label:string,
    dir:string,
    handleChange:(e:any)=>void
}

const InputText = ({validate=false, value, label, handleChange,dir}:Props) => {
  return (
    <FormControl error={!value && validate} sx={{direction:dir}}>
          <InputLabel  htmlFor="title">{label}</InputLabel>
          <OutlinedInput
            value={value}
            onChange={handleChange}
            id="title"
            label={label} 
          />
    </FormControl>
  )
}

export default InputText