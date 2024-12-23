import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AnalyticsFilters = ({
  dateRange,
  setDateRange,
  categoryFilter,
  setCategoryFilter,
  timeFrame,
  setTimeFrame,
  categories,
  onExport
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={dateRange.start}
            onChange={(newValue) => {
              setDateRange(prev => ({ ...prev, start: newValue }));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={dateRange.end}
            onChange={(newValue) => {
              setDateRange(prev => ({ ...prev, end: newValue }));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Frame</InputLabel>
          <Select
            value={timeFrame}
            label="Time Frame"
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title="Export Data">
          <IconButton onClick={onExport} color="primary">
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default AnalyticsFilters;
