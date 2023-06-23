import { ApplicationTypeEnum } from '../../../domain/community/application/constants/ApplicationType';
import TranslationKey from '../../../types/TranslationKey';

const applicationTypeTranslationKeyDict: Record<ApplicationTypeEnum, TranslationKey> = {
  [ApplicationTypeEnum.space]: 'common.space',
  [ApplicationTypeEnum.challenge]: 'common.challenge',
  [ApplicationTypeEnum.opportunity]: 'common.opportunity',
} as const;

const getApplicationTypeTranslationKey = (type: ApplicationTypeEnum): TranslationKey =>
  applicationTypeTranslationKeyDict[type];
export default getApplicationTypeTranslationKey;
