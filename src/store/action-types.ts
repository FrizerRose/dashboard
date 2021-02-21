import { DeveloperError } from '@/types/customError';
import SharedActionTypes from './modules/shared/action-types';
import ServiceActionTypes from './modules/service/action-types';
import CompanyActionTypes from './modules/company/action-types';
import StaffActionTypes from './modules/staff/action-types';
import AppointmentActionTypes from './modules/appointment/action-types';
import CustomerActionTypes from './modules/customer/action-types';

const allActionEnums = [
  SharedActionTypes,
  ServiceActionTypes,
  CompanyActionTypes,
  StaffActionTypes,
  AppointmentActionTypes,
  CustomerActionTypes,
];

const actionTypeValues = allActionEnums.map((abc) => Object.values(abc)).flat();
const hasConsistentNames = allActionEnums.map((abc) => Object.entries(abc)).flat().every((keyValue) => keyValue[0] === keyValue[1]);

// Since we don't have namespaced modules, we need to make sure there are no duplicate Action names.
if (actionTypeValues.length !== new Set(actionTypeValues).size) {
  throw new DeveloperError('Duplicate Action-Types!');
}

// Since we are only checking values in the previous check, we need to make sure all Actions have identical keys and values.
if (!hasConsistentNames) {
  throw new DeveloperError('Inconsistent Action-Type name!');
}

const allActionTypes = {
  ...SharedActionTypes,
  ...ServiceActionTypes,
  ...CompanyActionTypes,
  ...StaffActionTypes,
  ...AppointmentActionTypes,
  ...CustomerActionTypes,
};

export default allActionTypes;
