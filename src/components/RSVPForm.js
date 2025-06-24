import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const translations = {
  en: {
    title: "RSVP",
    name: "Full Name",
    email: "Email Address",
    attending: "Will you attend?",
    yes: "Yes, I will attend",
    no: "No, I cannot attend",
    guests: "Number of guests (including yourself)",
    dietary:
      "Any dietary requirements? (e.g. vegetarian, gluten-free, I don't like seafood, etc.)",
    message: "Additional message (optional)",
    submit: "Send RSVP",
    success:
      "Thank you for your RSVP! We will update our guest list accordingly and once we've done this you will see your attendance status confirmed on this page.",
    error: "There was an error sending your RSVP. Please try again.",
    required: "This field is required",
  },
  pl: {
    title: "Potwierdzenie obecności",
    name: "Imię i nazwisko",
    email: "Adres email",
    attending: "Czy będziesz obecny/a?",
    yes: "Tak, będę obecny/a",
    no: "Nie, niestety nie mogę dołączyć",
    guests: "Liczba gości z ktorymi do nas dołączysz (włącznie z Tobą)",
    dietary:
      "Czy masz specjalne wymagania dietetyczne? (np. dieta wegetariańska, bezglutenowa, nie lubię owoców morza itp.)",
    message: "Dodatkowa wiadomość (opcjonalnie)",
    submit: "Wyślij potwierdzenie",
    success:
      "Dziękujemy za twoją odpowiedź! Wkrótce zaaktualizujemy naszą listę gości i wtedy będziesz mógł / mogła zobaczyć tutaj swój status uczestnictwa.",
    error: "Wystąpił błąd podczas przesyłania danych. Spróbuj ponownie.",
    required: "To pole jest wymagane",
  },
  hu: {
    title: "Visszajelzés",
    name: "Név",
    email: "Email cím",
    attending: "Ott leszel?",
    yes: "Igen, ott leszek",
    no: "Nem, sajnos nem leszek ott",
    guests: "Vendégek száma (magaddal együtt)",
    dietary:
      "Étkezési igények (pl. vegetáriánus, gluténmentes, nem szeretem a tenger gyümölcseit, stb.)",
    message: "További üzenet (opcionális)",
    submit: "Visszajelzés küldése",
    success:
      "Köszönjük a visszajelzést! Frissítjük a vendéglistát, és amint elkészültünk vele, látni fogod a részvételi státuszodat ezen az oldalon.",
    error:
      "Valamit elcseszett a programozó és valamilyen hiba történt. Próbálkozz újra és ha nagyon nem megy, írj egy üzit.",
    required: "Ez a mező kötelező",
  },
};

const RSVPForm = ({ language, guestCode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    guests: "1",
    dietary: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Special thank you messages for specific guests
  const specialThankYouMessages = {
    IL2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    HG2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepelsz ezen a különleges napon!",
    },
    AT2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    KR2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    GA2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepelsz ezen a különleges napon!",
    },
    PR2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepelsz ezen a különleges napon!",
    },
    AGI2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    SM2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    YN2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    WS2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    AG2026: {
      en: "Thank you so much for confirming your attendance! We are super excited to have you on our special day!",
      pl: "Bardzo dziękujemy za potwierdzenie obecności! Jesteśmy bardzo podekscytowani, że będziesz z nami w tym wyjątkowym dniu!",
      hu: "Köszönjük, hogy visszajeleztél! Nagyon örülünk, hogy velünk ünnepeltek ezen a különleges napon!",
    },
    // Add more guest codes here as needed
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = translations[language].required;
    if (!formData.email) newErrors.email = translations[language].required;
    if (!formData.attending)
      newErrors.attending = translations[language].required;
    if (
      formData.attending === "yes" &&
      (!formData.guests || formData.guests < 1)
    ) {
      newErrors.guests = translations[language].required;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await emailjs.send(
        "service_wr2l3v8",
        "template_c4rvljx",
        {
          to_email: "krisztian.ivan@gmail.com,justyna0lisiecka@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          attending: formData.attending === "yes" ? "Yes" : "No",
          guests: formData.guests,
          dietary: formData.dietary,
          message: formData.message,
        },
        "PxXElfb83R8jwCj_F"
      );

      setStatus({ type: "success", message: translations[language].success });
      setIsSubmitted(true);
    } catch (error) {
      setStatus({ type: "error", message: translations[language].error });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // If guest is in the special thank you list, show only the thank you message
  if (specialThankYouMessages[guestCode]) {
    return (
      <div className="status-message success" style={{ marginBottom: 20 }}>
        {specialThankYouMessages[guestCode][language]}
      </div>
    );
  }

  // If form was submitted successfully, show only the success message
  if (isSubmitted) {
    return (
      <div className="status-message success" style={{ marginBottom: 20 }}>
        {status.message}
      </div>
    );
  }

  // Otherwise, show the RSVP form
  return (
    <form onSubmit={handleSubmit} className="rsvp-form">
      <div className="form-group">
        <label htmlFor="name">{translations[language].name}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">{translations[language].email}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>{translations[language].attending}</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={formData.attending === "yes"}
              onChange={handleChange}
            />
            {translations[language].yes}
          </label>
          <label>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={formData.attending === "no"}
              onChange={handleChange}
            />
            {translations[language].no}
          </label>
        </div>
        {errors.attending && (
          <span className="error-message">{errors.attending}</span>
        )}
      </div>
      {formData.attending === "yes" && (
        <div className="form-group">
          <label htmlFor="guests">{translations[language].guests}</label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            className={errors.guests ? "error" : ""}
          />
          {errors.guests && (
            <span className="error-message">{errors.guests}</span>
          )}
        </div>
      )}
      {formData.attending === "yes" && (
        <div className="form-group">
          <label htmlFor="dietary">{translations[language].dietary}</label>
          <textarea
            id="dietary"
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
            rows="2"
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="message">{translations[language].message}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
        />
      </div>
      {status.message && (
        <div className={`status-message ${status.type}`}>{status.message}</div>
      )}
      <button type="submit" className="submit-button">
        {translations[language].submit}
      </button>
    </form>
  );
};

export default RSVPForm;
