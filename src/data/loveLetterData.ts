export interface MemoryCardData {
  id: string;
  fileName: string;
  chapterNumber: string;
  dateLabel: string;
  title: string;
  subtitle: string;
  secretNote: string;
  lyricVerse: string;
  moodColor: string;
  aspectRatio: 'portrait' | 'landscape';
  defaultImageUrl: string;
}

export interface BoleroStanza {
  id: string;
  title: string;
  lines: string[];
  reflection: string;
}

export interface SecretCapsule {
  id: string;
  number: string;
  promptTitle: string;
  hiddenTitle: string;
  hiddenMessage: string;
  heartCount: number;
}

// Direct Vite static imports of the user's 10 original photos & MP3 song from /imagenes and /Audio
import img1BirthdayMirror from '../../imagenes/IMG-20240930-WA0017.jpg';
import img2BirthdayClose from '../../imagenes/IMG-20240930-WA0028.jpg';
import img3BirthdayHug from '../../imagenes/IMG-20240930-WA0047.jpg';
import img4VisitDay from '../../imagenes/IMG-20241104-WA0054.jpg';
import img5GoingOutBW from '../../imagenes/IMG-20241104-WA0082.jpg';
import img6AguinaldoLoyola from '../../imagenes/IMG-20241207-WA0005.jpg';
import img7NewYear from '../../imagenes/IMG-20250102-WA0033.jpg';
import img8GymTogether from '../../imagenes/IMG-20250122-WA0018.jpg';
import img9ValentinesDay from '../../imagenes/IMG-20250215-WA0017.jpg';
import img10PoolLastAsCouple from '../../imagenes/IMG-20250222-WA0083.jpg';
import contigoMp3 from '../../Audio/Contigo - Los Panchos - Letra 💕.mp3';

export const ORIGINAL_BOLERO_MP3 = contigoMp3;

