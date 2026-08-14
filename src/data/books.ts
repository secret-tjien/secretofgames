import bookfront_EenGelukkigMens from '../files/bookfront_EenGelukkigMens.png';
import bookback_EenGelukkigMens from '../files/bookback_EenGelukkigMens.png';
import bookinside_EenGelukkigMens01 from '../files/bookscan_EenGelukkigMens01.png';
import bookinside_EenGelukkigMens02 from '../files/bookscan_EenGelukkigMens02.png';
import bookinside_EenGelukkigMens03 from '../files/bookscan_EenGelukkigMens03.png';
import bookinside_EenGelukkigMens04 from '../files/bookscan_EenGelukkigMens04.png';
import bookinside_HetPlan01 from '../files/bookscan_HetPlan01.png';
import bookinside_HetPlan02 from '../files/bookscan_HetPlan02.png';
import bookinside_HetPlan03 from '../files/bookscan_HetPlan03.png';
import bookinside_HetPlan04 from '../files/bookscan_HetPlan04.png';
import bookfront_HetPlan from '../files/bookfront_HetPlan.png';
import bookback_HetPlan from '../files/bookback_HetPlan.png';
import bookfront_KiezenVoorDeLiefde from '../files/bookfront_KiezenVoorDeLiefde.png';
import bookback_KiezenVoorDeLiefde from '../files/bookback_KiezenVoorDeLiefde.png';
import bookfront_Blijmoed from '../files/bookfront_Blijmoed.png';
import bookback_Blijmoed from '../files/bookback_Blijmoed.png';
import bookfront_DiepInU from '../files/bookfront_DiepInU.png';
import bookback_DiepInU from '../files/bookback_DiepInU.png';
import bookfront_MaarEerstZullenWeKinderenZijn from '../files/bookfront_MaarEerstZullenWeKinderenZijn.png';
import bookback_MaarEerstZullenWeKinderenZijn from '../files/bookback_MaarEerstZullenWeKinderenZijn.png';
import bookfront_HetWasEenMooieDag from '../files/bookfront_HetWasEenMooieDag.png';
import bookback_HetWasEenMooieDag from '../files/bookback_HetWasEenMooieDag.png';

export interface Book {
  id: string;
  title: string;
  description: string[];
  pages: number;
  isbn: string;
  price: number;
  eldersPrice: number;
  stripeProductId: string;
  coverColor: string; // Used for the reflection/shadow
  preorderMessage?: string;
  personalNote?: string;
  images: {
    front: string;
    back: string;
    inside: string[];
  };
}

const DEFAULT_PERSONAL_NOTE = 'Met persoonlijke spreuk van Theije Twijnstra, alleen op secretofgames.com';

