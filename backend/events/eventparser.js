const parseEvent = (event) => {
  const eventData = {
    summary: event.summary ? event.summary : "Event",
    location: event?.location,
    description: event?.description,
    visibility: "public",
    remindOnRespondedEventsOnly: "true",
    colorId: 1,
    start: {
      dateTime: event?.start_time,
      timeZone: "America/Denver",
    },
    end: {
      dateTime: event?.end_time,
      timeZone: "America/Denver",
    },
    attendees: event?.attendees,
  };
  return eventData;
};

export default parseEvent;
