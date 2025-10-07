import React from "react";
import RSVPForm from "./RSVPForm";
import TravelSection from "./TravelSection";
import FAQComponent from "./FAQSection";

const translations = {
  en: {
    rsvp: "RSVP",
    travel: "Travel",
    accommodation: "Accommodation",
    itinerary: "Itinerary",
    location: "Location",
    comingSoon: "Coming soon...",
    locationText:
      "Our ceremony and reception will be held at Fattoria Terranova, a working farm, hotel and restaurant situated in the beautiful Sorrento hills, featuring a swimming pool and garden areas with wonderful views of the Bay of Naples, Vesuvius, and Capri island.\n\nAll the food served is grown on the farm, which also produces its own olive oil and limoncello from the region's famous Sorrento lemons.\n\nYou can find more details on their website: ",
    websiteLink: "fattoriaterranova.it",
    locationAdditionalTitle: "What else is there to do in the area?",
    locationAdditionalText: [
      "Adjoining the farmland is the WWF oasis spot \"Le Tore\" where you can jog throughout the pine forest pathways or stroll all the way down to the stunning beaches.",
      "Distancing only a few meters away is Sant'Agata sui Due Golfi, a small and very characteristic town that is named so because it overlooks both the Gulf of Naples and the Gulf of Salerno on opposite sides.",
      "With its famous beaches and clear blue waters, Massa Lubrense is only a 5 minute drive away: a great place to spend a relaxing day at the beach.",
      "The town center of Sorrento is only a 15 minute drive or 20 minutes bus ride. From there you board trains to visit the Pompeii and Herculaneum ruins or walk down to the port and catch one of the many ferry boats that go to Naples, Capri and Ischia.",
      "Less than five minutes away from the farmland Terranova is the street that leads you to the Amalfi Coast with its winding curves and spectacular views of the sea. In less than twenty minutes, you'll arrive in Positano."
    ]
  },
  pl: {
    rsvp: "Potwierdzenie obecności",
    travel: "Podróż",
    accommodation: "Nocleg",
    itinerary: "Plan wydarzeń",
    location: "Lokalizacja",
    comingSoon: "Informacje w odpowiednim czasie..",
    locationText:
      "Nasza ceremonia ślubna i przyjęcie weselne odbędą się w Fattoria Terranova – gospodarstwie agroturystycznym z restauracją, basenem i terenami ogrodowymi, położonym na pięknych wzgórzach Sorrento, z których roztaczają się oszałamiające widoki na Zatokę Neapolitańską, Wezuwiusza i wyspę Capri.\n\nWszystkie dania serwowane w restauracji powstają z lokalnych produktów, a gospodarstwo wytwarza nawet własną oliwę z oliwek i limoncello ze słynnych cytryn z Sorrento!\n\nWięcej szczegółów znajdziecie na ich stronie internetowej: ",
    websiteLink: "fattoriaterranova.it",
    locationAdditionalTitle: "Co można zobaczyć w okolicy?",
    locationAdditionalText: [
      "Przy farmie znajduje się oaza WWF \"Le Tore\", gdzie można biegać leśnymi ścieżkami lub spacerować aż do przepięknych plaż.",
      "Zaledwie kilka metrów dalej leży Sant'Agata sui Due Golfi, małe i bardzo charakterystyczne miasteczko nazwane tak, ponieważ góruje nad Zatoką Neapolitańską i Zatoką Salerno, położonymi po przeciwnych stronach.",
      "Massa Lubrense, ze swoimi słynnymi plażami i krystalicznie czystą wodą, znajduje się zaledwie 5 minut jazdy samochodem: to świetne miejsce na relaksujący dzień na plaży.",
      "Centrum Sorrento to tylko 15 minut jazdy samochodem lub 20 minut autobusem. Stamtąd można wsiąść do pociągu, aby odwiedzić ruiny Pompejów i Herkulanum lub zejść do portu i złapać jeden z wielu promów płynących do Neapolu, Capri i Ischii.",
      "Niecałe pięć minut drogi od farmy Terranova znajduje się ulica, która prowadzi na Wybrzeże Amalfi z jego krętymi zakrętami i spektakularnymi widokami na morze. W niespełna dwadzieścia minut dotrzesz do Positano."
    ]
  },
  hu: {
    rsvp: "Visszajelzés",
    travel: "Utazás",
    accommodation: "Szállás",
    itinerary: "Program",
    location: "Helyszín",
    comingSoon: "Hamarosan...",
    locationText:
      "A szertartást és a fogadást a Fattoria Terranovában tartjuk, egy étteremként is működő gazdaságban a gyönyörű Sorrento-i dombokon, ahonnan csodálatos kilátás nyílik a Nápolyi-öbölre, a Vezúvra és Capri szigetére.\n\nA vendégek rendelkezésére áll az úszómedence és a kert is. Minden felszolgált étel a farmon termesztett alapanyagokból készül, sőt, a gazdaság saját olívaolajat és limoncello-t is készít a híres Sorrento-i citromból!\n\nTovábbi részletek a weboldalukon: ",
    websiteLink: "fattoriaterranova.it",
    locationAdditionalTitle: "Mi más látnivaló van a környéken?",
    locationAdditionalText: [
      "A farm mellett található a WWF \"Le Tore\" oázisa, ahol végig lehet kocogni a fenyőerdő ösvényein vagy le lehet sétálni egészen a gyönyörű tengerpartokig.",
      "A közelben van Sant'Agata sui Due Golfi is, egy kis és nagyon jellegzetes városka, amely azért kapta ezt a nevet, mert mind a Nápolyi-öbölre, mind a Salernói-öbölre van kilátás, amelyek a domb ellentétes oldalain helyezkednek el.",
      "A híres strandjaival és kristálytiszta vizeivel a Massa Lubrense mindössze 5 perces autóútra van: tökéletes hely egy pihentető napozásra a tengerparton.",
      "Sorrento városközpontja mindössze 15 perces autóút vagy 20 perces buszút. Onnan vonatra szállva, el lehet jutni Pompeii és Herculaneum romjaihoz, vagy a kikötőből az egyik komppal Nápolyba, Caprira vagy Ischiára.",
      "A Fattoria Terranovától kevesebb mint öt percre található az az út, amely az Amalfi-partra vezet a kanyargós szerpentinjeivel és a tengerre néző bámulatos kilátásával. Kevesebb mint húsz perc az út Positanóba."
    ]
  },
};

