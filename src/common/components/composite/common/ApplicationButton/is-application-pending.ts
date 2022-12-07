import {
  APPLICATION_STATE_NEW,
  APPLICATION_STATE_REJECTED,
} from '../../../../../domain/community/application/constants/ApplicationState';

const isApplicationPending = (applicationState?: string) =>
  applicationState === APPLICATION_STATE_NEW || applicationState === APPLICATION_STATE_REJECTED;
export default isApplicationPending;
