// Zoom meeting IDs are always purely numeric (10-11 digits).
// Rejecting non-numeric IDs prevents URL path traversal via crafted values
// containing '/', '?', '#', or '../' in updateMeeting and deleteMeeting endpoints.
export function validateMeetingId(id: string): void {
  if (!/^\d+$/.test(id)) {
    throw new Error('Invalid meeting ID: must be numeric.');
  }
}
