import { ApplicationTypeEnum } from '../../models/enums/application-type';
import TranslationKey from '../../types/TranslationKey';

const getApplicationTypeKey = (type: ApplicationTypeEnum): TranslationKey => {
  switch (type) {
    case ApplicationTypeEnum.ecoverse:
      return 'common.ecoverse';
    case ApplicationTypeEnum.challenge:
      return 'common.challenge';
    case ApplicationTypeEnum.opportunity:
      return 'common.opportunity';
    default:
      return 'common.empty-string';
  }
};
export default getApplicationTypeKey;