export const books: Book[] = [
  {
    id: 'kiezen-voor-de-liefde',
    title: 'Kiezen voor de liefde',
    description: [
      'Dit zelfhulpboek is voor u, ouder, partner van een verslaafde, want u heeft lang genoeg wakker gelegen, u bent lang genoeg verdrietig geweest, lang genoeg depressief geweest omdat niets hielp!',
      'Na zoveel jaren eenzaamheid is hier het boek Kiezen voor de Liefde dat u gaat helpen om vrij te worden van degene die in uw gezin verslaafd is, ongeacht aan welk middel dan ook!'
    ],
    pages: 367,
    isbn: '978-90-809194-7-1',
    price: 54.95, // Replace with real price when known
    eldersPrice: 54.95,
    stripeProductId: 'prod_UvYhpZbowCRWbH',
    coverColor: '#e11d48', // Reddish
    preorderMessage: 'Vooraf bestellen, boek verschijnt op 7 Oktober.',
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_KiezenVoorDeLiefde,
      back: bookback_KiezenVoorDeLiefde,
      inside: [],
    }
  },
  {
    id: 'een-gelukkig-mens',
    title: 'Een gelukkig mens en andere geheimen',
    description: [
      'Voor velen is dit wonderlijke werk een vertrouwd levenskompas geworden. Een boek om te lezen en te herlezen en daarna dicht bij je te houden.',
      'Als een weten dat je draagt en steeds dieper met jezelf in verbinding brengt.',
      'Met speciale tienzijdige dobbelstenen kan dit boek ook als orakel geraadpleegd worden.'
    ],
    pages: 591,
    isbn: '978-90-8091-946-4',
    price: 64.95,
    eldersPrice: 64.95,
    stripeProductId: 'prod_UvYcfDkI9yKuV0',
    coverColor: '#1d4ed8', // A blueish color matching the cover
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_EenGelukkigMens,
      back: bookback_EenGelukkigMens,
      inside: [
        bookinside_EenGelukkigMens01,
        bookinside_EenGelukkigMens02,
        bookinside_EenGelukkigMens03,
        bookinside_EenGelukkigMens04
      ],
    }
  },
  {
    id: 'het-plan',
    title: 'Het plan',
    description: [
      'Het eerste boek dat in openbaring kwam bij uitgever Kosmos onder de titel De belofte van uw leven. Daarna bij uitgeverij Voltare onder de oorspronkelijke titel: Het plan.',
      'Voor wie zijn innerlijk als een reisdoel durft te nemen van de magische wereld die men in wezen is.'
    ],
    pages: 157,
    isbn: '978-90-809194-5-7',
    price: 34.95,
    eldersPrice: 34.95,
    stripeProductId: 'prod_UvYcJK7nDIJpFJ',
    coverColor: '#059669', // A greenish color
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_HetPlan,
      back: bookback_HetPlan,
      inside: [
        bookinside_HetPlan01,
        bookinside_HetPlan02,
        bookinside_HetPlan03,
        bookinside_HetPlan04
      ],
    }
  },
  {
    id: 'blijmoed',
    title: 'Blijmoed',
    description: [
      'Gebeurtenissen in je bestaan leren ontcijferen als een logische taal. Dat is de kracht en de werking van dit boek.',
      'Leren begrijpen dat de dingen niet zomaar plaatsvinden maar dat er een samenhang bestaat tussen ons en wat er in ons leven voorvalt.',
      'Wie deze benadering kan aanvaarden, ontwikkelt zich tot een ontdekkingsreiziger en medewerker van zijn dagelijkse omstandigheden.'
    ],
    pages: 152,
    isbn: '978-90-80919-41-9',
    price: 34.95,
    eldersPrice: 34.95,
    stripeProductId: 'prod_UvYjSSHNqwCbd0',
    coverColor: '#d97706', // Yellow/Orange
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_Blijmoed,
      back: bookback_Blijmoed,
      inside: [],
    }
  },
  {
    id: 'diep-in-u',
    title: 'Diep in U',
    description: [
      'Langs methodische weg trede voor trede in uzelf afdalen, daar de reden van uw leven vinden en vanaf dat punt met de tweede ladder weer omhoog gaan, terug naar uw dagelijkse bestaan.',
      'Om vervolgens via de derde ladder uw jeugd opnieuw te interpreteren, vrij van oude reacties en vaste invalshoeken.',
      'Een ingrijpend boek voor wie het aandurft zichzelf werkelijk te leren kennen. Een te zware opgave voor velen.'
    ],
    pages: 210,
    isbn: '978-90-80919-43-3',
    price: 39.95,
    eldersPrice: 39.95,
    stripeProductId: 'prod_UvYk3H8IW5Ph0d',
    coverColor: '#f58b13', // Orange
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_DiepInU,
      back: bookback_DiepInU,
      inside: [],
    }
  },
  {
    id: 'maar-eerst-zullen-we-kinderen-zijn',
    title: 'Maar eerst zullen we kinderen zijn',
    description: [
      'Kinderlijk open and tegelijk geladen met besef wordt de lezer meegevoerd naar een wereld die meestal niet meer wordt betreden.',
      'Omdat deze te ver is weggestopt of wordt gevreesd omdat je daar met je eigen keuzen wordt geconfronteerd.',
      'Maar voor wie deze ontmoeting met zijn verborgen zijde niet schuwt, zal zich vinden en thuiskomen.'
    ],
    pages: 224,
    isbn: '978-90-80919-44-0',
    price: 34.95,
    eldersPrice: 34.95,
    stripeProductId: 'prod_UvYmjd1CGxvAH1',
    coverColor: '#0891b2', // Cyan
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_MaarEerstZullenWeKinderenZijn,
      back: bookback_MaarEerstZullenWeKinderenZijn,
      inside: [],
    }
  },
  {
    id: 'het-was-een-mooie-dag',
    title: 'Het was een mooie dag',
    description: [
      'Het is fijn om op bepaalde indringende levensmomenten teksten bij de hand te hebben die de stemming van dat moment tot uitdrukking brengen.',
      'Bij huwelijk en rouw, bij geboorte en afscheid.',
      'Wat hier is geschreven reikt over de tijd, raakt iedere betrokkene.'
    ],
    pages: 92,
    isbn: '978-90-80919-42-6',
    price: 29.95,
    eldersPrice: 29.95,
    stripeProductId: 'prod_UvYnOyORGmzcIj',
    coverColor: '#475569', // Slate
    personalNote: DEFAULT_PERSONAL_NOTE,
    images: {
      front: bookfront_HetWasEenMooieDag,
      back: bookback_HetWasEenMooieDag,
      inside: [],
    }
  }
];
