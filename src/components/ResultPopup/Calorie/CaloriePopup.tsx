import React from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface CaloriePopupProps {
  setShowCaloriePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CaloriePopup: React.FC<CaloriePopupProps> = ({ setShowCaloriePopup }) => {
  const color = '#03c9bf';

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button
          className='close'
          onClick={() => {
            setShowCaloriePopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <TextField
          id="date-picker"
          label="Choose Date"
          type="date"
          defaultValue={dayjs(selectedDate || undefined).format('YYYY-MM-DD')}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField id="outlined-basic" label="Food item name" variant="outlined" color="warning" />
        <TextField id="outlined-basic" label="Food item amount (in gms)" variant="outlined" color="warning" />
        <div className='timebox'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
        <Button variant="contained" >
          Save
        </Button>
        <div className='hrline'></div>
        <div className='items'>
          <div className='item'>
            <h3>Apple</h3>
            <h3>100 gms</h3>
            <button> <AiFillDelete /></button>
          </div>
          <div className='item'>
            <h3>Banana</h3>
            <h3>200 gms</h3>
            <button> <AiFillDelete /></button>
          </div>
          <div className='item'>
            <h3>Rice</h3>
            <h3>300 gms</h3>
            <button> <AiFillDelete /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriePopup;