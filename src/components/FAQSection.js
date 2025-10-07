import React, { useState } from "react";

const translations = {
  en: {
    faqTitle: "Frequently Asked Questions",
    ceremonyTitle: "Ceremony",
    dressCodeQuestion: "Is there a dress code at the wedding?",
    dressCodeAnswer:
      "Our wedding will be held on a warm, summer day in a charming, rural setting with some uneven terrain. For your comfort, please choose an outfit you're comfortable in and can move around freely. Think casual sundresses with flat shoes or linen pants and open-collar shirts.",
    parkingQuestion: "Is there a car park at the venue?",
    parkingAnswer:
      "Yes, each room has a personal reserved parking space, and there are also two additional parking facilities near the restaurant and main entrance.",
    // Getting There Section
    gettingThereTitle: "Getting There",
    bestWayQuestion:
      "What is the best way to get to Agriturismo Fattoria Terranova?",
    bestWayAnswer:
      "Although driving in southern Italy requires adapting to narrow roads, traffic and assertive local drivers, a car is surely the best way to reach the Terranova Farmhouse, not only for convenience but also to explore the local area, especially if you plan to stay longer.\n\nThe ride from the airport to the venue is going to take around 1h - 1h 30 minutes and the views are spectacular!\n\nWhether you want to rent a car or need help arranging a group taxi from the airport, watch this space as we will be posting here more tips and information.",
    carDirectionsQuestion:
      "How to get to Agriturismo Fattoria Terranova by car?",
    carDirectionsAnswer:
      "Follow the signs for Penisola Sorrentina and take the Castellamare di Stabia exit. Then follow the SS 145 expressway for Sorrento.\n\nFrom here you can choose two ways to arrive at the farmhouse:\n\nThe first is arrive in Sorrento, continuing on the SS 145 expressway. From here, proceed in the Sant'Agata sui Due Golfi direction for 7 km, up until the Nastro Verde intersection where the Hotel Due Golfi is located. From that intersection continue ahead for Sant'Agata and after 400 mt turn left and follow the indications for \"Agriturismo Fattoria Terranova\". Be careful once you enter via Pontone which is just a few meters before Sant'Agata DO NOT ENTER THE TOWN! Once you enter via Pontone proceed for about 10 meters until you reach the private road where you will stop at house number 10.\n\nThe second way allows you to drive to Sant'Agata, going through Piano di Sorrento without having to reach Sorrento. From Piano, in fact, positioning yourselves on via Cavone will allow you to cut through the estimated journey and arrive in Sant'Agata minutes later. This street brings you the Nastro Verde intersection where the Hotel Due Golfi is located. From that intersection continue ahead for Sant'Agata and after 400 mt turn left and follow the indications for \"Agriturismo Fattoria Terranova\". Be careful once you enter via Pontone, which is just a few meters before Sant'Agata DO NOT ENTER THE TOWN! Once you enter via Pontone proceed for about 10 meters until you reach the private road where you will stop at house number 10.",
    publicTransportQuestion:
      "How to get from Naples Airport to Agriturismo Fattoria Terranova by public transport?",
    publicTransportAnswer:
      "BY BUS\nNaples Capodichino International Airport is the closest to Sorrento and Sant'Agata sui Due Golfi (60 km distance). The views on the way are spectacular.\nFrom the airport, take the Curreri line buses for Sorrento and get off at the last stop, which will be Sorrento (it takes about an hour and a half to get there).\nIn Sorrento, change buses and take the SITA bus for Sant'Agata sui Due Golfi (Via Priora) and get off after 20 minutes.\nThe stop is only 1 km away from the farmland. We suggest you call reception or notify us of your arrival if you're walking.\n\nBY TRAIN\nTo get to the farmhouse Terranova by train, you must arrive in Naples, at the Central Train Station Garibaldi, and take the Circumvesuviana (local commuter rail) or the Campania Express (tourist-focused). Ride lasts about an hour - an hour and a half. The views are spectacular.\nFrom Sorrento, the farmland is only a 20-minute bus ride away, take the SITA bus for Sant'Agata sui Due Golfi (Via Priora). The stop is only 1 km away from the farmhouse.\nWe suggest you call reception or notify us of your arrival if you're walking.",
    // Staying at Agriturismo Section
    stayingTitle: "Staying at Agriturismo Fattoria Terranova",
    checkinQuestion:
      "What are the check-in and check-out times at Agriturismo Fattoria Terranova?",
    checkinAnswer:
      "Check-in at Agriturismo Fattoria Terranova is from 14:00, and check-out is until 11:00.",
    checkinRequirementsQuestion:
      "What do I need to check in at Agriturismo Fattoria Terranova?",
    checkinRequirementsAnswer:
      "Guests are required to show a photo identification upon check-in and pay the tourism tax in cash: 3,00 EUR per person, per day (maximum 5 days).",
    breakfastQuestion: "Does Fattoria Terranova serve breakfast?",
    breakfastAnswer:
      "Yes, if you're staying at Agriturismo Fattoria Terranova, the Italian buffet breakfast is included in your stay. It features homemade croissants, pies, fresh fruit, freshly squeezed orange juice, and homemade marmalades.",
    petsQuestion: "Are pets allowed to stay at Agriturismo Fattoria Terranova?",
    petsAnswer:
      "Yes, pets are allowed on request. A supplement of 25 EUR per stay must be paid upon arrival.",
    childrenQuestion: "What is the hotel policy for children?",
    childrenAnswer:
      "Children of any age are welcome. Children 2 years and above will be charged as adults.\nCot available upon request (€ 15 per child, per night)",
    activitiesQuestion:
      "What else is there to do at Agriturismo Fattoria Terranova?",
    activitiesAnswer:
      "Agriturismo Fattoria Terranova offers the following activities / services (charges may apply):\nHiking\nChildren's playground\nWalking tours\nTour or class about local culture\nSwimming pool\nCooking class\nWine tasting\nBicycle rental",
  },
  pl: {
    faqTitle: "Najczęściej Zadawane Pytania",
    ceremonyTitle: "Ceremonia",
    dressCodeQuestion: "Czy na weselu obowiązuje dress code?",
    dressCodeAnswer:
      "Nasz ślub odbędzie się w ciepły, letni dzień w urokliwej, rustykalnej scenerii o nieco nierównym terenie. W trosce o Waszą wygodę, prosimy o wybranie stroju w którym czujecie się komfortowo i możecie się swobodnie poruszać. Letnie sukienki i płaskie buty, czy lniane spodnie i koszule z otwartym kołnierzykiem będą dobrym pomysłem.",
    parkingQuestion: "Czy na terenie obiektu znajduje się parking?",
    parkingAnswer:
      "Tak, każdy pokój ma przypisane miejsce parkingowe. Ponadto w pobliżu restauracji i głównego wejścia znajdują się dwa dodatkowe parkingi.",
    // Getting There Section
    gettingThereTitle: "Dotarcie na miejsce",
    bestWayQuestion:
      "Jaki jest najlepszy sposób na dotarcie do Agriturismo Fattoria Terranova?",
    bestWayAnswer:
      "Chociaż jazda samochodem w południowych Włoszech wymaga dostosowania się do wąskich dróg, natężenia ruchu i asertywnych lokalnych kierowców, samochód to z pewnością najlepszy sposób na dotarcie do Agriturismo Terranova, nie tylko ze względu na wygodę, ale także na pełną możliwość zwiedzania okolicy, zwłaszcza jeśli planujesz dłuższy pobyt.\n\nPrzejazd z lotniska do hotelu zajmuje około godzinę - godzinę i 30 minut, a widoki są zapierające w piersiach.\n\nNiezależnie od tego, czy chcesz wynająć samochód, czy potrzebujesz pomocy w zorganizowaniu taksówki z lotniska, śledź naszą stronę, ponieważ będziemy tu publikować więcej wskazówek i informacji.",
    carDirectionsQuestion:
      "Jak dojechać do Agriturismo Fattoria Terranova samochodem?",
    carDirectionsAnswer:
      "Podążaj za znakami do Penisola Sorrentina i zjedź na Castellamare di Stabia. Następnie podążaj autostradą SS 145 do Sorrento.\n\nStąd możesz wybrać dwa sposoby dotarcia do gospodarstwa:\n\nPierwszy to dotarcie do Sorrento, kontynuując autostradą SS 145. Stąd jedź w kierunku Sant'Agata sui Due Golfi przez 7 km, aż do skrzyżowania Nastro Verde, gdzie znajduje się Hotel Due Golfi. Ze skrzyżowania jedź dalej w kierunku Sant'Agata, a po 400 metrach skręć w lewo i podążaj za wskazówkami do \"Agriturismo Fattoria Terranova\". Uważaj, gdy wjedziesz na via Pontone, która jest zaledwie kilka metrów przed Sant'Agata - NIE WJEŻDŻAJ DO MIASTA! Gdy wjedziesz na via Pontone, jedź około 10 metrów, aż dotrzesz do prywatnej drogi, gdzie zatrzymasz się przy domu numer 10.\n\nDrugi sposób pozwala dojechać do Sant'Agata, przejeżdżając przez Piano di Sorrento bez konieczności dotarcia do Sorrento. Z Piano, pozycjonując się na via Cavone, będziesz mógł skrócić szacowaną podróż i dotrzeć do Sant'Agata kilka minut później. Ta ulica prowadzi do skrzyżowania Nastro Verde, gdzie znajduje się Hotel Due Golfi. Ze skrzyżowania jedź dalej w kierunku Sant'Agata, a po 400 metrach skręć w lewo i podążaj za wskazówkami do \"Agriturismo Fattoria Terranova\". Uważaj, gdy wjedziesz na via Pontone, która jest zaledwie kilka metrów przed Sant'Agata - NIE WJEŻDŻAJ DO MIASTA! Gdy wjedziesz na via Pontone, jedź około 10 metrów, aż dotrzesz do prywatnej drogi, gdzie zatrzymasz się przy domu numer 10.",
    publicTransportQuestion:
      "Jak dojechać z lotniska w Neapolu do Agriturismo Fattoria Terranova transportem publicznym?",
    publicTransportAnswer:
      "AUTOBUSEM\nMiędzynarodowy Port Lotniczy Neapol Capodichino jest najbliżej Sorrento i Sant'Agata sui Due Golfi (odległość 60 km). Widoki po drodze są niesamowite!\n\nZ lotniska wsiąść w autobus linii Curreri do Sorrento i wysiądź na ostatnim przystanku, którym będzie Sorrento (dotarcie tam zajmuje około półtorej godziny).\n\nW Sorrento przesiądź się i weź autobus SITA do Sant'Agata sui Due Golfi (Via Priora) i wysiądź po 20 minutach.\n\nPrzystanek znajduje się tylko 1 km od gospodarstwa. Jeśli zamierzasz iść pieszo, sugerujemy powiadomić recepcję albo nas.\n\nPOCIĄGIEM\nAby dotrzeć do gospodarstwa Terranova pociągiem, musisz przybyć do Neapolu, na Dworzec Główny Garibaldi, i wsiąść do pociągu Circumvesuviana (lokalna kolej podmiejska) lub Campania Express (nastawionego na turystów). Przejazd trwa około godziny-półtora. Widoki po drodze są niesamowite!\n\nZ Sorrento do gospodarstwa jest tylko 20 minut jazdy autobusem. Należy wziąć autobus SITA do Sant'Agata sui Due Golfi (Via Priora). Przystanek znajduje się zaledwie 1 km od gospodarstwa.\n\nSugerujemy zadzwonić do recepcji i powiadomić nas o swoim przybyciu, jeśli zamierzasz iść pieszo.",
    // Staying at Agriturismo Section
    stayingTitle: "Pobyt w Agriturismo Fattoria Terranova",
    checkinQuestion:
      "Jakie są godziny zameldowania i wymeldowania w Agriturismo Fattoria Terranova?",
    checkinAnswer:
      "Zameldowanie w Agriturismo Fattoria Terranova odbywa się od godziny 14:00, a wymeldowanie do godziny 11:00.",
    checkinRequirementsQuestion:
      "Czego potrzebuję do zameldowania się w Agriturismo Fattoria Terranova?",
    checkinRequirementsAnswer:
      "Goście są zobowiązani do okazania dokumentu tożsamości ze zdjęciem przy zameldowaniu oraz uiszczenia opłaty turystycznej gotówką: 3,00 EUR za osobę za dzień (maksymalnie 5 dni).",
    breakfastQuestion: "Czy Fattoria Terranova serwuje śniadania?",
    breakfastAnswer:
      "Tak, jeśli masz zarezerwowany nocleg w Agriturismo Fattoria Terranova, śniadanie w formie włoskiego bufetu jest wliczone w Twój pobyt. Śniadanie obejmuje domowe croissanty, ciasta, świeże owoce, świeżo wyciskany sok pomarańczowy i domowe marmolady.",
    petsQuestion:
      "Czy w Agriturismo Fattoria Terranova mogą przebywać zwierzęta?",
    petsAnswer:
      "Tak, zwierzęta są akceptowane na życzenie. Dopłata w wysokości 25 EUR za pobyt jest wymagana po przyjeździe.",
    childrenQuestion: "Jaka jest polityka hotelu wobec dzieci?",
    childrenAnswer:
      "Dzieci w każdym wieku są mile widziane. Dzieci w wieku 2 lat i starsze płacą jak dorośli.\nŁóżeczko dziecięce dostępne na życzenie (15 EUR za dziecko za noc)",
    activitiesQuestion: "Co jeszcze oferuje Agriturismo Fattoria Terranova?",
    activitiesAnswer:
      "Agriturismo Fattoria Terranova oferuje następujące atrakcje/usługi (mogą obowiązywać opłaty):\nWędrówki piesze\nPlac zabaw dla dzieci\nSpacery\nWycieczki lub zajęcia o lokalnej kulturze\nBasen\nKurs gotowania\nTestowanie wina\nWypożyczalnia rowerów",
  },
  hu: {
    faqTitle: "Gyakran ismételt kérdések",
    ceremonyTitle: "Szertartás",
    dressCodeQuestion: "Van öltözködési szabályzat az esküvőn?",
    dressCodeAnswer:
      "Az esküvőnk egy meleg, nyári napon kerül megrendezésre egy bájos, vidéki környezetben, egyenetlen tereppel. A kényelmed érdekében válassz olyan ruhát, amiben kényelmesen érzed magad és szabadon tudsz mozogni. Kényelmes nyári ruhák lapos talpú cipővel vagy len nadrágok és nyitott gallérú ingek lehetnek ideálisak.",
    parkingQuestion: "Van parkoló a helyszínen?",
    parkingAnswer:
      "Igen, minden szobához tartozik egy személyes, fenntartott parkolóhely, és további két parkoló részleg található az étterem és a főbejárat közelében.",
    // Getting There Section
    gettingThereTitle: "Odaút",
    bestWayQuestion:
      "Hogyan jutok el a legkönnyebben az Agriturismo Fattoria Terranovához?",
    bestWayAnswer:
      "Habár Dél-Olaszországban autóval alkalmazkodni kell a keskeny utakhoz, forgalomhoz és a helyi sofőrök vezetési stílusához, az autó mindenképpen a legjobb módja a Fattoria Terranova elérésének, nem csak a kényelem miatt, hanem a helyi látnivalók felfedezéséhez is, különösen ha tovább tervezel maradni.\n\nAz út a repülőtérről a helyszínre körülbelül 1 óra - 1 óra 30 percet vesz igénybe és a kilátás lenyűgöző!\n\nHogyha autót szeretnél bérelni, vagy segítségre van szükséged csoportos taxi szervezéséhez a repülőtérről, látogass vissza erre az oldalra, mert az esküvőhöz közelebb fogunk további tippeket és információkat közzétenni a weboldalunkon.",
    carDirectionsQuestion:
      "Hogyan lehet eljutni az Agriturismo Fattoria Terranova-hoz autóval?",
    carDirectionsAnswer:
      "Kövesd a Penisola Sorrentina felé vezető táblákat és hajts le a Castellamare di Stabia kijáratnál. Ezután kövesd az SS 145 autópályát Sorrento felé.\n\nInnen két módon juthatsz el a Fattoria Terranovához:\n\nAz első, hogy Sorrentóba érkezve, folytasd az utat az SS 145 autópályán. Innen haladj Sant'Agata sui Due Golfi irányába további 7 km-t, egészen a Nastro Verde kereszteződésig, ahol a Hotel Due Golfi található. Ettől a kereszteződéstől menj egyenesen, Sant'Agata felé, és 400 méter után fordulj balra és kövesd az \"Agriturismo Fattoria Terranova\" jelzéseket. Legyél figyelmes, amikor a via Pontone-hoz érsz, ami csak néhány méterre van Sant'Agata előtt - NE HAJTS BE A VÁROSBA! Amikor a via Pontone-hoz érsz, körülbelül 10 méterre lesz egy magánút, erre fordulj rá, majd állj meg a 10-es számú ház előtt.\n\nA második út lehetővé teszi, hogy Sant'Agatába vezess, áthaladva Piano di Sorrento-n anélkül, hogy át kellene menned Sorrentón. Piano-ból menj a via Cavone felé, amivel lerövidítheted az utat, és néhány perccel később meg is érkezel Sant'Agatába. Ez az út a Nastro Verde kereszteződéshez vezet, a Hotel Due Golfi-nál. Ettől a kereszteződéstől menj tovább Sant'Agata felé, és 400 méter után fordulj balra és kövesd az \"Agriturismo Fattoria Terranova\" jelzéseket. Legyél figyelmes, amikor a via Pontone-hoz érsz, ami csak néhány méterre van Sant'Agata előtt - NE HAJTS BE A VÁROSBA! Amikor a via Pontone-hoz érsz, körülbelül 10 méterre lesz egy magánút, erre fordulj rá, majd állj meg a 10-es számú ház előtt.",
    publicTransportQuestion:
      "Hogyan lehet eljutni a Nápolyi repülőtérről az Agriturismo Fattoria Terranova-hoz tömegközlekedéssel?",
    publicTransportAnswer:
      "BUSSZAL\nA Nápolyi Capodichino Nemzetközi Repülőtér a legközelebbi Sorrento és Sant'Agata sui Due Golfi-hez (60 km távolság).\nA repülőtérről szállj fel a Curreri vonal buszaira Sorrento felé és szállj le az utolsó megállónál, ami Sorrento lesz (körülbelül másfél órát vesz igénybe, hogy odaérj).\nSorrentóban szállj át a SITA buszra Sant'Agata sui Due Golfi felé (Via Priora) és szállj le kb 20 perc után Sant'Agata sui Due Golfi-nél.\nA megálló kb 1 km-re van a farmtól. Javasoljuk, hogy hívd a recepciót vagy értesíts minket az érkezésedről, ha a buszmegállótól gyalog jössz.\n\nVONATTAL\nNápolyból, a Garibaldi Központi Vasútállomásról, vagy a Circumvesuviana-val tudsz eljutni Sorrentóig (ez egy helyi elővárosi vasút) vagy a Campania Express-szel (ami inkább túrista-orientált). A menetidő körülbelül egy - másfél óra, de nem fog annyinak tűnni, mert a kilátás lenyűgöző.\nSorrentóból a farm egy kb 20 perces buszútra van, szállj fel a SITA buszra Sant'Agata sui Due Golfi felé (Via Priora) és szállj le Sant'Agata sui Due Golfi-nél. A megálló kb 1 km-re van az esküvő helyszínétől.\nJavasoljuk, hogy hívd a recepciót vagy értesíts minket az érkezésedről, ha a buszmegállótól gyalog jössz.",
    // Staying at Agriturismo Section
    stayingTitle: "Szállás az Agriturismo Fattoria Terranovában",
    checkinQuestion:
      "Mi a bejelentkezési és kijelentkezési idő az Agriturismo Fattoria Terranovában?",
    checkinAnswer:
      "A bejelentkezés délután 2 órától lehetséges, a kijelentkezés reggel 11 óráig kell megtörténjen.",
    checkinRequirementsQuestion: "Mire van szükségem a bejelentkezéshez?",
    checkinRequirementsAnswer:
      "Minden vendégnek fényképes igazolványt kell bemutatnia a bejelentkezéskor és készpénzben kell kifizetnie a turisztikai adót, ami 3EUR személyenként, naponta (maximum 5 nap).",
    breakfastQuestion: "Van reggeli a Fattoria Terranovában?",
    breakfastAnswer:
      "Igen, ha a Fattoria Terranova-ban szállsz meg, az olasz büfé reggeli benne van a szállás árában. Felszolgálásra kerülnek házi kiflik, sütemények, friss gyümölcs, frissen facsart narancslé és házi lekvárok.",
    petsQuestion: "Engedélyezettek-e a háziállatok a Fattoria Terranovában?",
    petsAnswer:
      "Igen, a háziállatok előzetes egyeztetéssel engedélyezettek. 25 EUR kiegészítő díjat kell fizetni érkezéskor.",
    childrenQuestion: "Mi a gyerekekkel kapcsolatos szabályzat?",
    childrenAnswer:
      "Minden gyermeket szeretettel látnak. A 2 éves és annál idősebb gyermekeket felnőttként számítják fel a szállás árában.\nKiságy kérésre elérhető (15EUR gyerekenként, éjszakánként)",
    activitiesQuestion:
      "Mi mást lehet csinálni a Fattoria Terranovában vagy a környéken?",
    activitiesAnswer:
      "A Fattoria Terranova a következő tevékenységeket / szolgáltatásokat kínálja:\nKirándulás a közeli dombokon\nJátszótér gyermekeknek\nHelyi kultúráról szóló túrák vagy előadások\nÚszómedence\nFőzőóra\nBor degusztálás\nKerékpár bérlés",
  },
};

