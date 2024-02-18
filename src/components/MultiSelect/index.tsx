import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props{
    validate:boolean,
    categories:string[],
    category:string[],
    label:string,
    handleChange: (event: SelectChangeEvent<string[]>) => void;
}

const MultiSelect = ({validate, categories,label,category,handleChange}:Props) => {
  const theme = useTheme();

  return (
    <FormControl sx={{ width: "100%"}} error={category.length === 0 && validate}>
      <InputLabel id="category-label">{label}</InputLabel>
      <Select
        labelId="category-label"
        id="multiple-category"
        multiple
        value={category}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {categories.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, category, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
