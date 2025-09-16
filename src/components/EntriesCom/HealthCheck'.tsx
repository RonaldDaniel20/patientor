import { HealthCheckRating } from "../../types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
    Rating: HealthCheckRating;
}

const HealthCheck = ({ Rating }: Props) => {
    return (
        <div>
            <div>
               <CheckCircleIcon style={{color: 'green'}}/>  HealthCheck 
            </div>
            <p><strong>Rating: </strong>{Rating}</p>

        </div>
    )
}

export default HealthCheck;