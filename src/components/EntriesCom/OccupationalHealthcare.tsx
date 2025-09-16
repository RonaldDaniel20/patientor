import { SickLeave } from "../../types";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

interface Props  {
    employerName: string;
    sickLeave?: SickLeave;
}
const OccupationalHealthcare = ({employerName, sickLeave}: Props) => { 
    return (
        <div>
            <div>
                <ContactEmergencyIcon style={{color: 'green'}}/>  Occupational Healthcare
            </div> 
            <p><strong>Employer Name: </strong> {employerName}</p>
            {sickLeave  ? (
                <p><strong>Sick Leave: </strong> {sickLeave.startDate} - {sickLeave.endDate}</p>
            ): null}
        </div>
    )
}

export default OccupationalHealthcare;