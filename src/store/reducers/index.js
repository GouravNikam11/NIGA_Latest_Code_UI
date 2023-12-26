import { combineReducers } from 'redux';
import Account from './account';
import notifications from './notification';
import Country from './Country';
import Doctor from './Doctor';
import Patient from './Patient';
import labOrderEntry from './LabReducer';
import Rubrics from './FindRubricReducers';
import Intensity from './IntensityReducers';

export default combineReducers({
    account: Account,
    notifications: notifications,
    country: Country,
    doctor: Doctor,
    patient: Patient,
    labOrderEntry: labOrderEntry,
    rubrics: Rubrics,
    intensity: Intensity
});