export interface Quote {
  id: number;
  author: string;
  quote: {
    en: string;
    tr: string;
    es: string;
    zh: string;
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
      zh: '当你有一个梦想时，你必须紧紧抓住它，永不放手。',
    },
  },
  {
    id: 2,
    author: 'Oscar Wilde',
    quote: {
      en: 'Be yourself; everyone else is already taken.',
      tr: 'Kendin ol; başka herkes zaten alınmış.',
      es: 'Sé tú mismo; todos los demás ya están ocupados.',
      zh: '做你自己；其他角色都已经有人扮演了。',
    },
  },
  {
    id: 3,
    author: 'Oprah Winfrey',
    quote: {
      en: 'The biggest adventure you can take is to live the life of your dreams.',
      tr: 'Yapabileceğin en büyük macera, hayallerindeki hayatı yaşamaktır.',
      es: 'La mayor aventura que puedes emprender es vivir la vida de tus sueños.',
      zh: '你能经历的最大冒险就是过上你梦想的生活。',
    },
  },
  {
    id: 4,
    author: 'Walt Disney',
    quote: {
      en: 'All our dreams can come true, if we have the courage to pursue them.',
      tr: 'Eğer peşlerinden gidecek cesaretimiz varsa, tüm hayallerimiz gerçekleşebilir.',
      es: 'Todos nuestros sueños pueden hacerse realidad si tenemos el coraje de perseguirlos.',
      zh: '只要我们有勇气追求，所有的梦想都能实现。',
    },
  },
  {
    id: 5,
    author: 'Ralph Waldo Emerson',
    quote: {
      en: 'Life is a succession of lessons which must be lived to be understood.',
      tr: 'Hayat, anlaşılması için yaşanması gereken dersler silsilesidir.',
      es: 'La vida es una sucesión de lecciones que deben ser vividas para ser entendidas.',
      zh: '生活是一系列必须亲身经历才能理解的课程。',
    },
  },
  {
    id: 6,
    author: 'Winston Churchill',
    quote: {
      en: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
      tr: 'Başarı son değildir, başarısızlık ölümcül değildir: önemli olan devam etme cesaretidir.',
      es: 'El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar.',
      zh: '成功并非终���，失败也并非致命：重要的是继续前进的勇气。',
    },
  },
  {
    id: 7,
    author: 'Maya Angelou',
    quote: {
      en: 'Nothing will work unless you do.',
      tr: 'Sen çalışmadıkça hiçbir şey çalışmaz.',
      es: 'Nada funcionará a menos que tú lo hagas.',
      zh: '除非你付出行动，否则什么都不会奏效。',
    },
  },
  {
    id: 8,
    author: 'Albert Einstein',
    quote: {
      en: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
      tr: 'Hayat bisiklet sürmek gibidir. Dengenizi korumak için hareket etmeye devam etmelisiniz.',
      es: 'La vida es como montar en bicicleta. Para mantener el equilibrio, debes seguir moviéndote.',
      zh: '生活就像骑自行车。要保持平衡，就必须不断前进。',
    },
  },
  {
    id: 9,
    author: 'Helen Keller',
    quote: {
      en: 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
      tr: 'Dünyadaki en iyi ve en güzel şeyler görülemez ve hatta dokunulamaz - onlar kalple hissedilmelidir.',
      es: 'Las mejores y más bellas cosas del mundo no pueden verse ni tocarse - deben sentirse con el corazón.',
      zh: '世界上最美好的东西既看不见也摸不着 - 们必须用心去感受。',
    },
  },
  {
    id: 10,
    author: 'Mahatma Gandhi',
    quote: {
      en: 'Be the change you wish to see in the world.',
      tr: 'Dünyada görmek istediğin değişimin kendisi ol.',
      es: 'Sé el cambio que deseas ver en el mundo.',
      zh: '成为你希望在世界上看到的改变。',
    },
  },
  {
    id: 11,
    author: 'Mother Teresa',
    quote: {
      en: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
      tr: 'Gittiğin her yere sevgi yay. Kimse senden mutlu olmadan ayrılmasın.',
      es: 'Difunde amor dondequiera que vayas. Que nadie venga a ti sin irse más feliz.',
      zh: '无论去哪里都传播爱。不要让任何人在见过你之后没有变得更快乐。',
    },
  },
  {
    id: 12,
    author: 'Michelle Obama',
    quote: {
      en: "Success isn't about how much money you make. It's about the difference you make in people's lives.",
      tr: 'Başarı ne kadar para kazandığınla ilgili değildir. İnsanların hayatlarında yarattığın farkla ilgilidir.',
      es: 'El éxito no se trata de cuánto dinero ganas. Se trata de la diferencia que haces en la vida de las personas.',
      zh: '成功不在于你赚多少钱，而在于你给他人的生活带来了什么改变。',
    },
  },
  {
    id: 13,
    author: 'Eleanor Roosevelt',
    quote: {
      en: 'The future belongs to those who believe in the beauty of their dreams.',
      tr: 'Gelecek, hayallerinin güzelliğine inananlarındır.',
      es: 'El futuro pertenece a quienes creen en la belleza de sus sueños.',
      zh: '未来属于些相信梦想之美的人。',
    },
  },
  {
    id: 14,
    author: 'Steve Jobs',
    quote: {
      en: "Your time is limited, don't waste it living someone else's life.",
      tr: 'Zamanın sınırlı, başkasının hayatını yaşayarak onu boşa harcama.',
      es: 'Tu tiempo es limitado, no lo desperdicies viviendo la vida de alguien más.',
      zh: '你的时间有限，不要浪费在过别人的生活上。',
    },
  },
  {
    id: 15,
    author: 'Martin Luther King Jr.',
    quote: {
      en: "Faith is taking the first step even when you don't see the whole staircase.",
      tr: 'İnanç, tüm merdiveni görmesen bile ilk adımı atmaktır.',
      es: 'La fe es dar el primer paso incluso cuando no ves toda la escalera.',
      zh: '信念就是即使看不到整个阶梯，也要迈出第一步。',
    },
  },
  {
    id: 16,
    author: 'Nelson Mandela',
    quote: {
      en: "It always seems impossible until it's done.",
      tr: 'Başarılana kadar her şey imkansız görünür.',
      es: 'Siempre parece imposible hasta que se hace.',
      zh: '事情总是看似不可能，直到完成它。',
    },
  },
  {
    id: 17,
    author: 'Audrey Hepburn',
    quote: {
      en: "Nothing is impossible. The word itself says 'I'm possible!'",
      tr: "Hiçbir şey imkansız değildir. Kelimenin kendisi 'Mümkün!' diyor.",
      es: "Nada es imposible. ¡La palabra misma dice 'soy posible!'",
      zh: "没有什么是不可能的。这个词本身就在说'我是可能的！'",
    },
  },
  {
    id: 18,
    author: 'Confucius',
    quote: {
      en: 'It does not matter how slowly you go as long as you do not stop.',
      tr: 'Durmadığın sürece ne kadar yavaş gittiğin önemli değil.',
      es: 'No importa lo lento que vayas mientras no te detengas.',
      zh: '不管你走得有多慢，只要你不停下来就好。',
    },
  },
  {
    id: 19,
    author: 'Anne Frank',
    quote: {
      en: 'How wonderful it is that nobody need wait a single moment before starting to improve the world.',
      tr: 'Dünyayı iyileştirmeye başlamak için kimsenin bir an bile beklemesine gerek olmaması ne harika.',
      es: 'Qué maravilloso es que nadie necesite esperar ni un solo momento para comenzar a mejorar el mundo.',
      zh: '多么美妙啊，没人要等待哪怕一刻就能开始���善这个世界。',
    },
  },
  {
    id: 20,
    author: 'Paulo Coelho',
    quote: {
      en: 'When we strive to become better than we are, everything around us becomes better too.',
      tr: 'Olduğumuzdan daha iyi olmaya çabaladığımızda, çevremizdeki her şey de daha iyi olur.',
      es: 'Cuando nos esforzamos por ser mejores de lo que somos, todo a nuestro alrededor también mejora.',
      zh: '当我们努力变得更好时，我们周围的一切也会变得更好。',
    },
  },
  {
    id: 21,
    author: 'Dalai Lama',
    quote: {
      en: 'Remember that not getting what you want is sometimes a wonderful stroke of luck.',
      tr: 'Unutma ki istediğini alamamak bazen harika bir şans eseri olabilir.',
      es: 'Recuerda que no conseguir lo que quieres es a veces un maravilloso golpe de suerte.',
      zh: '记住，有时候得不到你想要的反而是一种幸运。',
    },
  },
  {
    id: 22,
    author: 'Mark Twain',
    quote: {
      en: 'The two most important days in your life are the day you are born and the day you find out why.',
      tr: 'Hayatındaki en önemli iki gün, doğduğun gün ve bunun nedenini keşfettiğin gündür.',
      es: 'Los dos días más importantes en tu vida son el día en que naces y el día en que descubres por qué.',
      zh: '生命中最重���的两天：一天是你出生的日子，另一天是你发现为什么而生的日子。',
    },
  },
  {
    id: 23,
    author: 'Vincent van Gogh',
    quote: {
      en: 'I dream of painting and then I paint my dream.',
      tr: 'Resim yapmayı hayal ederim ve sonra hayalimi resmederim.',
      es: 'Sueño con pintar y luego pinto mi sueño.',
      zh: '我梦见画画，然后我把梦画出来。',
    },
  },
  {
    id: 24,
    author: 'Aristotle',
    quote: {
      en: 'Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.',
      tr: 'Mükemmellik asla bir kaza değildir. Her zaman yüksek niyet, samimi çaba ve akıllı uygulamanın sonucudur.',
      es: 'La excelencia nunca es un accidente. Es siempre el resultado de una alta intención, un esfuerzo sincero y una ejecución inteligente.',
      zh: '卓越从来不是偶然。它永远是崇高意图、真诚努力和智慧执行的结果。',
    },
  },
  {
    id: 25,
    author: 'Rumi',
    quote: {
      en: 'What you seek is seeking you.',
      tr: 'Aradığın şey seni arıyor.',
      es: 'Lo que buscas te está buscando.',
      zh: '你所寻找的也在寻找着你。',
    },
  },
  {
    id: 26,
    author: 'Marie Curie',
    quote: {
      en: 'Nothing in life is to be feared, it is only to be understood.',
      tr: 'Hayatta hiçbir şeyden korkulmamalı, sadece anlaşılmalıdır.',
      es: 'Nada en la vida debe ser temido, solo debe ser entendido.',
      zh: '生活中没有什么可怕的，只有需要理解的。',
    },
  },
  {
    id: 27,
    author: 'Bruce Lee',
    quote: {
      en: 'Be like water making its way through cracks. Do not be assertive, but adjust to the object, and you shall find a way around or through it.',
      tr: 'Çatlaklardan yolunu bulan su gibi ol. İddialı olma, nesneye uyum sağla ve onun etrafında ya da içinden bir yol bulacaksın.',
      es: 'Sé como el agua abriéndose paso entre las grietas. No seas asertivo, ajústate al objeto y encontrarás un camino alrededor o a través de él.',
      zh: '要像水一样渗透缝隙。不要固执，要随物而变，你就能找到绕过或穿过它的方法。',
    },
  },
  {
    id: 28,
    author: 'Jane Goodall',
    quote: {
      en: 'What you do makes a difference, and you have to decide what kind of difference you want to make.',
      tr: 'Yaptığın şey fark yaratır ve nasıl bir fark yaratmak istediğine sen karar vermelisin.',
      es: 'Lo que haces marca la diferencia, y tienes que decidir qué tipo de diferencia quieres hacer.',
      zh: '你的动会带来改变，你需要决定你想要带来什么样的改变。',
    },
  },
  {
    id: 29,
    author: 'Lao Tzu',
    quote: {
      en: 'The journey of a thousand miles begins with one step.',
      tr: 'Bin millik yolculuk tek bir adımla başlar.',
      es: 'El viaje de mil millas comienza con un solo paso.',
      zh: '千里之行，始于足下',
    },
  },
  {
    id: 30,
    author: 'Rosa Parks',
    quote: {
      en: 'Each person must live their life as a model for others.',
      tr: 'Her insan hayatını başkaları için bir örnek olarak yaşamalıdır.',
      es: 'Cada persona debe vivir su vida como un modelo para los demás.',
      zh: '每个人都应该把自己的生活作为他人的榜样。',
    },
  },
  {
    id: 31,
    author: 'Stephen Hawking',
    quote: {
      en: 'Remember to look up at the stars and not down at your feet. Try to make sense of what you see and wonder about what makes the universe exist.',
      tr: 'Yıldızlara bakmayı unutma, ayaklarına değil. Gördüklerini anlamaya çalış ve evrenin var olma sebebini merak et.',
      es: 'Recuerda mirar las estrellas y no tus pies. Trata de entender lo que ves y pregúntate qué hace que exista el universo.',
      zh: '记住要仰望星空，而不是低头看脚。试着理解你所看到的，思考宇宙存在的原因。',
    },
  },
  {
    id: 32,
    author: 'Frida Kahlo',
    quote: {
      en: 'At the end of the day, we can endure much more than we think we can.',
      tr: 'Günün sonunda, düşündüğümüzden çok daha fazlasına dayanabiliriz.',
      es: 'Al final del día, podemos soportar mucho más de lo que creemos.',
      zh: '到最后，我们能承受的远比们以为的要多得多。',
    },
  },
  {
    id: 33,
    author: 'Albert Schweitzer',
    quote: {
      en: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
      tr: 'Başarı mutluluğun anahtarı değildir. Mutluluk başarının anahtarıdır. Yaptığın işi seviyorsan, başarılı olacaksın.',
      es: 'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.',
      zh: '成功不是通往幸福的钥匙。幸福是通往成功的钥匙。如果你热爱你所做的事，你就会成功。',
    },
  },
  {
    id: 34,
    author: 'Maya Angelou',
    quote: {
      en: "Try to be a rainbow in someone's cloud.",
      tr: 'Birinin bulutunda bir gökkuşağı olmaya çalış.',
      es: 'Trata de ser un arcoíris en la nube de alguien.',
      zh: '试着成为别人乌云中的一道彩虹。',
    },
  },
  {
    id: 35,
    author: 'Nikola Tesla',
    quote: {
      en: 'The present is theirs; the future, for which I really worked, is mine.',
      tr: 'Bugün onların; gerçekten çalıştığım gelecek ise benim.',
      es: 'El presente es de ellos; el futuro, por el que realmente trabajé, es mío.',
      zh: '现在属于他；而我真正努力过未来，属于我。',
    },
  },
  {
    id: 36,
    author: 'Thich Nhat Hanh',
    quote: {
      en: 'Because you are alive, everything is possible.',
      tr: 'Hayatta olduğun için her şey mümkün.',
      es: 'Porque estás vivo, todo es posible.',
      zh: '因为你活着，所以一切皆有可能。',
    },
  },
  {
    id: 37,
    author: 'Marcus Aurelius',
    quote: {
      en: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.',
      tr: 'Mutlu bir hayat için çok az şey gereklidir; hepsi senin içinde, düşünme şeklindedir.',
      es: 'Se necesita muy poco para tener una vida feliz; todo está dentro de ti, en tu forma de pensar.',
      zh: '快乐的生活只需要很少的东西；这一切都在你自己内心，在于你的思维方式。',
    },
  },
  {
    id: 38,
    author: "Georgia O'Keeffe",
    quote: {
      en: "I've been absolutely terrified every moment of my life – and I've never let it keep me from doing a single thing I wanted to do.",
      tr: 'Hayatımın her anında tamamen dehşete kapıldım - ama bu hiçbir zaman yapmak istediğim şeyleri yapmama engel olmadı.',
      es: 'He estado absolutamente aterrorizada cada momento de mi vida, y nunca he dejado que eso me impida hacer nada de lo que quería hacer.',
      zh: '我一生的每一刻都感到非常恐惧，但我从未让恐惧阻止我做任何我想做的事。',
    },
  },
  {
    id: 39,
    author: 'Carl Sagan',
    quote: {
      en: 'Somewhere, something incredible is waiting to be known.',
      tr: 'Bir yerlerde, bilinmeyi bekleyen inanılmaz bir şey var.',
      es: 'En algún lugar, algo increíble está esperando ser conocido.',
      zh: '在某处，有些令人难以置信的事物正等待被发现。',
    },
  },
  {
    id: 40,
    author: 'Malala Yousafzai',
    quote: {
      en: 'One child, one teacher, one book, one pen can change the world.',
      tr: 'Bir çocuk, bir öğretmen, bir kitap, bir kalem dünyayı değiştirebilir.',
      es: 'Un niño, un profesor, un libro y un lápiz pueden cambiar el mundo.',
      zh: '一个孩子，一位老师，一本书，一支笔就能改变世界。',
    },
  },
  {
    id: 41,
    author: 'Coco Chanel',
    quote: {
      en: 'The most courageous act is still to think for yourself. Aloud.',
      tr: 'En cesur davranış hala kendin için düşünmektir. Sesli olarak.',
      es: 'El acto más valiente sigue siendo pensar por ti mismo. En voz alta.',
      zh: '最勇敢的行为仍然是独立思考。并大声说出来。',
    },
  },
  {
    id: 42,
    author: 'Friedrich Nietzsche',
    quote: {
      en: 'He who has a why to live can bear almost any how.',
      tr: 'Yaşamak için bir nedeni olan, her türlü zorluğa katlanabilir.',
      es: 'Quien tiene un por qué para vivir puede soportar casi cualquier cómo.',
      zh: '有了活着的理由，便能承受任何活着的方式。',
    },
  },
  {
    id: 43,
    author: 'Mary Oliver',
    quote: {
      en: 'Tell me, what is it you plan to do with your one wild and precious life?',
      tr: 'Söyle bana, bu tek vahşi ve değerli hayatınla ne yapmayı planlıyorsun?',
      es: 'Dime, ¿qué planeas hacer con tu única, salvaje y preciosa vida?',
      zh: '告诉我，你打算如何度过你这唯一的、狂野的、珍贵的生命？',
    },
  },
  {
    id: 44,
    author: 'Amelia Earhart',
    quote: {
      en: 'The most difficult thing is the decision to act, the rest is merely tenacity.',
      tr: 'En zor şey harekete geçme kararıdır, gerisi sadece azimdir.',
      es: 'Lo más difícil es la decisión de actuar, el resto es simplemente tenacidad.',
      zh: '最困难的是行动的决定，其余的只是坚持。',
    },
  },
  {
    id: 45,
    author: 'Alan Turing',
    quote: {
      en: 'Sometimes it is the people no one imagines anything of who do the things that no one can imagine.',
      tr: 'Bazen kimsenin bir şey beklemediği insanlar, kimsenin hayal edemeyeceği şeyleri yaparlar.',
      es: 'A veces son las personas de las que nadie espera nada quienes hacen cosas que nadie puede imaginar.',
      zh: '有时候，正是那些没人期待的人，做出了无人能想象的事。',
    },
  },
  {
    id: 46,
    author: 'Virginia Woolf',
    quote: {
      en: 'No need to hurry. No need to sparkle. No need to be anybody but oneself.',
      tr: 'Acele etmeye gerek yok. Parlamaya gerek yok. Kendinden başka biri olmaya gerek yok.',
      es: 'No hay necesidad de apresurarse. No hay necesidad de brillar. No hay necesidad de ser nadie más que uno mismo.',
      zh: '不需要匆忙。不需要闪耀。不需要成为除自己之外的任何人。',
    },
  },
  {
    id: 47,
    author: 'Socrates',
    quote: {
      en: 'The secret of change is to focus all of your energy not on fighting the old, but on building the new.',
      tr: 'Değişimin sırrı, tüm enerjini eskiyle savaşmaya deil, yeniyi inşa etmeye odaklamaktır.',
      es: 'El secreto del cambio es enfocar toda tu energía no en luchar contra lo viejo, sino en construir lo nuevo.',
      zh: '改变的秘诀是，把所有的精力不是用来对抗旧的，而是用来建设新的。',
    },
  },
  {
    id: 48,
    author: 'Leonardo da Vinci',
    quote: {
      en: 'Learning never exhausts the mind.',
      tr: 'Öğrenmek zihni asla yormaz.',
      es: 'El aprendizaje nunca agota la mente.',
      zh: '学习永远不会使心智疲惫。',
    },
  },
  {
    id: 49,
    author: 'Sylvia Plath',
    quote: {
      en: 'The worst enemy to creativity is self-doubt.',
      tr: 'Yaratıcılığın en büyük düşmanı kendinden şüphe duymaktır.',
      es: 'El peor enemigo de la creatividad es la duda de uno mismo.',
      zh: '创造力最大的敌人是自我怀疑。',
    },
  },
  {
    id: 50,
    author: 'James Baldwin',
    quote: {
      en: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
      tr: 'Yüzleşilen her şey değiştirilemez, ama yüzleşilmeden hiçbir şey değiştirilemez.',
      es: 'No todo lo que se enfrenta puede ser cambiado, pero nada puede ser cambiado hasta que se enfrenta.',
      zh: '不是所有面对的事物都能改变，但在面对之前，什么都无法改变。',
    },
  },
  {
    id: 51,
    author: 'Seneca',
    quote: {
      en: 'Luck is what happens when preparation meets opportunity.',
      tr: 'Şans, hazırlık fırsatla buluştuğunda ortaya çıkan şeydir.',
      es: 'La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.',
      zh: '当准备遇到机会时，就会产生所谓的运气。',
    },
  },
  {
    id: 52,
    author: 'Toni Morrison',
    quote: {
      en: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
      tr: 'Eğer okumak istediğin bir kitap varsa ama henüz yazılmamışsa, o zaman onu sen yazmalısın.',
      es: 'Si hay un libro que quieres leer pero aún no ha sido escrito, entonces debes escribirlo tú.',
      zh: '如果有一本你想读的书，但它还没有被写出来，那么你就必须写它。',
    },
  },
  {
    id: 53,
    author: 'Epictetus',
    quote: {
      en: 'First say to yourself what you would be; then do what you have to do.',
      tr: 'Önce kendine ne olmak istediğini söyle; sonra yapmak zorunda olduğunu yap.',
      es: 'Primero dite a ti mismo lo que quieres ser; luego haz lo que tengas que hacer.',
      zh: '先告诉自己你想成为什么样的人；然后去做你必须做的事。',
    },
  },
  {
    id: 54,
    author: 'Marie Kondo',
    quote: {
      en: 'The question of what you want to own is actually the question of how you want to live your life.',
      tr: 'Neye sahip olmak istediğin sorusu, aslında hayatını nasıl yaşamak istediğin sorusudur.',
      es: 'La pregunta de qué quieres poseer es en realidad la pregunta de cómo quieres vivir tu vida.',
      zh: '你想拥有什么的问题，实际上是你想如何生活的问题。',
    },
  },
  {
    id: 55,
    author: 'Plato',
    quote: {
      en: 'The beginning is the most important part of the work.',
      tr: 'Başlangıç, işin en önemli parçasıdır.',
      es: 'El comienzo es la parte más importante del trabajo.',
      zh: '开始是工作中最重要的部分。',
    },
  },
  {
    id: 56,
    author: 'Simone de Beauvoir',
    quote: {
      en: "Change your life today. Don't gamble on the future, act now, without delay.",
      tr: 'Hayatını bugün değiştir. Gelecek üzerine kumar oynama, şimdi harekete geç, gecikmeden.',
      es: 'Cambia tu vida hoy. No apuestes al futuro, actúa ahora, sin demora.',
      zh: '今天就改变你的生活。不要在未来上赌博，现在就行动，不要拖延。',
    },
  },
  {
    id: 57,
    author: 'Rabindranath Tagore',
    quote: {
      en: "You can't cross the sea merely by standing and staring at the water.",
      tr: 'Sadece durup suya bakarak denizi geçemezsin.',
      es: 'No puedes cruzar el mar simplemente mirando el agua.',
      zh: '你不能仅仅站在那里盯着水看就能渡过海洋。',
    },
  },
  {
    id: 58,
    author: 'Zora Neale Hurston',
    quote: {
      en: 'There are years that ask questions and years that answer.',
      tr: 'Soru soran yıllar vardır ve cevap veren yıllar vardır.',
      es: 'Hay años que hacen preguntas y años que responden.',
      zh: '有些年份提出问题，有些年份给出答案。',
    },
  },
  {
    id: 59,
    author: 'Voltaire',
    quote: {
      en: 'Let us cultivate our garden.',
      tr: 'Bahçemizi yetiştirmeye devam edelim.',
      es: 'Cultivemos nuestro jardín.',
      zh: '让我们耕耘我们的花园。',
    },
  },
  {
    id: 60,
    author: 'bell hooks',
    quote: {
      en: "The function of art is to do more than tell it like it is - it's to imagine what is possible.",
      tr: 'Sanatın işlevi olduğu gibi anlatmaktan fazlasıdır - mümkün olanı hayal etmektir.',
      es: 'La función del arte es hacer más que decir las cosas como son: es imaginar lo que es posible.',
      zh: '艺术的功能不仅仅是���示现实，而是想象可能性。',
    },
  },
  {
    id: 61,
    author: 'Haruki Murakami',
    quote: {
      en: 'Pain is inevitable. Suffering is optional.',
      tr: 'Acı kaçınılmazdır. Istırap isteğe bağlıdır.',
      es: 'El dolor es inevitable. El sufrimiento es opcional.',
      zh: '痛苦是不可避免的。但受苦是可选择的。',
    },
  },
  {
    id: 62,
    author: 'Hannah Arendt',
    quote: {
      en: 'What really matters is the example, the capacity to illuminate the way forward through action.',
      tr: 'Gerçekten önemli olan örnek olmaktır, eylemle ileriye giden yolu aydınlatma kapasitesidir.',
      es: 'Lo que realmente importa es el ejemplo, la capacidad de iluminar el camino hacia adelante a través de la acción.',
      zh: '真正重要的是榜样，是通过行动照亮前进道路的能力。',
    },
  },
  {
    id: 63,
    author: 'Kazuo Ishiguro',
    quote: {
      en: 'There was another life that I might have had, but I am having this one.',
      tr: 'Yaşayabileceğim başka bir hayat vardı, ama ben bunu yaşıyorum.',
      es: 'Había otra vida que podría haber tenido, pero estoy viviendo esta.',
      zh: '我本可以过另一种生活，但我正在过这一种。',
    },
  },
  {
    id: 64,
    author: 'Iris Murdoch',
    quote: {
      en: 'We can only learn to love by loving.',
      tr: 'Sevmeyi ancak severek öğrenebiliriz.',
      es: 'Solo podemos aprender a amar amando.',
      zh: '我们只能通过爱来学会爱。',
    },
  },
  {
    id: 65,
    author: 'Jiddu Krishnamurti',
    quote: {
      en: 'The ability to observe without evaluating is the highest form of intelligence.',
      tr: 'Değerlendirmeden gözlemleyebilme yeteneği, zekanın en yüksek formudur.',
      es: 'La capacidad de observar sin evaluar es la forma más alta de inteligencia.',
      zh: '不带评判地观察的能力是最高形式的智慧。',
    },
  },
  {
    id: 66,
    author: 'Ursula K. Le Guin',
    quote: {
      en: 'It is good to have an end to journey toward; but it is the journey that matters, in the end.',
      tr: 'Yolculuk için bir hedefin olması iyidir; ama sonunda önemli olan yolculuğun kendisidir.',
      es: 'Es bueno tener un final hacia el cual viajar; pero es el viaje lo que importa, al final.',
      zh: '有个终点可以前进是好事；但最终重要的是旅程本身。',
    },
  },
  {
    id: 67,
    author: 'James Joyce',
    quote: {
      en: 'Mistakes are the portals of discovery.',
      tr: 'Hatalar keşfin kapılarıdır.',
      es: 'Los errores son los portales del descubrimiento.',
      zh: '错误发现的入口',
    },
  },
  {
    id: 68,
    author: 'Simone Weil',
    quote: {
      en: 'Attention is the rarest and purest form of generosity.',
      tr: 'Dikkat, cömertliğin en nadir ve en saf biçimidir.',
      es: 'La atención es la forma más rara y pura de generosidad.',
      zh: '专注是最罕见和最纯粹的慷慨形式。',
    },
  },
  {
    id: 69,
    author: 'Octavia Butler',
    quote: {
      en: "First forget inspiration. Habit is more dependable. Habit will sustain you whether you're inspired or not.",
      tr: 'Önce ilhamı unut. Alışkanlık daha güvenilirdir. Alışkanlık, ilhamın olsun ya da olmasın seni destekler.',
      es: 'Primero olvida la inspiración. El hábito es más confiable. El hábito te sostendrá estés inspirado o no.',
      zh: '首先忘记灵感。习惯更可靠。无论你是否有灵感，习惯都会支撑着你。',
    },
  },
  {
    id: 70,
    author: 'Carl Jung',
    quote: {
      en: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
      tr: 'Bilinçsizi bilinçli hale getirene kadar, o hayatını yönlendirecek ve sen buna kader diyeceksin.',
      es: 'Hasta que no hagas consciente lo inconsciente, dirigirá tu vida y lo llamarás destino.',
      zh: '在你让无意识变得有意识之前，它会指引你的生活，而你会称之为命运。',
    },
  },
  {
    id: 71,
    author: 'Italo Calvino',
    quote: {
      en: 'The more enlightened our houses are, the more their walls ooze ghosts.',
      tr: 'Evlerimiz ne kadar aydınlanırsa, duvarları o kadar çok hayalet sızdırır.',
      es: 'Cuanto más iluminadas están nuestras casas, más fantasmas rezuman sus paredes.',
      zh: '我们的房子越明亮，墙壁渗出的幽灵就越多。',
    },
  },
  {
    id: 72,
    author: 'Martha Graham',
    quote: {
      en: 'No artist is pleased. There is no satisfaction whatever at any time. There is only a divine dissatisfaction.',
      tr: 'Hiçbir sanatçı memnun değildir. Hiçbir zaman tam bir tatmin yoktur. Sadece kutsal bir memnuniyetsizlik vardır.',
      es: 'Ningún artista está satisfecho. No hay satisfacción en ningún momento. Solo hay una divina insatisfacción.',
      zh: '没有艺术家是满的。任何时候都没有满足感。只有一种神圣的不满足。',
    },
  },
  {
    id: 73,
    author: 'John Steinbeck',
    quote: {
      en: 'Ideas are like rabbits. You get a couple and learn how to handle them, and pretty soon you have a dozen.',
      tr: 'Fikirler tavşanlar gibidir. Bir çift edinir ve onlarla nasıl başa çıkacağını öğrenirsin, çok geçmeden bir düzine olurlar.',
      es: 'Las ideas son como los conejos. Consigues un par y aprendes a manejarlos, y muy pronto tienes una docena.',
      zh: '想法就像兔子。你得到一对并学会处理它们，很快就会有一打。',
    },
  },
  {
    id: 74,
    author: 'Pema Chödrön',
    quote: {
      en: 'The most fundamental aggression to ourselves, the most fundamental harm we can do to ourselves, is to remain ignorant by not having the courage to look at ourselves honestly.',
      tr: 'Kendimize yapabileceğimiz en temel saldırı, en temel zarar, kendimize dürüstçe bakma cesaretini göstermeyerek cahil kalmaktır.',
      es: 'La agresión más fundamental hacia nosotros mismos, el daño más fundamental que podemos hacernos, es permanecer ignorantes por no tener el coraje de mirarnos honestamente.',
      zh: '对自己最根本的攻击，我们能对自己造成的最根本的伤害，就是因为没有勇气诚实地审视自己而保持无知。',
    },
  },
  {
    id: 75,
    author: 'Jorge Luis Borges',
    quote: {
      en: 'I have always imagined that Paradise will be a kind of library.',
      tr: "Her zaman Cennet'in bir tür kütüphane olacağını hayal ettim.",
      es: 'Siempre imaginé que el Paraíso sería algún tipo de biblioteca.',
      zh: '我一直想象天堂会是一种图书馆。',
    },
  },
  {
    id: 76,
    author: 'Anaïs Nin',
    quote: {
      en: "Life shrinks or expands in proportion to one's courage.",
      tr: 'Hayat insanın cesareti oranında daralır ya da genişler.',
      es: 'La vida se encoge o se expande en proporción al coraje de uno.',
      zh: '生活会随着一个人的勇气而收缩或扩张。',
    },
  },
  {
    id: 77,
    author: 'Aldous Huxley',
    quote: {
      en: "Experience is not what happens to you; it's what you do with what happens to you.",
      tr: 'Deneyim başına gelenler değil; başına gelenlerle ne yaptığındır.',
      es: 'La experiencia no es lo que te sucede; es lo que haces con lo que te sucede.',
      zh: '经验不是发生在你身上的事；而是你如何处理发生在你身上的事。',
    },
  },
  {
    id: 78,
    author: 'Susan Sontag',
    quote: {
      en: "Do stuff. Be clenched, curious. Not waiting for inspiration's shove or society's kiss on your forehead.",
      tr: 'Bir şeyler yap. Azimli, meraklı ol. İlhamın dürtmesini ya da toplumun alnına konduracağı öpücüğü bekleme.',
      es: 'Haz cosas. Mantente tenso, curioso. No esperes el empujón de la inspiración o el beso de la sociedad en tu frente.',
      zh: '做事。保持专注，保持好奇。不要等待灵感的推动或社会的额头之吻。',
    },
  },
  {
    id: 79,
    author: 'Jean-Paul Sartre',
    quote: {
      en: "Freedom is what you do with what's been done to you.",
      tr: 'Özgürlük, sana yapılanlarla senin ne yaptığındır.',
      es: 'La libertad es lo que haces con lo que te han hecho.',
      zh: '自由就是你如何处理别人对你做的事。',
    },
  },
  {
    id: 80,
    author: 'Junot Díaz',
    quote: {
      en: 'The half-life of love is forever.',
      tr: 'Aşkın yarı ömrü sonsuzdur.',
      es: 'La vida media del amor es para siempre.',
      zh: '爱的半衰期是永恒的。',
    },
  },
  {
    id: 81,
    author: 'Marcus Aurelius',
    quote: {
      en: 'Waste no more time arguing about what a good person should be. Be one.',
      tr: 'İyi bir insanın nasıl olması gerektiğini tartışarak daha fazla zaman kaybetme. İyi bir insan ol.',
      es: 'No pierdas más tiempo discutiendo sobre cómo debe ser una buena persona. Sé una.',
      zh: '不要再浪费时间争论一个好人应该是什么样子。做一个好人就是了。',
    },
  },
  {
    id: 82,
    author: 'Thich Nhat Hanh',
    quote: {
      en: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.',
      tr: 'Şu an neşe ve mutlulukla dolu. Eğer dikkatli olursan, bunu göreceksin.',
      es: 'El momento presente está lleno de alegría y felicidad. Si estás atento, lo verás.',
      zh: '当下充满了欢乐和幸福。如果你留心，就会看到。',
    },
  },
  {
    id: 83,
    author: 'Albert Camus',
    quote: {
      en: 'In the midst of winter, I found there was, within me, an invincible summer.',
      tr: 'Kışın ortasında, içimde yenilmez bir yaz olduğunu keşfettim.',
      es: 'En medio del invierno, descubrí que había, dentro de mí, un verano invencible.',
      zh: '在严冬之中，我发现在我内心有一个不可战胜的夏天。',
    },
  },
  {
    id: 84,
    author: 'Mary Wollstonecraft',
    quote: {
      en: 'The beginning is always today.',
      tr: 'Başlangıç her zaman bugündür.',
      es: 'El comienzo es siempre hoy.',
      zh: '开始永远是今天。',
    },
  },
  {
    id: 85,
    author: 'Rainer Maria Rilke',
    quote: {
      en: 'The only journey is the one within.',
      tr: 'Tek yolculuk içsel olandır.',
      es: 'El único viaje es el interior.',
      zh: '唯一的旅程是内心的旅程。',
    },
  },
  {
    id: 86,
    author: 'Simone de Beauvoir',
    quote: {
      en: 'One is not born, but rather becomes, oneself.',
      tr: 'İnsan doğmaz, daha ziyade kendisi olur.',
      es: 'Uno no nace, sino que se convierte en uno mismo.',
      zh: '人不是生来如此，而是逐渐成为自己。',
    },
  },
  {
    id: 87,
    author: 'Franz Kafka',
    quote: {
      en: 'A book must be the axe for the frozen sea within us.',
      tr: 'Bir kitap, içimizdeki donmuş denizi kıran balta olmalıdır.',
      es: 'Un libro debe ser el hacha para el mar helado dentro de nosotros.',
      zh: '一本书必须是打破我们内心冰封之海的斧头。',
    },
  },
  {
    id: 88,
    author: 'Zhuangzi',
    quote: {
      en: 'Happiness is the absence of the striving for happiness.',
      tr: 'Mutluluk, mutluluğu aramanın olmayışıdır.',
      es: 'La felicidad es la ausencia del esfuerzo por la felicidad.',
      zh: '幸福就是不追求幸福。',
    },
  },
  {
    id: 89,
    author: 'Søren Kierkegaard',
    quote: {
      en: 'Life is not a problem to be solved, but a reality to be experienced.',
      tr: 'Hayat çözülmesi gereken bir problem değil, deneyimlenmesi gereken bir gerçekliktir.',
      es: 'La vida no es un problema a resolver, sino una realidad a experimentar.',
      zh: '生活不是要解决的问题，而是要经历的现实。',
    },
  },
  {
    id: 90,
    author: 'Audre Lorde',
    quote: {
      en: 'When I dare to be powerful, to use my strength in the service of my vision, then it becomes less important whether I am afraid.',
      tr: 'Güçlü olmaya, gücümü vizyonumun hizmetinde kullanmaya cesaret ettiğimde, korkup korkmadığım daha az önemli hale gelir.',
      es: 'Cuando me atrevo a ser poderosa, a usar mi fuerza al servicio de mi visión, entonces se vuelve menos importante si tengo miedo.',
      zh: '当我敢于强大，敢于将我的力量用于实现我的愿景时，我是否害怕就变得不那么重要了。',
    },
  },
  {
    id: 91,
    author: 'Viktor E. Frankl',
    quote: {
      en: 'Between stimulus and response there is a space. In that space is our power to choose our response.',
      tr: 'Uyaran ve tepki arasında bir boşluk vardır. O boşlukta tepkimizi seçme gücümüz yatar.',
      es: 'Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder de elegir nuestra respuesta.',
      zh: '在刺激和反应之间有一个空间。在那个空间里存在着我们选择反应的力量。',
    },
  },
  {
    id: 92,
    author: 'Gabriel García Márquez',
    quote: {
      en: 'It is not true that people stop pursuing dreams because they grow old, they grow old because they stop pursuing dreams.',
      tr: 'İnsanların yaşlandıkları için hayallerinin peşinden gitmeyi bıraktıkları doğru değil, hayallerinin peşinden gitmeyi bıraktıkları için yaşlanırlar.',
      es: 'No es cierto que la gente deje de perseguir sueños porque se hace vieja, se hace vieja porque deja de perseguir sueños.',
      zh: '人们不是因为变老才停止追求梦想，而是因为停止追求梦想才变老。',
    },
  },
  {
    id: 93,
    author: 'Fyodor Dostoevsky',
    quote: {
      en: 'To live without hope is to cease to live.',
      tr: 'Umut olmadan yaşamak, yaşamayı bırakmaktır.',
      es: 'Vivir sin esperanza es dejar de vivir.',
      zh: '生活没有希望就等于停止生活。',
    },
  },
  {
    id: 94,
    author: 'Isabel Allende',
    quote: {
      en: 'Write what should not be forgotten.',
      tr: 'Unutulmaması gerekeni yaz.',
      es: 'Escribe lo que no debe ser olvidado.',
      zh: '写下不被遗忘的事',
    },
  },
  {
    id: 95,
    author: 'Thucydides',
    quote: {
      en: 'The secret of happiness is freedom, and the secret of freedom is courage.',
      tr: 'Mutluluğun sırrı özgürlük, özgürlüğün sırrı cesarettir.',
      es: 'El secreto de la felicidad es la libertad, y el secreto de la libertad es el coraje.',
      zh: '幸福的秘密是自由，自由的秘密是勇气。',
    },
  },
  {
    id: 96,
    author: 'Milan Kundera',
    quote: {
      en: 'The struggle of man against power is the struggle of memory against forgetting.',
      tr: 'İnsanın güce karşı mücadelesi, hafızanın unutmaya karşı mücadelesidir.',
      es: 'La lucha del hombre contra el poder es la lucha de la memoria contra el olvido.',
      zh: '人对抗权力的斗争就是记忆对抗遗忘的斗争。',
    },
  },
  {
    id: 97,
    author: 'Jeanette Winterson',
    quote: {
      en: 'What you risk reveals what you value.',
      tr: 'Neyi riske attığın, neye değer verdiğini gösterir.',
      es: 'Lo que arriesgas revela lo que valoras.',
      zh: '你愿意冒的风险揭示了你的价值观。',
    },
  },
  {
    id: 98,
    author: 'Heraclitus',
    quote: {
      en: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
      tr: 'Hiçbir insan aynı nehre iki kez giremez, çünkü ne o aynı nehirdir ne de o aynı insan.',
      es: 'Ningún hombre puede bañarse dos veces en el mismo río, pues no es el mismo río ni él es el mismo hombre.',
      zh: '人不能两次踏入同一条河流，因为这不是同一条河流，他也不是同一个人。',
    },
  },
  {
    id: 99,
    author: 'Marguerite Yourcenar',
    quote: {
      en: 'The true birthplace is that wherein for the first time one looks intelligently upon oneself.',
      tr: 'Gerçek doğum yeri, ilk kez kendine akıllıca baktığın yerdir.',
      es: 'El verdadero lugar de nacimiento es aquel donde por primera vez uno se mira inteligentemente a sí mismo.',
      zh: '真正的诞生地是你第一次明智地审视自己的地方。',
    },
  },
  {
    id: 100,
    author: 'Bertrand Russell',
    quote: {
      en: 'The good life is one inspired by love and guided by knowledge.',
      tr: 'İyi yaşam, sevgiyle ilham alan ve bilgiyle yönlendirilen yaşamdır.',
      es: 'La buena vida es aquella inspirada por el amor y guiada por el conocimiento.',
      zh: '美好的生活是由爱启发，由知识指引的生活。',
    },
  },
  {
    id: 101,
    author: 'Simone Weil',
    quote: {
      en: 'Attention is the rarest and purest form of generosity.',
      tr: 'Dikkat, cömertliğin en nadir ve en saf biçimidir.',
      es: 'La atención es la forma más rara y pura de generosidad.',
      zh: '专注是最罕见和最纯粹的慷慨形式。',
    },
  },
  {
    id: 102,
    author: 'Paulo Freire',
    quote: {
      en: 'Education does not transform the world. Education changes people. People change the world.',
      tr: 'Eğitim dünyayı dönüştürmez. Eğitim insanları değiştirir. İnsanlar dünyayı değiştirir.',
      es: 'La educación no transforma el mundo. La educación cambia a las personas. Las personas transforman el mundo.',
      zh: '教育不能改变世界。教育改变人。人改变世界。',
    },
  },
  {
    id: 103,
    author: 'Matsuo Basho',
    quote: {
      en: 'Every day is a journey, and the journey itself is home.',
      tr: 'Her gün bir yolculuktur ve yolculuğun kendisi evdir.',
      es: 'Cada día es un viaje, y el viaje mismo es el hogar.',
      zh: '每一天都是一次旅程，旅程本身就是家。',
    },
  },
  {
    id: 104,
    author: 'Toni Morrison',
    quote: {
      en: 'The function of freedom is to free someone else.',
      tr: 'Özgürlüğün işlevi başka birini özgür kılmaktır.',
      es: 'La función de la libertad es liberar a alguien más.',
      zh: '自由的功能是使他人获得自由。',
    },
  },
  {
    id: 105,
    author: 'Carl Sagan',
    quote: {
      en: 'We are a way for the cosmos to know itself.',
      tr: 'Biz evrenin kendini tanıma yoluyuz.',
      es: 'Somos una manera para que el cosmos se conozca a sí mismo.',
      zh: '我们是宇宙认识自己的一种方式。',
    },
  },
  {
    id: 106,
    author: 'Virginia Woolf',
    quote: {
      en: 'Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind.',
      tr: 'İsterseniz kütüphanelerinizi kilitleyin; ama zihnimin özgürlüğüne koyabileceğiniz hiçbir kapı, kilit, sürgü yoktur.',
      es: 'Encierren sus bibliotecas si quieren; pero no hay puerta, ni cerradura, ni cerrojo que puedan imponer a la libertad de mi mente.',
      zh: '你们可以把图书馆锁起来；但是没有任何门，任何锁，任何门闩能够禁锢我思想的自由。',
    },
  },
  {
    id: 107,
    author: 'Khalil Gibran',
    quote: {
      en: 'Your pain is the breaking of the shell that encloses your understanding.',
      tr: 'Acın, anlayışını çevreleyen kabuğun kırılmasıdır.',
      es: 'Tu dolor es la ruptura de la cáscara que encierra tu entendimiento.',
      zh: '你的痛苦是包围你理解的外壳的破裂。',
    },
  },
  {
    id: 108,
    author: 'Octavio Paz',
    quote: {
      en: 'Solitude is the profoundest fact of the human condition.',
      tr: 'Yalnızlık, insan durumunun en derin gerçeğidir.',
      es: 'La soledad es el hecho más profundo de la condición humana.',
      zh: '孤独是人类状况最深刻的事实。',
    },
  },
  {
    id: 109,
    author: 'Rabindranath Tagore',
    quote: {
      en: 'The butterfly counts not months but moments, and has time enough.',
      tr: 'Kelebek ayları değil anları sayar ve yeterince zamanı vardır.',
      es: 'La mariposa no cuenta meses sino momentos, y tiene tiempo suficiente.',
      zh: '蝴蝶不数月份只数时刻，却有足够的时间。',
    },
  },
  {
    id: 110,
    author: 'Michel Foucault',
    quote: {
      en: 'Where there is power, there is resistance.',
      tr: 'Gücün olduğu yerde, direniş vardır.',
      es: 'Donde hay poder, hay resistencia.',
      zh: '哪里有权力，哪里就有反抗。',
    },
  },
  {
    id: 111,
    author: 'Umberto Eco',
    quote: {
      en: 'We live for books. A sweet mission in this world dominated by disorder and decay.',
      tr: 'Kitaplar için yaşıyoruz. Düzensizlik ve çürümenin hâkim olduğu bu dünyada tatlı bir görev.',
      es: 'Vivimos por los libros. Una dulce misión en este mundo dominado por el desorden y la decadencia.',
      zh: '我们为书而活。在这个被混乱和衰败主导的世界里，这是一个甜蜜的使命。',
    },
  },
  {
    id: 112,
    author: 'Simone Biles',
    quote: {
      en: "I'm not the next Usain Bolt or Michael Phelps. I'm the first Simone Biles.",
      tr: "Ben bir sonraki Usain Bolt ya da Michael Phelps değilim. Ben ilk Simone Biles'im.",
      es: 'No soy la próxima Usain Bolt o Michael Phelps. Soy la primera Simone Biles.',
      zh: '我不是下一个尤塞恩·博尔特或迈克尔·菲尔普斯。我是第一个西蒙·拜尔斯。',
    },
  },
  {
    id: 113,
    author: 'Haruki Murakami',
    quote: {
      en: 'If you only read the books that everyone else is reading, you can only think what everyone else is thinking.',
      tr: 'Eğer sadece herkesin okuduğu kitapları okursan, ancak herkesin düşündüğünü düşünebilirsin.',
      es: 'Si solo lees los libros que todos los demás están leyendo, solo podrás pensar lo que todos los demás están pensando.',
      zh: '如果你只读别人都在读的书，你就只能想到别人都在想的事。',
    },
  },
  {
    id: 114,
    author: 'Iris Murdoch',
    quote: {
      en: 'Love is the extremely difficult realization that something other than oneself is real.',
      tr: 'Aşk, kendinden başka bir şeyin gerçek olduğunun son derece zor kavranmasıdır.',
      es: 'El amor es la realización extremadamente difícil de que algo más que uno mismo es real.',
      zh: '爱是一个极其困难的认知：除了自己之外的东西也是真实的。',
    },
  },
  {
    id: 115,
    author: 'James Baldwin',
    quote: {
      en: 'The world is before you, and you need not take it or leave it as it was when you came in.',
      tr: 'Dünya önünde, ve onu geldiğin zamanki gibi kabul etmek ya da bırakmak zorunda değilsin.',
      es: 'El mundo está ante ti, y no necesitas tomarlo o dejarlo como estaba cuando llegaste.',
      zh: '世界就在你面前，你不必接受或留下它原来的样子。',
    },
  },
  {
    id: 116,
    author: 'Sylvia Plath',
    quote: {
      en: 'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',
      tr: 'Derin bir nefes aldım ve kalbimin eski övüncünü dinledim: Ben varım, ben varım, ben varım.',
      es: 'Tomé un respiro profundo y escuché la vieja jactancia de mi corazón: Soy, soy, soy.',
      zh: '我深深地吸了一口气，听着我心脏的古老骄傲：我在，我在，我在。',
    },
  },
  {
    id: 117,
    author: 'Orhan Pamuk',
    quote: {
      en: "Life is beautiful because it's changeable, like the shapes of clouds.",
      tr: 'Hayat güzeldir çünkü bulutların şekilleri gibi değişkendir.',
      es: 'La vida es hermosa porque es cambiante, como las formas de las nubes.',
      zh: '生活是美好的，因为它像云的形状一样可以改变。',
    },
  },
  {
    id: 118,
    author: 'bell hooks',
    quote: {
      en: 'The practice of love offers no place of safety. We risk loss, hurt, pain. We risk being acted upon by forces outside our control.',
      tr: 'Sevgi pratiği güvenli bir yer sunmaz. Kaybetme, incinme, acı riskini alırız. Kontrolümüz dışındaki güçlerin bize etki etme riskini alırız.',
      es: 'La práctica del amor no ofrece lugar seguro. Arriesgamos pérdida, herida, dolor. Arriesgamos ser afectados por fuerzas fuera de nuestro control.',
      zh: '爱的实践没有提供安全的地方。我们冒着损失、伤害、痛苦的风险。我们冒着被我们无法控制的力量影响的风险。',
    },
  },
  {
    id: 119,
    author: 'Yukio Mishima',
    quote: {
      en: 'True beauty is something that attacks, overpowers, robs, and finally destroys.',
      tr: 'Gerçek güzellik saldıran, alt eden, soyan ve sonunda yok eden bir şeydir.',
      es: 'La verdadera belleza es algo que ataca, domina, roba y finalmente destruye.',
      zh: '真正的美是攻击、压倒、掠夺，最终摧毁的东西。',
    },
  },
  {
    id: 120,
    author: 'Søren Kierkegaard',
    quote: {
      en: 'Life is not a problem to be solved, but a reality to be experienced.',
      tr: 'Hayat çözülmesi gereken bir problem değil, deneyimlenmesi gereken bir gerçekliktir.',
      es: 'La vida no es un problema a resolver, sino una realidad a experimentar.',
      zh: '生活不是要解决的问题，而是要经历的现实。',
    },
  },
  {
    id: 121,
    author: 'Elif Shafak',
    quote: {
      en: 'Every true love and friendship is a story of unexpected transformation.',
      tr: 'Her gerçek aşk ve dostluk, beklenmedik bir dönüşümün hikayesidir.',
      es: 'Cada amor verdadero y amistad es una historia de transformación inesperada.',
      zh: '每一个真正的爱情和友谊都是一个意想不到的转变故事。',
    },
  },
  {
    id: 122,
    author: 'Italo Calvino',
    quote: {
      en: 'The inferno of the living is not something that will be; if there is one, it is what is already here.',
      tr: 'Yaşayanların cehennemi gelecekte olacak bir şey değildir; eğer varsa, o zaten buradadır.',
      es: 'El infierno de los vivos no es algo que será; si hay uno, es lo que ya está aquí.',
      zh: '活人的地狱不是将来会有的东西；如果有的话，那就是已经在这里的东西。',
    },
  },
  {
    id: 123,
    author: 'Simone de Beauvoir',
    quote: {
      en: 'I am too intelligent, too demanding, and too resourceful for anyone to be able to take charge of me entirely.',
      tr: 'Birinin beni tamamen kontrol edebilmesi için fazla zeki, fazla talepkar ve fazla beceriliyim.',
      es: 'Soy demasiado inteligente, demasiado exigente y demasiado ingeniosa para que alguien pueda hacerse cargo de mí por completo.',
      zh: '我太聪明，要求太高，资源太丰富，没有人能完全掌控我。',
    },
  },
  {
    id: 124,
    author: 'Jorge Luis Borges',
    quote: {
      en: 'Time is the substance I am made of. Time is a river which sweeps me along, but I am the river.',
      tr: 'Zaman benim yapıldığım maddedir. Zaman beni sürükleyen bir nehirdir, ama ben nehirim.',
      es: 'El tiempo es la sustancia de la que estoy hecho. El tiempo es un río que me arrastra, pero yo soy el río.',
      zh: '时间是构成我的物质。时间是一条冲刷着我的河流，但我就是那条河。',
    },
  },
  {
    id: 125,
    author: 'Ursula K. Le Guin',
    quote: {
      en: "Love doesn't just sit there, like a stone; it has to be made, like bread, remade all the time, made new.",
      tr: 'Aşk orada bir taş gibi öylece durmaz; ekmek gibi yapılmalı, sürekli yeniden yapılmalı, yeni kılınmalıdır.',
      es: 'El amor no se queda ahí sentado, como una piedra; tiene que ser hecho, como el pan, rehecho todo el tiempo, hecho nuevo.',
      zh: '爱不会像石头一样静静地躺在那里；它必须像面包一样被制作，不断地重新制作，使之更新。',
    },
  },
  {
    id: 126,
    author: 'Naguib Mahfouz',
    quote: {
      en: 'Home is not where you are born; home is where all your attempts to escape cease.',
      tr: 'Ev doğduğun yer değildir; ev kaçma girişimlerinin son bulduğu yerdir.',
      es: 'El hogar no es donde naces; el hogar es donde cesan todos tus intentos de escapar.',
      zh: '家不是你出生的地方；家是你所有逃离的企图终止的地方。',
    },
  },
  {
    id: 127,
    author: 'Margaret Atwood',
    quote: {
      en: 'A word after a word after a word is power.',
      tr: 'Bir kelime bir kelime bir kelime ardına güçtür.',
      es: 'Una palabra tras otra palabra tras otra palabra es poder.',
      zh: '一个接一个的词就是力量。',
    },
  },
  {
    id: 128,
    author: 'Emil Cioran',
    quote: {
      en: 'It is not worth the bother of killing yourself, since you always kill yourself too late.',
      tr: 'Kendini öldürmeye değmez, çünkü her zaman çok geç öldürürsün kendini.',
      es: 'No vale la pena matarse, ya que uno siempre se mata demasiado tarde.',
      zh: '自杀是不值得的，因为你总是太晚才自杀。',
    },
  },
  {
    id: 129,
    author: 'Clarice Lispector',
    quote: {
      en: 'I write because I have no choice. But I also write because I like words.',
      tr: 'Yazıyorum çünkü başka seçeneğim yok. Ama aynı zamanda kelimeleri sevdiğim için de yazıyorum.',
      es: 'Escribo porque no tengo elección. Pero también escribo porque me gustan las palabras.',
      zh: '我写作是因为我别无选择。但我也写作是因为我喜欢文字。',
    },
  },
  {
    id: 130,
    author: 'Fernando Pessoa',
    quote: {
      en: 'Literature is the most agreeable way of ignoring life.',
      tr: 'Edebiyat, hayatı görmezden gelmenin en hoş yoludur.',
      es: 'La literatura es la manera más agradable de ignorar la vida.',
      zh: '文学是忽视生活最愉快的方式。',
    },
  },
  {
    id: 131,
    author: 'Albert Einstein',
    quote: {
      en: 'Imagination is more important than knowledge.',
      tr: 'Hayal gücü bilgiden daha önemlidir.',
      es: 'La imaginación es más importante que el conocimiento.',
      zh: '想象力比知识更重要。',
    },
  },
  {
    id: 132,
    author: 'Maya Angelou',
    quote: {
      en: 'Nothing will work unless you do.',
      tr: 'Sen çalışmadıkça hiçbir şey çalışmaz.',
      es: 'Nada funcionará a menos que tú lo hagas.',
      zh: '除非你付出行动，否则什么都不会成功。',
    },
  },
  {
    id: 133,
    author: 'Aristotle',
    quote: {
      en: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
      tr: 'Biz tekrar tekrar yaptığımız şeyiz. O halde mükemmellik bir eylem değil, bir alışkanlıktır.',
      es: 'Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto sino un hábito.',
      zh: '我们就是我们重复做的事。因此，卓越不是一种行为，而是一种习惯。',
    },
  },
  {
    id: 134,
    author: 'Lao Tzu',
    quote: {
      en: 'A journey of a thousand miles begins with a single step.',
      tr: 'Bin millik yolculuk tek bir adımla başlar.',
      es: 'Un viaje de mil millas comienza con un solo paso.',
      zh: '千里之行，始于足下。',
    },
  },
  {
    id: 135,
    author: 'Nelson Mandela',
    quote: {
      en: "It always seems impossible until it's done.",
      tr: 'Yapılana kadar her şey imkansız görünür.',
      es: 'Siempre parece imposible hasta que se hace.',
      zh: '在完成之前，一切都似乎是不可能的。',
    },
  },
  {
    id: 136,
    author: 'Friedrich Nietzsche',
    quote: {
      en: 'Those who were seen dancing were thought to be insane by those who could not hear the music.',
      tr: 'Dans edenler, müziği duyamayanlar tarafından deli sanıldılar.',
      es: 'Aquellos que fueron vistos bailando fueron considerados locos por quienes no podían escuchar la música.',
      zh: '那些跳舞的人，在听不见音乐的人眼中是疯子。',
    },
  },
  {
    id: 137,
    author: 'Marie Curie',
    quote: {
      en: 'Nothing in life is to be feared, it is only to be understood.',
      tr: 'Hayatta hiçbir şeyden korkulmamalı, sadece anlaşılmalı.',
      es: 'Nada en la vida debe ser temido, solo debe ser comprendido.',
      zh: '生活中没有什么可怕的，只有需要理解的。',
    },
  },
  {
    id: 138,
    author: 'Paulo Coelho',
    quote: {
      en: "One day you will wake up and there won't be any more time to do the things you've always wanted. Do it now.",
      tr: 'Bir gün uyanacaksın ve her zaman yapmak istediğin şeyler için zaman kalmayacak. Şimdi yap.',
      es: 'Un día despertarás y ya no habrá tiempo para hacer las cosas que siempre quisiste. Hazlo ahora.',
      zh: '有一天你会醒来，发现已经没有时间去做你一直想做的事情了。现在就去做吧。',
    },
  },
  {
    id: 139,
    author: 'Rumi',
    quote: {
      en: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
      tr: 'Dün akıllıydım, dünyayı değiştirmek istedim. Bugün bilgeyim, kendimi değiştiriyorum.',
      es: 'Ayer era inteligente, así que quería cambiar el mundo. Hoy soy sabio, así que estoy cambiando yo mismo.',
      zh: '昨天我很聪明，所以我想改变世界。今天我很智慧，所以我在改变自己。',
    },
  },
  {
    id: 140,
    author: 'Vincent van Gogh',
    quote: {
      en: 'I dream of painting and then I paint my dream.',
      tr: 'Resim yapmayı hayal ederim ve sonra hayalimi resmederim.',
      es: 'Sueño con pintar y luego pinto mi sueño.',
      zh: '我梦见画画，然后我把梦画出来。',
    },
  },
  {
    id: 141,
    author: 'Confucius',
    quote: {
      en: 'By three methods we may learn wisdom: by reflection, which is noblest; by imitation, which is easiest; and by experience, which is the bitterest.',
      tr: 'Bilgeliği üç yöntemle öğrenebiliriz: düşünme ile, ki en asilidir; taklit ile, ki en kolayıdır; ve deneyim ile, ki en acısıdır.',
      es: 'Por tres métodos podemos aprender la sabiduría: por reflexión, que es el más noble; por imitación, que es el más fácil; y por experiencia, que es el más amargo.',
      zh: '获得智慧有三种方法：反省，这是最高尚的；模仿，这是最容易的；经验，这是最痛苦的。',
    },
  },
  {
    id: 142,
    author: 'Oscar Wilde',
    quote: {
      en: 'Be yourself; everyone else is already taken.',
      tr: 'Kendin ol; başka herkes zaten alınmış.',
      es: 'Sé tú mismo; todos los demás ya están ocupados.',
      zh: '做你自己；别人都已经有人做了。',
    },
  },
  {
    id: 143,
    author: 'Helen Keller',
    quote: {
      en: 'Life is either a daring adventure or nothing at all.',
      tr: 'Hayat ya cesur bir macera ya da hiçbir şeydir.',
      es: 'La vida es una aventura atrevida o no es nada.',
      zh: '生活要么是一场大胆的冒险，要么什么都不是。',
    },
  },
  {
    id: 144,
    author: 'Bruce Lee',
    quote: {
      en: 'Empty your mind, be formless, shapeless — like water.',
      tr: 'Zihnini boşalt, biçimsiz, şekilsiz ol — su gibi.',
      es: 'Vacía tu mente, sé amorfo, sin forma — como el agua.',
      zh: '清空你的思想，要无形无状——像水一样。',
    },
  },
  {
    id: 145,
    author: 'Ralph Waldo Emerson',
    quote: {
      en: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
      tr: 'Arkamızda yatan ve önümüzde yatan şeyler, içimizde yatan şeylerle karşılaştırıldığında önemsiz kalır.',
      es: 'Lo que yace detrás de nosotros y lo que yace ante nosotros son asuntos pequeños comparados con lo que yace dentro de nosotros.',
      zh: '与我们内心所蕴含的相比，我们身后和面前的事物都是微不足道的。',
    },
  },
  {
    id: 146,
    author: 'Fyodor Dostoevsky',
    quote: {
      en: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
      tr: 'Acı ve ıstırap, büyük bir zeka ve derin bir kalp için her zaman kaçınılmazdır.',
      es: 'El dolor y el sufrimiento son siempre inevitables para una inteligencia grande y un corazón profundo.',
      zh: '对于一个高度的智慧和深邃的心灵来说，痛苦和苦难总是不可避免的。',
    },
  },
  {
    id: 147,
    author: 'Mahatma Gandhi',
    quote: {
      en: 'Be the change you wish to see in the world.',
      tr: 'Dünyada görmek istediğin değişimin kendisi ol.',
      es: 'Sé el cambio que deseas ver en el mundo.',
      zh: '成为你希望在世界上看到的改变。',
    },
  },
  {
    id: 148,
    author: 'Franz Kafka',
    quote: {
      en: "Don't bend; don't water it down; don't try to make it logical; don't edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly.",
      tr: 'Eğilme; sulandırma; mantıklı hale getirmeye çalışma; ruhunu modaya göre düzenleme. Aksine, en yoğun takıntılarının peşinden acımasızca git.',
      es: 'No te doblegues; no lo diluyas; no trates de hacerlo lógico; no edites tu propia alma según la moda. Más bien, sigue tus obsesiones más intensas sin piedad.',
      zh: '不要屈服；不要淡化；不要试图使其合乎逻辑；不要根据潮流编辑你的灵魂。相反，要无情地追随你最强烈的执着。',
    },
  },
  {
    id: 149,
    author: 'Carl Jung',
    quote: {
      en: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
      tr: 'Bilinçsizi bilinçli hale getirene kadar, o hayatını yönlendirecek ve sen buna kader diyeceksin.',
      es: 'Hasta que no hagas consciente lo inconsciente, dirigirá tu vida y lo llamarás destino.',
      zh: '在你让无意识变为意识之前，它会指引你的生活，而你会称之为命运。',
    },
  },
];
