import {  TextField, 
          InputLabel, 
          MenuItem, 
          Select, 
          SelectChangeEvent, 
          FormControl } from '@mui/material';

import { 
         HealthCheckRating, 
        } from "../../types";

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

interface RatingOption{
    value: HealthCheckRating;
    label: string;
}

// 1) Fuera de ModalEntries.tsx (o al menos fuera de la función principal)
interface FormDetailsProps { 
  type: EntryType;
  healthCheckRating: HealthCheckRating;
  onRatingChange: (e: SelectChangeEvent<number>) => void;
  sickDate: string;
  onSickDateChange: (v: string) => void;
  criteria: string;
  onCriteriaChange: (v: string) => void;
  employerName: string;
  onEmployerNameChange: (v: string) => void;
  startDate: string;
  onStartDateChange: (v: string) => void;
  endDate: string;
  onEndDateChange: (v: string) => void;
}

const ratingOptions: RatingOption[] = Object
    .values(HealthCheckRating)
    .filter((v): v is HealthCheckRating => typeof v === "number")
    .map(v => ({
        value: v,
        label: v.toString()
    }))


const FormDetailsTypes: React.FC<FormDetailsProps> = ({
  type,
  healthCheckRating,
  onRatingChange,
  sickDate,
  onSickDateChange,
  criteria,
  onCriteriaChange,
  employerName,
  onEmployerNameChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange
}) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="healthcheck-label">Rating</InputLabel>
          <Select
            labelId="healthcheck-label"
            id="healthcheck-select"
            value={healthCheckRating}
            onChange={onRatingChange}
            label="Rating"
          >
            {ratingOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case 'Hospital':
      return (
        <>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={sickDate}
            onChange={e => onSickDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="Criteria"
            fullWidth
            value={criteria}
            onChange={e => onCriteriaChange(e.target.value)}
            margin="normal"
          />
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <TextField
            label="Employer"
            fullWidth
            value={employerName}
            onChange={e => onEmployerNameChange(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={e => onStartDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={e => onEndDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </>
      );
    default:
      return null;
  }
};

export default FormDetailsTypes;  
