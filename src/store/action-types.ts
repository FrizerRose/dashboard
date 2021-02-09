import { DeveloperError } from '@/types/customError';
import ArticleActionTypes from './modules/article/action-types';
import SharedActionTypes from './modules/shared/action-types';

const allActionEnums = [
  SharedActionTypes,
  ArticleActionTypes,
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
  ...ArticleActionTypes,
};

export default allActionTypes;
