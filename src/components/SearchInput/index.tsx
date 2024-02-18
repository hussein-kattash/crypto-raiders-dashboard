import { Box, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  onSearch: (searchText: string) => void;
}

const SeachInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <Box
       
      style={{width:'80%'}}
    >
      <TextField
        sx={{width:'100%'}}
        ref={ref}
        label="بحث"
        variant="outlined"
        placeholder="ابحث عن المقالة التي تريدها"
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SeachInput;
