import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {styled} from "@mui/material/styles";

// CheckboxLabels.js: 체크박스 label

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({

    marginLeft: theme.spacing(-1),
    '& .MuiFormControlLabel-label': {
        marginLeft: theme.spacing(0),
    },
}));

export default function CheckboxLabels({option, checked, onChange}) {
    return (
        <FormGroup>
            <StyledFormControlLabel control={<Checkbox size="small" checked={checked} onChange={onChange}/>} label={option}/>
        </FormGroup>
    );
}