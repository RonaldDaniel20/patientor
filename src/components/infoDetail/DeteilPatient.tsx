import InfoPatient from "./InfoPatient"
import patients from "../../services/patients"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient } from "../../types";

const DetailPatient = () => {

    const [data, setData] = useState<Patient>()
    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if(!id) return;

        const fetchPatient = async () => {
            const dataPatient = await patients.getPatient(id);
            setData(dataPatient);
        }

        fetchPatient();
    },[])

    return(
        <div>
            <h1 style={{color: 'gray'}}>Información detallada del paciente</h1>
            {data && <InfoPatient patient={data}/>}
        </div>
    )
}

export default DetailPatient;