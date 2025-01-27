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

const formatDateForInput = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

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
        <TextField
          label="Start Date"
          type="date"
          value={formatDateForInput(dateRange.start)}
          onChange={(e) => {
            setDateRange(prev => ({ ...prev, start: new Date(e.target.value) }));
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={formatDateForInput(dateRange.end)}
          onChange={(e) => {
            setDateRange(prev => ({ ...prev, end: new Date(e.target.value) }));
          }}
          InputLabelProps={{ shrink: true }}
        />
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