export const INITIAL_MEMORIES: MemoryCardData[] = [
  {
    id: 'mem-1',
    fileName: 'IMG-20240930-WA0017.jpg',
    chapterNumber: '01',
    dateLabel: 'El día de tu cumpleaños · Frente al espejo',
    title: 'Celebrando tu vida entre mis brazos',
    subtitle: 'Abrazándote por la cintura en tu cumpleaños',
    secretNote:
      'Ese día celebrábamos tu cumpleaños, y mientras te mirabas en el espejo con tu vestido color vino, yo solo pensaba en la dicha tan grande de poder abrazarte y compartir tu felicidad.',
    lyricVerse: '«Tus besos se llegaron a recrear aquí en mi boca...»',
    moodColor: '#9F1239',
    aspectRatio: 'portrait',
    defaultImageUrl: img1BirthdayMirror,
  },
  {
    id: 'mem-2',
    fileName: 'IMG-20240930-WA0028.jpg',
    chapterNumber: '02',
    dateLabel: 'El día de tu cumpleaños · Juntando nuestras mejillas',
    title: 'Tu cumpleaños tan cerca de mí',
    subtitle: 'La complicidad y la alegría de ese día especial',
    secretNote:
      'Otra foto de tu cumpleaños que guardo en el alma. Pegar mi rostro al tuyo y ver cómo nos mirábamos refleja exactamente lo felices que éramos juntos.',
    lyricVerse: '«Llenando de ilusión y de pasión mi vida loca...»',
    moodColor: '#BE123C',
    aspectRatio: 'landscape',
    defaultImageUrl: img2BirthdayClose,
  },
  {
    id: 'mem-3',
    fileName: 'IMG-20240930-WA0047.jpg',
    chapterNumber: '03',
    dateLabel: 'El día de tu cumpleaños · Risas y cariño',
    title: 'Cerrando tu cumpleaños entre risas',
    subtitle: 'Esos segundos donde solo existíamos tú y yo',
    secretNote:
      'En tu cumpleaños no faltaron las risas, los juegos y esa confianza única que teníamos. Verte sonreír así entre mis brazos hacía que todo valiera la pena.',
    lyricVerse: '«Las horas más felices de mi amor fueron contigo...»',
    moodColor: '#881337',
    aspectRatio: 'landscape',
    defaultImageUrl: img3BirthdayHug,
  },
  {
    id: 'mem-4',
    fileName: 'IMG-20241104-WA0054.jpg',
    chapterNumber: '04',
    dateLabel: 'Un día normal · Cuando iba a visitarte',
    title: 'La felicidad de ir a verte',
    subtitle: 'Convertías cualquier día común en mi favorito',
    secretNote:
      'No hacía falta una fecha especial; un día normal de esos en los que iba a visitarte a tu casa me bastaba para sentirme el hombre más afortunado solo con estar a tu lado.',
    lyricVerse: '«Por eso es que mi alma siempre extraña el dulce alivio...»',
    moodColor: '#9F1239',
    aspectRatio: 'landscape',
    defaultImageUrl: img4VisitDay,
  },
  {
    id: 'mem-5',
    fileName: 'IMG-20241104-WA0082.jpg',
    chapterNumber: '05',
    dateLabel: 'Cuando salíamos juntos · De paseo',
    title: 'Nuestras salidas juntos',
    subtitle: 'Abrazándote antes de salir de paseo',
    secretNote:
      'Esta foto frente al espejo me recuerda lo mucho que disfrutaba cuando salíamos juntos y el cariño tan bonito de ir a pasear contigo y con tu familia.',
    lyricVerse: '«Te puedo yo jurar ante un altar mi amor sincero...»',
    moodColor: '#4C0519',
    aspectRatio: 'portrait',
    defaultImageUrl: img5GoingOutBW,
  },
  {
    id: 'mem-6',
    fileName: 'IMG-20241207-WA0005.jpg',
    chapterNumber: '06',
    dateLabel: 'Diciembre · En el Aguinaldo de Loyola',
    title: 'Aquella noche en el Aguinaldo de Loyola',
    subtitle: 'Compartiendo la brisa, la música y tu mirada',
    secretNote:
      'Sentados juntos en el Aguinaldo de Loyola, viéndote apoyada en tus manos con esa sonrisa tan dulce. Qué bonitos eran nuestros momentos compartiendo afuera.',
    lyricVerse: '«A todo el mundo le puedes contar que sí te quiero...»',
    moodColor: '#BE123C',
    aspectRatio: 'landscape',
    defaultImageUrl: img6AguinaldoLoyola,
  },
  {
    id: 'mem-7',
    fileName: 'IMG-20250102-WA0033.jpg',
    chapterNumber: '07',
    dateLabel: 'Año Nuevo · Entre luces y sueños',
    title: 'Recibiendo el Año Nuevo contigo',
    subtitle: 'Brillando juntos entre las luces de fiesta',
    secretNote:
      'En Año Nuevo, rodeados de luces, mi mayor alegría era tenerte conmigo. Empezar el año a tu lado fue uno de los regalos más hermosos que me dio la vida.',
    lyricVerse: '«Tus labios me enseñaron a sentir lo que es ternura...»',
    moodColor: '#9F1239',
    aspectRatio: 'portrait',
    defaultImageUrl: img7NewYear,
  },
  {
    id: 'mem-8',
    fileName: 'IMG-20250222-WA0083.jpg',
    chapterNumber: '08',
    dateLabel: 'Entrenando juntos · Nuestros días de Gym',
    title: 'Cuando íbamos juntos al gimnasio',
    subtitle: 'Siendo compañeros, motivación y alegría',
    secretNote:
      'Hasta cuando íbamos juntos al gym nos divertíamos y nos cuidábamos. Me encantaba abrazarte frente al espejo entre serie y serie y ver cómo compartíamos cada parte de nuestra rutina.',
    lyricVerse: '«A todo el mundo le puedes contar que sí te quiero...»',
    moodColor: '#9F1239',
    aspectRatio: 'portrait',
    defaultImageUrl: img8GymTogether,
  },
  {
    id: 'mem-9',
    fileName: 'IMG-20250215-WA0017.jpg',
    chapterNumber: '09',
    dateLabel: '14 de Febrero · Día de San Valentín',
    title: 'Nuestro 14 de Febrero juntos',
    subtitle: 'La ternura de celebrar nuestro amor en paz',
    secretNote:
      'Aquella foto de nuestro 14 de febrero guarda toda la suavidad y el cariño que nos teníamos. Estar recostado junto a tu hombro era sentir que estaba en casa.',
    lyricVerse: '«Las horas más felices de mi amor fueron contigo...»',
    moodColor: '#BE123C',
    aspectRatio: 'landscape',
    defaultImageUrl: img9ValentinesDay,
  },
  {
    id: 'mem-10',
    fileName: 'IMG-20250122-WA0018.jpg',
    chapterNumber: '10',
    dateLabel: 'En la piscina · Nuestra última foto juntos como novios',
    title: 'Nuestra última foto juntos como novios',
    subtitle: 'Sentados al borde del agua, abrazados en calma',
    secretNote:
      'Esta foto en la piscina es nuestra última foto juntos como novios. Al verla hoy, abrazándote por la espalda mientras mirabas hacia el horizonte, recuerdo con todo el corazón lo inmensamente felices que éramos juntos.',
    lyricVerse: '«Y no me cansaré de bendecir tanta dulzura...»',
    moodColor: '#881337',
    aspectRatio: 'portrait',
    defaultImageUrl: img10PoolLastAsCouple,
  },
];

