import { useCallback, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ALLOWED_FORMATS } from "..";

type SelectFormatProps = {
  onFormatChange: (format: ALLOWED_FORMATS) => void;
  format: ALLOWED_FORMATS;
};
export default function SelectFormat({
  onFormatChange,
  format,
}: SelectFormatProps) {
  const handleChange = useCallback((event: SelectChangeEvent) => {
    onFormatChange(event.target.value as ALLOWED_FORMATS);
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-format">Format</InputLabel>
      <Select
        labelId="select-format"
        id="select-format"
        value={format}
        label="Format"
        onChange={handleChange}
      >
        <MenuItem value="mp3">MP3</MenuItem>
        <MenuItem value="mp4">MP4 (1080p)</MenuItem>
      </Select>
    </FormControl>
  );
}
