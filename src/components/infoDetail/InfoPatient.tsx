import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Diagnosis, Patient } from '../../types';
import perfilUsuario from '../../images/Perfil-de-usuario.png'
import { useState, useEffect } from 'react';
import axios from 'axios';

import diagnosisService from '../../services/diagnosis';
import patientsService from '../../services/patients';
import HealthCheck from '../EntriesCom/HealthCheck\'';
import Hospital from '../EntriesCom/Hospital';
import OccupationalHealthcare from '../EntriesCom/OccupationalHealthcare';
import { Entry, EntryWithoutId } from '../../types';

import AddEntryModal from './AddEntryModal';
import { Button } from '@mui/material';

interface infoPatient {
    patient: Patient
}

const InfoPatient = ({patient}: infoPatient ) => {

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entries, SetEntries] = useState<Entry[]>([]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

    useEffect(() => {
        try{
            const fetchDiagnosis = async () => {
                const dataDiagnosis = await diagnosisService.getDiagnosis();
                setDiagnosis(dataDiagnosis);
            }

            fetchDiagnosis();
            SetEntries(patient.entries);
        }catch(error){
            if(axios.isAxiosError(error)){
                console.error('Error message: ', error.message);
            }else{
                console.error('Unexpected error: ', error);
            }
        }
    }, []);



    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    }

    const submitNewEntry = async (value: EntryWithoutId) => {
        try{

            
            const newEntry = await patientsService.createEntry(value, patient.id);
            console.log(newEntry);
            SetEntries(entries.concat(newEntry))
            setModalOpen(false);


        }catch (e: unknown) {
              if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                  const message = e.response.data.replace('Something went wrong. Error: ', '');
                  console.error(message);
                  setError(message);
                } else {
                  setError("Unrecognized axios error");
                }
              } else {
                console.error("Unknown error", e);
                setError("Unknown error");
              }
            }
    }

    const RenderEntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type){
            case 'HealthCheck':
                return <HealthCheck Rating={entry.healthCheckRating} />;
            case 'Hospital':
                return <Hospital discharge={entry.discharge} />
            case 'OccupationalHealthcare':
                return <OccupationalHealthcare employerName={entry.employerName} sickLeave={entry.sickLeave} />
            default:
                return assertNever(entry);
        }
    }

    
    return (
        <Card sx={{maxWidth: 1000}}>
            <CardActionArea>
                <CardMedia component='img' sx={{height: 70}} title='Paciente' image = {perfilUsuario}/>
                <CardContent>
                    <Typography gutterBottom variant='subtitle1'>
                        <span style={{color:'tomato'}}>Nombre: </span>{patient.name}
                    </Typography>
                    <Typography gutterBottom variant='subtitle1'>
                        <span style={{color:'tomato'}}>sss: </span> {patient.ssn}
                    </Typography>
                    <Typography gutterBottom variant='subtitle1'>
                        <span style={{color:'tomato'}}>Ocupación: </span>{patient.occupation}
                    </Typography>
                    <Typography gutterBottom variant='subtitle1'>
                        <span style={{color:'tomato'}}>Genero: </span>{patient.gender}
                    </Typography>
                    <Typography gutterBottom variant='h5'> <strong>Entries</strong></Typography>
                    
                    <AddEntryModal 
                        modalOpen={modalOpen} 
                        onClose={closeModal} 
                        onSubmit={submitNewEntry} 
                        error={error} 
                        Codes={diagnosis.map(code => code.code)}
                    />
                    <Button variant="contained" style={{marginBottom: '20px'}} onClick={() => openModal()}>Add New Entry</Button>
                    
                    {entries.map((entry) => (
                        <div key={entry.id} style={{marginBottom: '20px', padding: '15px', border: '1px solid gray', borderRadius: '5px'}}>
                            <div key={entry.id}>
                                <span style={{color:'MediumSeaGreen', fontSize: '16px'}}>Description: </span> {entry.description}
                                <br />
                                <span style={{color:'MediumSeaGreen', fontSize: '16px'}}>Date: </span> {entry.date}
                                <br />
                                <span style={{color:'MediumSeaGreen', fontSize: '16px'}}>Specialist: </span> {entry.specialist}
                            </div>
                            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? <span style={{color:'MediumSeaGreen', fontSize: '16px'}}>Diagnosis Codes: </span> : null}
                            <ul>
                                {entry.diagnosisCodes?.map(code => {
                                    if(diagnosis && diagnosis.length > 0){
                                        return (
                                            <li key={code}>
                                                {code} {diagnosis?.find(d => d.code === code)?.name}
                                            </li>
                                        )
                                    }
                                    return null;
                                })}
                            </ul>
                            <RenderEntryDetails entry={entry} />
                        </div>
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default InfoPatient;


