import { DeveloperError } from '@/types/customError';
import SharedMutationTypes from './modules/shared/mutation-types';
import ServiceMutationTypes from './modules/service/mutation-types';
import CompanyMutationTypes from './modules/company/mutation-types';
import StaffMutationTypes from './modules/staff/mutation-types';
import AppointmentMutationTypes from './modules/appointment/mutation-types';
import CustomerMutationTypes from './modules/customer/mutation-types';

const allMutationEnums = [
  SharedMutationTypes,
  ServiceMutationTypes,
  CompanyMutationTypes,
  StaffMutationTypes,
  AppointmentMutationTypes,
  CustomerMutationTypes,
];

const actionTypeValues = allMutationEnums.map((abc) => Object.values(abc)).flat();
const hasConsistentNames = allMutationEnums.map((abc) => Object.entries(abc)).flat().every((keyValue) => keyValue[0] === keyValue[1]);

// Since we don't have namespaced modules, we need to make sure there are no duplicate Mutation names.
if (actionTypeValues.length !== new Set(actionTypeValues).size) {
  throw new DeveloperError('Duplicate Mutation-Types!');
}

// Since we are only checking values in the previous check, we need to make sure all Mutations have identical keys and values.
if (!hasConsistentNames) {
  throw new DeveloperError('Inconsistent Mutation-Type name!');
}

const allMutationTypes = {
  ...SharedMutationTypes,
  ...ServiceMutationTypes,
  ...CompanyMutationTypes,
  ...StaffMutationTypes,
  ...AppointmentMutationTypes,
  ...CustomerMutationTypes,
};

export default allMutationTypes;
