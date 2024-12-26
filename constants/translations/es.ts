export default {
  common: {
    loading: 'Cargando...',
    error: 'Se produjo un error',
    success: 'Éxito',
    settings: 'Ajustes',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    edit: 'Editar',
    submit: 'Enviar',
    saving: 'Guardando...',
    quoteOfDay: 'Frase del Día',
    or: 'o',
    analyzing: 'Analizando...',
    next: 'Siguiente',
    getStarted: 'Empezar',
  },
  auth: {
    signIn: {
      title: 'Iniciar Sesión',
      googleButton: 'Iniciar sesión con Google',
      goToSignUp: 'Crear Cuenta',
      goToHome: 'Ir a Inicio',
      welcomeTitle: 'Vamos a iniciar sesión',
    },
    errors: {
      inProgress: 'El inicio de sesión ya está en progreso',
      playServices: 'Google Play Services no está disponible',
      default: 'Ocurrió un error durante el inicio de sesión',
      unexpected: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
    },
    email: 'Correo electrónico',
    password: 'Contraseña',
    or: 'o',
    signUp: {
      button: 'Registrarse',
      switch: '¿Ya tienes una cuenta? Inicia sesión',
    },
  },
  settings: {
    title: 'Ajustes',
    anonymous: 'Usuario Anónimo',
    creditScore: 'Tu Crédito',
    accountSettings: 'Configuración de la Cuenta',
    signOut: 'Cerrar Sesión',
    signOutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
    language: {
      title: 'Idioma',
      turkish: 'Turco',
      english: 'Inglés',
      spanish: 'Español',
      chinese: 'Chino',
      changeConfirmTitle: '¿Cambiar Idioma?',
      changeConfirmMessage: 'Puedes cambiar el idioma una vez cada 24 horas. ¿Estás seguro?',
      changeButton: 'Cambiar Idioma',
      waitMessage: 'Por favor espera 24 horas antes de cambiar el idioma nuevamente.',
      timeRemaining: 'Podrás cambiar el idioma en %{hours} horas y %{minutes} minutos.',
    },
    theme: {
      title: 'Modo Nocturno',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
      changing: 'Cambiando el tema...',
    },
    zodiacCard: {
      title: 'Tu Signo Zodiacal',
      description: 'Toca para cambiar tu signo zodiacal',
      updateError: 'Error al actualizar el signo zodiacal. Por favor, inténtalo de nuevo.',
    },
    deleteAccount: {
      button: 'Eliminar Cuenta',
      title: 'Eliminar Cuenta',
      message:
        '¿Estás seguro de que quieres eliminar tu cuenta? Todos tus datos serán eliminados permanentemente.',
      confirm: 'Estoy Seguro',
      success: 'Tu cuenta ha sido eliminada exitosamente',
      error: 'Ocurrió un error al eliminar tu cuenta',
    },
    resetTraits: {
      button: 'Restablecer Puntos Ganados de Tareas',
      title: 'Restablecer Puntuaciones',
      message:
        'Se eliminarán todos los puntos de personalidad obtenidos de las tareas completadas. ¿Estás seguro?',
      confirm: 'Estoy Seguro',
      success: 'Tus puntuaciones han sido restablecidas exitosamente',
      error: 'Ocurrió un error al restablecer las puntuaciones',
      timeRestriction: {
        title: 'Restablecer Puntos',
        message: 'Puedes restablecer tus puntos de personalidad una vez cada 7 días.',
        timeRemaining:
          'Tiempo restante para el próximo restablecimiento: {{days}} días {{hours}} horas',
        proceed: 'Continuar',
      },
    },
    zodiac: {
      timeRestriction: {
        title: 'Cambio de Signo Zodiacal',
        message: 'Puedes cambiar tu signo zodiacal una vez cada 48 horas.',
        timeRemaining: 'Tiempo restante para nueva selección: {{hours}} horas {{minutes}} minutos',
        proceed: 'Continuar',
      },
    },
    membershipType: 'Tipo de Membresía',
    upgrade: 'Actualizar a Pro',
    referralCode: 'Tu Código de Referencia',
    copied: '¡Copiado!',
  },
  tabs: {
    you: 'Tú',
    ideas: 'Ideas',
    tasks: 'Tareas',
    settings: 'Ajustes',
    goodsides: 'Lados Buenos',
    badsides: 'Lados Malos',
  },
  personality: {
    friendly: 'Amigable',
    adventurous: 'Aventurero',
    thinker: 'Pensador',
    protective: 'Protector',
    cheerful: 'Alegre',
    creativity: 'Creativo',
    leader: 'Líder',
    you: {
      title: 'Análisis de Personalidad',
      subtitle: 'Basado en calificaciones de la comunidad',
      rateButton: 'Calificar a Alguien',
      viewDetails: 'Ver Detalles',
      averageScore: 'Puntuación Promedio',
      totalRatings: 'Calificaciones Totales',
      lastUpdate: 'Última Actualización',
      noRatings: 'Sin calificaciones aún',
    },
    rating: {
      title: 'Calificar Rasgos de Personalidad',
      submit: 'Enviar Calificación',
      cancel: 'Cancelar',
      success: 'Calificación enviada con éxito',
      rateButton: '¡Califica a Alguien!',
      rateFriends: 'Califica a tus Amigos',
      rateUser: 'Calificar a %{name}',
      description: 'Califica a tus amigos y contribuye a su desarrollo personal',
      goodSidesContent: 'Calificar rasgos positivos de personalidad',
      badSidesContent: 'Calificar áreas de mejora',
      enterRefCode: 'Ingrese el código de referencia de 6 dígitos',
      userNotFound: 'Usuario no encontrado',
      close: 'Cerrar',
      remainingPoints: 'Puntos Restantes',
      saved: 'Calificación guardada',
      alreadyRated: 'Ya has calificado a este usuario',
      yourRating: 'Tu Calificación Guardada',
      complete: 'Completar Calificación',
      rateAgain: 'Calificar de nuevo',
      ratingDeleted: 'La calificación anterior ha sido eliminada',
      saveError: 'Error al guardar la calificación',
      deleteError: 'Error al eliminar la calificación',
      reset: 'Restablecer',
      resetMessage: 'Todas las calificaciones han sido restablecidas.',
      successMessage: 'Tu calificación se ha guardado con éxito.',
      errorMessage: 'Ocurrió un error al guardar tu calificación.',
      nextBadSides: 'ahora es el momento de calificar los aspectos que necesitan mejorar :)',
      friendlyReminder: '¡Gracias por tu honesta opinión!',
      testSuccess: '¡Calificación de prueba enviada con éxito!',
      testError: 'Error al enviar la calificación de prueba',
    },
    level: 'puntos',
    positiveTraits: 'Rasgos Positivos de Personalidad',
    traits: {
      empathic: 'Empático',
      friendly: 'Amigable',
      helpful: 'Servicial',
      honest: 'Honesto',
      patient: 'Paciente',
      reliable: 'Confiable',
      respectful: 'Respetuoso',
      angry: 'Enojado',
      arrogant: 'Arrogante',
      jealous: 'Celoso',
      lazy: 'Perezoso',
      pessimistic: 'Pesimista',
      selfish: 'Egoísta',
      forgetful: 'Olvidadizo',
    },
    referral: {
      title: 'Comparte tu Perfil',
      shareButton: 'Comparte Tu Código de Referencia',
      shareTitle: 'Compartir Código de Referencia',
      shareMessage: 'Califica mi personalidad usando mi código de referencia: %{code}',
      description:
        'Permite que tus amigos califiquen tus rasgos de personalidad y obtén comentarios honestos',
      inviteText: '¡Deja que tus amigos evalúen tu personalidad!',
    },
    traitsTitle: 'Áreas para Mejorar',
    warnings: {
      minimumRaters: 'Necesitas ser calificado por al menos 5 usuarios',
      lowOpacity: 'Número insuficiente de calificaciones',
    },
    details: {
      title: 'Detalles de Calificación',
      description: '%{count} personas te han calificado',
      viewAll: 'Ver Todas las Calificaciones',
      noRatings: 'Sin calificaciones aún',
      ratedBy: 'Calificado Por',
      ratedAt: 'Fecha',
      modalTitle: 'Historial de Calificaciones',
      modalDescription: 'Ver todas las calificaciones que te han dado',
    },
  },
  zodiac: {
    modalTitle: 'Selecciona tu Signo Zodiacal',
    modalDescription:
      'Por favor, selecciona tu signo zodiacal para un análisis de personalidad completo.',
    select: 'Seleccionar signo zodiacal',
    aries: 'Aries',
    taurus: 'Tauro',
    gemini: 'Géminis',
    cancer: 'Cáncer',
    leo: 'Leo',
    virgo: 'Virgo',
    libra: 'Libra',
    scorpio: 'Escorpio',
    sagittarius: 'Sagitario',
    capricorn: 'Capricornio',
    aquarius: 'Acuario',
    pisces: 'Piscis',
    toast: {
      title: 'Signo Zodiacal Seleccionado',
      message: 'Ahora puedes ver tu análisis de personalidad completo',
    },
  },
  ideas: {
    accuracyRate: 'Tasa de Precisión',
    accuracyWarning: '¡Cuantas más calificaciones recibas, más preciso será tu análisis!',
    spiritAnimal: {
      title: 'Tu Animal Espiritual',
    },
    analysis: {
      title: 'Tu Análisis de Personalidad',
    },
    analysisError: 'No se pudo generar el análisis de personalidad',
    unauthorizedError: 'Clave API no válida o faltante. Por favor, verifica tu configuración.',
    rateLimitError: 'Límite de solicitudes excedido. Por favor, inténtalo más tarde.',
    animals: {
      cat: {
        name: 'Espíritu Independiente',
        trait: 'Valora la libertad y la autosuficiencia',
      },
      chameleon: {
        name: 'Transformador Adaptable',
        trait: 'Se adapta fácilmente a nuevas situaciones',
      },
      crab: {
        name: 'Guardián Protector',
        trait: 'Defiende a sus seres queridos con lealtad',
      },
      dragon: {
        name: 'Fuerza Poderosa',
        trait: 'Inspira respeto y autoridad',
      },
      flamingo: {
        name: 'Presencia Graciosa',
        trait: 'Aporta elegancia a cada situación',
      },
      fox: {
        name: 'Mente Astuta',
        trait: 'Resuelve problemas con ingenio y sabiduría',
      },
      goat: {
        name: 'Escalador Determinado',
        trait: 'Supera obstáculos con persistencia',
      },
      gorilla: {
        name: 'Líder Fuerte',
        trait: 'Guía a otros con fuerza y sabiduría',
      },
      hedgehog: {
        name: 'Protector Cauteloso',
        trait: 'Protege cuidadosamente sus límites',
      },
      horse: {
        name: 'Corredor Ambicioso',
        trait: 'Persigue objetivos con determinación',
      },
      kangaroo: {
        name: 'Espíritu Energético',
        trait: 'Aborda la vida con entusiasmo',
      },
      lion: {
        name: 'Líder Natural',
        trait: 'Natural para tomar el mando',
      },
      owl: {
        name: 'Observador Sabio',
        trait: 'Ve profundamente en las situaciones',
      },
      phoenix: {
        name: 'Alma Resiliente',
        trait: 'Se levanta más fuerte de los desafíos',
      },
      seahorse: {
        name: 'Navegante Gentil',
        trait: 'Se mueve por la vida con gracia',
      },
      seal: {
        name: 'Amigo Juguetón',
        trait: 'Aporta alegría a las relaciones',
      },
      snake: {
        name: 'Planificador Estratégico',
        trait: 'Toma decisiones calculadas',
      },
      spider: {
        name: 'Tejedor Paciente',
        trait: 'Crea oportunidades metódicamente',
      },
      squirrel: {
        name: 'Coleccionista Ingenioso',
        trait: 'Prepara sabiamente para el futuro',
      },
      toucan: {
        name: 'Conector Social',
        trait: 'Construye puentes entre personas',
      },
      turtle: {
        name: 'Guerrero Constante',
        trait: 'Progresa con esfuerzo constante',
      },
      whale: {
        name: 'Gigante Pacífico',
        trait: 'Mantiene la calma en cualquier situación',
      },
      wolf: {
        name: 'Compañero Leal',
        trait: 'Valora las conexiones profundas',
      },
      woodpecker: {
        name: 'Trabajador Diligente',
        trait: 'Persiste hasta lograr sus objetivos',
      },
    },
    dailyHoroscope: {
      title: 'Consejos Diarios',
      loading: 'Cargando consejos diarios...',
      tags: {
        general: 'Consejo General',
        love: 'Consejo de Amor',
        career: 'Consejo de Carrera',
      },
    },
    noRatingsWarning: {
      title: '¡Analicemos tu Personalidad!',
      description:
        'Descubre tu análisis de personalidad único donde combinamos la energía cósmica de tu signo zodiacal con las percepciones de IA basadas en las calificaciones de tus amigos. ¡Prepárate para un viaje personalizado de autodescubrimiento!',
      cta: 'Comparte tu perfil y comienza a recolectar calificaciones',
    },
    updateFrequency: 'Tu análisis se actualiza cada vez que recibes 3 nuevas calificaciones.',
    freemember: {
      title: 'Descubre Tu Potencial con Análisis de IA',
      description:
        '¡Descubre tu animal espiritual, comprende profundamente tus rasgos de personalidad y obtén consejos de crecimiento personalizados! Nuestra IA combina tu signo zodiacal con evaluaciones de personalidad para crear un análisis único para ti. ¡Únete a miles de usuarios que ya han descubierto su verdadero potencial!',
      cta: '✨ ¡Actualiza ahora para revelar tu animal espiritual y obtener ideas personalizadas diarias!',
      features: [
        '🔮 Descubre tu animal espiritual único',
        '🌟 Obtén ideas personalizadas diarias',
        '📊 Accede a análisis detallado de personalidad',
        '🎯 Recibe consejos de desarrollo con IA',
        '🌙 Explora tu compatibilidad zodiacal',
        '✨ Obtén análisis únicos que combinan tu signo zodiacal con tus rasgos de personalidad',
      ],
    },
    title: 'Guía Personal',
  },
  tasks: {
    refreshTask: 'Actualizar tarea',
    completeTask: 'Completar tarea',
    refreshLimit: 'Límite de actualización',
    completed: '¡Tarea completada!',
    completionInfo:
      'Completa 5 tareas de cada rasgo de personalidad para aumentar ese rasgo en 1 punto',
    noTasks: 'No hay tareas disponibles',
    dailyTasks: 'Tareas diarias',
    remainingRefreshes: 'Actualizaciones restantes',
    noRatingsWarning: {
      title: '¡Comencemos tu Viaje de Crecimiento Personal!',
      description:
        'Completa tareas diarias para mejorar tus rasgos de personalidad. ¡Pero primero, necesitarás algunas calificaciones de tus amigos para comenzar!',
      cta: 'Comparte tu perfil y comienza a recolectar calificaciones para desbloquear tareas',
    },
    refreshes: 'Actualizaciones Diarias Restantes',
    info: {
      title: 'Instrucciones',
      completedTasks: '{{count}} tareas completadas',
      levelUp:
        'Completa 5 tareas de un rasgo para aumentar los rasgos de personalidad buenos en 1 punto o disminuir los malos en 1 punto',
      dailyRefresh: 'Las tareas se actualizan cada 24 horas',
      refreshLimit:
        'Puedes actualizar las tareas hasta 10 veces al día si deseas diferentes desafíos.',
      general: 'Completa las tareas y alcanza tu estado máximo',
    },
    debug: {
      clearCache: 'Limpiar Caché de Tareas',
      cacheCleared: 'Caché de tareas limpiado con éxito',
      clearError: 'Error al limpiar el caché de tareas',
    },
    motivation: 'Mejora tus rasgos de personalidad completando tareas diarias',
    refreshSuccess: 'Tarea actualizada con éxito',
    refreshInfo: 'Cargando nueva tarea...',
    freemember: {
      title: 'Mejora Tu Personalidad con Tareas Diarias',
      features: [
        '🎯 Completa tareas personalizadas para mejorar tus rasgos',
        '📈 Sigue tu progreso con actualizaciones en tiempo real',
        '🔄 Actualiza tareas para encontrar las más adecuadas',
        '⭐️ Gana puntos extra por completar constantemente',
        '🏆 Desbloquea logros y sube de nivel tus rasgos',
        '💫 Recibe recomendaciones de tareas con IA',
      ],
      cta: '✨ ¡Actualiza ahora para comenzar tu viaje!',
    },
  },
  onboarding: {
    screen1: {
      title: 'Descubre Tu Verdadero Yo',
      description:
        'Permite que otros evalúen tus rasgos de personalidad para revelar tus fortalezas y áreas de crecimiento',
    },
    screen2: {
      title: 'Análisis Personalizado',
      description:
        'Obtén un análisis de personalidad basado en tu signo zodiacal y recibe consejos diarios para mejorar',
    },
    screen3: {
      title: 'Alcanza Tu Máximo Potencial',
      description:
        'Completa tareas diarias para mejorar tu personalidad y convertirte en la mejor versión de ti mismo',
    },
  },
  subscription: {
    unlockPro: 'Desbloquea Funciones Premium',
    description: 'Accede a todas las funciones que te ayudarán en tu viaje de desarrollo personal',
    monthly: 'Mensual',
    annual: 'Anual',
    subscribe: 'Comenzar',
    terms:
      'Tu suscripción se renovará automáticamente. Puedes cancelar en cualquier momento. Al comprar, aceptas nuestros Términos de servicio.',
    features: {
      analysis: 'Análisis de personalidad detallado',
      tasks: 'Tareas diarias de desarrollo personal',
      ratings: 'Vea quién y cómo lo calificaron',
      updates: 'Acceso prioritario a nuevas funciones',
    },
  },
  paywall: {
    ideas: {
      title: 'Alcanza tu máximo potencial',
      subtitle:
        'Obtén insights de IA personalizados, tareas diarias y análisis detallado de personalidad',
      benefits: {
        growth: {
          title: 'Acelera Tu Crecimiento Personal',
          description: 'Obtén insights impulsados por IA para entenderte mejor y crecer más rápido',
        },
        confidence: {
          title: 'Construye Confianza Duradera',
          description: 'Rastrea tu progreso y celebra tus mejoras de personalidad',
        },
        relationships: {
          title: 'Mejora Tus Relaciones',
          description: 'Comprende cómo te perciben los demás y mejora tus conexiones sociales',
        },
      },
      plans: {
        monthly: {
          title: 'Mensual',
          period: '/mes',
        },
        annual: {
          title: 'Anual',
          period: '/año',
        },
      },
      popular: 'Más Popular',
      savings: 'Ahorra {{amount}}%',
      terms:
        'Cancela cuando quieras. La suscripción se renueva automáticamente a menos que se cancele.',
      discountBadge: '¡La Mejor Oferta del Año!',
      limitedTime: '¡Oferta por tiempo limitado! No te lo pierdas',
    },
    success: '¡Compra Exitosa!',
    successDescription: '¡Bienvenido a las funciones premium! Disfruta tu viaje.',
  },
  you: {
    subscribeText: 'Obtén la membresía Pro para ver cómo te calificaron',
    subscribeCTA: 'Obtén la Membresía Pro', // Button text
  },
};
