/**
 * Just a copy from SingleWhiteboardCallout with:
 * - Added Rt suffix
 * - Changed whiteboards from WhiteboardCardWhiteboard[] to WhiteboardCardWhiteboard
 * - Use WhiteboardRtProvider instead of WhiteboardProvider
 * - WhiteboardsRtManagementViewWrapper
 */
import { useState } from 'react';
import CalloutLayout, { CalloutLayoutProps } from '../../CalloutBlock/CalloutLayout';
import { BaseCalloutViewProps } from '../CalloutViewTypes';
import WhiteboardsRtManagementViewWrapper from '../../whiteboard/WhiteboardsManagement/WhiteboardsRtManagementViewWrapper';
import { buildCalloutUrl } from '../../../../main/routing/urlBuilders';
import WhiteboardPreview from '../../whiteboard/whiteboardPreview/WhiteboardPreview';

interface SingleWhiteboardRtCalloutProps extends BaseCalloutViewProps {
  callout: CalloutLayoutProps['callout'];
}

const SingleWhiteboardRtCallout = ({
  callout,
  spaceNameId,
  loading,
  challengeNameId,
  opportunityNameId,
  journeyTypeName,
  contributionsCount,
  onExpand,
  onClose,
  expanded,
  ...calloutLayoutProps
}: SingleWhiteboardRtCalloutProps) => {
  const [isWhiteboardDialogOpen, setIsWhiteboardDialogOpen] = useState(false);
  const handleCloseWhiteboardDialog = () => {
    onClose?.();
    setIsWhiteboardDialogOpen(false);
  };

  if (!callout.framing.whiteboardRt) {
    return null;
  }

  return (
    <CalloutLayout
      callout={callout}
      contributionsCount={contributionsCount}
      {...calloutLayoutProps}
      expanded={expanded}
      onExpand={onExpand}
      onClose={onClose}
      journeyTypeName={journeyTypeName}
    >
      <WhiteboardPreview
        whiteboard={callout.framing.whiteboardRt}
        displayName={callout.framing.profile.displayName}
        onClick={() => setIsWhiteboardDialogOpen(true)}
      />
      {isWhiteboardDialogOpen && (
        <WhiteboardsRtManagementViewWrapper
          whiteboardId={callout.framing.whiteboardRt?.id}
          backToWhiteboards={handleCloseWhiteboardDialog}
          journeyTypeName={journeyTypeName}
          whiteboardShareUrl={buildCalloutUrl(callout.nameID, {
            spaceNameId,
            challengeNameId,
            opportunityNameId,
          })}
          readOnlyDisplayName
          calloutId={callout.id}
          whiteboard={callout.framing.whiteboardRt}
          authorization={callout.framing.whiteboardRt.authorization}
          loadingWhiteboards={false}
        />
      )}
    </CalloutLayout>
  );
};

export default SingleWhiteboardRtCallout;
