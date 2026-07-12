import { Avatar } from "@/lib/components/ui/Avatar";
import { StatusBadge } from "@/lib/components/ui/StatusBadge";

export interface ParticipantRowProps {
  name: string;
  responded?: boolean;
}

/**
 * Participant list item. Confirmed spec deliberately has NO attendance-importance
 * (must/optional) — kept out of scope. Only response status is shown.
 */
export function ParticipantRow({ name, responded = false }: ParticipantRowProps) {
  return (
    <div className="ds-participant-row">
      <Avatar name={name} />
      <span className="type-s6" style={{ flex: 1, minWidth: 0 }}>{name}</span>
      <StatusBadge tone={responded ? "done" : "waiting"}>
        {responded ? "응답 완료" : "대기 중"}
      </StatusBadge>
    </div>
  );
}
