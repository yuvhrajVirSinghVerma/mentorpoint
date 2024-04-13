const confirmationMail = (username, session) => {
  const message = `
    <h3>Hello from Mentorpoint👋</h3>
    <p style="font-size:15px;">Hi ${username},</p>
  
    <p style="font-size:15px;">Thanks for using Mentorpoint.</p> 

    <p style="font-size:15px;">This is to confirm that your booking has been confirmed.</p>
    <h3>Session Details:</h3>
    <h3>Session Name: ${session?.name}</h3>
    <h3>Mentor Name: ${session?.mentor}</h3>

    <p style="font-size:15px;">Soon You will receive a calendar invitation for the same!</p>
    <p style="font-size:15px;">You can review a session in sessions tab and can also communicate about it to mentor using chats.</p>


    <p style="font-size:15px;">Have a great learning!!</>

    <br>
    <br>
    Regards,<br>Mentorpoint App.</h3>
    <br>
    <img src="https://drive.google.com/uc?export=view&id=1q6aqxnQ_BMXjFC5O6FppM9OXzrZAJPp_" width="100px" height="100px"/>
`;
  return message;
};

export default confirmationMail;
