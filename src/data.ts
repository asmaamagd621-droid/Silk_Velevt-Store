import { Product, Governorate, QuizQuestion } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'سيروم التوهج الحريري بالهيالورونيك',
    englishName: 'Silk Glow Hyaluronic Serum',
    category: 'skincare',
    description: 'سيروم لتغذية البشرة وترطيبها بعمق، يمنحك ملمساً ناعماً كالحرير وإضاءة طبيعية تدوم طوال اليوم.',
    longDescription: 'تألقي ببشرة مشرقة ونابضة بالحياة مع سيروم التوهج الحريري. تركيبة غنية بالهيالورونيك النقي بنسبة 2% وفيتامين B5 ومستخلص شجرة الحرير اليابانية. يساعد في إعادة بناء مرونة البشرة وملء الخطوط التعبيرية الدقيقة لتنعمي بملمس فائق النعومة ونضارة فورية ومظهر متوهج وصحي.',
    price: 340,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    tag: 'الأكثر مبيعاً',
    size: '30 مل',
    benefits: [
      'ترطيب فائق يخترق أعماق طبقات الجلد',
      'إخفاء فوري لعلامات التعب والبهتان',
      'تعزيز إنتاج الكولاجين الطبيعي بالبشرة',
      'يناسب جميع أنواع البشرة بما فيها الحساسة'
    ],
    howToUse: 'ضعي 3 إلى 4 قطرات على بشرة وجه ورقبة نظيفة ورطبة قليلاً كل صباح ومساء. دلكي بلطف بحركات دائرية لأعلى حتى يمتص تماماً قبل وضع مرطبك المعتاد.'
  },
  {
    id: 'p2',
    name: 'أحمر شفاه "مخمل الورد" مطفي فاخر',
    englishName: 'Rose Velvet Matte Lipstick',
    category: 'makeup',
    description: 'درجة حمراء ترابية فاخرة تمنح شفاهك ملمساً مخملياً وتغطية لونية مذهلة تدوم لـ 12 ساعة دون جفاف.',
    longDescription: 'انعمي بجاذبية وثقة لا مثيل لهما مع أحمر شفاه "مخمل الورد" الفاخر. يتميز هذا الروج بمركّب شمعي ذكي وترطيب الأرجان والزبدة الطبيعية ليوفر شفاه ناعمة، ممتلئة ومخملية بالكامل، بتمريرة واحدة غنية بلون مكثف وخفيف جداً على الشفتين يدوم طوال اليوم دون تشقق أو جفاف.',
    price: 260,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
    tag: 'جديد',
    size: '4.5 جم',
    benefits: [
      'ثبات فائق ومثالي يتعدى 12 ساعة',
      'مظهر مطفي (Matte) مخملي ناعم',
      'مغذي وغني بزيت الجوجوبا وفيتامين E لمنع التشققات',
      'مقاوم للماء والتلطخ تماماً'
    ],
    howToUse: 'ابدئي برسم خط الحدود الخارجي لشفاهك بدقة باستخدام حافة أحمر الشفاه، ثم املئي الفراغات من المنتصف متجهة إلى الأطراف بشكل متساوٍ ولطيف.'
  },
  {
    id: 'p3',
    name: 'إكسير زيت "أرجان الحرير" للعناية بالشعر',
    englishName: 'Argan Silk Hair Therapy Elixir',
    category: 'haircare',
    description: 'علاج فاخر للشعر التالف والجاف، يزيل الهيشان تماماً ويعيد اللمعان والقوة لخصلات شعرك.',
    longDescription: 'تخلصي من الشعر التالف والمتطاير بشكل نهائي بفضل إكسير "أرجان الحرير" العلاجي المبتكر. بتركيبة فريدة تعتمد على زيت الأرجان المغربي العضوي النقي المعصور على البارد وبروتينات الحرير المهدرجة وزيت اللوز الحلو، يعالج هذا الإكسير أطراف الشعر المتقصفة ويحميها من حرارة التصفيف وأشعة الشمس، لشعر ناعم، حريري، ويسهل تسريحه بشكل طبيعي.',
    price: 395,
    originalPrice: 480,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600',
    tag: 'الأكثر مبيعاً',
    size: '100 مل',
    benefits: [
      'علاج وتقليل تقصف أطراف الشعر وتقويتها',
      'حماية حرارية متطورة من السيشوار والمكواة حتى 230 درجة مئوية',
      'ترطيب مركز يمنع الهيشان ويعيد المرونة الطبيعية للشعر',
      'يعطي رائحة أنثوية فواحة ومغرية تدوم لست ساعات'
    ],
    howToUse: 'ضعي بضع قطرات على راحة يدك ووزعيها بالتساوي على شعرك الرطب أو الجاف مع التركيز التام على الأطراف. لا يحتاج للشطف، استخدميه قبل تصفيف الشعر بالحرارة لأفضل حماية.'
  },
  {
    id: 'p4',
    name: 'عطر "جلوريا فيلفيت" أورينتال إنتنس',
    englishName: 'Gloria Velvet Oriental Intense Perfume',
    category: 'fragrance',
    description: 'توليفة ساحرة تجمع بين نفحات الفانيليا الحسية، أخشاب الصندل والورد التركي الفخم لتجربة ملكية خالدة.',
    longDescription: 'اجذبي الأنظار في كل مكان تذهبين إليه مع عطر "جلوريا فيلفيت" المركز والمستوحى من الأناقة والجاذبية الشرقية الملكية. يفتتح العطر بنسمات البرغموت الإيطالي الطازج، ليتناغم مع قلب زاخر بالورود التركية الطبيعية والياسمين الدمشقي، وينتهي بقاعدة دافئة وبودرية رائعة من مخمل مظهر الصندل الشرقي والفانيليا الغنية والتوابل الفريدة.',
    price: 650,
    originalPrice: 850,
    rating: 5.0,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    tag: 'حصري',
    size: '85 مل',
    benefits: [
      'تركيز قوي جداً وثبات استثنائي يدوم لأكثر من 48 ساعة',
      'يناسب المناسبات السعيدة والسهرات الليلية واللقاءات الرسمية والخاصة',
      'قنينة زجاجية غاية في الأناقة والرفاهية لتزيين طاولة مكياجك',
      'توليفة عطرية حصرية تبعث على التميز والدفء الفاخر'
    ],
    howToUse: 'رشي العطر مباشرة على نقاط النبض المفضلة مثل (الرقبة ورسغ اليد وخلف الأذنين) على بشرة نظيفة وجافة للحصول على انتشار رائحة قوي وجاذبية ممتدة.'
  },
  {
    id: 'p5',
    name: 'كريم "هيدرا سيلك" المرطب والمغذي الفائق',
    englishName: 'Hydra-Silk Dream Deep Moisturizer',
    category: 'skincare',
    description: 'كريم فاخر الملمس يرطب البشرة بعمق ويصلح حاجزها ليزيل البهتان والجفاف تماماً.',
    longDescription: 'امنحي بشرتك جرعة الترطيب والمثالية التي طالما تمنيتها مع كريم هيدرا-سيلك ذو الملمس الكريمي الغني الذي يذوب فوراً على البشرة. يجمع هذا الكريم بين خلاصة الشاي الأبيض المضاد للأكسدة، السيراميدات النباتية الأساسية المغذية للجروح، والزبدة الطبيعية. يعمل بفاعلية استثنائية طوال الليل والنهار على حماية بشرتك من العوامل الخارجية الجافة ويعوض نقص المياه لتنعمي بوجه ممتلئ ومشرق.',
    price: 310,
    originalPrice: 380,
    rating: 4.7,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    tag: 'خصم 20%',
    size: '50 مل',
    benefits: [
      'ترطيب عميق وحبس للرطوبة يدوم حتى 24 ساعة متصلة',
      'ترميم وتقوية حاجز الجلد الواقي الضعيف والمتعب والمتهيج',
      'تمتصه البشرة بنعومة فائقة ودون ترك أي ملمس زيتي أو دهني مزعج',
      'مناسب تماماً للاستخدام كقاعدة أساسية (برايمر) مثالية قبل المكياج'
    ],
    howToUse: 'وزعي كمية صغيرة بحجم حبة البازلاء على جبهتك وخديك وذقنك بعد تنظيف الوجه ووضع السيروم. دلكي بلطف من الأسفل للأعلى بحركة رقيقة ومسترخية.'
  },
  {
    id: 'p6',
    name: 'بلاشر "مخمل الشمس" الكريمي السلس',
    englishName: 'Sunkissed Velvet Cream Blush',
    category: 'makeup',
    description: 'أحمر خدود بتركيبة جل-كريمية فائقة السلاسة تندمج بسهولة وتمنح وجنتيك توريداً طبيعياً وصحياً رقيقاً.',
    longDescription: 'تألقي بخدود مشرقة ومورّدة بلطف مع بلاشر مخمل الشمس المبتكر. تركيبته الكريمية السلسة تتحول فور دمجها مع حرارة البشرة إلى طبقة بودرية شبه مطفية وجاذبة للغاية. ينساب بنعومة بالغة دون تخطيط أو إظهار لعيوب ومسام البشرة لتنعمي بلون مشرق وطبيعي وتوهج يعكس النضارة والشباب.',
    price: 220,
    originalPrice: 280,
    rating: 4.6,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
    tag: 'محبوب بشدة',
    size: '12 مل',
    benefits: [
      'دمج مثالي غاية في السهولة بالأصابع أو الإسفنجة أو الفرشاة',
      'تركيبة خفيفة للغاية تمنح البشرة الحيوية وتسمح لها بالتنفس الطبيعي',
      'ثبات وجمال يدوم طوال اليوم دون بهتان أو سيلان بفعل العرق',
      'درجة خوخية وردية دافئة تلائم وتبرز جمال معظم درجات البشرة'
    ],
    howToUse: 'ضعي نقطة صغيرة أو نقطتين على تفاحة وجنتيك، ثم ادمجيه بلطف باستخدام أطراف أصابعك أو فرشاة البلاشر المخصصة في حركات دائرية خفيفة تصاعدياً نحو منبت الشعر.'
  },
  {
    id: 'p7',
    name: 'مقشر "سيروم الحرير" لتجديد ونضارة الوجه',
    englishName: 'Silk Infusion Peeling AHA/BHA Serum',
    category: 'skincare',
    description: 'مقشر لطيف بتركيز أحماض الفواكه المتطورة يزيل الخلايا الميتة ويصفي شوائب البشرة.',
    longDescription: 'احصلي على السلاسة والنقاء التام لبشرتك مع سيروم التقشير الطبي اللطيف بتركيز من أحماض الـ AHA والـ BHA بنسب مدروسة وآمنة تماماً. يزيل خلايا الجلد الميتة بلطف، ويخلصك من الرؤوس السوداء والبيضاء وينظف المسام العميقة للتمتع بملمس متجانس خالٍ من التصبغات والبقع البنية المتقلبة.',
    price: 360,
    originalPrice: 450,
    rating: 4.8,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    tag: 'موصى به طبياً',
    size: '30 مل',
    benefits: [
      'تقشير سطحي وعميق ناعم وآمن ولا يسبب جفاف البشرة',
      'تفتيح البقع الداكنة وتوحيد لون البشرة بفاعلية وسرعة',
      'تنظيف المسامات وتقليص حجمها الظاهري بشكل ملحوظ',
      'تركيبة مهدئة للغاية غنية بجل الألوفيرا ومستخلص الكاموميل الطبيعي'
    ],
    howToUse: 'يستخدم مساءً فقط بمعدل مرتين إلى ثلاث مرات في الأسبوع كحد أقصى. ضعي بضع قطرات على وجه جاف تماماً بعد غسله ونظافته، اتركيه لمدة 10 دقائق ثم اشطفيه بالماء الفاتر مع تجنب محيط العينين تماماً. اتبعيه فوراً بكريم مرطب.'
  },
  {
    id: 'p8',
    name: 'مجموعة "النعومة المطلقة" المتكاملة للعناية والجمال',
    englishName: 'Absolute Silk & Velvet Ultimate Bundle',
    category: 'bundles',
    description: 'طقم فاخر ومثالي للهدايا يجمع بين السيروم المرطب ومقشر الوجه والأرجان لعناية ملكية شاملة ومتكاملة.',
    longDescription: 'اختبري الرفاهية الكاملة والعناية الفائقة مع مجموعة "النعومة المطلقة" المصممة خصيصاً كهدية مثالية لتدليلك وتدليل من تحبين. تجمع هذه الحقيبة الأنيقة والذهبية الفارهة أفضل مبيعاتنا: سيروم التوهج الحريري بالهيالورونيك الساحر، وإكسير زيت أرجان الحرير للشعر الجذاب، وكريم هيدرا سيلك الرائع والمغذي للوجه، لتنعمي بنضارة متكاملة وجمال حريري أخاذ من رأسك وحتى أطراف أصابعك.',
    price: 890,
    originalPrice: 1195,
    rating: 5.0,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    tag: 'توفير فخم للغاية',
    size: 'مجموعة 3 قطع + حقيبة قطيفة مجاناً',
    benefits: [
      'توفير مالي كبير جداً يتجاوز 300 جنيه مقارنة بشراء كل منتج منفرداً',
      'تغطية كاملة وشاملة للعناية بالوجه وصحة الشعر وبهاء البشرة',
      'تأتي مع حقيبة "Velvet" قطيفة فاخرة مبطنة لحفظ مكياجك مجاناً',
      'هدية راقية وقيمة تسعد أي أنثى بمجرد استقبالها وفك تفاصيلها'
    ],
    howToUse: 'استخدمي سيروم التقشير اللطيف مرتين أسبوعياً مساءً، واتبعي ذلك يومياً بتطبيق سيروم الهيالورونيك وكريم المرطب نهاراً ومساءً، مع وضع قطرات زيت الأرجان المعالج بانتظام على شعرك المندي.'
  }
];

