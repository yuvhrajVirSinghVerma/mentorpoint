const welcomeMail = (username) => {
  const message = `
    <h3>Hello from Mentorpoint👋</h3>
    <p style="font-size:15px;">Hi ${username},</p>
  
    <p style="font-size:15px;">Thanks for signing up for Mentorpoint.</p> 

    <p style="font-size:15px;">Explore the world of mentors and get your doubts resolved.</>
    <p style="font-size:15px;">Have a great learning!!</>

    <br>
    <br>
    Regards,<br>Mentorpoint App.</h3>
    <br><br><br>
`;
  return message;
};

export default welcomeMail;