const hasAccommodationMessage = (guestCode) => {
  const validCodes = [
    "IL2026",
    "HG2026",
    "AT2026",
    "SZ2026",
    "ZZ2026",
    "KR2026",
    "GB2026",
    "TM2026",
    "ER2026",
    "PT2026",
    "MK2026",
    "WS2026",
    "AD2026",
    "AG2026",
    "CT2026",
    "WD2026",
    "KL2026",
    "SM2026",
    "YN2026",
    "GA2026",
    "PR2026",
    "AGI2026",
    "KS2026",
    "PL2026",
    "SD2026",
  ];
  return validCodes.includes(guestCode);
};

const AccommodationMessage = ({ guestCode }) => {
  const messages = {
    IL2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Stanza 1 (Deluxe Room)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    HG2026: (
      <div>
        <p>
          Az egyik VIP vendégünkként mi intézzük a hétvégi szállásodat és velünk
          fogsz megszállni a Villa Terranovában június 25-től (csütörtök) június
          29-ig (hétfő). Csak azt szeretnénk, ha pihennél, velünk ünnepelnél, és
          csodás emlékeket szereznél.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Villa Terranova
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 25 (csütörtök). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 29 (hétfő). délelőtt 11
          óráig
        </p>
      </div>
    ),
    AT2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Limone (Suite)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    SZ2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    ZZ2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    KR2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Stanza 2
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    GB2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Mirto (Junior Suite)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    TM2026: (
      <p>
        Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
        esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
        (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
        velünk ünnepelnétek, és csodás emlékeket szereznétek.
        <br />
        <br />A további részletekről (bejelentkezés, pontos szoba, stb.) később
        küldünk tájékoztatást...
      </p>
    ),
    ER2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Mirto (Junior Suite)
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    PT2026: (
      <div>
        <p>
          Mélységes hálánk apró jeleként nagy örömmel látunk titeket vendégül az
          esküvő helyszínén és a hétvégi szállásotokat mi intézzük június 26-tól
          (péntek) június 28-ig (vasárnap). Csak azt szeretnénk, ha pihennétek,
          velünk ünnepelnétek, és csodás emlékeket szereznétek.
        </p>
        <br />
        <p>
          <strong>Szoba:</strong> Stanza 3
        </p>
        <br />
        <p>
          <strong>Bejelentkezés:</strong> 2026. június 26 (péntek). délután 2
          órától
        </p>
        <br />
        <p>
          <strong>Kijelentkezés:</strong> 2026. június 28 (vasárnap). délelőtt
          11 óráig
        </p>
        <p>
          <br />
          Hogyha szeretnétek meghosszabbítani a Sorrentói tartózkodásotokat,
          akkor a Fattoria Terranovánál direktben tudjátok ezt megtenni.
          Mondjátok meg, hogy az esemény amire érkeztek "Justyna + Krisz wedding
          27.06.2026", hogy kedvezményes árat kapjatok és említsétek meg a szoba
          nevét, ahol foglalásotok van már a hétvégére.
          <br />
          <br />
          Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
        </p>
      </div>
    ),
    MK2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> QUERCIA (Oak) - Suite (3-4 people) sea view
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    WS2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> ROSA (Rose) sea view - Superior Room
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    AD2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> GLICINE (Wisteria) sea view - Superior Room
          (2-4 people)
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    AG2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> QUERCIA (Oak) - Suite (3-4 people) sea view
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    CT2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> ROSA (Rose) sea view - Superior Room
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    WD2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> GLICINE (Wisteria) sea view - Superior Room
          (2-4 people)
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    KL2026: (
      <div>
        <p>
          W wyrazie naszej głębokiej wdzięczności i radości że chcecie nam
          towarzyszyć w tym wyjątkowym wydarzeniu, chelibyśmy Was właściwie
          ugościć. Dlatego zapewniamy dla Was nocleg na cały weekend od piątku
          26 czerwca do niedzieli 28 czerwca. Chcemy po prostu, byście
          odpoczęli, wspaniale się z nami bawili i zabrali ze sobą niezapomniane
          wspomnienia.
        </p>
        <br />
        <p>
          <strong>Pokój:</strong> QUERCIA (Oak) - Suite (3-4 people) sea view
        </p>
        <br />
        <p>
          <strong>Zameldowanie:</strong> 26 czerwca 2026 (piątek) od godziny
          14:00
        </p>
        <br />
        <p>
          <strong>Wymeldowanie:</strong> 28 czerwca 2026 (niedziela) do godziny
          11:00
        </p>
        <p>
          <br />
          Jeśli chcielibyście przedłużyć Wasz pobyt w Sorrento, możecie to
          zrobić kontaktując się bezpośrednio z Agriturismo Fattoria Terranova.
          Aby otrzymać zniżkę na rezerwację, wspomnijcie, że przyjeżdżacie na
          nasz ślub, czyli "Justyna + Krisz wedding 27.06.2026", i podajcie
          nazwę pokoju, który macie już zarezerwowany na weekend.
          <br />
          <br />
          Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
          <br />
          <br />
          Oczywiście jeśli potrzebujecie pomocy w zrobieniu rezewacji na
          przedłużony pobyt, dajcie nam znać - chętnie pomożemy.
        </p>
      </div>
    ),
    SM2026: (
      <div>
        <p>
          As one of our VIPs, we will be taking care of your accommodation and
          you will be staying with us in Villa Terranova, from Thursday, 25th
          June 2026 to Monday, 29th June 2026. All we want is for you to relax,
          celebrate with us, and create wonderful memories.
        </p>
        <br />
        <p>
          <strong>Room:</strong> Villa Terranova
        </p>
        <br />
        <p>
          <strong>Check-in:</strong> 25th June 2026 (Thursday), from 2 PM
        </p>
        <br />
        <p>
          <strong>Check-out:</strong> 29th June 2026 (Monday), until 11 AM
        </p>
      </div>
    ),
    YN2026: (
      <p>
        Fattoria Terranova has reserved a block of rooms until 31 December 2025
        for our wedding guests. You can book one of these directly with them.
        Please mention “Justyna + Krisz wedding 27.06.2026” when making your
        reservation to receive a discounted rate.
        <br />
        <br />
        Email info@fattoriaterranova.it or Whatsapp (+39) 081 533 02 34.
      </p>
    ),
    GA2026: (
      <p>
        Fattoria Terranova has reserved a block of rooms until 31 December 2025
        for our wedding guests. You can book one of these directly with them.
        Please mention “Justyna + Krisz wedding 27.06.2026” when making your
        reservation to receive a discounted rate.
        <br />
        <br />
        Email info@fattoriaterranova.it or Whatsapp (+39) 081 533 02 34.
      </p>
    ),
    PR2026: (
      <p>
        Fattoria Terranova has reserved a block of rooms until 31 December 2025
        for our wedding guests. You can book one of these directly with them.
        Please mention “Justyna + Krisz wedding 27.06.2026” when making your
        reservation to receive a discounted rate.
        <br />
        <br />
        Email info@fattoriaterranova.it or Whatsapp (+39) 081 533 02 34.
      </p>
    ),
    AGI2026: (
      <p>
        A Fattoria Terranova fenntartja a rendelkezésre álló szobákat 2025.
        december 31-ig a vendégeink számára. Közvetlenül náluk foglalhattok ezek
        közül egyet. Foglaláskor említsétek meg, hogy az esemény amire érkeztek
        "Justyna + Krisz wedding 27.06.2026", hogy kedvezményes árat kapjatok.
        <br />
        <br />
        Email: info@fattoriaterranova.it vagy Whatsapp: (+39) 081 533 02 34.
      </p>
    ),
    KS2026: (
      <p>
        Fattoria Terranova zarezerwowała dla naszych gości pulę pokoi do 31
        grudnia 2025 r. Możecie je zarezerwować kontaktując się bezpośrednio z
        hotelem. Przy rezerwacji, prosimy o powołanie się na „Justyna/Krisz
        wedding”, aby otrzymać zniżkę.
        <br />
        <br />
        Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
        <br />
        <br />
        Możecie również sprawdzić popularne platformy rezerwacyjne, aby znaleźć
        inne opcje zakwaterowania w odległości pieszej od Fattoria Terranova.
      </p>
    ),
    PL2026: (
      <p>
        Fattoria Terranova zarezerwowała dla naszych gości pulę pokoi do 31
        grudnia 2025 r. Możecie je zarezerwować kontaktując się bezpośrednio z
        hotelem. Przy rezerwacji, prosimy o powołanie się na „Justyna/Krisz
        wedding”, aby otrzymać zniżkę.
        <br />
        <br />
        Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
        <br />
        <br />
        Możecie również sprawdzić popularne platformy rezerwacyjne, aby znaleźć
        inne opcje zakwaterowania w odległości pieszej od Fattoria Terranova.
      </p>
    ),
    SD2026: (
      <p>
        Fattoria Terranova zarezerwowała dla naszych gości pulę pokoi do 31
        grudnia 2025 r. Możecie je zarezerwować kontaktując się bezpośrednio z
        hotelem. Przy rezerwacji, prosimy o powołanie się na „Justyna/Krisz
        wedding”, aby otrzymać zniżkę.
        <br />
        <br />
        Email: info@fattoriaterranova.it lub Whatsapp: (+39) 081 533 02 34.
        <br />
        <br />
        Możecie również sprawdzić popularne platformy rezerwacyjne, aby znaleźć
        inne opcje zakwaterowania w odległości pieszej od Fattoria Terranova.
      </p>
    ),
  };

  return messages[guestCode] || null;
};

const GuestPage = ({ language, guestCode }) => {
  return (
    <div className="guest-page">
      <div className="section">
        <h2>{translations[language].rsvp}</h2>
        <RSVPForm language={language} guestCode={guestCode} />
      </div>
      <div className="section">
        <h2>{translations[language].location}</h2>
        <div className="location-text">
          {translations[language].locationText
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>
                {paragraph}
                {index === 2 && (
                  <a
                    href="https://www.fattoriaterranova.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {translations[language].websiteLink}
                  </a>
                )}
              </p>
            ))}
        </div>
        <div className="location-gallery">
          <img
            src="/wedding2026/assets/fattoria/1.jpg"
            alt="Fattoria Terranova"
            className="gallery-image"
          />
          <img
            src="/wedding2026/assets/fattoria/2.jpg"
            alt="Fattoria Terranova"
            className="gallery-image"
          />
          <img
            src="/wedding2026/assets/fattoria/3.jpg"
            alt="Fattoria Terranova"
            className="gallery-image"
          />
          <img
            src="/wedding2026/assets/fattoria/4.jpg"
            alt="Fattoria Terranova"
            className="gallery-image"
          />
        </div>
        <div className="location-additional-info">
          <h3>{translations[language].locationAdditionalTitle}</h3>
          {translations[language].locationAdditionalText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="section">
        <TravelSection language={language} guestCode={guestCode} />
      </div>
      <div className="section">
        <h2>{translations[language].accommodation}</h2>
        <AccommodationMessage guestCode={guestCode} />
        {(guestCode === "HG2026" || guestCode === "SM2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/villa_terranova.jpg"
              alt="Villa Terranova"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/soggiorno.jpg"
              alt="Soggiorno"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105133.jpg"
              alt="Villa Terranova Interior"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Villa Terranova Interior"
              className="gallery-image"
            />
          </div>
        )}
        {guestCode === "IL2026" && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/delux_room/Camera-Superior-1-1.jpg"
              alt="Stanza 1"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/Camera-Superior-2.jpg"
              alt="Stanza 1"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(16).jpg"
              alt="Garden"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(17).jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {guestCode === "AT2026" && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112808.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112628.jpg"
              alt="Limone"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112643.jpg"
              alt="Limone"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113009.jpg"
              alt="Limone"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "KR2026" || guestCode === "PT2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/double_standard/20191008_132011.jpg"
              alt="Stanza"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/double_standard/20191008_132228.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(16).jpg"
              alt="Garden"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "GB2026" || guestCode === "ER2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/junior_suites/superior_room_(43).jpg"
              alt="Mirto"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113612.jpg"
              alt="Mirto"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113515.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "MK2026" ||
          guestCode === "AG2026" ||
          guestCode === "KL2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_112628.jpg"
              alt="Quercia"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113544.jpg"
              alt="Quercia"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/suites/20250507_113515.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "WS2026" || guestCode === "CT2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/delux_room/Camera-Superior-1-1.jpg"
              alt="Rosa"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/Camera-Superior-2.jpg"
              alt="Rosa"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(16).jpg"
              alt="Garden"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(17).jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {(guestCode === "AD2026" || guestCode === "WD2026") && (
          <div className="accommodation-gallery">
            <img
              src="/wedding2026/assets/accomodation/double_standard/20191008_132011.jpg"
              alt="Glicine"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/double_standard/20191008_132228.jpg"
              alt="Terrace"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/delux_room/superior_room_(16).jpg"
              alt="Garden"
              className="gallery-image"
            />
            <img
              src="/wedding2026/assets/accomodation/villa_terranova/20230421_105012.jpg"
              alt="Terrace"
              className="gallery-image"
            />
          </div>
        )}
        {!hasAccommodationMessage(guestCode) && (
          <p>{translations[language].comingSoon}</p>
        )}
      </div>
      <div className="section">
        <h2>{translations[language].itinerary}</h2>
        <p>{translations[language].comingSoon}</p>
      </div>
      <div className="section">
        <FAQComponent language={language} />
      </div>
    </div>
  );
};

export default GuestPage;
