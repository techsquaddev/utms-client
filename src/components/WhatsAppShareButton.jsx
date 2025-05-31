const WhatsAppShareButton = () => {
  const message = `🚨 BREAKING NEWS 🚨
  
  Have you had enough of looking at timetables in a mind boggling HTML format? If so, we bring you some great news! 🎉
  
  Visit SLIIT 360 and find a handy timetable which automatically saves itself to your browser! ✨
  
  🔗 Visit Now: https://sliit360.me
  
  📝 Want to contribute?
  Register with the app and create timetables that haven’t been added yet. Watch the introductory video above for more details.
  
  📢 Share this with your friends who struggle with <table>timetables</table> 🤐
  
  #SLIIT #SLIIT360 #Timetables #NoMoreHTML #NoMoreConfusion`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Share on WhatsApp
      </button>
    </a>
  );
};

export default WhatsAppShareButton;
