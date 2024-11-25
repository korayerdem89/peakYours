export interface Quote {
  id: number;
  author: string;
  quote: {
    en: string;
    tr: string;
    es: string;
  };
}

export const quotes: Quote[] = [
  {
    id: 1,
    author: 'Carol Burnett',
    quote: {
      en: "When you have a dream, you've got to grab it and never let go.",
      tr: 'Bir hayalin varsa, onu yakalamalı ve asla bırakmamalısın.',
      es: 'Cuando tienes un sueño, tienes que agarrarlo y nunca soltarlo.',
    },
  },
  {
    id: 2,
    author: 'Oscar Wilde',
    quote: {
      en: 'Be yourself; everyone else is already taken.',
      tr: 'Kendin ol; başka herkes zaten alınmış.',
      es: 'Sé tú mismo; todos los demás ya están ocupados.',
    },
  },
  {
    id: 3,
    author: 'Oprah Winfrey',
    quote: {
      en: 'The biggest adventure you can take is to live the life of your dreams.',
      tr: 'Yapabileceğin en büyük macera, hayallerindeki hayatı yaşamaktır.',
      es: 'La mayor aventura que puedes emprender es vivir la vida de tus sueños.',
    },
  },
  {
    id: 4,
    author: 'Walt Disney',
    quote: {
      en: 'All our dreams can come true, if we have the courage to pursue them.',
      tr: 'Eğer peşlerinden gidecek cesaretimiz varsa, tüm hayallerimiz gerçekleşebilir.',
      es: 'Todos nuestros sueños pueden hacerse realidad si tenemos el coraje de perseguirlos.',
    },
  },
  {
    id: 5,
    author: 'Ralph Waldo Emerson',
    quote: {
      en: 'Life is a succession of lessons which must be lived to be understood.',
      tr: 'Hayat, anlaşılması için yaşanması gereken dersler silsilesidir.',
      es: 'La vida es una sucesión de lecciones que deben ser vividas para ser entendidas.',
    },
  },
  {
    id: 6,
    author: 'Winston Churchill',
    quote: {
      en: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
      tr: 'Başarı son değildir, başarısızlık ölümcül değildir: önemli olan devam etme cesaretidir.',
      es: 'El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar.',
    },
  },
  {
    id: 7,
    author: 'Maya Angelou',
    quote: {
      en: 'Nothing will work unless you do.',
      tr: 'Sen çalışmadıkça hiçbir şey çalışmaz.',
      es: 'Nada funcionará a menos que tú lo hagas.',
    },
  },
  {
    id: 8,
    author: 'Albert Einstein',
    quote: {
      en: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
      tr: 'Hayat bisiklet sürmek gibidir. Dengenizi korumak için hareket etmeye devam etmelisiniz.',
      es: 'La vida es como montar en bicicleta. Para mantener el equilibrio, debes seguir moviéndote.',
    },
  },
  {
    id: 9,
    author: 'Helen Keller',
    quote: {
      en: 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
      tr: 'Dünyadaki en iyi ve en güzel şeyler görülemez ve hatta dokunulamaz - onlar kalple hissedilmelidir.',
      es: 'Las mejores y más bellas cosas del mundo no pueden verse ni tocarse - deben sentirse con el corazón.',
    },
  },
  {
    id: 10,
    author: 'Mahatma Gandhi',
    quote: {
      en: 'Be the change you wish to see in the world.',
      tr: 'Dünyada görmek istediğin değişimin kendisi ol.',
      es: 'Sé el cambio que deseas ver en el mundo.',
    },
  },
  {
    id: 11,
    author: 'Mother Teresa',
    quote: {
      en: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
      tr: 'Gittiğin her yere sevgi yay. Kimse senden mutlu olmadan ayrılmasın.',
      es: 'Difunde amor dondequiera que vayas. Que nadie venga a ti sin irse más feliz.',
    },
  },
  {
    id: 12,
    author: 'Michelle Obama',
    quote: {
      en: "Success isn't about how much money you make. It's about the difference you make in people's lives.",
      tr: 'Başarı ne kadar para kazandığınla ilgili değildir. İnsanların hayatlarında yarattığın farkla ilgilidir.',
      es: 'El éxito no se trata de cuánto dinero ganas. Se trata de la diferencia que haces en la vida de las personas.',
    },
  },
  {
    id: 13,
    author: 'Eleanor Roosevelt',
    quote: {
      en: 'The future belongs to those who believe in the beauty of their dreams.',
      tr: 'Gelecek, hayallerinin güzelliğine inananlarındır.',
      es: 'El futuro pertenece a quienes creen en la belleza de sus sueños.',
    },
  },
  {
    id: 14,
    author: 'Steve Jobs',
    quote: {
      en: "Your time is limited, don't waste it living someone else's life.",
      tr: 'Zamanın sınırlı, başkasının hayatını yaşayarak onu boşa harcama.',
      es: 'Tu tiempo es limitado, no lo desperdicies viviendo la vida de alguien más.',
    },
  },
  {
    id: 15,
    author: 'Martin Luther King Jr.',
    quote: {
      en: "Faith is taking the first step even when you don't see the whole staircase.",
      tr: 'İnanç, tüm merdiveni görmesen bile ilk adımı atmaktır.',
      es: 'La fe es dar el primer paso incluso cuando no ves toda la escalera.',
    },
  },
  {
    id: 16,
    author: 'Nelson Mandela',
    quote: {
      en: "It always seems impossible until it's done.",
      tr: 'Başarılana kadar her şey imkansız görünür.',
      es: 'Siempre parece imposible hasta que se hace.',
    },
  },
  {
    id: 17,
    author: 'Audrey Hepburn',
    quote: {
      en: "Nothing is impossible. The word itself says 'I'm possible!'",
      tr: "Hiçbir şey imkansız değildir. Kelimenin kendisi 'Mümkün!' diyor.",
      es: "Nada es imposible. ¡La palabra misma dice 'soy posible!'",
    },
  },
  {
    id: 18,
    author: 'Confucius',
    quote: {
      en: 'It does not matter how slowly you go as long as you do not stop.',
      tr: 'Durmadığın sürece ne kadar yavaş gittiğin önemli değil.',
      es: 'No importa lo lento que vayas mientras no te detengas.',
    },
  },
  {
    id: 19,
    author: 'Anne Frank',
    quote: {
      en: 'How wonderful it is that nobody need wait a single moment before starting to improve the world.',
      tr: 'Dünyayı iyileştirmeye başlamak için kimsenin bir an bile beklemesine gerek olmaması ne harika.',
      es: 'Qué maravilloso es que nadie necesite esperar ni un solo momento para comenzar a mejorar el mundo.',
    },
  },
  {
    id: 20,
    author: 'Paulo Coelho',
    quote: {
      en: 'When we strive to become better than we are, everything around us becomes better too.',
      tr: 'Olduğumuzdan daha iyi olmaya çabaladığımızda, çevremizdeki her şey de daha iyi olur.',
      es: 'Cuando nos esforzamos por ser mejores de lo que somos, todo a nuestro alrededor también mejora.',
    },
  },
  {
    id: 21,
    author: 'Dalai Lama',
    quote: {
      en: 'Remember that not getting what you want is sometimes a wonderful stroke of luck.',
      tr: 'Unutma ki istediğini alamamak bazen harika bir şans eseri olabilir.',
      es: 'Recuerda que no conseguir lo que quieres es a veces un maravilloso golpe de suerte.',
    },
  },
  {
    id: 22,
    author: 'Mark Twain',
    quote: {
      en: 'The two most important days in your life are the day you are born and the day you find out why.',
      tr: 'Hayatındaki en önemli iki gün, doğduğun gün ve bunun nedenini keşfettiğin gündür.',
      es: 'Los dos días más importantes en tu vida son el día en que naces y el día en que descubres por qué.',
    },
  },
  {
    id: 23,
    author: 'Vincent van Gogh',
    quote: {
      en: 'I dream of painting and then I paint my dream.',
      tr: 'Resim yapmayı hayal ederim ve sonra hayalimi resmederim.',
      es: 'Sueño con pintar y luego pinto mi sueño.',
    },
  },
  {
    id: 24,
    author: 'Aristotle',
    quote: {
      en: 'Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.',
      tr: 'Mükemmellik asla bir kaza değildir. Her zaman yüksek niyet, samimi çaba ve akıllı uygulamanın sonucudur.',
      es: 'La excelencia nunca es un accidente. Es siempre el resultado de una alta intención, un esfuerzo sincero y una ejecución inteligente.',
    },
  },
  {
    id: 25,
    author: 'Rumi',
    quote: {
      en: 'What you seek is seeking you.',
      tr: 'Aradığın şey seni arıyor.',
      es: 'Lo que buscas te está buscando.',
    },
  },
  {
    id: 26,
    author: 'Marie Curie',
    quote: {
      en: 'Nothing in life is to be feared, it is only to be understood.',
      tr: 'Hayatta hiçbir şeyden korkulmamalı, sadece anlaşılmalıdır.',
      es: 'Nada en la vida debe ser temido, solo debe ser entendido.',
    },
  },
  {
    id: 27,
    author: 'Bruce Lee',
    quote: {
      en: 'Be like water making its way through cracks. Do not be assertive, but adjust to the object, and you shall find a way around or through it.',
      tr: 'Çatlaklardan yolunu bulan su gibi ol. İddialı olma, nesneye uyum sağla ve onun etrafında ya da içinden bir yol bulacaksın.',
      es: 'Sé como el agua abriéndose paso entre las grietas. No seas asertivo, ajústate al objeto y encontrarás un camino alrededor o a través de él.',
    },
  },
  {
    id: 28,
    author: 'Jane Goodall',
    quote: {
      en: 'What you do makes a difference, and you have to decide what kind of difference you want to make.',
      tr: 'Yaptığın şey fark yaratır ve nasıl bir fark yaratmak istediğine sen karar vermelisin.',
      es: 'Lo que haces marca la diferencia, y tienes que decidir qué tipo de diferencia quieres hacer.',
    },
  },
  {
    id: 29,
    author: 'Lao Tzu',
    quote: {
      en: 'The journey of a thousand miles begins with one step.',
      tr: 'Bin millik yolculuk tek bir adımla başlar.',
      es: 'El viaje de mil millas comienza con un solo paso.',
    },
  },
  {
    id: 30,
    author: 'Rosa Parks',
    quote: {
      en: 'Each person must live their life as a model for others.',
      tr: 'Her insan hayatını başkaları için bir örnek olarak yaşamalıdır.',
      es: 'Cada persona debe vivir su vida como un modelo para los demás.',
    },
  },
  {
    id: 31,
    author: 'Stephen Hawking',
    quote: {
      en: 'Remember to look up at the stars and not down at your feet. Try to make sense of what you see and wonder about what makes the universe exist.',
      tr: 'Yıldızlara bakmayı unutma, ayaklarına değil. Gördüklerini anlamaya çalış ve evrenin var olma sebebini merak et.',
      es: 'Recuerda mirar las estrellas y no tus pies. Trata de entender lo que ves y pregúntate qué hace que exista el universo.',
    },
  },
  {
    id: 32,
    author: 'Frida Kahlo',
    quote: {
      en: 'At the end of the day, we can endure much more than we think we can.',
      tr: 'Günün sonunda, düşündüğümüzden çok daha fazlasına dayanabiliriz.',
      es: 'Al final del día, podemos soportar mucho más de lo que creemos.',
    },
  },
  {
    id: 33,
    author: 'Albert Schweitzer',
    quote: {
      en: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
      tr: 'Başarı mutluluğun anahtarı değildir. Mutluluk başarının anahtarıdır. Yaptığın işi seviyorsan, başarılı olacaksın.',
      es: 'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.',
    },
  },
  {
    id: 34,
    author: 'Maya Angelou',
    quote: {
      en: "Try to be a rainbow in someone's cloud.",
      tr: 'Birinin bulutunda bir gökkuşağı olmaya çalış.',
      es: 'Trata de ser un arcoíris en la nube de alguien.',
    },
  },
  {
    id: 35,
    author: 'Nikola Tesla',
    quote: {
      en: 'The present is theirs; the future, for which I really worked, is mine.',
      tr: 'Bugün onların; gerçekten çalıştığım gelecek ise benim.',
      es: 'El presente es de ellos; el futuro, por el que realmente trabajé, es mío.',
    },
  },
  {
    id: 36,
    author: 'Thich Nhat Hanh',
    quote: {
      en: 'Because you are alive, everything is possible.',
      tr: 'Hayatta olduğun için her şey mümkün.',
      es: 'Porque estás vivo, todo es posible.',
    },
  },
  {
    id: 37,
    author: 'Marcus Aurelius',
    quote: {
      en: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.',
      tr: 'Mutlu bir hayat için çok az şey gereklidir; hepsi senin içinde, düşünme şeklindedir.',
      es: 'Se necesita muy poco para tener una vida feliz; todo está dentro de ti, en tu forma de pensar.',
    },
  },
  {
    id: 38,
    author: "Georgia O'Keeffe",
    quote: {
      en: "I've been absolutely terrified every moment of my life – and I've never let it keep me from doing a single thing I wanted to do.",
      tr: 'Hayatımın her anında tamamen dehşete kapıldım - ama bu hiçbir zaman yapmak istediğim şeyleri yapmama engel olmadı.',
      es: 'He estado absolutamente aterrorizada cada momento de mi vida, y nunca he dejado que eso me impida hacer nada de lo que quería hacer.',
    },
  },
  {
    id: 39,
    author: 'Carl Sagan',
    quote: {
      en: 'Somewhere, something incredible is waiting to be known.',
      tr: 'Bir yerlerde, bilinmeyi bekleyen inanılmaz bir şey var.',
      es: 'En algún lugar, algo increíble está esperando ser conocido.',
    },
  },
  {
    id: 40,
    author: 'Malala Yousafzai',
    quote: {
      en: 'One child, one teacher, one book, one pen can change the world.',
      tr: 'Bir çocuk, bir öğretmen, bir kitap, bir kalem dünyayı değiştirebilir.',
      es: 'Un niño, un profesor, un libro y un lápiz pueden cambiar el mundo.',
    },
  },
  {
    id: 41,
    author: 'Coco Chanel',
    quote: {
      en: 'The most courageous act is still to think for yourself. Aloud.',
      tr: 'En cesur davranış hala kendin için düşünmektir. Sesli olarak.',
      es: 'El acto más valiente sigue siendo pensar por ti mismo. En voz alta.',
    },
  },
  {
    id: 42,
    author: 'Friedrich Nietzsche',
    quote: {
      en: 'He who has a why to live can bear almost any how.',
      tr: 'Yaşamak için bir nedeni olan, her türlü zorluğa katlanabilir.',
      es: 'Quien tiene un por qué para vivir puede soportar casi cualquier cómo.',
    },
  },
  {
    id: 43,
    author: 'Mary Oliver',
    quote: {
      en: 'Tell me, what is it you plan to do with your one wild and precious life?',
      tr: 'Söyle bana, bu tek vahşi ve değerli hayatınla ne yapmayı planlıyorsun?',
      es: 'Dime, ¿qué planeas hacer con tu única, salvaje y preciosa vida?',
    },
  },
  {
    id: 44,
    author: 'Amelia Earhart',
    quote: {
      en: 'The most difficult thing is the decision to act, the rest is merely tenacity.',
      tr: 'En zor şey harekete geçme kararıdır, gerisi sadece azimdir.',
      es: 'Lo más difícil es la decisión de actuar, el resto es simplemente tenacidad.',
    },
  },
  {
    id: 45,
    author: 'Alan Turing',
    quote: {
      en: 'Sometimes it is the people no one imagines anything of who do the things that no one can imagine.',
      tr: 'Bazen kimsenin bir şey beklemediği insanlar, kimsenin hayal edemeyeceği şeyleri yaparlar.',
      es: 'A veces son las personas de las que nadie espera nada quienes hacen cosas que nadie puede imaginar.',
    },
  },
  {
    id: 46,
    author: 'Virginia Woolf',
    quote: {
      en: 'No need to hurry. No need to sparkle. No need to be anybody but oneself.',
      tr: 'Acele etmeye gerek yok. Parlamaya gerek yok. Kendinden başka biri olmaya gerek yok.',
      es: 'No hay necesidad de apresurarse. No hay necesidad de brillar. No hay necesidad de ser nadie más que uno mismo.',
    },
  },
  {
    id: 47,
    author: 'Socrates',
    quote: {
      en: 'The secret of change is to focus all of your energy not on fighting the old, but on building the new.',
      tr: 'Değişimin sırrı, tüm enerjini eskiyle savaşmaya deil, yeniyi inşa etmeye odaklamaktır.',
      es: 'El secreto del cambio es enfocar toda tu energía no en luchar contra lo viejo, sino en construir lo nuevo.',
    },
  },
  {
    id: 48,
    author: 'Leonardo da Vinci',
    quote: {
      en: 'Learning never exhausts the mind.',
      tr: 'Öğrenmek zihni asla yormaz.',
      es: 'El aprendizaje nunca agota la mente.',
    },
  },
  {
    id: 49,
    author: 'Sylvia Plath',
    quote: {
      en: 'The worst enemy to creativity is self-doubt.',
      tr: 'Yaratıcılığın en büyük düşmanı kendinden şüphe duymaktır.',
      es: 'El peor enemigo de la creatividad es la duda de uno mismo.',
    },
  },
  {
    id: 50,
    author: 'James Baldwin',
    quote: {
      en: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
      tr: 'Yüzleşilen her şey değiştirilemez, ama yüzleşilmeden hiçbir şey değiştirilemez.',
      es: 'No todo lo que se enfrenta puede ser cambiado, pero nada puede ser cambiado hasta que se enfrenta.',
    },
  },
  {
    id: 51,
    author: 'Seneca',
    quote: {
      en: 'Luck is what happens when preparation meets opportunity.',
      tr: 'Şans, hazırlık fırsatla buluştuğunda ortaya çıkan şeydir.',
      es: 'La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.',
    },
  },
  {
    id: 52,
    author: 'Toni Morrison',
    quote: {
      en: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
      tr: 'Eğer okumak istediğin bir kitap varsa ama henüz yazılmamışsa, o zaman onu sen yazmalısın.',
      es: 'Si hay un libro que quieres leer pero aún no ha sido escrito, entonces debes escribirlo tú.',
    },
  },
  {
    id: 53,
    author: 'Epictetus',
    quote: {
      en: 'First say to yourself what you would be; then do what you have to do.',
      tr: 'Önce kendine ne olmak istediğini söyle; sonra yapmak zorunda olduğunu yap.',
      es: 'Primero dite a ti mismo lo que quieres ser; luego haz lo que tengas que hacer.',
    },
  },
  {
    id: 54,
    author: 'Marie Kondo',
    quote: {
      en: 'The question of what you want to own is actually the question of how you want to live your life.',
      tr: 'Neye sahip olmak istediğin sorusu, aslında hayatını nasıl yaşamak istediğin sorusudur.',
      es: 'La pregunta de qué quieres poseer es en realidad la pregunta de cómo quieres vivir tu vida.',
    },
  },
  {
    id: 55,
    author: 'Plato',
    quote: {
      en: 'The beginning is the most important part of the work.',
      tr: 'Başlangıç, işin en önemli parçasıdır.',
      es: 'El comienzo es la parte más importante del trabajo.',
    },
  },
  {
    id: 56,
    author: 'Simone de Beauvoir',
    quote: {
      en: "Change your life today. Don't gamble on the future, act now, without delay.",
      tr: 'Hayatını bugün değiştir. Gelecek üzerine kumar oynama, şimdi harekete geç, gecikmeden.',
      es: 'Cambia tu vida hoy. No apuestes al futuro, actúa ahora, sin demora.',
    },
  },
  {
    id: 57,
    author: 'Rabindranath Tagore',
    quote: {
      en: "You can't cross the sea merely by standing and staring at the water.",
      tr: 'Sadece durup suya bakarak denizi geçemezsin.',
      es: 'No puedes cruzar el mar simplemente mirando el agua.',
    },
  },
  {
    id: 58,
    author: 'Zora Neale Hurston',
    quote: {
      en: 'There are years that ask questions and years that answer.',
      tr: 'Soru soran yıllar vardır ve cevap veren yıllar vardır.',
      es: 'Hay años que hacen preguntas y años que responden.',
    },
  },
  {
    id: 59,
    author: 'Voltaire',
    quote: {
      en: 'Let us cultivate our garden.',
      tr: 'Bahçemizi yetiştirmeye devam edelim.',
      es: 'Cultivemos nuestro jardín.',
    },
  },
  {
    id: 60,
    author: 'bell hooks',
    quote: {
      en: "The function of art is to do more than tell it like it is - it's to imagine what is possible.",
      tr: 'Sanatın işlevi olduğu gibi anlatmaktan fazlasıdır - mümkün olanı hayal etmektir.',
      es: 'La función del arte es hacer más que decir las cosas como son: es imaginar lo que es posible.',
    },
  },
  {
    id: 61,
    author: 'Haruki Murakami',
    quote: {
      en: 'Pain is inevitable. Suffering is optional.',
      tr: 'Acı kaçınılmazdır. Istırap isteğe bağlıdır.',
      es: 'El dolor es inevitable. El sufrimiento es opcional.',
    },
  },
  {
    id: 62,
    author: 'Hannah Arendt',
    quote: {
      en: 'What really matters is the example, the capacity to illuminate the way forward through action.',
      tr: 'Gerçekten önemli olan örnek olmaktır, eylemle ileriye giden yolu aydınlatma kapasitesidir.',
      es: 'Lo que realmente importa es el ejemplo, la capacidad de iluminar el camino hacia adelante a través de la acción.',
    },
  },
  {
    id: 63,
    author: 'Kazuo Ishiguro',
    quote: {
      en: 'There was another life that I might have had, but I am having this one.',
      tr: 'Yaşayabileceğim başka bir hayat vardı, ama ben bunu yaşıyorum.',
      es: 'Había otra vida que podría haber tenido, pero estoy viviendo esta.',
    },
  },
  {
    id: 64,
    author: 'Iris Murdoch',
    quote: {
      en: 'We can only learn to love by loving.',
      tr: 'Sevmeyi ancak severek öğrenebiliriz.',
      es: 'Solo podemos aprender a amar amando.',
    },
  },
  {
    id: 65,
    author: 'Jiddu Krishnamurti',
    quote: {
      en: 'The ability to observe without evaluating is the highest form of intelligence.',
      tr: 'Değerlendirmeden gözlemleyebilme yeteneği, zekanın en yüksek formudur.',
      es: 'La capacidad de observar sin evaluar es la forma más alta de inteligencia.',
    },
  },
  {
    id: 66,
    author: 'Ursula K. Le Guin',
    quote: {
      en: 'It is good to have an end to journey toward; but it is the journey that matters, in the end.',
      tr: 'Yolculuk için bir hedefin olması iyidir; ama sonunda önemli olan yolculuğun kendisidir.',
      es: 'Es bueno tener un final hacia el cual viajar; pero es el viaje lo que importa, al final.',
    },
  },
  {
    id: 67,
    author: 'James Joyce',
    quote: {
      en: 'Mistakes are the portals of discovery.',
      tr: 'Hatalar keşfin kapılarıdır.',
      es: 'Los errores son los portales del descubrimiento.',
    },
  },
  {
    id: 68,
    author: 'Simone Weil',
    quote: {
      en: 'Attention is the rarest and purest form of generosity.',
      tr: 'Dikkat, cömertliğin en nadir ve en saf biçimidir.',
      es: 'La atención es la forma más rara y pura de generosidad.',
    },
  },
  {
    id: 69,
    author: 'Octavia Butler',
    quote: {
      en: "First forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not.",
      tr: 'Önce ilhamı unut. Alışkanlık daha güvenilirdir. Alışkanlık, ilhamın olsun ya da olmasın seni destekler.',
      es: 'Primero olvida la inspiración. El hábito es más confiable. El hábito te sostendrá estés inspirado o no.',
    },
  },
  {
    id: 70,
    author: 'Carl Jung',
    quote: {
      en: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
      tr: 'Bilinçsizi bilinçli hale getirene kadar, o hayatını yönlendirecek ve sen buna kader diyeceksin.',
      es: 'Hasta que no hagas consciente lo inconsciente, dirigirá tu vida y lo llamarás destino.',
    },
  },
  {
    id: 71,
    author: 'Italo Calvino',
    quote: {
      en: 'The more enlightened our houses are, the more their walls ooze ghosts.',
      tr: 'Evlerimiz ne kadar aydınlanırsa, duvarları o kadar çok hayalet sızdırır.',
      es: 'Cuanto más iluminadas están nuestras casas, más fantasmas rezuman sus paredes.',
    },
  },
  {
    id: 72,
    author: 'Martha Graham',
    quote: {
      en: 'No artist is pleased. There is no satisfaction whatever at any time. There is only a divine dissatisfaction.',
      tr: 'Hiçbir sanatçı memnun değildir. Hiçbir zaman tam bir tatmin yoktur. Sadece kutsal bir memnuniyetsizlik vardır.',
      es: 'Ningún artista está satisfecho. No hay satisfacción en ningún momento. Solo hay una divina insatisfacción.',
    },
  },
  {
    id: 73,
    author: 'John Steinbeck',
    quote: {
      en: 'Ideas are like rabbits. You get a couple and learn how to handle them, and pretty soon you have a dozen.',
      tr: 'Fikirler tavşanlar gibidir. Bir çift edinir ve onlarla nasıl başa çıkacağını öğrenirsin, çok geçmeden bir düzine olurlar.',
      es: 'Las ideas son como los conejos. Consigues un par y aprendes a manejarlos, y muy pronto tienes una docena.',
    },
  },
  {
    id: 74,
    author: 'Pema Chödrön',
    quote: {
      en: 'The most fundamental aggression to ourselves, the most fundamental harm we can do to ourselves, is to remain ignorant by not having the courage to look at ourselves honestly.',
      tr: 'Kendimize yapabileceğimiz en temel saldırı, en temel zarar, kendimize dürüstçe bakma cesaretini göstermeyerek cahil kalmaktır.',
      es: 'La agresión más fundamental hacia nosotros mismos, el daño más fundamental que podemos hacernos, es permanecer ignorantes por no tener el coraje de mirarnos honestamente.',
    },
  },
  {
    id: 75,
    author: 'Jorge Luis Borges',
    quote: {
      en: 'I have always imagined that Paradise will be a kind of library.',
      tr: "Her zaman Cennet'in bir tür kütüphane olacağını hayal ettim.",
      es: 'Siempre imaginé que el Paraíso sería algún tipo de biblioteca.',
    },
  },
  {
    id: 76,
    author: 'Anaïs Nin',
    quote: {
      en: "Life shrinks or expands in proportion to one's courage.",
      tr: 'Hayat insanın cesareti oranında daralır ya da genişler.',
      es: 'La vida se encoge o se expande en proporción al coraje de uno.',
    },
  },
  {
    id: 77,
    author: 'Aldous Huxley',
    quote: {
      en: "Experience is not what happens to you; it's what you do with what happens to you.",
      tr: 'Deneyim başına gelenler değil; başına gelenlerle ne yaptığındır.',
      es: 'La experiencia no es lo que te sucede; es lo que haces con lo que te sucede.',
    },
  },
  {
    id: 78,
    author: 'Susan Sontag',
    quote: {
      en: "Do stuff. Be clenched, curious. Not waiting for inspiration's shove or society's kiss on your forehead.",
      tr: 'Bir şeyler yap. Azimli, meraklı ol. İlhamın dürtmesini ya da toplumun alnına konduracağı öpücüğü bekleme.',
      es: 'Haz cosas. Mantente tenso, curioso. No esperes el empujón de la inspiración o el beso de la sociedad en tu frente.',
    },
  },
  {
    id: 79,
    author: 'Jean-Paul Sartre',
    quote: {
      en: "Freedom is what you do with what's been done to you.",
      tr: 'Özgürlük, sana yapılanlarla senin ne yaptığındır.',
      es: 'La libertad es lo que haces con lo que te han hecho.',
    },
  },
  {
    id: 80,
    author: 'Junot Díaz',
    quote: {
      en: 'The half-life of love is forever.',
      tr: 'Aşkın yarı ömrü sonsuzdur.',
      es: 'La vida media del amor es para siempre.',
    },
  },
  {
    id: 81,
    author: 'Marcus Aurelius',
    quote: {
      en: 'Waste no more time arguing about what a good person should be. Be one.',
      tr: 'İyi bir insanın nasıl olması gerektiğini tartışarak daha fazla zaman kaybetme. İyi bir insan ol.',
      es: 'No pierdas más tiempo discutiendo sobre cómo debe ser una buena persona. Sé una.',
    },
  },
  {
    id: 82,
    author: 'Thich Nhat Hanh',
    quote: {
      en: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.',
      tr: 'Şu an neşe ve mutlulukla dolu. Eğer dikkatli olursan, bunu göreceksin.',
      es: 'El momento presente está lleno de alegría y felicidad. Si estás atento, lo verás.',
    },
  },
  {
    id: 83,
    author: 'Albert Camus',
    quote: {
      en: 'In the midst of winter, I found there was, within me, an invincible summer.',
      tr: 'Kışın ortasında, içimde yenilmez bir yaz olduğunu keşfettim.',
      es: 'En medio del invierno, descubrí que había, dentro de mí, un verano invencible.',
    },
  },
  {
    id: 84,
    author: 'Mary Wollstonecraft',
    quote: {
      en: 'The beginning is always today.',
      tr: 'Başlangıç her zaman bugündür.',
      es: 'El comienzo es siempre hoy.',
    },
  },
  {
    id: 85,
    author: 'Rainer Maria Rilke',
    quote: {
      en: 'The only journey is the one within.',
      tr: 'Tek yolculuk içsel olandır.',
      es: 'El único viaje es el interior.',
    },
  },
  {
    id: 86,
    author: 'Simone de Beauvoir',
    quote: {
      en: 'One is not born, but rather becomes, oneself.',
      tr: 'İnsan doğmaz, daha ziyade kendisi olur.',
      es: 'Uno no nace, sino que se convierte en uno mismo.',
    },
  },
  {
    id: 87,
    author: 'Franz Kafka',
    quote: {
      en: 'A book must be the axe for the frozen sea within us.',
      tr: 'Bir kitap, içimizdeki donmuş denizi kıran balta olmalıdır.',
      es: 'Un libro debe ser el hacha para el mar helado dentro de nosotros.',
    },
  },
  {
    id: 88,
    author: 'Zhuangzi',
    quote: {
      en: 'Happiness is the absence of the striving for happiness.',
      tr: 'Mutluluk, mutluluğu aramanın olmayışıdır.',
      es: 'La felicidad es la ausencia del esfuerzo por la felicidad.',
    },
  },
  {
    id: 89,
    author: 'Søren Kierkegaard',
    quote: {
      en: 'Life is not a problem to be solved, but a reality to be experienced.',
      tr: 'Hayat çözülmesi gereken bir problem değil, deneyimlenmesi gereken bir gerçekliktir.',
      es: 'La vida no es un problema a resolver, sino una realidad a experimentar.',
    },
  },
  {
    id: 90,
    author: 'Audre Lorde',
    quote: {
      en: 'When I dare to be powerful, to use my strength in the service of my vision, then it becomes less important whether I am afraid.',
      tr: 'Güçlü olmaya, gücümü vizyonumun hizmetinde kullanmaya cesaret ettiğimde, korkup korkmadığım daha az önemli hale gelir.',
      es: 'Cuando me atrevo a ser poderosa, a usar mi fuerza al servicio de mi visión, entonces se vuelve menos importante si tengo miedo.',
    },
  },
  {
    id: 91,
    author: 'Viktor E. Frankl',
    quote: {
      en: 'Between stimulus and response there is a space. In that space is our power to choose our response.',
      tr: 'Uyaran ve tepki arasında bir boşluk vardır. O boşlukta tepkimizi seçme gücümüz yatar.',
      es: 'Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder de elegir nuestra respuesta.',
    },
  },
  {
    id: 92,
    author: 'Gabriel García Márquez',
    quote: {
      en: 'It is not true that people stop pursuing dreams because they grow old, they grow old because they stop pursuing dreams.',
      tr: 'İnsanların yaşlandıkları için hayallerinin peşinden gitmeyi bıraktıkları doğru değil, hayallerinin peşinden gitmeyi bıraktıkları için yaşlanırlar.',
      es: 'No es cierto que la gente deje de perseguir sueños porque se hace vieja, se hace vieja porque deja de perseguir sueños.',
    },
  },
  {
    id: 93,
    author: 'Fyodor Dostoevsky',
    quote: {
      en: 'To live without hope is to cease to live.',
      tr: 'Umut olmadan yaşamak, yaşamayı bırakmaktır.',
      es: 'Vivir sin esperanza es dejar de vivir.',
    },
  },
  {
    id: 94,
    author: 'Isabel Allende',
    quote: {
      en: 'Write what should not be forgotten.',
      tr: 'Unutulmaması gerekeni yaz.',
      es: 'Escribe lo que no debe ser olvidado.',
    },
  },
  {
    id: 95,
    author: 'Thucydides',
    quote: {
      en: 'The secret of happiness is freedom, and the secret of freedom is courage.',
      tr: 'Mutluluğun sırrı özgürlük, özgürlüğün sırrı cesarettir.',
      es: 'El secreto de la felicidad es la libertad, y el secreto de la libertad es el coraje.',
    },
  },
  {
    id: 96,
    author: 'Milan Kundera',
    quote: {
      en: 'The struggle of man against power is the struggle of memory against forgetting.',
      tr: 'İnsanın güce karşı mücadelesi, hafızanın unutmaya karşı mücadelesidir.',
      es: 'La lucha del hombre contra el poder es la lucha de la memoria contra el olvido.',
    },
  },
  {
    id: 97,
    author: 'Jeanette Winterson',
    quote: {
      en: 'What you risk reveals what you value.',
      tr: 'Neyi riske attığın, neye değer verdiğini gösterir.',
      es: 'Lo que arriesgas revela lo que valoras.',
    },
  },
  {
    id: 98,
    author: 'Heraclitus',
    quote: {
      en: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
      tr: 'Hiçbir insan aynı nehre iki kez giremez, çünkü ne o aynı nehirdir ne de o aynı insan.',
      es: 'Ningún hombre puede bañarse dos veces en el mismo río, pues no es el mismo río ni él es el mismo hombre.',
    },
  },
  {
    id: 99,
    author: 'Marguerite Yourcenar',
    quote: {
      en: 'The true birthplace is that wherein for the first time one looks intelligently upon oneself.',
      tr: 'Gerçek doğum yeri, ilk kez kendine akıllıca baktığın yerdir.',
      es: 'El verdadero lugar de nacimiento es aquel donde por primera vez uno se mira inteligentemente a sí mismo.',
    },
  },
  {
    id: 100,
    author: 'Bertrand Russell',
    quote: {
      en: 'The good life is one inspired by love and guided by knowledge.',
      tr: 'İyi yaşam, sevgiyle ilham alan ve bilgiyle yönlendirilen yaşamdır.',
      es: 'La buena vida es aquella inspirada por el amor y guiada por el conocimiento.',
    },
  },
  {
    id: 101,
    author: 'Simone Weil',
    quote: {
      en: 'Attention is the rarest and purest form of generosity.',
      tr: 'Dikkat, cömertliğin en nadir ve en saf biçimidir.',
      es: 'La atención es la forma más rara y pura de generosidad.',
    },
  },
  {
    id: 102,
    author: 'Paulo Freire',
    quote: {
      en: 'Education does not transform the world. Education changes people. People change the world.',
      tr: 'Eğitim dünyayı dönüştürmez. Eğitim insanları değiştirir. İnsanlar dünyayı değiştirir.',
      es: 'La educación no transforma el mundo. La educación cambia a las personas. Las personas transforman el mundo.',
    },
  },
  {
    id: 103,
    author: 'Matsuo Basho',
    quote: {
      en: 'Every day is a journey, and the journey itself is home.',
      tr: 'Her gün bir yolculuktur ve yolculuğun kendisi evdir.',
      es: 'Cada día es un viaje, y el viaje mismo es el hogar.',
    },
  },
  {
    id: 104,
    author: 'Toni Morrison',
    quote: {
      en: 'The function of freedom is to free someone else.',
      tr: 'Özgürlüğün işlevi başka birini özgür kılmaktır.',
      es: 'La función de la libertad es liberar a alguien más.',
    },
  },
  {
    id: 105,
    author: 'Carl Sagan',
    quote: {
      en: 'We are a way for the cosmos to know itself.',
      tr: 'Biz evrenin kendini tanıma yoluyuz.',
      es: 'Somos una manera para que el cosmos se conozca a sí mismo.',
    },
  },
  {
    id: 106,
    author: 'Virginia Woolf',
    quote: {
      en: 'Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind.',
      tr: 'İsterseniz kütüphanelerinizi kilitleyin; ama zihnimin özgürlüğüne koyabileceğiniz hiçbir kapı, kilit, sürgü yoktur.',
      es: 'Encierren sus bibliotecas si quieren; pero no hay puerta, ni cerradura, ni cerrojo que puedan imponer a la libertad de mi mente.',
    },
  },
  {
    id: 107,
    author: 'Khalil Gibran',
    quote: {
      en: 'Your pain is the breaking of the shell that encloses your understanding.',
      tr: 'Acın, anlayışını çevreleyen kabuğun kırılmasıdır.',
      es: 'Tu dolor es la ruptura de la cáscara que encierra tu entendimiento.',
    },
  },
  {
    id: 108,
    author: 'Octavio Paz',
    quote: {
      en: 'Solitude is the profoundest fact of the human condition.',
      tr: 'Yalnızlık, insan durumunun en derin gerçeğidir.',
      es: 'La soledad es el hecho más profundo de la condición humana.',
    },
  },
  {
    id: 109,
    author: 'Rabindranath Tagore',
    quote: {
      en: 'The butterfly counts not months but moments, and has time enough.',
      tr: 'Kelebek ayları değil anları sayar ve yeterince zamanı vardır.',
      es: 'La mariposa no cuenta meses sino momentos, y tiene tiempo suficiente.',
    },
  },
  {
    id: 110,
    author: 'Michel Foucault',
    quote: {
      en: 'Where there is power, there is resistance.',
      tr: 'Gücün olduğu yerde, direniş vardır.',
      es: 'Donde hay poder, hay resistencia.',
    },
  },
  {
    id: 111,
    author: 'Umberto Eco',
    quote: {
      en: 'We live for books. A sweet mission in this world dominated by disorder and decay.',
      tr: 'Kitaplar için yaşıyoruz. Düzensizlik ve çürümenin hâkim olduğu bu dünyada tatlı bir görev.',
      es: 'Vivimos por los libros. Una dulce misión en este mundo dominado por el desorden y la decadencia.',
    },
  },
  {
    id: 112,
    author: 'Simone Biles',
    quote: {
      en: "I'm not the next Usain Bolt or Michael Phelps. I'm the first Simone Biles.",
      tr: "Ben bir sonraki Usain Bolt ya da Michael Phelps değilim. Ben ilk Simone Biles'im.",
      es: 'No soy la próxima Usain Bolt o Michael Phelps. Soy la primera Simone Biles.',
    },
  },
  {
    id: 113,
    author: 'Haruki Murakami',
    quote: {
      en: 'If you only read the books that everyone else is reading, you can only think what everyone else is thinking.',
      tr: 'Eğer sadece herkesin okuduğu kitapları okursan, ancak herkesin düşündüğünü düşünebilirsin.',
      es: 'Si solo lees los libros que todos los demás están leyendo, solo podrás pensar lo que todos los demás están pensando.',
    },
  },
  {
    id: 114,
    author: 'Iris Murdoch',
    quote: {
      en: 'Love is the extremely difficult realization that something other than oneself is real.',
      tr: 'Aşk, kendinden başka bir şeyin gerçek olduğunun son derece zor kavranmasıdır.',
      es: 'El amor es la realización extremadamente difícil de que algo más que uno mismo es real.',
    },
  },
  {
    id: 115,
    author: 'James Baldwin',
    quote: {
      en: 'The world is before you, and you need not take it or leave it as it was when you came in.',
      tr: 'Dünya önünde, ve onu geldiğin zamanki gibi kabul etmek ya da bırakmak zorunda değilsin.',
      es: 'El mundo está ante ti, y no necesitas tomarlo o dejarlo como estaba cuando llegaste.',
    },
  },
  {
    id: 116,
    author: 'Sylvia Plath',
    quote: {
      en: 'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',
      tr: 'Derin bir nefes aldım ve kalbimin eski övüncünü dinledim: Ben varım, ben varım, ben varım.',
      es: 'Tomé un respiro profundo y escuché la vieja jactancia de mi corazón: Soy, soy, soy.',
    },
  },
  {
    id: 117,
    author: 'Orhan Pamuk',
    quote: {
      en: "Life is beautiful because it's changeable, like the shapes of clouds.",
      tr: 'Hayat güzeldir çünkü bulutların şekilleri gibi değişkendir.',
      es: 'La vida es hermosa porque es cambiante, como las formas de las nubes.',
    },
  },
  {
    id: 118,
    author: 'bell hooks',
    quote: {
      en: 'The practice of love offers no place of safety. We risk loss, hurt, pain. We risk being acted upon by forces outside our control.',
      tr: 'Sevgi pratiği güvenli bir yer sunmaz. Kaybetme, incinme, acı riskini alırız. Kontrolümüz dışındaki güçlerin bize etki etme riskini alırız.',
      es: 'La práctica del amor no ofrece lugar seguro. Arriesgamos pérdida, herida, dolor. Arriesgamos ser afectados por fuerzas fuera de nuestro control.',
    },
  },
  {
    id: 119,
    author: 'Yukio Mishima',
    quote: {
      en: 'True beauty is something that attacks, overpowers, robs, and finally destroys.',
      tr: 'Gerçek güzellik saldıran, alt eden, soyan ve sonunda yok eden bir şeydir.',
      es: 'La verdadera belleza es algo que ataca, domina, roba y finalmente destruye.',
    },
  },
  {
    id: 120,
    author: 'Søren Kierkegaard',
    quote: {
      en: 'Life is not a problem to be solved, but a reality to be experienced.',
      tr: 'Hayat çözülmesi gereken bir problem değil, deneyimlenmesi gereken bir gerçekliktir.',
      es: 'La vida no es un problema a resolver, sino una realidad a experimentar.',
    },
  },
  {
    id: 121,
    author: 'Elif Shafak',
    quote: {
      en: 'Every true love and friendship is a story of unexpected transformation.',
      tr: 'Her gerçek aşk ve dostluk, beklenmedik bir dönüşümün hikayesidir.',
      es: 'Cada amor verdadero y amistad es una historia de transformación inesperada.',
    },
  },
  {
    id: 122,
    author: 'Italo Calvino',
    quote: {
      en: 'The inferno of the living is not something that will be; if there is one, it is what is already here.',
      tr: 'Yaşayanların cehennemi gelecekte olacak bir şey değildir; eğer varsa, o zaten buradadır.',
      es: 'El infierno de los vivos no es algo que será; si hay uno, es lo que ya está aquí.',
    },
  },
  {
    id: 123,
    author: 'Simone de Beauvoir',
    quote: {
      en: 'I am too intelligent, too demanding, and too resourceful for anyone to be able to take charge of me entirely.',
      tr: 'Birinin beni tamamen kontrol edebilmesi için fazla zeki, fazla talepkar ve fazla beceriliyim.',
      es: 'Soy demasiado inteligente, demasiado exigente y demasiado ingeniosa para que alguien pueda hacerse cargo de mí por completo.',
    },
  },
  {
    id: 124,
    author: 'Jorge Luis Borges',
    quote: {
      en: 'Time is the substance I am made of. Time is a river which sweeps me along, but I am the river.',
      tr: 'Zaman benim yapıldığım maddedir. Zaman beni sürükleyen bir nehirdir, ama ben nehirim.',
      es: 'El tiempo es la sustancia de la que estoy hecho. El tiempo es un río que me arrastra, pero yo soy el río.',
    },
  },
  {
    id: 125,
    author: 'Ursula K. Le Guin',
    quote: {
      en: "Love doesn't just sit there, like a stone; it has to be made, like bread, remade all the time, made new.",
      tr: 'Aşk orada bir taş gibi öylece durmaz; ekmek gibi yapılmalı, sürekli yeniden yapılmalı, yeni kılınmalıdır.',
      es: 'El amor no se queda ahí sentado, como una piedra; tiene que ser hecho, como el pan, rehecho todo el tiempo, hecho nuevo.',
    },
  },
  {
    id: 126,
    author: 'Naguib Mahfouz',
    quote: {
      en: 'Home is not where you are born; home is where all your attempts to escape cease.',
      tr: 'Ev doğduğun yer değildir; ev kaçma girişimlerinin son bulduğu yerdir.',
      es: 'El hogar no es donde naces; el hogar es donde cesan todos tus intentos de escapar.',
    },
  },
  {
    id: 127,
    author: 'Margaret Atwood',
    quote: {
      en: 'A word after a word after a word is power.',
      tr: 'Bir kelime bir kelime bir kelime ardına güçtür.',
      es: 'Una palabra tras otra palabra tras otra palabra es poder.',
    },
  },
  {
    id: 128,
    author: 'Emil Cioran',
    quote: {
      en: 'It is not worth the bother of killing yourself, since you always kill yourself too late.',
      tr: 'Kendini öldürmeye değmez, çünkü her zaman çok geç öldürürsün kendini.',
      es: 'No vale la pena matarse, ya que uno siempre se mata demasiado tarde.',
    },
  },
  {
    id: 129,
    author: 'Clarice Lispector',
    quote: {
      en: 'I write because I have no choice. But I also write because I like words.',
      tr: 'Yazıyorum çünkü başka seçeneğim yok. Ama aynı zamanda kelimeleri sevdiğim için de yazıyorum.',
      es: 'Escribo porque no tengo elección. Pero también escribo porque me gustan las palabras.',
    },
  },
  {
    id: 130,
    author: 'Fernando Pessoa',
    quote: {
      en: 'Literature is the most agreeable way of ignoring life.',
      tr: 'Edebiyat, hayatı görmezden gelmenin en hoş yoludur.',
      es: 'La literatura es la manera más agradable de ignorar la vida.',
    },
  },
  {
    id: 131,
    author: 'Albert Einstein',
    quote: {
      en: 'Imagination is more important than knowledge.',
      tr: 'Hayal gücü bilgiden daha önemlidir.',
      es: 'La imaginación es más importante que el conocimiento.',
    },
  },
  {
    id: 132,
    author: 'Maya Angelou',
    quote: {
      en: 'Nothing will work unless you do.',
      tr: 'Sen çalışmadıkça hiçbir şey çalışmaz.',
      es: 'Nada funcionará a menos que tú lo hagas.',
    },
  },
  {
    id: 133,
    author: 'Aristotle',
    quote: {
      en: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
      tr: 'Biz tekrar tekrar yaptığımız şeyiz. O halde mükemmellik bir eylem değil, bir alışkanlıktır.',
      es: 'Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto sino un hábito.',
    },
  },
  {
    id: 134,
    author: 'Lao Tzu',
    quote: {
      en: 'A journey of a thousand miles begins with a single step.',
      tr: 'Bin millik yolculuk tek bir adımla başlar.',
      es: 'Un viaje de mil millas comienza con un solo paso.',
    },
  },
  {
    id: 135,
    author: 'Nelson Mandela',
    quote: {
      en: "It always seems impossible until it's done.",
      tr: 'Yapılana kadar her şey imkansız görünür.',
      es: 'Siempre parece imposible hasta que se hace.',
    },
  },
  {
    id: 136,
    author: 'Friedrich Nietzsche',
    quote: {
      en: 'Those who were seen dancing were thought to be insane by those who could not hear the music.',
      tr: 'Dans edenler, müziği duyamayanlar tarafından deli sanıldılar.',
      es: 'Aquellos que fueron vistos bailando fueron considerados locos por quienes no podían escuchar la música.',
    },
  },
  {
    id: 137,
    author: 'Marie Curie',
    quote: {
      en: 'Nothing in life is to be feared, it is only to be understood.',
      tr: 'Hayatta hiçbir şeyden korkulmamalı, sadece anlaşılmalı.',
      es: 'Nada en la vida debe ser temido, solo debe ser comprendido.',
    },
  },
  {
    id: 138,
    author: 'Paulo Coelho',
    quote: {
      en: "One day you will wake up and there won't be any more time to do the things you've always wanted. Do it now.",
      tr: 'Bir gün uyanacaksın ve her zaman yapmak istediğin şeyler için zaman kalmayacak. Şimdi yap.',
      es: 'Un día despertarás y ya no habrá tiempo para hacer las cosas que siempre quisiste. Hazlo ahora.',
    },
  },
  {
    id: 139,
    author: 'Rumi',
    quote: {
      en: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
      tr: 'Dün akıllıydım, dünyayı değiştirmek istedim. Bugün bilgeyim, kendimi değiştiriyorum.',
      es: 'Ayer era inteligente, así que quería cambiar el mundo. Hoy soy sabio, así que estoy cambiando yo mismo.',
    },
  },
  {
    id: 140,
    author: 'Vincent van Gogh',
    quote: {
      en: 'I dream of painting and then I paint my dream.',
      tr: 'Resim yapmayı hayal ederim ve sonra hayalimi resmederim.',
      es: 'Sueño con pintar y luego pinto mi sueño.',
    },
  },
  {
    id: 141,
    author: 'Confucius',
    quote: {
      en: 'By three methods we may learn wisdom: by reflection, which is noblest; by imitation, which is easiest; and by experience, which is the bitterest.',
      tr: 'Bilgeliği üç yöntemle öğrenebiliriz: düşünme ile, ki en asilidir; taklit ile, ki en kolayıdır; ve deneyim ile, ki en acısıdır.',
      es: 'Por tres métodos podemos aprender la sabiduría: por reflexión, que es el más noble; por imitación, que es el más fácil; y por experiencia, que es el más amargo.',
    },
  },
  {
    id: 142,
    author: 'Oscar Wilde',
    quote: {
      en: 'Be yourself; everyone else is already taken.',
      tr: 'Kendin ol; başka herkes zaten alınmış.',
      es: 'Sé tú mismo; todos los demás ya están ocupados.',
    },
  },
  {
    id: 143,
    author: 'Helen Keller',
    quote: {
      en: 'Life is either a daring adventure or nothing at all.',
      tr: 'Hayat ya cesur bir macera ya da hiçbir şeydir.',
      es: 'La vida es una aventura atrevida o no es nada.',
    },
  },
  {
    id: 144,
    author: 'Bruce Lee',
    quote: {
      en: 'Empty your mind, be formless, shapeless — like water.',
      tr: 'Zihnini boşalt, biçimsiz, şekilsiz ol — su gibi.',
      es: 'Vacía tu mente, sé amorfo, sin forma — como el agua.',
    },
  },
  {
    id: 145,
    author: 'Ralph Waldo Emerson',
    quote: {
      en: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
      tr: 'Arkamızda yatan ve önümüzde yatan şeyler, içimizde yatan şeylerle karşılaştırıldığında önemsiz kalır.',
      es: 'Lo que yace detrás de nosotros y lo que yace ante nosotros son asuntos pequeños comparados con lo que yace dentro de nosotros.',
    },
  },
  {
    id: 146,
    author: 'Fyodor Dostoevsky',
    quote: {
      en: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
      tr: 'Acı ve ıstırap, büyük bir zeka ve derin bir kalp için her zaman kaçınılmazdır.',
      es: 'El dolor y el sufrimiento son siempre inevitables para una inteligencia grande y un corazón profundo.',
    },
  },
  {
    id: 147,
    author: 'Mahatma Gandhi',
    quote: {
      en: 'Be the change you wish to see in the world.',
      tr: 'Dünyada görmek istediğin değişimin kendisi ol.',
      es: 'Sé el cambio que deseas ver en el mundo.',
    },
  },
  {
    id: 148,
    author: 'Franz Kafka',
    quote: {
      en: "Don't bend; don't water it down; don't try to make it logical; don't edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly.",
      tr: 'Eğilme; sulandırma; mantıklı hale getirmeye çalışma; ruhunu modaya göre düzenleme. Aksine, en yoğun takıntılarının peşinden acımasızca git.',
      es: 'No te doblegues; no lo diluyas; no trates de hacerlo lógico; no edites tu propia alma según la moda. Más bien, sigue tus obsesiones más intensas sin piedad.',
    },
  },
  {
    id: 149,
    author: 'Carl Jung',
    quote: {
      en: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
      tr: 'Bilinçsizi bilinçli hale getirene kadar, o hayatını yönlendirecek ve sen buna kader diyeceksin.',
      es: 'Hasta que no hagas consciente lo inconsciente, dirigirá tu vida y lo llamarás destino.',
    },
  },
];
