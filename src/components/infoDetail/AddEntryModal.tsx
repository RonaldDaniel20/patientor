import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material"
import { EntryWithoutId, Diagnosis} from "../../types"
import ModalEntries from "./ModalEntries";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
    Codes: Diagnosis['code'][];
}

const AddEntryModal = ({modalOpen, onClose, onSubmit, error, Codes}: Props) => {
    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
         <DialogTitle>Add new entry</DialogTitle>
         <Divider />
         <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <ModalEntries onSubmit={onSubmit} onCancel={onClose} Codes={Codes} />
         </DialogContent>
        </Dialog>
    )
}

export default AddEntryModal;