export const BOLERO_STANZAS: BoleroStanza[] = [
  {
    id: 'stanza-1',
    title: 'El Recreo de Tus Besos',
    lines: [
      'Tus besos se llegaron a recrear aquí en mi boca,',
      'llenando de ilusión y de pasión mi vida loca.',
    ],
    reflection:
      'Escuchar este verso me lleva directo a cuando estábamos juntos, a la forma en que nos abrazábamos y a cada beso tuyo que llenaba mis días de ilusión y de una felicidad que solo sentía contigo.',
  },
  {
    id: 'stanza-2',
    title: 'Las Horas Más Felices',
    lines: [
      'Las horas más felices de mi amor fueron contigo,',
      'por eso es que mi alma siempre extraña el dulce alivio.',
    ],
    reflection:
      'Porque de verdad las horas más felices las viví cuando estábamos juntos: en tu cumpleaños, en los días normales cuando iba a visitarte, entrenando en el gym o paseando contigo y con tu familia. Por eso mi alma extraña tanto la paz de estar a tu lado.',
  },
  {
    id: 'stanza-3',
    title: 'Juramento Sincero',
    lines: [
      'Te puedo yo jurar ante un altar mi amor sincero,',
      'a todo el mundo le puedes contar que sí te quiero.',
    ],
    reflection:
      'Todo lo que vivimos mientras estábamos juntos fue real y de corazón. Nunca tuve miedo de demostrar cuánto te amaba, y hoy sigo sintiendo ese mismo amor sincero por ti.',
  },
  {
    id: 'stanza-4',
    title: 'Bendita Dulzura',
    lines: [
      'Tus labios me enseñaron a sentir lo que es ternura,',
      'y no me cansaré de bendecir tanta dulzura.',
    ],
    reflection:
      'Recuerdo la ternura de tus abrazos en Año Nuevo, en aquel 14 de febrero y en nuestra última foto juntos en la piscina. Mientras estuvimos juntos me enseñaste el cariño más bonito, y nunca me cansaré de agradecer cada momento a tu lado.',
  },
];

