import calendar from "./client.js";

const createEvent = async (body) => {
  return new Promise((resolve, reject) => {
    calendar.events.insert(
      { calendarId: "primary", requestBody: body, sendUpdates: "all" },
      (err) => {
        if (err) resolve({ ok: false, error: err });
        console.log("Done");
        resolve({ ok: true });
      }
    );
  });
};

export default createEvent;