export const governorates: Governorate[] = [
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', shippingFee: 100, deliveryTime: '24 - 48 ساعة' },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', shippingFee: 100, deliveryTime: '24 - 48 ساعة' },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', shippingFee: 100, deliveryTime: '48 - 72 ساعة' },
  { id: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'dakahlia', nameAr: 'الدقهلية', nameEn: 'Dakahlia', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'gharbia', nameAr: 'الغربية', nameEn: 'Gharbia', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'sharqia', nameAr: 'الشرقية', nameEn: 'Sharqia', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'monufia', nameAr: 'المنوفية', nameEn: 'Monufia', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El-Sheikh', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'port_said', nameAr: 'بورسعيد', nameEn: 'Port Said', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'suez', nameAr: 'السويس', nameEn: 'Suez', shippingFee: 100, deliveryTime: '2 - 3 أيام' },
  { id: 'fayoum', nameAr: 'الفيوم', nameEn: 'Fayoum', shippingFee: 100, deliveryTime: '3 - 4 أيام' },
  { id: 'beni_suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', shippingFee: 100, deliveryTime: '3 - 4 أيام' },
  { id: 'minya', nameAr: 'المنيا', nameEn: 'Minya', shippingFee: 100, deliveryTime: '3 - 4 أيام' },
  { id: 'asyut', nameAr: 'أسيوط', nameEn: 'Asyut', shippingFee: 100, deliveryTime: '3 - 4 أيام' },
  { id: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', shippingFee: 100, deliveryTime: '3 - 4 أيام' },
  { id: 'qena', nameAr: 'قنا', nameEn: 'Qena', shippingFee: 100, deliveryTime: '3 - 5 أيام' },
  { id: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', shippingFee: 100, deliveryTime: '3 - 5 أيام' },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', shippingFee: 100, deliveryTime: '3 - 5 أيام' },
  { id: 'matrouh', nameAr: 'مرسى مطروح', nameEn: 'Matrouh', shippingFee: 100, deliveryTime: '4 - 6 أيام' },
  { id: 'red_sea', nameAr: 'البحر الأحمر', nameEn: 'Red Sea', shippingFee: 100, deliveryTime: '3 - 5 أيام' },
  { id: 'south_sinai', nameAr: 'جنوب سيناء', nameEn: 'South Sinai', shippingFee: 100, deliveryTime: '4 - 6 أيام' },
  { id: 'north_sinai', nameAr: 'شمال سيناء', nameEn: 'North Sinai', shippingFee: 100, deliveryTime: '4 - 6 أيام' },
  { id: 'new_valley', nameAr: 'الوادي الجديد', nameEn: 'New Valley', shippingFee: 100, deliveryTime: '5 - 7 أيام' }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionAr: 'ما هو تصنيف بشرتك أو ملمسها المعتاد؟',
    questionEn: 'How would you classify your skin type?',
    options: [
      { id: 'q1_o1', textAr: 'جافة وباهتة وتحتاج لترطيب عميق', textEn: 'Dry, dull, and needs deep hydration', categoryTag: 'skincare' },
      { id: 'q1_o2', textAr: 'دهنية أو مختلطة وبها شوائب ولمعان زائد', textEn: 'Oily or combination with shine and blemishes', categoryTag: 'skincare' },
      { id: 'q1_o3', textAr: 'حساسة وسريعة الاحمرار والتهيج', textEn: 'Sensitive and prone to redness', categoryTag: 'skincare' }
    ]
  },
  {
    id: 2,
    questionAr: 'ما هي أهم خطوة ترغبين في إبراز جمالك بها حالياً؟',
    questionEn: 'What is your main aesthetic focus right now?',
    options: [
      { id: 'q2_o1', textAr: 'بشرة نضرة وخلفية مكياج مخملية ساحرة', textEn: 'Glowing skin and velvet base makeup', categoryTag: 'makeup' },
      { id: 'q2_o2', textAr: 'شفاه ممتلئة بلون غني وصحي ومقاوم للزوال', textEn: 'Plump lips with rich, long-lasting color', categoryTag: 'makeup' },
      { id: 'q2_o3', textAr: 'شعر منسدل وحريري ناعم اللمعان', textEn: 'Flowing, shiny, and silky-smooth hair', categoryTag: 'haircare' }
    ]
  },
  {
    id: 3,
    questionAr: 'ما هي تفضيلاتك في العطور والروائح الشخصية؟',
    questionEn: 'What is your fragrance style?',
    options: [
      { id: 'q3_o1', textAr: 'روائح دافئة وشرقية وعميقة تدوم لأيام', textEn: 'Warm, oriental, and deep scents that linger', categoryTag: 'fragrance' },
      { id: 'q3_o2', textAr: 'تفضل ترطيب شامل وروائح خفيفة تجمع كل المنتجات المترابطة', textEn: 'Complete hydration sets with combined notes', categoryTag: 'bundles' }
    ]
  }
];
