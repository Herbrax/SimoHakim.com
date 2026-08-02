/**
 * Locale registry + UI string catalogue.
 *
 * The site is language-agnostic: it renders one static page per language that
 * data.json actually provides content for. This file supplies the *chrome* —
 * nav labels, form copy, section headings — for every locale we support, so
 * adding a language to the site is only ever a content job.
 *
 * A locale needs three things to be usable:
 *   1. an entry in LOCALES (native name, text direction)
 *   2. a block in STRINGS
 *   3. content for it in data.json
 */

/** Native names, as a speaker of the language would write them. */
export const LOCALES = {
  en: { name: 'English', dir: 'ltr' },
  fr: { name: 'Français', dir: 'ltr' },
  es: { name: 'Español', dir: 'ltr' },
  pt: { name: 'Português', dir: 'ltr' },
  de: { name: 'Deutsch', dir: 'ltr' },
  nl: { name: 'Nederlands', dir: 'ltr' },
  it: { name: 'Italiano', dir: 'ltr' },
  pl: { name: 'Polski', dir: 'ltr' },
  sv: { name: 'Svenska', dir: 'ltr' },
  tr: { name: 'Türkçe', dir: 'ltr' },
  bs: { name: 'Bosanski', dir: 'ltr' },
  ru: { name: 'Русский', dir: 'ltr' },
  uk: { name: 'Українська', dir: 'ltr' },
  ja: { name: '日本語', dir: 'ltr' },
  ko: { name: '한국어', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
};

/**
 * Section headings are two-part so the second word can take the italic accent.
 * Word order differs per language, which is exactly why they aren't concatenated
 * from a single string.
 */
export const STRINGS = {
  en: {
    nav: { about: 'About', skills: 'Skills', career: 'Career', projects: 'Projects', contact: 'Contact' },
    head: {
      about: ['About', 'me'], skills: ['Skills &', 'stack'], career: ['Career', 'timeline'],
      projects: ['Personal', 'projects'], references: ['Kind', 'words'], contact: ['Get in', 'touch'],
    },
    kicker: {
      about: 'Introduction', skills: 'Technical competence', career: 'Academic & professional path',
      projects: 'Side work & experiments', references: 'References', contact: 'Contact',
    },
    level: { Advanced: 'Advanced', Intermediate: 'Intermediate', Beginner: 'Beginner' },
    ui: {
      scroll: 'Scroll', downloadCv: 'Download CV', getInTouch: 'Get in touch',
      education: 'Education', work: 'Work', current: 'Current', ongoing: 'Ongoing',
      statYears: 'Years in industry', statProjects: 'Projects shipped', statTools: 'Tools & languages',
      contactLede: 'Have a role, a project, or a question? The inbox is open.',
      replyTime: 'Usually replies within a day',
      fullName: 'Full name', email: 'Email', subject: 'Subject', message: 'Message',
      phName: 'Jane Doe', phEmail: 'jane@company.com', phSubject: 'What is this about?',
      phMessage: 'Tell me a little about it…',
      errName: 'Enter your full name', errEmail: 'Enter a valid email address',
      errMessage: 'A few more words, please',
      toastFix: 'Please fix the highlighted fields', toastSent: 'Message sent — thank you!',
      toastFail: 'Sending failed. Email {email} instead.',
      send: 'Send message', sending: 'Sending…',
      phone: 'Phone', location: 'Location',
      backToTop: 'Back to top', openMenu: 'Open menu', closeMenu: 'Close menu',
      themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme',
      language: 'Language', skip: 'Skip to content', newTab: 'opens in a new tab',
      rights: 'All rights reserved',
    },
    resume: {
      about: 'ABOUT', skills: 'SKILLS', education: 'EDUCATION', work: 'WORK EXPERIENCE',
      projects: 'PROJECTS', programming: 'Programming', data: 'Data', misc: 'Miscellaneous',
    },
  },

  fr: {
    nav: { about: 'À propos', skills: 'Compétences', career: 'Parcours', projects: 'Projets', contact: 'Contact' },
    head: {
      about: ['À', 'propos'], skills: ['Compétences &', 'outils'], career: ['Mon', 'parcours'],
      projects: ['Projets', 'personnels'], references: ['Quelques', 'mots'], contact: ['Me', 'contacter'],
    },
    kicker: {
      about: 'Introduction', skills: 'Compétences techniques', career: 'Parcours académique et professionnel',
      projects: 'Projets et expérimentations', references: 'Références', contact: 'Contact',
    },
    level: { Advanced: 'Avancé', Intermediate: 'Intermédiaire', Beginner: 'Débutant' },
    ui: {
      scroll: 'Défiler', downloadCv: 'Télécharger le CV', getInTouch: 'Me contacter',
      education: 'Formation', work: 'Expérience', current: 'Actuel', ongoing: 'En cours',
      statYears: "Ans d'expérience", statProjects: 'Projets livrés', statTools: 'Outils & langages',
      contactLede: 'Un poste, un projet ou une question ? Ma boîte est ouverte.',
      replyTime: 'Réponse sous 24 h en général',
      fullName: 'Nom complet', email: 'Courriel', subject: 'Sujet', message: 'Message',
      phName: 'Jean Tremblay', phEmail: 'jean@entreprise.com', phSubject: 'De quoi s’agit-il ?',
      phMessage: 'Dites-m’en un peu plus…',
      errName: 'Entrez votre nom complet', errEmail: 'Entrez une adresse courriel valide',
      errMessage: 'Quelques mots de plus, svp',
      toastFix: 'Corrigez les champs en surbrillance', toastSent: 'Message envoyé — merci !',
      toastFail: 'Échec de l’envoi. Écrivez à {email}.',
      send: 'Envoyer', sending: 'Envoi…',
      phone: 'Téléphone', location: 'Localisation',
      backToTop: 'Haut de page', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
      themeDark: 'Passer au thème sombre', themeLight: 'Passer au thème clair',
      language: 'Langue', skip: 'Aller au contenu', newTab: 'ouvre un nouvel onglet',
      rights: 'Tous droits réservés',
    },
    resume: {
      about: 'PROFIL', skills: 'COMPÉTENCES', education: 'FORMATION', work: 'EXPÉRIENCE PROFESSIONNELLE',
      projects: 'PROJETS', programming: 'Programmation', data: 'Données', misc: 'Divers',
    },
  },

  es: {
    nav: { about: 'Sobre mí', skills: 'Habilidades', career: 'Trayectoria', projects: 'Proyectos', contact: 'Contacto' },
    head: {
      about: ['Sobre', 'mí'], skills: ['Habilidades &', 'stack'], career: ['Mi', 'trayectoria'],
      projects: ['Proyectos', 'personales'], references: ['Buenas', 'palabras'], contact: ['Ponte en', 'contacto'],
    },
    kicker: {
      about: 'Introducción', skills: 'Competencia técnica', career: 'Trayectoria académica y profesional',
      projects: 'Trabajo paralelo y experimentos', references: 'Referencias', contact: 'Contacto',
    },
    level: { Advanced: 'Avanzado', Intermediate: 'Intermedio', Beginner: 'Principiante' },
    ui: {
      scroll: 'Desplazar', downloadCv: 'Descargar CV', getInTouch: 'Contactar',
      education: 'Formación', work: 'Experiencia', current: 'Actual', ongoing: 'En curso',
      statYears: 'Años en el sector', statProjects: 'Proyectos entregados', statTools: 'Herramientas y lenguajes',
      contactLede: '¿Un puesto, un proyecto o una pregunta? Mi bandeja está abierta.',
      replyTime: 'Suelo responder en un día',
      fullName: 'Nombre completo', email: 'Correo', subject: 'Asunto', message: 'Mensaje',
      phName: 'Ana García', phEmail: 'ana@empresa.com', phSubject: '¿De qué se trata?',
      phMessage: 'Cuéntame un poco…',
      errName: 'Escribe tu nombre completo', errEmail: 'Escribe un correo válido',
      errMessage: 'Unas palabras más, por favor',
      toastFix: 'Corrige los campos marcados', toastSent: 'Mensaje enviado — ¡gracias!',
      toastFail: 'Error al enviar. Escribe a {email}.',
      send: 'Enviar mensaje', sending: 'Enviando…',
      phone: 'Teléfono', location: 'Ubicación',
      backToTop: 'Volver arriba', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
      themeDark: 'Cambiar a tema oscuro', themeLight: 'Cambiar a tema claro',
      language: 'Idioma', skip: 'Ir al contenido', newTab: 'se abre en una pestaña nueva',
      rights: 'Todos los derechos reservados',
    },
    resume: {
      about: 'PERFIL', skills: 'HABILIDADES', education: 'FORMACIÓN', work: 'EXPERIENCIA PROFESIONAL',
      projects: 'PROYECTOS', programming: 'Programación', data: 'Datos', misc: 'Varios',
    },
  },

  pt: {
    nav: { about: 'Sobre', skills: 'Competências', career: 'Percurso', projects: 'Projetos', contact: 'Contacto' },
    head: {
      about: ['Sobre', 'mim'], skills: ['Competências &', 'stack'], career: ['O meu', 'percurso'],
      projects: ['Projetos', 'pessoais'], references: ['Boas', 'palavras'], contact: ['Entre em', 'contacto'],
    },
    kicker: {
      about: 'Introdução', skills: 'Competência técnica', career: 'Percurso académico e profissional',
      projects: 'Trabalho paralelo e experiências', references: 'Referências', contact: 'Contacto',
    },
    level: { Advanced: 'Avançado', Intermediate: 'Intermédio', Beginner: 'Iniciante' },
    ui: {
      scroll: 'Descer', downloadCv: 'Descarregar CV', getInTouch: 'Falar comigo',
      education: 'Formação', work: 'Experiência', current: 'Atual', ongoing: 'Em curso',
      statYears: 'Anos de experiência', statProjects: 'Projetos entregues', statTools: 'Ferramentas e linguagens',
      contactLede: 'Uma vaga, um projeto ou uma pergunta? A caixa está aberta.',
      replyTime: 'Costumo responder num dia',
      fullName: 'Nome completo', email: 'E-mail', subject: 'Assunto', message: 'Mensagem',
      phName: 'Ana Silva', phEmail: 'ana@empresa.com', phSubject: 'Do que se trata?',
      phMessage: 'Conte-me um pouco…',
      errName: 'Introduza o seu nome completo', errEmail: 'Introduza um e-mail válido',
      errMessage: 'Mais umas palavras, por favor',
      toastFix: 'Corrija os campos assinalados', toastSent: 'Mensagem enviada — obrigado!',
      toastFail: 'Falha no envio. Escreva para {email}.',
      send: 'Enviar mensagem', sending: 'A enviar…',
      phone: 'Telefone', location: 'Localização',
      backToTop: 'Voltar ao topo', openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
      themeDark: 'Mudar para tema escuro', themeLight: 'Mudar para tema claro',
      language: 'Idioma', skip: 'Ir para o conteúdo', newTab: 'abre num novo separador',
      rights: 'Todos os direitos reservados',
    },
    resume: {
      about: 'PERFIL', skills: 'COMPETÊNCIAS', education: 'FORMAÇÃO', work: 'EXPERIÊNCIA PROFISSIONAL',
      projects: 'PROJETOS', programming: 'Programação', data: 'Dados', misc: 'Diversos',
    },
  },

  de: {
    nav: { about: 'Über mich', skills: 'Fähigkeiten', career: 'Werdegang', projects: 'Projekte', contact: 'Kontakt' },
    head: {
      about: ['Über', 'mich'], skills: ['Fähigkeiten &', 'Stack'], career: ['Mein', 'Werdegang'],
      projects: ['Eigene', 'Projekte'], references: ['Freundliche', 'Worte'], contact: ['Kontakt', 'aufnehmen'],
    },
    kicker: {
      about: 'Einführung', skills: 'Fachliche Kompetenz', career: 'Akademischer und beruflicher Werdegang',
      projects: 'Nebenprojekte und Experimente', references: 'Referenzen', contact: 'Kontakt',
    },
    level: { Advanced: 'Fortgeschritten', Intermediate: 'Mittel', Beginner: 'Anfänger' },
    ui: {
      scroll: 'Scrollen', downloadCv: 'Lebenslauf laden', getInTouch: 'Kontakt',
      education: 'Ausbildung', work: 'Berufserfahrung', current: 'Aktuell', ongoing: 'Laufend',
      statYears: 'Jahre in der Branche', statProjects: 'Umgesetzte Projekte', statTools: 'Tools und Sprachen',
      contactLede: 'Eine Stelle, ein Projekt oder eine Frage? Mein Postfach ist offen.',
      replyTime: 'Antwort meist innerhalb eines Tages',
      fullName: 'Vollständiger Name', email: 'E-Mail', subject: 'Betreff', message: 'Nachricht',
      phName: 'Max Mustermann', phEmail: 'max@firma.de', phSubject: 'Worum geht es?',
      phMessage: 'Erzählen Sie mir kurz davon…',
      errName: 'Bitte vollständigen Namen eingeben', errEmail: 'Bitte gültige E-Mail-Adresse eingeben',
      errMessage: 'Bitte noch ein paar Worte',
      toastFix: 'Bitte markierte Felder korrigieren', toastSent: 'Nachricht gesendet — danke!',
      toastFail: 'Senden fehlgeschlagen. Schreiben Sie an {email}.',
      send: 'Nachricht senden', sending: 'Senden…',
      phone: 'Telefon', location: 'Standort',
      backToTop: 'Nach oben', openMenu: 'Menü öffnen', closeMenu: 'Menü schließen',
      themeDark: 'Zum dunklen Thema wechseln', themeLight: 'Zum hellen Thema wechseln',
      language: 'Sprache', skip: 'Zum Inhalt springen', newTab: 'öffnet in neuem Tab',
      rights: 'Alle Rechte vorbehalten',
    },
    resume: {
      about: 'PROFIL', skills: 'FÄHIGKEITEN', education: 'AUSBILDUNG', work: 'BERUFSERFAHRUNG',
      projects: 'PROJEKTE', programming: 'Programmierung', data: 'Daten', misc: 'Sonstiges',
    },
  },

  nl: {
    nav: { about: 'Over mij', skills: 'Vaardigheden', career: 'Loopbaan', projects: 'Projecten', contact: 'Contact' },
    head: {
      about: ['Over', 'mij'], skills: ['Vaardigheden &', 'stack'], career: ['Mijn', 'loopbaan'],
      projects: ['Eigen', 'projecten'], references: ['Mooie', 'woorden'], contact: ['Neem', 'contact op'],
    },
    kicker: {
      about: 'Introductie', skills: 'Technische vaardigheid', career: 'Academisch en professioneel pad',
      projects: 'Nevenprojecten en experimenten', references: 'Referenties', contact: 'Contact',
    },
    level: { Advanced: 'Gevorderd', Intermediate: 'Gemiddeld', Beginner: 'Beginner' },
    ui: {
      scroll: 'Scrollen', downloadCv: 'Download cv', getInTouch: 'Contact opnemen',
      education: 'Opleiding', work: 'Werkervaring', current: 'Huidig', ongoing: 'Lopend',
      statYears: 'Jaar in het vak', statProjects: 'Opgeleverde projecten', statTools: 'Tools en talen',
      contactLede: 'Een functie, een project of een vraag? Mijn inbox staat open.',
      replyTime: 'Meestal antwoord binnen een dag',
      fullName: 'Volledige naam', email: 'E-mail', subject: 'Onderwerp', message: 'Bericht',
      phName: 'Jan Jansen', phEmail: 'jan@bedrijf.nl', phSubject: 'Waar gaat het over?',
      phMessage: 'Vertel er kort iets over…',
      errName: 'Vul je volledige naam in', errEmail: 'Vul een geldig e-mailadres in',
      errMessage: 'Nog een paar woorden graag',
      toastFix: 'Corrigeer de gemarkeerde velden', toastSent: 'Bericht verzonden — bedankt!',
      toastFail: 'Verzenden mislukt. Mail naar {email}.',
      send: 'Bericht sturen', sending: 'Verzenden…',
      phone: 'Telefoon', location: 'Locatie',
      backToTop: 'Naar boven', openMenu: 'Menu openen', closeMenu: 'Menu sluiten',
      themeDark: 'Naar donker thema', themeLight: 'Naar licht thema',
      language: 'Taal', skip: 'Naar inhoud', newTab: 'opent in nieuw tabblad',
      rights: 'Alle rechten voorbehouden',
    },
    resume: {
      about: 'PROFIEL', skills: 'VAARDIGHEDEN', education: 'OPLEIDING', work: 'WERKERVARING',
      projects: 'PROJECTEN', programming: 'Programmeren', data: 'Data', misc: 'Overig',
    },
  },

  it: {
    nav: { about: 'Chi sono', skills: 'Competenze', career: 'Percorso', projects: 'Progetti', contact: 'Contatti' },
    head: {
      about: ['Chi', 'sono'], skills: ['Competenze &', 'stack'], career: ['Il mio', 'percorso'],
      projects: ['Progetti', 'personali'], references: ['Belle', 'parole'], contact: ['Mettiti in', 'contatto'],
    },
    kicker: {
      about: 'Introduzione', skills: 'Competenza tecnica', career: 'Percorso accademico e professionale',
      projects: 'Progetti collaterali ed esperimenti', references: 'Referenze', contact: 'Contatti',
    },
    level: { Advanced: 'Avanzato', Intermediate: 'Intermedio', Beginner: 'Principiante' },
    ui: {
      scroll: 'Scorri', downloadCv: 'Scarica il CV', getInTouch: 'Contattami',
      education: 'Formazione', work: 'Esperienza', current: 'Attuale', ongoing: 'In corso',
      statYears: 'Anni nel settore', statProjects: 'Progetti realizzati', statTools: 'Strumenti e linguaggi',
      contactLede: 'Una posizione, un progetto o una domanda? La casella è aperta.',
      replyTime: 'Di solito rispondo in un giorno',
      fullName: 'Nome completo', email: 'Email', subject: 'Oggetto', message: 'Messaggio',
      phName: 'Mario Rossi', phEmail: 'mario@azienda.it', phSubject: 'Di cosa si tratta?',
      phMessage: 'Raccontami qualcosa…',
      errName: 'Inserisci il tuo nome completo', errEmail: 'Inserisci un indirizzo email valido',
      errMessage: 'Ancora qualche parola, per favore',
      toastFix: 'Correggi i campi evidenziati', toastSent: 'Messaggio inviato — grazie!',
      toastFail: 'Invio non riuscito. Scrivi a {email}.',
      send: 'Invia messaggio', sending: 'Invio…',
      phone: 'Telefono', location: 'Località',
      backToTop: 'Torna su', openMenu: 'Apri menu', closeMenu: 'Chiudi menu',
      themeDark: 'Passa al tema scuro', themeLight: 'Passa al tema chiaro',
      language: 'Lingua', skip: 'Vai al contenuto', newTab: 'si apre in una nuova scheda',
      rights: 'Tutti i diritti riservati',
    },
    resume: {
      about: 'PROFILO', skills: 'COMPETENZE', education: 'FORMAZIONE', work: 'ESPERIENZA PROFESSIONALE',
      projects: 'PROGETTI', programming: 'Programmazione', data: 'Dati', misc: 'Varie',
    },
  },

  pl: {
    nav: { about: 'O mnie', skills: 'Umiejętności', career: 'Ścieżka', projects: 'Projekty', contact: 'Kontakt' },
    head: {
      about: ['O', 'mnie'], skills: ['Umiejętności i', 'stack'], career: ['Moja', 'ścieżka'],
      projects: ['Projekty', 'własne'], references: ['Miłe', 'słowa'], contact: ['Skontaktuj', 'się'],
    },
    kicker: {
      about: 'Wprowadzenie', skills: 'Kompetencje techniczne', career: 'Ścieżka akademicka i zawodowa',
      projects: 'Projekty dodatkowe i eksperymenty', references: 'Referencje', contact: 'Kontakt',
    },
    level: { Advanced: 'Zaawansowany', Intermediate: 'Średni', Beginner: 'Początkujący' },
    ui: {
      scroll: 'Przewiń', downloadCv: 'Pobierz CV', getInTouch: 'Napisz do mnie',
      education: 'Wykształcenie', work: 'Doświadczenie', current: 'Obecnie', ongoing: 'W trakcie',
      statYears: 'Lat w branży', statProjects: 'Zrealizowane projekty', statTools: 'Narzędzia i języki',
      contactLede: 'Stanowisko, projekt albo pytanie? Skrzynka jest otwarta.',
      replyTime: 'Zwykle odpowiadam w ciągu doby',
      fullName: 'Imię i nazwisko', email: 'E-mail', subject: 'Temat', message: 'Wiadomość',
      phName: 'Jan Kowalski', phEmail: 'jan@firma.pl', phSubject: 'Czego dotyczy?',
      phMessage: 'Napisz kilka słów…',
      errName: 'Podaj imię i nazwisko', errEmail: 'Podaj poprawny adres e-mail',
      errMessage: 'Poproszę jeszcze kilka słów',
      toastFix: 'Popraw zaznaczone pola', toastSent: 'Wiadomość wysłana — dziękuję!',
      toastFail: 'Wysyłka nie powiodła się. Napisz na {email}.',
      send: 'Wyślij wiadomość', sending: 'Wysyłanie…',
      phone: 'Telefon', location: 'Lokalizacja',
      backToTop: 'Do góry', openMenu: 'Otwórz menu', closeMenu: 'Zamknij menu',
      themeDark: 'Przełącz na ciemny motyw', themeLight: 'Przełącz na jasny motyw',
      language: 'Język', skip: 'Przejdź do treści', newTab: 'otwiera się w nowej karcie',
      rights: 'Wszelkie prawa zastrzeżone',
    },
    resume: {
      about: 'PROFIL', skills: 'UMIEJĘTNOŚCI', education: 'WYKSZTAŁCENIE', work: 'DOŚWIADCZENIE ZAWODOWE',
      projects: 'PROJEKTY', programming: 'Programowanie', data: 'Dane', misc: 'Różne',
    },
  },

  sv: {
    nav: { about: 'Om mig', skills: 'Färdigheter', career: 'Karriär', projects: 'Projekt', contact: 'Kontakt' },
    head: {
      about: ['Om', 'mig'], skills: ['Färdigheter &', 'stack'], career: ['Min', 'karriär'],
      projects: ['Egna', 'projekt'], references: ['Vänliga', 'ord'], contact: ['Hör av', 'dig'],
    },
    kicker: {
      about: 'Introduktion', skills: 'Teknisk kompetens', career: 'Akademisk och yrkesmässig bana',
      projects: 'Sidoprojekt och experiment', references: 'Referenser', contact: 'Kontakt',
    },
    level: { Advanced: 'Avancerad', Intermediate: 'Medel', Beginner: 'Nybörjare' },
    ui: {
      scroll: 'Skrolla', downloadCv: 'Ladda ner CV', getInTouch: 'Kontakta mig',
      education: 'Utbildning', work: 'Erfarenhet', current: 'Nuvarande', ongoing: 'Pågående',
      statYears: 'År i branschen', statProjects: 'Levererade projekt', statTools: 'Verktyg och språk',
      contactLede: 'En roll, ett projekt eller en fråga? Inkorgen är öppen.',
      replyTime: 'Svarar oftast inom ett dygn',
      fullName: 'Fullständigt namn', email: 'E-post', subject: 'Ämne', message: 'Meddelande',
      phName: 'Anna Andersson', phEmail: 'anna@foretag.se', phSubject: 'Vad gäller det?',
      phMessage: 'Berätta lite…',
      errName: 'Ange ditt fullständiga namn', errEmail: 'Ange en giltig e-postadress',
      errMessage: 'Några ord till, tack',
      toastFix: 'Rätta de markerade fälten', toastSent: 'Meddelandet skickat — tack!',
      toastFail: 'Sändningen misslyckades. Mejla {email}.',
      send: 'Skicka meddelande', sending: 'Skickar…',
      phone: 'Telefon', location: 'Plats',
      backToTop: 'Till toppen', openMenu: 'Öppna meny', closeMenu: 'Stäng meny',
      themeDark: 'Byt till mörkt tema', themeLight: 'Byt till ljust tema',
      language: 'Språk', skip: 'Till innehåll', newTab: 'öppnas i ny flik',
      rights: 'Alla rättigheter förbehållna',
    },
    resume: {
      about: 'PROFIL', skills: 'FÄRDIGHETER', education: 'UTBILDNING', work: 'ARBETSLIVSERFARENHET',
      projects: 'PROJEKT', programming: 'Programmering', data: 'Data', misc: 'Övrigt',
    },
  },

  tr: {
    nav: { about: 'Hakkımda', skills: 'Yetenekler', career: 'Kariyer', projects: 'Projeler', contact: 'İletişim' },
    head: {
      about: ['Ben', 'kimim'], skills: ['Yetenekler ve', 'stack'], career: ['Kariyer', 'yolculuğum'],
      projects: ['Kişisel', 'projeler'], references: ['Güzel', 'sözler'], contact: ['İletişime', 'geç'],
    },
    kicker: {
      about: 'Tanıtım', skills: 'Teknik yetkinlik', career: 'Akademik ve profesyonel yol',
      projects: 'Yan projeler ve denemeler', references: 'Referanslar', contact: 'İletişim',
    },
    level: { Advanced: 'İleri', Intermediate: 'Orta', Beginner: 'Başlangıç' },
    ui: {
      scroll: 'Kaydır', downloadCv: 'CV indir', getInTouch: 'İletişime geç',
      education: 'Eğitim', work: 'Deneyim', current: 'Güncel', ongoing: 'Devam ediyor',
      statYears: 'Sektörde yıl', statProjects: 'Tamamlanan proje', statTools: 'Araç ve dil',
      contactLede: 'Bir pozisyon, bir proje ya da bir soru mu? Kutum açık.',
      replyTime: 'Genelde bir gün içinde yanıtlarım',
      fullName: 'Ad soyad', email: 'E-posta', subject: 'Konu', message: 'Mesaj',
      phName: 'Ayşe Yılmaz', phEmail: 'ayse@sirket.com', phSubject: 'Konu nedir?',
      phMessage: 'Biraz anlatın…',
      errName: 'Ad soyad girin', errEmail: 'Geçerli bir e-posta girin',
      errMessage: 'Birkaç kelime daha lütfen',
      toastFix: 'İşaretli alanları düzeltin', toastSent: 'Mesaj gönderildi — teşekkürler!',
      toastFail: 'Gönderilemedi. {email} adresine yazın.',
      send: 'Mesaj gönder', sending: 'Gönderiliyor…',
      phone: 'Telefon', location: 'Konum',
      backToTop: 'Başa dön', openMenu: 'Menüyü aç', closeMenu: 'Menüyü kapat',
      themeDark: 'Koyu temaya geç', themeLight: 'Açık temaya geç',
      language: 'Dil', skip: 'İçeriğe atla', newTab: 'yeni sekmede açılır',
      rights: 'Tüm hakları saklıdır',
    },
    resume: {
      about: 'PROFİL', skills: 'YETENEKLER', education: 'EĞİTİM', work: 'İŞ DENEYİMİ',
      projects: 'PROJELER', programming: 'Programlama', data: 'Veri', misc: 'Diğer',
    },
  },

  bs: {
    nav: { about: 'O meni', skills: 'Vještine', career: 'Karijera', projects: 'Projekti', contact: 'Kontakt' },
    head: {
      about: ['O', 'meni'], skills: ['Vještine i', 'stack'], career: ['Moja', 'karijera'],
      projects: ['Lični', 'projekti'], references: ['Lijepe', 'riječi'], contact: ['Javi', 'se'],
    },
    kicker: {
      about: 'Uvod', skills: 'Tehničke kompetencije', career: 'Akademski i profesionalni put',
      projects: 'Sporedni projekti i eksperimenti', references: 'Reference', contact: 'Kontakt',
    },
    level: { Advanced: 'Napredno', Intermediate: 'Srednje', Beginner: 'Početnik' },
    ui: {
      scroll: 'Skrolaj', downloadCv: 'Preuzmi CV', getInTouch: 'Kontaktiraj me',
      education: 'Obrazovanje', work: 'Iskustvo', current: 'Trenutno', ongoing: 'U toku',
      statYears: 'Godina u struci', statProjects: 'Realizovanih projekata', statTools: 'Alati i jezici',
      contactLede: 'Pozicija, projekat ili pitanje? Inbox je otvoren.',
      replyTime: 'Obično odgovorim u roku od dana',
      fullName: 'Ime i prezime', email: 'E-mail', subject: 'Naslov', message: 'Poruka',
      phName: 'Amina Hodžić', phEmail: 'amina@firma.ba', phSubject: 'O čemu se radi?',
      phMessage: 'Recite mi ukratko…',
      errName: 'Unesite ime i prezime', errEmail: 'Unesite ispravnu e-mail adresu',
      errMessage: 'Još nekoliko riječi, molim',
      toastFix: 'Ispravite označena polja', toastSent: 'Poruka poslana — hvala!',
      toastFail: 'Slanje nije uspjelo. Pišite na {email}.',
      send: 'Pošalji poruku', sending: 'Slanje…',
      phone: 'Telefon', location: 'Lokacija',
      backToTop: 'Na vrh', openMenu: 'Otvori meni', closeMenu: 'Zatvori meni',
      themeDark: 'Pređi na tamnu temu', themeLight: 'Pređi na svijetlu temu',
      language: 'Jezik', skip: 'Idi na sadržaj', newTab: 'otvara se u novoj kartici',
      rights: 'Sva prava zadržana',
    },
    resume: {
      about: 'PROFIL', skills: 'VJEŠTINE', education: 'OBRAZOVANJE', work: 'RADNO ISKUSTVO',
      projects: 'PROJEKTI', programming: 'Programiranje', data: 'Podaci', misc: 'Ostalo',
    },
  },

  ru: {
    nav: { about: 'Обо мне', skills: 'Навыки', career: 'Карьера', projects: 'Проекты', contact: 'Контакты' },
    head: {
      about: ['Обо', 'мне'], skills: ['Навыки и', 'стек'], career: ['Мой', 'путь'],
      projects: ['Личные', 'проекты'], references: ['Добрые', 'слова'], contact: ['Свяжитесь', 'со мной'],
    },
    kicker: {
      about: 'Введение', skills: 'Технические компетенции', career: 'Учёба и профессиональный путь',
      projects: 'Личные проекты и эксперименты', references: 'Рекомендации', contact: 'Контакты',
    },
    level: { Advanced: 'Продвинутый', Intermediate: 'Средний', Beginner: 'Начальный' },
    ui: {
      scroll: 'Прокрутить', downloadCv: 'Скачать резюме', getInTouch: 'Написать мне',
      education: 'Образование', work: 'Опыт', current: 'Сейчас', ongoing: 'В процессе',
      statYears: 'Лет в профессии', statProjects: 'Реализовано проектов', statTools: 'Инструменты и языки',
      contactLede: 'Вакансия, проект или вопрос? Почта открыта.',
      replyTime: 'Обычно отвечаю в течение суток',
      fullName: 'Полное имя', email: 'Эл. почта', subject: 'Тема', message: 'Сообщение',
      phName: 'Иван Иванов', phEmail: 'ivan@company.ru', phSubject: 'О чём речь?',
      phMessage: 'Расскажите вкратце…',
      errName: 'Введите полное имя', errEmail: 'Введите корректный адрес почты',
      errMessage: 'Ещё пару слов, пожалуйста',
      toastFix: 'Исправьте выделенные поля', toastSent: 'Сообщение отправлено — спасибо!',
      toastFail: 'Не удалось отправить. Напишите на {email}.',
      send: 'Отправить', sending: 'Отправка…',
      phone: 'Телефон', location: 'Местоположение',
      backToTop: 'Наверх', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню',
      themeDark: 'Тёмная тема', themeLight: 'Светлая тема',
      language: 'Язык', skip: 'К содержанию', newTab: 'откроется в новой вкладке',
      rights: 'Все права защищены',
    },
    resume: {
      about: 'О СЕБЕ', skills: 'НАВЫКИ', education: 'ОБРАЗОВАНИЕ', work: 'ОПЫТ РАБОТЫ',
      projects: 'ПРОЕКТЫ', programming: 'Программирование', data: 'Данные', misc: 'Прочее',
    },
  },

  uk: {
    nav: { about: 'Про мене', skills: 'Навички', career: 'Кар’єра', projects: 'Проєкти', contact: 'Контакти' },
    head: {
      about: ['Про', 'мене'], skills: ['Навички та', 'стек'], career: ['Мій', 'шлях'],
      projects: ['Особисті', 'проєкти'], references: ['Добрі', 'слова'], contact: ['Зв’яжіться', 'зі мною'],
    },
    kicker: {
      about: 'Вступ', skills: 'Технічні компетенції', career: 'Навчання та професійний шлях',
      projects: 'Побічні проєкти й експерименти', references: 'Рекомендації', contact: 'Контакти',
    },
    level: { Advanced: 'Просунутий', Intermediate: 'Середній', Beginner: 'Початковий' },
    ui: {
      scroll: 'Гортати', downloadCv: 'Завантажити резюме', getInTouch: 'Написати мені',
      education: 'Освіта', work: 'Досвід', current: 'Зараз', ongoing: 'Триває',
      statYears: 'Років у професії', statProjects: 'Реалізовано проєктів', statTools: 'Інструменти та мови',
      contactLede: 'Вакансія, проєкт чи питання? Пошта відкрита.',
      replyTime: 'Зазвичай відповідаю протягом доби',
      fullName: 'Повне ім’я', email: 'Ел. пошта', subject: 'Тема', message: 'Повідомлення',
      phName: 'Іван Ковальчук', phEmail: 'ivan@company.ua', phSubject: 'Про що йдеться?',
      phMessage: 'Розкажіть коротко…',
      errName: 'Введіть повне ім’я', errEmail: 'Введіть коректну адресу пошти',
      errMessage: 'Ще кілька слів, будь ласка',
      toastFix: 'Виправте позначені поля', toastSent: 'Повідомлення надіслано — дякую!',
      toastFail: 'Не вдалося надіслати. Напишіть на {email}.',
      send: 'Надіслати', sending: 'Надсилання…',
      phone: 'Телефон', location: 'Місце',
      backToTop: 'Вгору', openMenu: 'Відкрити меню', closeMenu: 'Закрити меню',
      themeDark: 'Темна тема', themeLight: 'Світла тема',
      language: 'Мова', skip: 'До вмісту', newTab: 'відкриється в новій вкладці',
      rights: 'Усі права захищено',
    },
    resume: {
      about: 'ПРО СЕБЕ', skills: 'НАВИЧКИ', education: 'ОСВІТА', work: 'ДОСВІД РОБОТИ',
      projects: 'ПРОЄКТИ', programming: 'Програмування', data: 'Дані', misc: 'Інше',
    },
  },

  ja: {
    nav: { about: '概要', skills: 'スキル', career: '経歴', projects: '制作', contact: '連絡先' },
    head: {
      about: ['私に', 'ついて'], skills: ['スキルと', '技術'], career: ['これまでの', '歩み'],
      projects: ['個人', 'プロジェクト'], references: ['いただいた', '言葉'], contact: ['お問い', '合わせ'],
    },
    kicker: {
      about: 'イントロダクション', skills: '技術スキル', career: '学歴と職歴',
      projects: '個人開発と実験', references: '推薦の言葉', contact: 'お問い合わせ',
    },
    level: { Advanced: '上級', Intermediate: '中級', Beginner: '初級' },
    ui: {
      scroll: 'スクロール', downloadCv: '履歴書をダウンロード', getInTouch: 'お問い合わせ',
      education: '学歴', work: '職歴', current: '現職', ongoing: '進行中',
      statYears: '業界での年数', statProjects: '完成プロジェクト', statTools: 'ツールと言語',
      contactLede: '求人、プロジェクト、ご質問など、お気軽にどうぞ。',
      replyTime: '通常1日以内に返信します',
      fullName: '氏名', email: 'メールアドレス', subject: '件名', message: 'メッセージ',
      phName: '山田 太郎', phEmail: 'taro@company.jp', phSubject: 'ご用件は何でしょうか',
      phMessage: '概要をお聞かせください…',
      errName: '氏名を入力してください', errEmail: '有効なメールアドレスを入力してください',
      errMessage: 'もう少し詳しくお願いします',
      toastFix: '入力内容をご確認ください', toastSent: '送信しました。ありがとうございます！',
      toastFail: '送信に失敗しました。{email} 宛にご連絡ください。',
      send: '送信する', sending: '送信中…',
      phone: '電話', location: '所在地',
      backToTop: 'トップへ戻る', openMenu: 'メニューを開く', closeMenu: 'メニューを閉じる',
      themeDark: 'ダークテーマに切り替え', themeLight: 'ライトテーマに切り替え',
      language: '言語', skip: '本文へスキップ', newTab: '新しいタブで開きます',
      rights: 'All rights reserved',
    },
    resume: {
      about: 'プロフィール', skills: 'スキル', education: '学歴', work: '職務経歴',
      projects: 'プロジェクト', programming: 'プログラミング', data: 'データ', misc: 'その他',
    },
  },

  ko: {
    nav: { about: '소개', skills: '기술', career: '경력', projects: '프로젝트', contact: '연락처' },
    head: {
      about: ['저에', '대해'], skills: ['기술과', '스택'], career: ['나의', '경력'],
      projects: ['개인', '프로젝트'], references: ['따뜻한', '말'], contact: ['연락', '하기'],
    },
    kicker: {
      about: '소개', skills: '기술 역량', career: '학업 및 경력',
      projects: '사이드 프로젝트와 실험', references: '추천사', contact: '연락처',
    },
    level: { Advanced: '고급', Intermediate: '중급', Beginner: '초급' },
    ui: {
      scroll: '스크롤', downloadCv: '이력서 다운로드', getInTouch: '연락하기',
      education: '학력', work: '경력', current: '재직 중', ongoing: '진행 중',
      statYears: '업계 경력', statProjects: '완료한 프로젝트', statTools: '도구와 언어',
      contactLede: '채용, 프로젝트, 질문 무엇이든 편하게 보내주세요.',
      replyTime: '보통 하루 안에 답장합니다',
      fullName: '이름', email: '이메일', subject: '제목', message: '메시지',
      phName: '홍길동', phEmail: 'gildong@company.kr', phSubject: '어떤 내용인가요?',
      phMessage: '간단히 알려주세요…',
      errName: '이름을 입력하세요', errEmail: '올바른 이메일을 입력하세요',
      errMessage: '조금만 더 적어주세요',
      toastFix: '표시된 항목을 확인하세요', toastSent: '메시지를 보냈습니다. 감사합니다!',
      toastFail: '전송에 실패했습니다. {email} 로 보내주세요.',
      send: '메시지 보내기', sending: '보내는 중…',
      phone: '전화', location: '위치',
      backToTop: '맨 위로', openMenu: '메뉴 열기', closeMenu: '메뉴 닫기',
      themeDark: '어두운 테마로 전환', themeLight: '밝은 테마로 전환',
      language: '언어', skip: '본문으로 이동', newTab: '새 탭에서 열립니다',
      rights: 'All rights reserved',
    },
    resume: {
      about: '프로필', skills: '기술', education: '학력', work: '경력',
      projects: '프로젝트', programming: '프로그래밍', data: '데이터', misc: '기타',
    },
  },

  ar: {
    nav: { about: 'نبذة', skills: 'المهارات', career: 'المسيرة', projects: 'المشاريع', contact: 'التواصل' },
    head: {
      about: ['نبذة', 'عني'], skills: ['المهارات و', 'الأدوات'], career: ['مسيرتي', 'المهنية'],
      projects: ['مشاريع', 'شخصية'], references: ['كلمات', 'طيبة'], contact: ['تواصل', 'معي'],
    },
    kicker: {
      about: 'مقدمة', skills: 'الكفاءة التقنية', career: 'المسار الأكاديمي والمهني',
      projects: 'مشاريع جانبية وتجارب', references: 'توصيات', contact: 'التواصل',
    },
    level: { Advanced: 'متقدم', Intermediate: 'متوسط', Beginner: 'مبتدئ' },
    ui: {
      scroll: 'مرّر', downloadCv: 'تحميل السيرة الذاتية', getInTouch: 'تواصل معي',
      education: 'التعليم', work: 'الخبرة', current: 'حالي', ongoing: 'جارٍ',
      statYears: 'سنوات في المجال', statProjects: 'مشاريع منجزة', statTools: 'أدوات ولغات',
      contactLede: 'وظيفة أو مشروع أو سؤال؟ صندوق الرسائل مفتوح.',
      replyTime: 'أرد عادة خلال يوم',
      fullName: 'الاسم الكامل', email: 'البريد الإلكتروني', subject: 'الموضوع', message: 'الرسالة',
      phName: 'محمد أحمد', phEmail: 'mohamed@company.com', phSubject: 'ما موضوع الرسالة؟',
      phMessage: 'أخبرني قليلاً…',
      errName: 'أدخل اسمك الكامل', errEmail: 'أدخل بريدًا إلكترونيًا صالحًا',
      errMessage: 'أضف بضع كلمات أخرى',
      toastFix: 'صحّح الحقول المحددة', toastSent: 'تم إرسال الرسالة — شكرًا!',
      toastFail: 'فشل الإرسال. راسلني على {email}.',
      send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…',
      phone: 'الهاتف', location: 'الموقع',
      backToTop: 'إلى الأعلى', openMenu: 'فتح القائمة', closeMenu: 'إغلاق القائمة',
      themeDark: 'التبديل إلى الوضع الداكن', themeLight: 'التبديل إلى الوضع الفاتح',
      language: 'اللغة', skip: 'تخطٍ إلى المحتوى', newTab: 'يفتح في تبويب جديد',
      rights: 'جميع الحقوق محفوظة',
    },
    resume: {
      about: 'نبذة', skills: 'المهارات', education: 'التعليم', work: 'الخبرة المهنية',
      projects: 'المشاريع', programming: 'البرمجة', data: 'البيانات', misc: 'متنوع',
    },
  },
};

/**
 * Pick a localized value.
 *
 * Accepts either a plain string (same in every language — names, dates, URLs)
 * or a `{ en: "…", fr: "…" }` map. Falls back to the default language, then to
 * whatever translation exists, so a half-translated file still renders.
 */
export const L = (value, lang, fallback = 'en') => {
  if (value == null) return '';
  if (typeof value !== 'object' || Array.isArray(value)) return String(value);
  return value[lang] ?? value[fallback] ?? Object.values(value).find(Boolean) ?? '';
};

/** UI strings for a language, falling back to English for anything missing. */
export const t = (lang) => {
  const base = STRINGS.en;
  const over = STRINGS[lang] || {};
  return {
    nav: { ...base.nav, ...over.nav },
    head: { ...base.head, ...over.head },
    kicker: { ...base.kicker, ...over.kicker },
    level: { ...base.level, ...over.level },
    ui: { ...base.ui, ...over.ui },
    resume: { ...base.resume, ...over.resume },
  };
};

/** Languages that have both a UI catalogue and content in the given data file. */
export const languagesIn = (data) => {
  const declared = Array.isArray(data.languages) && data.languages.length ? data.languages : null;
  const found = new Set();
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach(walk);
    const keys = Object.keys(node);
    // a translation map is an object whose keys are all known locale codes
    if (keys.length && keys.every((k) => k in LOCALES)) keys.forEach((k) => found.add(k));
    else Object.values(node).forEach(walk);
  };
  walk(data);
  const list = declared || [...found];
  return list.filter((code) => code in LOCALES);
};
