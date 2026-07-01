import { Meet, NewMeeting } from "./types.js";

// Wrap a user-supplied string in angle quotes so the LLM treats it as literal
// data rather than instructions (mitigates indirect prompt injection via
// attacker-controlled meeting topics, agendas, and other metadata fields).
function dataField(value: string | undefined, fallback = "Unknown"): string {
  if (!value) return fallback;
  return `«${value}»`;
}

export function formatMeet(meeting: Meet): string {
  return [
    `Id: ${meeting.id || "Unknown"}`,
    `Topic: ${dataField(meeting.topic)}`,
    `Start Time: ${meeting.start_time || "Unknown"}`,
    `Duration: ${meeting.duration || "Unknown"}`,
    `Time Zone: ${meeting.timezone || "Unknown"}`,
    `Join URL: ${meeting.join_url || "Unknown"}`,
    `Password: ${meeting.password || "Unknown"}`,
    "---",
  ].join("\n");
}

export function formatCreateMeet(meeting: NewMeeting): string {
  return [
    `Topic: ${dataField(meeting.topic)}`,
    `Start Time: ${meeting.start_time || "Unknown"}`,
    `Duration: ${meeting.duration || "Unknown"}`,
    `Time Zone: ${meeting.timezone || "Unknown"}`,
    `Agenda: ${dataField(meeting.agenda)}`,
    `Join URL: ${meeting.join_url || "Unknown"}`,
    `Password: ${meeting.password || "Unknown"}`,
  ].join("\n");
}