const FAQItem = ({ question, answer, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="faq-item">
      <div
        className="faq-question"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        <h5>{question}</h5>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>
      {isExpanded && (
        <div className="faq-answer">
          <p style={{ whiteSpace: "pre-line" }}>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ title, faqs, language }) => {
  return (
    <div className="faq-section">
      <h3>{title}</h3>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

const FAQComponent = ({ language }) => {
  return (
    <div>
      <h2
        style={{
          color: "#2c3e50",
          fontFamily: '"Playfair Display", serif',
          fontSize: "2rem",
          marginBottom: "20px",
          position: "relative",
          paddingBottom: "15px",
        }}
      >
        {translations[language].faqTitle}
        <div
          style={{
            content: '""',
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "60px",
            height: "3px",
            background: "linear-gradient(90deg, #d4a373, #e76f51)",
          }}
        ></div>
      </h2>
      <div className="faq-sections">
        {/* Ceremony FAQs */}
        <FAQSection
          title={translations[language].ceremonyTitle}
          faqs={[
            {
              question: translations[language].dressCodeQuestion,
              answer: translations[language].dressCodeAnswer,
            },
            {
              question: translations[language].parkingQuestion,
              answer: translations[language].parkingAnswer,
            },
          ]}
          language={language}
        />

        {/* Getting There Section */}
        <FAQSection
          title={translations[language].gettingThereTitle}
          faqs={[
            {
              question: translations[language].bestWayQuestion,
              answer: translations[language].bestWayAnswer,
            },
            {
              question: translations[language].carDirectionsQuestion,
              answer: translations[language].carDirectionsAnswer,
            },
            {
              question: translations[language].publicTransportQuestion,
              answer: translations[language].publicTransportAnswer,
            },
          ]}
          language={language}
        />

        {/* Staying at Agriturismo Section */}
        <FAQSection
          title={translations[language].stayingTitle}
          faqs={[
            {
              question: translations[language].checkinQuestion,
              answer: translations[language].checkinAnswer,
            },
            {
              question: translations[language].checkinRequirementsQuestion,
              answer: translations[language].checkinRequirementsAnswer,
            },
            {
              question: translations[language].breakfastQuestion,
              answer: translations[language].breakfastAnswer,
            },
            {
              question: translations[language].petsQuestion,
              answer: translations[language].petsAnswer,
            },
            {
              question: translations[language].childrenQuestion,
              answer: translations[language].childrenAnswer,
            },
            {
              question: translations[language].activitiesQuestion,
              answer: translations[language].activitiesAnswer,
            },
          ]}
          language={language}
        />
      </div>
    </div>
  );
};

export default FAQComponent;
