import { EntryWithoutId, 
         HealthCheckRating, 
         Diagnosis} from "../../types";

import { useState, 
         SyntheticEvent } from "react";

import {  TextField, 
          InputLabel, 
          MenuItem, 
          Select, 
          Grid, 
          Button, 
          SelectChangeEvent, 
          FormControl } from '@mui/material';

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    Codes: Diagnosis['code'][];
}

/*interface RatingOption{
    value: HealthCheckRating;
    label: string;
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const ratingOptions: RatingOption[] = Object
    .values(HealthCheckRating)
    .filter((v): v is HealthCheckRating => typeof v === "number")
    .map(v => ({
        value: v,
        label: v.toString()
    }))*/

import FormDetailsTypes from "./FormDetailsTypes";

const ModalEntries = ({ onCancel, onSubmit, Codes }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [employerName, setEmployerName] = useState('');
    const [sickDate, setSickStartDate] = useState('');
    const [criteria, setCriteria] = useState('');
    const [startDate, setStarDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const typeOptions = ['HealthCheck', 'Hospital', 'OccupationalHealthcare'];

    const handleCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const value = event.target.value;
        setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
    }

    const handleTypesChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if(typeof event.target.value === "string"){
            const value = event.target.value;
            setType(value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare');
        }
    }

    const handleRatingChange = (event: SelectChangeEvent<number>) => {
        event.preventDefault();
        if(typeof event.target.value === "number"){
            const value = event.target.value;
            const rating = Object.values(HealthCheckRating).find(r => r === value);
            if (rating) {
                setHealthCheckRating(value);
            }
        }
    }

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        if(type === 'HealthCheck'){
            onSubmit({
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                healthCheckRating
            });
        }else if(type === 'Hospital'){
            onSubmit({
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                discharge: {
                    date: sickDate,
                    criteria
                }
            });
        }else if(type === 'OccupationalHealthcare'){
            const occupationnal = {
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                employerName
            }

            if(startDate.length > 0 && endDate.length > 0){
                onSubmit({
                    ...occupationnal,
                    sickLeave: {
                        startDate,
                        endDate
                    }
                })
            }else{
                onSubmit(occupationnal)
            }
        }
    }

    

    /*const FormDetailsTypes: React.FC<{ type: EntryType }> = ({ type }) => {
        switch (type) {
            case 'HealthCheck':
                return (
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel id='healthcheck-label'>Health Check Rating</InputLabel>
                        <Select
                          labelId='healthcheck-label'
                          id='healthcheck-select'
                          value={healthCheckRating}
                          onChange={handleRatingChange}
                        >
                            {ratingOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
            case 'Hospital':
                return ( 
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <TextField 
                            label="Start Date"
                            fullWidth
                            type="date"
                            value={sickDate}
                            onChange={({ target}) => setSickStartDate(target.value)}
                        />
                        <TextField 
                            label="Criteria"
                            fullWidth
                            value={criteria}
                            onChange={({ target}) => setCriteria(target.value)}
                        />
                    </FormControl>
                )
            case 'OccupationalHealthcare':
                return (
                    <FormControl fullWidth margin="normal" >
                        <TextField 
                            label="employerName"
                            fullWidth
                            value={employerName}
                            onChange={({ target}) => setEmployerName(target.value)}
                        />
                        <TextField 
                            label="start Date"
                            fullWidth
                            type="date"
                            value={startDate}
                            onChange={({ target}) => setStarDate(target.value)}
                        />
                        <TextField 
                            label="end Date"
                            fullWidth
                            type="date"
                            value={endDate}
                            onChange={({ target}) => setEndDate(target.value)}
                        />
                    </FormControl>
                )
        }
    }*/

    


    return (
        <div>
            <form onSubmit={addEntry}> 
                <TextField 
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target}) => setDescription(target.value)}
                />
                <TextField 
                    label="Date"
                    fullWidth
                    type="date"
                    value={date}
                    onChange={({ target}) => setDate(target.value)}
                />
                <TextField 
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target}) => setSpecialist(target.value)}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel id='diagnosis-label'>Diagnosis Codes</InputLabel>
                    <Select
                      labelId='diagnosis-label'
                      id='diagnosis-select'
                      multiple
                      value={diagnosisCodes}
                      onChange={handleCodesChange} 
                    >
                        {Codes.map((code) => (
                            <MenuItem key={code} value={code}>
                                {code}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel id='type-label'>Type</InputLabel>
                    <Select
                      labelId='type-label'
                      id='type-select'
                      value={type}
                      onChange={handleTypesChange}
                    >
                        {typeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormDetailsTypes
                    type={type}
                    healthCheckRating={healthCheckRating}
                    onRatingChange={handleRatingChange}
                    sickDate={sickDate}
                    onSickDateChange={setSickStartDate}
                    criteria={criteria}
                    onCriteriaChange={setCriteria}
                    employerName={employerName}
                    onEmployerNameChange={setEmployerName}
                    startDate={startDate}
                    onStartDateChange={setStarDate}
                    endDate={endDate}
                    onEndDateChange={setEndDate}
                />
                <Grid>
                    <Grid item>
                        <Button 
                            color="primary"
                            variant="contained" 
                            style={{ float: 'left'}}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            color="secondary"
                            variant="contained" 
                            style={{ float: 'right'}}
                            type="button"
                            onClick={onCancel}
                        >
                            cancel
                        </Button>
                    </Grid>
                    
                </Grid>
            </form>
        </div>
    ) 
}

export default ModalEntries;