export const SECRET_CAPSULES: SecretCapsule[] = [
  {
    id: 'cap-1',
    number: 'I',
    promptTitle: 'Toca para leer lo que siento hoy al mirar nuestras fotos',
    hiddenTitle: 'Tanto tiempo sin verte, y sigues intacta en mí',
    hiddenMessage:
      'Tengo mucho tiempo sin verte en persona, y por eso hoy me detuve a mirar nuestras fotos una por una. Al ver tu sonrisa en tu cumpleaños, nuestras salidas y aquella última tarde en la piscina, sentí un nudo en el pecho al recordar lo inmensamente felices que éramos juntos.',
    heartCount: 15,
  },
  {
    id: 'cap-2',
    number: 'II',
    promptTitle: 'Toca para continuar con lo que pienso de ti hoy',
    hiddenTitle: 'Mereces a alguien que valore tu tiempo y tu presencia',
    hiddenMessage:
      'Sé que hoy estás en otra relación, pero al recordar cómo te miraba y cómo te cuidaba, no puedo callar lo que siento: tú te mereces a alguien que valore cada minuto de tu tiempo, que agradezca tu presencia y que cuide tu amor con la entrega y la devoción con que lo hacía yo.',
    heartCount: 28,
  },
  {
    id: 'cap-3',
    number: 'III',
    promptTitle: 'Toca para descubrir por qué te hice esta carta',
    hiddenTitle: 'Para que abras los ojos y veas quién te ama de verdad',
    hiddenMessage:
      'No te escribo esto por orgullo, sino para que abras los ojos y sientas en el alma quién es el hombre que te ama más en este mundo, quién piensa en ti a pesar de la distancia y quién está dispuesto a ofrecerte un futuro lleno de amor, cariño, respeto y verdadera felicidad.',
    heartCount: 42,
  },
  {
    id: 'cap-4',
    number: 'IV',
    promptTitle: 'Toca para leer mi verdad sin excusas',
    hiddenTitle: 'Reconozco mis errores y aprendí de cada uno',
    hiddenMessage:
      'Es cierto que cometí errores en el pasado, y no tengo miedo de aceptarlo. El tiempo sin ti me enseñó exactamente qué debo cuidar y cuánto vales en mi vida; por eso hoy no busco volver al ayer, sino construir un comienzo mucho mejor a tu lado para hacer las cosas bien.',
    heartCount: 64,
  },
  {
    id: 'cap-5',
    number: 'V',
    promptTitle: 'Toca para llegar a mi promesa más grande',
    hiddenTitle: 'Amarnos como locos, como nos lo merecemos',
    hiddenMessage:
      'Quiero esa nueva oportunidad contigo para entregarte mi mejor versión, sin miedos ni reservas, y que por fin podamos amarnos como locos, con toda la pasión, la paz y la ternura que tanto tú como yo nos merecemos.',
    heartCount: 100,
  },
];

export const FINAL_SPEECH_PARAGRAPHS: string[] = [
  'Mi amor... antes de que cierres esta página, quería hablarte así, de cerca, como si estuviera abrazándote por la espalda frente al espejo. Tengo tanto tiempo sin verte que hoy mi único refugio fue abrir nuestras diez fotografías y quedarme mirándote en silencio, recordando lo inmensamente felices que éramos juntos.',
  'Sé que hoy tu vida sigue otro camino y que estás con alguien más, pero al ver nuestras fotos me duele pensar que alguien no llegue a valorar tu tiempo, tu presencia y tu amor como lo hacía yo. Hice esta carta para que abras los ojos y veas quién te ama más y quién te ofrece un futuro lleno de amor, cariño y felicidad.',
  'Es cierto que cometí errores y los acepto de corazón, pero quiero un mejor comienzo a tu lado para hacer las cosas bien y podernos amar como locos y como nos lo merecemos. Por eso hoy quise detener el tiempo y construir para ti un rincón diferente; en cada línea de código, en cada animación suave, en cada corazón que flota en tu pantalla y en esta canción que nos envuelve, puse mi paciencia, mis desvelos y mis ganas de sorprenderte.',
  'Porque simplemente con esfuerzo, dedicación y todo el pulso de mi alma, hago lo que mejor sé hacer para entregárselo a la mujer que más amo en este mundo.',
  'Espero de todo corazón que te guste este formato de hacerte cartas; es mi manera de decirte que mi amor por ti no cabe en una hoja común: necesitaba música, movimiento y luz propia.',
  'Gracias por enseñarme a sentir lo que es ternura, y como dice nuestra canción... nunca me cansaré de bendecir tanta dulzura. Si decides escuchar lo que aún late entre nosotros, aquí estaré para amarnos como nos lo merecemos. Te amo hoy, mañana y en cada latido.',
];
