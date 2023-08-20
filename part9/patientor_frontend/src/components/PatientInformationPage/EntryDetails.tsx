import { Entry } from '../../types'
import { assertNever } from '../../utils/helperFunctions';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { pink, yellow, lime } from '@mui/material/colors';

const baseEntryStyles = {
    border: '1px solid black',
    borderRadius: '1rem',
    maxWidth: 'max-content',
    padding: 10,
    marginBottom: 10
}


const displayRatingIcon = (rating: number) => {
    switch(rating) {
        case 0:
            return <FavoriteIcon color='success' />
        case 1:
            return <FavoriteIcon sx={{ color: lime[500] }} />
        case 2:
            return <FavoriteIcon sx={{ color: yellow[500] }} />
        case 3:
            return <FavoriteIcon sx={{ color: pink[500] }}/>
        default:
            return <FavoriteIcon />
    }
};

const HospitalEntry: React.FC<{entry: Entry}> = ({ entry }) => {
    if(entry.type === 'Hospital') {
    return <div style={baseEntryStyles}>
        <div>
        <span>{entry.date}</span> <MedicalServicesIcon/>
        </div>
        <p>{entry.description}</p>
        {entry.diagnosisCodes}
        <p>diagnose by {entry.specialist}</p>
    </div>
    }
    return null
}

const OccupationalHealthcareEntry: React.FC<{entry: Entry}> = ({ entry }) => {
    if(entry.type === 'OccupationalHealthcare'){
    return <div style={baseEntryStyles}>
        <div>
        <span>{entry.date}</span> <WorkIcon /> {entry.employerName}
        </div>
        <p>{entry.description}</p>
        <p>diagnose by {entry.specialist}</p>
    </div>
    }
    return null
}

const HealthCheckEntry: React.FC<{entry: Entry}> = ({ entry }) => {
    if(entry.type === 'HealthCheck') {
    const rating = entry.healthCheckRating

    return <div style={baseEntryStyles}>
        <div>
        <span>{entry.date}</span> <HowToRegIcon />
        </div>
        <p>{entry.description}</p>
        {displayRatingIcon(rating)}
        <p>diagnose by {entry.specialist}</p>
    </div>
    }

    return null
}


const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />
        default:
            return assertNever(entry);
    }
}

export default EntryDetails