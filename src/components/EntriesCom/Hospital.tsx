import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Discharge } from '../../types';

interface Props {
    discharge: Discharge;
}

const Hospital = ({ discharge }: Props) => {
    return (
        <div>
            <div>
                <LocalHospitalIcon style={{color: 'green'}}/>  Hospital
            </div>
            <p><strong>Date: </strong> {discharge.date}</p>
            <p><strong>Criteria: </strong> {discharge.criteria}</p>
        </div>
    )
}

export default Hospital;