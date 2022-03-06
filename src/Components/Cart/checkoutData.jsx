const checkoutData = {
  isEmpty: (value) => {
    return value.trim() === "";
  },
  isValidMail: (mail) => {
    return mail.includes("@");
  },
  isValidPhone: (phone) => {
    return phone.length === 10 && !isNaN(+phone);
  },

  areas: {
    center: [
      "בחר עיר",
      "בני ברק",
      "גבעתיים",
      "פתח תקווה",
      "רמת גן",
      "תל אביב - יפו",
    ],
    south: ["בחר עיר", "אשדוד", "אשקלון", "גדרה", "גן יבנה", "יבנה"],
    north: ["בחר עיר", "זכרון יעקב", "חיפה", "טירת כרמל", "עכו", "קיסריה"],
  },
};
export default checkoutData;
