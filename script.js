import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* ============ CONTENT / I18N ============ */
const translations = {
  ru: {
    nav_home:"Главная", nav_about:"О нас", nav_tours:"Туры", nav_why:"Почему мы", nav_contact:"Контакты",
    hero_eyebrow:"VIAMOR TOUR · ТАШКЕНТ", hero_title:"Путешествие к мечте — каждый день",
    hero_subtitle:"Горящие турпакеты из Ташкента: Турция, ОАЭ, Грузия, Египет, Мальдивы и другие направления — прямые рейсы, лучшие цены, полное сопровождение.",
    hero_cta:"Смотреть горящие туры", hero_cta_secondary:"Написать в Telegram",
    dest_eyebrow:"НАПРАВЛЕНИЯ",
    dest_turkey:"Турция", dest_uae:"ОАЭ", dest_georgia:"Грузия", dest_egypt:"Египет", dest_maldives:"Мальдивы",
    dest_azerbaijan:"Азербайджан", dest_vietnam:"Вьетнам", dest_bali:"Бали", dest_issykkul:"Иссык-Куль",
    about_eyebrow:"О КОМПАНИИ", about_title:"Горящие туры каждый день — без переплат и лишних хлопот",
    about_text:"Viamor Tour — тревел-агентство в Ташкенте. Каждый день собираем турпакеты по лучшим ценам: перелёт, отель, трансфер и страховка — одним пакетом. Работаем напрямую с крупными авиакомпаниями — вылеты из Ташкента без лишних пересадок.",
    stat1_value:"15+", stat1_label:"НАПРАВЛЕНИЙ", stat2_value:"5", stat2_label:"АВИАКОМПАНИЙ",
    stat3_value:"Каждый день", stat3_label:"НОВЫЕ ЦЕНЫ", about_partners_label:"РАБОТАЕМ С АВИАКОМПАНИЯМИ",
    tours_eyebrow:"ГОРЯЩИЕ ТУРЫ", tours_title:"Горящие туры",
    tours_subtitle:"Подборка ближайших вылетов. Актуальные цены и даты — в нашем Telegram-канале.",
    tours_live_badge:"ОБНОВЛЯЕМ ЕЖЕДНЕВНО",
    tour1_name:"Грузия: Батуми + Тбилиси", tour1_duration:"8 ночей", tour1_price:"от $827",
    tour1_desc:"Море и горы в одном туре: пляжный отдых в Батуми и прогулки по атмосферному Тбилиси. Ближайшие вылеты — 16, 23 и 30 августа.",
    tour2_name:"Турция: Анталья", tour2_duration:"7 ночей / 8 дней", tour2_price:"от $754",
    tour2_desc:"Прямые вылеты из Ташкента, десятки отелей на выбор — от бюджетных 3* до люксовых 5* курортов с all inclusive.",
    tour3_name:"ОАЭ: Дубай", tour3_duration:"7 ночей", tour3_price:"от $1 059",
    tour3_desc:"Amwaj Rotana Jumeirah Beach 5* — в самом сердце JBR, в 3 минутах от пляжа и променада The Walk.",
    tour4_name:"Египет: Шарм-эль-Шейх", tour4_duration:"7 ночей / 8 дней", tour4_price:"от $519",
    tour4_desc:"Всё включено на Красном море: питание, напитки и трансфер уже в стоимости. Вылет 19 августа.",
    tour5_name:"Мальдивы", tour5_duration:"7 ночей / 8 дней", tour5_price:"от 11,5 млн сум",
    tour5_desc:"От уютных гестхаусов до курортов уровня Sheraton и Nova Maldives — подберём вариант под ваш бюджет.",
    tour6_name:"Азербайджан: Баку + Нафталан", tour6_duration:"по выбору", tour6_price:"от $761",
    tour6_desc:"Современный Баку и лечебный курорт Нафталан — отдых и оздоровление в одном путешествии.",
    tours_cta:"Забронировать",
    tours_note_text:"Цены и даты действительны на момент публикации и могут измениться — уточняйте у менеджера при бронировании.",
    tours_note_link1:"Смотреть все туры →", tours_note_link2:"Написать менеджеру →",
    how_eyebrow:"КАК ЭТО РАБОТАЕТ", how_title:"От заявки до посадки — 4 шага",
    how1_title:"Выбираете направление", how1_text:"Смотрите горящие туры на сайте или в Telegram-канале.",
    how2_title:"Оставляете заявку", how2_text:"Пишете менеджеру в Telegram или звоните по телефону.",
    how3_title:"Подбираем вариант", how3_text:"Находим лучший отель и цену под ваш бюджет и даты.",
    how4_title:"Летите", how4_text:"Перелёт, отель, трансфер и страховка — уже готовы.",
    why_eyebrow:"ПОЧЕМУ МЫ", why_title:"Четыре причины ехать с нами",
    why1_title:"Горящие цены каждый день", why1_text:"Новые спецпредложения появляются ежедневно — успевайте бронировать.",
    why2_title:"Прямые рейсы", why2_text:"Работаем с Uzbekistan Airways, Centrum Air, Fly Khiva и другими — без долгих пересадок.",
    why3_title:"Всё в одном пакете", why3_text:"Перелёт, отель, трансфер и страховка — без скрытых доплат.",
    why4_title:"Личный менеджер", why4_text:"Ведём бронирование от заявки до посадки на рейс — на связи в Telegram.",
    faq_eyebrow:"ВОПРОСЫ", faq_title:"Частые вопросы",
    faq1_q:"Нужна ли виза для этих направлений?",
    faq1_a:"Зависит от направления и вашего гражданства — уточняем при подборе тура и подсказываем, что нужно оформить заранее.",
    faq2_q:"Как оплатить тур?",
    faq2_a:"Наличными, картой Uzcard/Humo или переводом — реквизиты и детали пришлёт менеджер после подтверждения тура.",
    faq3_q:"Можно ли изменить даты после бронирования?",
    faq3_a:"Часто да, но зависит от тарифа отеля и авиабилета — уточняйте у менеджера до оплаты, если гибкость важна.",
    faq4_q:"Что входит в стоимость тура?",
    faq4_a:"Как правило — перелёт, отель, трансфер из аэропорта и страховка. Питание и экскурсии зависят от конкретного отеля — указано в описании тура.",
    faq5_q:"Есть ли скидки для групп или с детьми?",
    faq5_a:"Да, при бронировании нескольких мест или поездке с детьми часто есть отдельные условия — спросите у менеджера.",
    faq6_q:"За сколько до вылета нужно бронировать?",
    faq6_a:"Горящие туры обычно улетают в течение 1–2 недель — чем раньше бронируете, тем больше выбор отелей.",
    contact_eyebrow:"СВЯЗАТЬСЯ", contact_title:"Контакты",
    contact_subtitle:"Напишите нам в Telegram или позвоните — подберём тур в течение дня.",
    contact_office_label:"ОФИС", contact_office_value:"Ташкент, Узбекистан",
    contact_phone_label:"ТЕЛЕФОН", contact_tg_label:"TELEGRAM-КАНАЛ",
    contact_manager_label:"МЕНЕДЖЕР (БРОНИРОВАНИЕ)", contact_inst_label:"INSTAGRAM",
    form_name_ph:"Ф.И.О.", form_contact_ph:"Телефон или Telegram", form_message_ph:"Куда и когда хотите поехать?",
    form_submit:"Отправить заявку", form_sent:"Спасибо! Мы свяжемся с вами в течение 24 часов.",
    form_error:"Не получилось отправить. Напишите нам в Telegram напрямую.",
    footer_tagline:"Путешествие к мечте — каждый день.", footer_rights:"© 2026 Viamor Tour. Все права защищены.",
    auth_title:"Войти или зарегистрироваться", auth_subtitle:"Сохраняйте туры и получайте горящие цены первыми.",
    auth_btn_google:"Продолжить с Google", auth_btn_apple:"Продолжить с Apple",
    auth_btn_telegram:"Продолжить с Telegram", auth_btn_email:"Продолжить с email",
    auth_divider:"или", auth_fio_ph:"Ф.И.О.", auth_phone_ph:"+998 90 123 45 67", auth_form_submit:"Войти",
    auth_status_new:"Добро пожаловать!", auth_status_back:"С возвращением!",
    auth_invalid:"Проверьте, пожалуйста, Ф.И.О. и номер телефона — похоже, что-то введено неверно.",
    auth_trust:"Ваши данные в безопасности и никогда никому не передаются.",
    auth_terms_pre:"Продолжая, вы соглашаетесь с", auth_terms_link1:"условиями использования",
    auth_terms_and:"и", auth_terms_link2:"политикой конфиденциальности",
    auth_skip:"Продолжить без входа →",
    auth_coming_soon:"Вход через аккаунт скоро будет доступен. А пока — напишите нам в Telegram, мы поможем прямо сейчас.",
    auth_coming_soon_cta:"Написать в Telegram"
  },
  uz: {
    nav_home:"Bosh sahifa", nav_about:"Biz haqimizda", nav_tours:"Turlar", nav_why:"Nega biz", nav_contact:"Aloqa",
    hero_eyebrow:"VIAMOR TOUR · TOSHKENT", hero_title:"Orzular sari safar — har kuni",
    hero_subtitle:"Toshkentdan qaynoq turpaketlar: Turkiya, BAA, Gruziya, Misr, Maldiv orollari va boshqa yo'nalishlar — to'g'ridan-to'g'ri parvozlar, eng yaxshi narxlar, to'liq xizmat.",
    hero_cta:"Qaynoq turlarni ko'rish", hero_cta_secondary:"Telegramda yozish",
    dest_eyebrow:"YO'NALISHLAR",
    dest_turkey:"Turkiya", dest_uae:"BAA", dest_georgia:"Gruziya", dest_egypt:"Misr", dest_maldives:"Maldiv orollari",
    dest_azerbaijan:"Ozarbayjon", dest_vietnam:"Vyetnam", dest_bali:"Bali", dest_issykkul:"Issiqko'l",
    about_eyebrow:"KOMPANIYA HAQIDA", about_title:"Har kuni qaynoq turlar — ortiqcha xarajatlarsiz",
    about_text:"Viamor Tour — Toshkentdagi sayohat agentligi. Har kuni eng yaxshi narxlarda turpaketlar tayyorlaymiz: parvoz, mehmonxona, transfer va sug'urta — bitta paketda. Biz yirik aviakompaniyalar bilan bevosita ishlaymiz — Toshkentdan ortiqcha qo'nishlarsiz parvozlar.",
    stat1_value:"15+", stat1_label:"YO'NALISH", stat2_value:"5", stat2_label:"AVIAKOMPANIYA",
    stat3_value:"Har kuni", stat3_label:"YANGI NARXLAR", about_partners_label:"AVIAKOMPANIYALAR BILAN ISHLAYMIZ",
    tours_eyebrow:"QAYNOQ TURLAR", tours_title:"Qaynoq turlar",
    tours_subtitle:"Yaqin parvozlar bo'yicha tanlov. Dolzarb narxlar va sanalar — Telegram kanalimizda.",
    tours_live_badge:"HAR KUNI YANGILANADI",
    tour1_name:"Gruziya: Batumi + Tbilisi", tour1_duration:"8 tun", tour1_price:"$827 dan",
    tour1_desc:"Bitta safarda dengiz va tog'lar: Batumida plyaj dam olishi va Tbilisining betakror ko'chalarida sayr. Yaqin parvozlar — 16, 23 va 30 avgust.",
    tour2_name:"Turkiya: Antaliya", tour2_duration:"7 tun / 8 kun", tour2_price:"$754 dan",
    tour2_desc:"Toshkentdan to'g'ridan-to'g'ri parvozlar, tanlash uchun o'nlab mehmonxonalar — arzon 3 yulduzdan hashamatli 5 yulduzli all inclusive kurortlargacha.",
    tour3_name:"BAA: Dubay", tour3_duration:"7 tun", tour3_price:"$1 059 dan",
    tour3_desc:"Amwaj Rotana Jumeirah Beach 5* — JBR markazida, plyaj va The Walk aylanma yo'lagidan 3 daqiqa masofada.",
    tour4_name:"Misr: Sharm-el-Shayx", tour4_duration:"7 tun / 8 kun", tour4_price:"$519 dan",
    tour4_desc:"Qizil dengizda hamma narsa narxga kiritilgan: ovqatlanish, ichimliklar va transfer. Parvoz 19-avgust.",
    tour5_name:"Maldiv orollari", tour5_duration:"7 tun / 8 kun", tour5_price:"11,5 mln so'mdan",
    tour5_desc:"Qulay gesthauslardan Sheraton va Nova Maldives darajasidagi kurortlargacha — byudjetingizga mos variant tanlaymiz.",
    tour6_name:"Ozarbayjon: Boku + Naftalan", tour6_duration:"moslashuvchan", tour6_price:"$761 dan",
    tour6_desc:"Zamonaviy Boku va shifobaxsh Naftalan kurorti — bitta safarda dam olish va sog'lomlashtirish.",
    tours_cta:"Bron qilish",
    tours_note_text:"Narxlar va sanalar e'lon qilingan vaqtga tegishli va o'zgarishi mumkin — bron qilishda menejerdan aniqlashtiring.",
    tours_note_link1:"Barcha turlarni ko'rish →", tours_note_link2:"Menejerga yozish →",
    how_eyebrow:"BU QANDAY ISHLAYDI", how_title:"Arizadan parvozgacha — 4 qadam",
    how1_title:"Yo'nalishni tanlaysiz", how1_text:"Saytda yoki Telegram kanalimizda qaynoq turlarni ko'ring.",
    how2_title:"Ariza qoldirasiz", how2_text:"Menejerga Telegramda yozing yoki telefon qiling.",
    how3_title:"Variant tanlaymiz", how3_text:"Byudjet va sanalaringizga mos eng yaxshi mehmonxona va narxni topamiz.",
    how4_title:"Uchasiz", how4_text:"Parvoz, mehmonxona, transfer va sug'urta — barchasi tayyor.",
    why_eyebrow:"NEGA BIZ", why_title:"Biz bilan sayohat qilishning to'rt sababi",
    why1_title:"Har kuni qaynoq narxlar", why1_text:"Har kuni yangi maxsus takliflar — ulgurib bron qiling.",
    why2_title:"To'g'ridan-to'g'ri parvozlar", why2_text:"Uzbekistan Airways, Centrum Air, Fly Khiva va boshqalar bilan ishlaymiz — uzoq qo'nishlarsiz.",
    why3_title:"Hammasi bitta paketda", why3_text:"Parvoz, mehmonxona, transfer va sug'urta — yashirin to'lovlarsiz.",
    why4_title:"Shaxsiy menejer", why4_text:"Ariza berishdan parvozgacha bron bilan shug'ullanamiz — Telegramda doim aloqadamiz.",
    faq_eyebrow:"SAVOLLAR", faq_title:"Ko'p beriladigan savollar",
    faq1_q:"Bu yo'nalishlar uchun viza kerakmi?",
    faq1_a:"Yo'nalish va fuqaroligingizga bog'liq — turni tanlashda aniqlashtiramiz va oldindan nima kerakligini aytamiz.",
    faq2_q:"Turni qanday to'layman?",
    faq2_a:"Naqd pul, Uzcard/Humo karta yoki o'tkazma orqali — rekvizitlarni menejer tur tasdiqlangandan keyin yuboradi.",
    faq3_q:"Bron qilgandan keyin sanalarni o'zgartirish mumkinmi?",
    faq3_a:"Ko'pincha mumkin, lekin mehmonxona va aviachipta tarifiga bog'liq — moslashuvchanlik muhim bo'lsa, to'lovdan oldin menejerdan so'rang.",
    faq4_q:"Tur narxiga nimalar kiradi?",
    faq4_a:"Odatda — parvoz, mehmonxona, aeroportdan transfer va sug'urta. Ovqatlanish va ekskursiyalar mehmonxonaga bog'liq — tur tavsifida ko'rsatilgan.",
    faq5_q:"Guruh yoki bolalar uchun chegirma bormi?",
    faq5_a:"Ha, bir nechta joy bron qilganda yoki bolalar bilan sayohatda ko'pincha alohida shartlar bo'ladi — menejerdan so'rang.",
    faq6_q:"Parvozdan qancha oldin bron qilish kerak?",
    faq6_a:"Qaynoq turlar odatda 1–2 hafta ichida uchadi — qancha erta bron qilsangiz, mehmonxona tanlovi shuncha katta.",
    contact_eyebrow:"BOG'LANISH", contact_title:"Aloqa",
    contact_subtitle:"Telegramda yozing yoki qo'ng'iroq qiling — kun davomida tur tanlaymiz.",
    contact_office_label:"OFIS", contact_office_value:"Toshkent, O'zbekiston",
    contact_phone_label:"TELEFON", contact_tg_label:"TELEGRAM KANAL",
    contact_manager_label:"MENEJER (BRON QILISH)", contact_inst_label:"INSTAGRAM",
    form_name_ph:"F.I.Sh. (Familiya Ism Sharif)", form_contact_ph:"Telefon yoki Telegram", form_message_ph:"Qayerga va qachon borishni xohlaysiz?",
    form_submit:"So'rov yuborish", form_sent:"Rahmat! Siz bilan 24 soat ichida bog'lanamiz.",
    form_error:"Yuborib bo'lmadi. Bizga to'g'ridan-to'g'ri Telegramda yozing.",
    footer_tagline:"Orzular sari safar — har kuni.", footer_rights:"© 2026 Viamor Tour. Barcha huquqlar himoyalangan.",
    auth_title:"Kirish yoki ro'yxatdan o'tish", auth_subtitle:"Turlarni saqlang va qaynoq narxlarni birinchi bo'lib oling.",
    auth_btn_google:"Google orqali davom etish", auth_btn_apple:"Apple orqali davom etish",
    auth_btn_telegram:"Telegram orqali davom etish", auth_btn_email:"Email orqali davom etish",
    auth_trust:"Sizning ma'lumotlaringiz xavfsiz va hech kimga berilmaydi.",
    auth_terms_pre:"Davom etish orqali siz quyidagilarga rozilik bildirasiz:", auth_terms_link1:"foydalanish shartlari",
    auth_terms_and:"va", auth_terms_link2:"maxfiylik siyosati",
    auth_divider:"yoki", auth_fio_ph:"F.I.Sh.", auth_phone_ph:"+998 90 123 45 67", auth_form_submit:"Kirish",
    auth_status_new:"Xush kelibsiz!", auth_status_back:"Yana xush kelibsiz!",
    auth_invalid:"Iltimos, F.I.Sh. va telefon raqamini tekshiring — nimadir noto'g'ri kiritilganga o'xshaydi.",
    auth_skip:"Kirishsiz davom etish →",
    auth_coming_soon:"Akkaunt orqali kirish tez orada qo'shiladi. Hozircha bizga Telegramda yozing — darhol yordam beramiz.",
    auth_coming_soon_cta:"Telegramda yozish"
  },
  en: {
    nav_home:"Home", nav_about:"About", nav_tours:"Tours", nav_why:"Why us", nav_contact:"Contact",
    hero_eyebrow:"VIAMOR TOUR · TASHKENT", hero_title:"A journey to your dreams — every day",
    hero_subtitle:"Hot tour packages from Tashkent: Turkey, the UAE, Georgia, Egypt, the Maldives, and more — direct flights, best prices, full support.",
    hero_cta:"See hot deals", hero_cta_secondary:"Message us on Telegram",
    dest_eyebrow:"DESTINATIONS",
    dest_turkey:"Turkey", dest_uae:"UAE", dest_georgia:"Georgia", dest_egypt:"Egypt", dest_maldives:"Maldives",
    dest_azerbaijan:"Azerbaijan", dest_vietnam:"Vietnam", dest_bali:"Bali", dest_issykkul:"Issyk-Kul",
    about_eyebrow:"ABOUT", about_title:"Hot tours every day — no markups, no hassle",
    about_text:"Viamor Tour is a Tashkent-based travel agency. Every day we put together package deals at the best prices — flight, hotel, transfer, and insurance in one booking. We work directly with major airlines, with direct departures from Tashkent.",
    stat1_value:"15+", stat1_label:"DESTINATIONS", stat2_value:"5", stat2_label:"AIRLINES",
    stat3_value:"Daily", stat3_label:"NEW DEALS", about_partners_label:"WE WORK WITH",
    tours_eyebrow:"HOT DEALS", tours_title:"Hot Deals",
    tours_subtitle:"A selection of upcoming departures. Live prices and dates are in our Telegram channel.",
    tours_live_badge:"UPDATED DAILY",
    tour1_name:"Georgia: Batumi + Tbilisi", tour1_duration:"8 nights", tour1_price:"from $827",
    tour1_desc:"Sea and mountains in one trip: beach time in Batumi and walks through atmospheric Tbilisi. Upcoming departures — August 16, 23, and 30.",
    tour2_name:"Turkey: Antalya", tour2_duration:"7 nights / 8 days", tour2_price:"from $754",
    tour2_desc:"Direct flights from Tashkent, dozens of hotels to choose from — from budget 3-star to luxury 5-star all-inclusive resorts.",
    tour3_name:"UAE: Dubai", tour3_duration:"7 nights", tour3_price:"from $1,059",
    tour3_desc:"Amwaj Rotana Jumeirah Beach 5★ — right in the heart of JBR, 3 minutes from the beach and The Walk promenade.",
    tour4_name:"Egypt: Sharm El Sheikh", tour4_duration:"7 nights / 8 days", tour4_price:"from $519",
    tour4_desc:"All-inclusive on the Red Sea: meals, drinks, and transfer included in the price. Departure August 19.",
    tour5_name:"Maldives", tour5_duration:"7 nights / 8 days", tour5_price:"from 11.5M UZS",
    tour5_desc:"From cozy guesthouses to resorts like Sheraton and Nova Maldives — we'll match a stay to your budget.",
    tour6_name:"Azerbaijan: Baku + Naftalan", tour6_duration:"flexible", tour6_price:"from $761",
    tour6_desc:"Modern Baku and the healing resort of Naftalan — relaxation and wellness in one trip.",
    tours_cta:"Book now",
    tours_note_text:"Prices and dates are valid as of the publication date and may change — please confirm with a manager when booking.",
    tours_note_link1:"See all tours →", tours_note_link2:"Message a manager →",
    how_eyebrow:"HOW IT WORKS", how_title:"From inquiry to boarding — 4 steps",
    how1_title:"Pick a destination", how1_text:"Browse hot deals on the site or in our Telegram channel.",
    how2_title:"Send a request", how2_text:"Message our manager on Telegram or give us a call.",
    how3_title:"We find your match", how3_text:"We source the best hotel and price for your budget and dates.",
    how4_title:"You fly", how4_text:"Flight, hotel, transfer, and insurance — all set.",
    why_eyebrow:"WHY US", why_title:"Four reasons to travel with us",
    why1_title:"Hot prices every day", why1_text:"New deals appear daily — book while they last.",
    why2_title:"Direct flights", why2_text:"We work with Uzbekistan Airways, Centrum Air, Fly Khiva, and others — no long layovers.",
    why3_title:"Everything in one package", why3_text:"Flight, hotel, transfer, and insurance — no hidden fees.",
    why4_title:"Personal manager", why4_text:"We handle your booking from request to boarding — always reachable on Telegram.",
    faq_eyebrow:"FAQ", faq_title:"Frequently asked questions",
    faq1_q:"Do I need a visa for these destinations?",
    faq1_a:"It depends on the destination and your citizenship — we confirm this when picking your tour and tell you what to arrange in advance.",
    faq2_q:"How do I pay for a tour?",
    faq2_a:"Cash, Uzcard/Humo card, or bank transfer — your manager sends the details once the tour is confirmed.",
    faq3_q:"Can I change dates after booking?",
    faq3_a:"Often yes, but it depends on the hotel and flight fare — ask your manager before paying if flexibility matters to you.",
    faq4_q:"What's included in the tour price?",
    faq4_a:"Usually flight, hotel, airport transfer, and insurance. Meals and excursions depend on the specific hotel — listed in each tour's description.",
    faq5_q:"Are there discounts for groups or children?",
    faq5_a:"Yes, booking multiple spots or traveling with children often comes with separate terms — just ask your manager.",
    faq6_q:"How far ahead should I book?",
    faq6_a:"Hot deals usually depart within 1–2 weeks — the earlier you book, the wider the hotel selection.",
    contact_eyebrow:"GET IN TOUCH", contact_title:"Contact",
    contact_subtitle:"Message us on Telegram or call — we'll put together a tour the same day.",
    contact_office_label:"OFFICE", contact_office_value:"Tashkent, Uzbekistan",
    contact_phone_label:"PHONE", contact_tg_label:"TELEGRAM CHANNEL",
    contact_manager_label:"MANAGER (BOOKING)", contact_inst_label:"INSTAGRAM",
    form_name_ph:"Full name", form_contact_ph:"Phone or Telegram", form_message_ph:"Where and when would you like to go?",
    form_submit:"Send request", form_sent:"Thank you! We'll get back to you within 24 hours.",
    form_error:"Couldn't send. Please message us on Telegram directly.",
    footer_tagline:"A journey to your dreams — every day.", footer_rights:"© 2026 Viamor Tour. All rights reserved.",
    auth_title:"Sign up or log in", auth_subtitle:"Save tours and get hot prices first.",
    auth_btn_google:"Continue with Google", auth_btn_apple:"Continue with Apple",
    auth_btn_telegram:"Continue with Telegram", auth_btn_email:"Continue with email",
    auth_trust:"Your data is safe and never shared with anyone.",
    auth_terms_pre:"By continuing, you agree to our", auth_terms_link1:"Terms of Use",
    auth_terms_and:"and", auth_terms_link2:"Privacy Policy",
    auth_divider:"or", auth_fio_ph:"Full name", auth_phone_ph:"+998 90 123 45 67", auth_form_submit:"Continue",
    auth_status_new:"Welcome!", auth_status_back:"Welcome back!",
    auth_invalid:"Please check the full name and phone number — something looks off.",
    auth_skip:"Continue without signing in →",
    auth_coming_soon:"Account sign-in is coming soon. In the meantime, message us on Telegram — we'll help right away.",
    auth_coming_soon_cta:"Message on Telegram"
  }
};

let currentLang = 'ru';
function applyLang(lang){
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'uz' ? 'uz' : lang);
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    if(dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  document.querySelectorAll('[data-lang-btn]').forEach(btn=>{
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
  if(typeof activeDest !== 'undefined' && activeDest && typeof renderDestPanel === 'function'){
    renderDestPanel(activeDest);
  }
}
document.querySelectorAll('[data-lang-btn]').forEach(btn=>{
  btn.addEventListener('click', ()=> applyLang(btn.getAttribute('data-lang-btn')));
});

/* ============ THEME ============ */
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', ()=>{
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
});
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
  document.documentElement.setAttribute('data-theme','dark');
}

/* ============ NAV: scroll shadow + mobile menu + active link ============ */
const headerEl = document.getElementById('site-header');
window.addEventListener('scroll', ()=>{
  headerEl.classList.toggle('scrolled', window.scrollY > 8);
});
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', ()=> navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> navLinks.classList.remove('open')));

const sections = ['home','about','tours','why','contact'].map(id=>document.getElementById(id));
const navAnchors = navLinks.querySelectorAll('a');
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navAnchors.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
    }
  });
},{ rootMargin:'-45% 0px -50% 0px' });
sections.forEach(s=> s && spy.observe(s));

/* ============ DESTINATION DETAILS (click a pill, see info right below) ============ */
const destInfo = {
  ru: {
    turkey:{ text:"Анталья, Бодрум, Мармарис — пляжный отдых с прямыми рейсами из Ташкента, отели от 3★ до 5★ all inclusive.", duration:"7 ночей / 8 дней", price:"от $754", cta:"Смотреть тур ↓", href:"#tour-turkey" },
    uae:{ text:"Дубай и Абу-Даби — современный отдых, шопинг и небоскрёбы у моря. Amwaj Rotana Jumeirah Beach 5★ в 3 минутах от пляжа.", duration:"7 ночей", price:"от $1 059", cta:"Смотреть тур ↓", href:"#tour-uae" },
    georgia:{ text:"Батуми + Тбилиси — море, горы и атмосферные улочки старого города в одном туре.", duration:"8 ночей", price:"от $827", cta:"Смотреть тур ↓", href:"#tour-georgia" },
    egypt:{ text:"Шарм-эль-Шейх — всё включено на Красном море: питание, напитки и трансфер уже в цене.", duration:"7 ночей / 8 дней", price:"от $519", cta:"Смотреть тур ↓", href:"#tour-egypt" },
    maldives:{ text:"От уютных гестхаусов до курортов уровня Sheraton и Nova Maldives — под любой бюджет.", duration:"7 ночей / 8 дней", price:"от 11,5 млн сум", cta:"Смотреть тур ↓", href:"#tour-maldives" },
    azerbaijan:{ text:"Баку + Нафталан — современный город и лечебный курорт в одном путешествии.", duration:"по выбору", price:"от $761", cta:"Смотреть тур ↓", href:"#tour-azerbaijan" },
    vietnam:{ text:"Пхукуок — тропический остров, белые пляжи и новый сезон с октября, отели 5★ от известных сетей.", duration:"уточняйте у менеджера", price:"от $947", cta:"Написать менеджеру →", href:"https://t.me/Masturabilen", external:true },
    bali:{ text:"Вулканы, рисовые террасы и океан — перелёт, завтраки и провоз багажа уже в пакете.", duration:"уточняйте у менеджера", price:"уточняйте у менеджера", cta:"Написать менеджеру →", href:"https://t.me/Masturabilen", external:true },
    issykkul:{ text:"Озеро Иссык-Куль — короткий перелёт, горный воздух и спокойный отдых у воды.", duration:"10 ночей", price:"от $483", cta:"Написать менеджеру →", href:"https://t.me/Masturabilen", external:true }
  },
  uz: {
    turkey:{ text:"Antaliya, Bodrum, Marmaris — Toshkentdan to'g'ridan-to'g'ri parvozlar bilan plyaj dam olishi, 3★dan 5★ all inclusive mehmonxonalargacha.", duration:"7 tun / 8 kun", price:"$754 dan", cta:"Turni ko'rish ↓", href:"#tour-turkey" },
    uae:{ text:"Dubay va Abu-Dabi — zamonaviy dam olish, xarid va dengiz bo'yidagi osmono'par binolar. Amwaj Rotana Jumeirah Beach 5★ plyajdan 3 daqiqada.", duration:"7 tun", price:"$1 059 dan", cta:"Turni ko'rish ↓", href:"#tour-uae" },
    georgia:{ text:"Batumi + Tbilisi — bitta safarda dengiz, tog'lar va eski shahar ko'chalari.", duration:"8 tun", price:"$827 dan", cta:"Turni ko'rish ↓", href:"#tour-georgia" },
    egypt:{ text:"Sharm-el-Shayx — Qizil dengizda hammasi narxga kiritilgan: ovqatlanish, ichimlik va transfer.", duration:"7 tun / 8 kun", price:"$519 dan", cta:"Turni ko'rish ↓", href:"#tour-egypt" },
    maldives:{ text:"Qulay gesthauslardan Sheraton va Nova Maldives darajasidagi kurortlargacha — har qanday byudjetga.", duration:"7 tun / 8 kun", price:"11,5 mln so'mdan", cta:"Turni ko'rish ↓", href:"#tour-maldives" },
    azerbaijan:{ text:"Boku + Naftalan — zamonaviy shahar va shifobaxsh kurort bitta safarda.", duration:"moslashuvchan", price:"$761 dan", cta:"Turni ko'rish ↓", href:"#tour-azerbaijan" },
    vietnam:{ text:"Fukuok — tropik orol, oq qumli plyajlar va oktabrdan yangi mavsum, mashhur tarmoqlarning 5★ mehmonxonalari.", duration:"menejerdan so'rang", price:"$947 dan", cta:"Menejerga yozish →", href:"https://t.me/Masturabilen", external:true },
    bali:{ text:"Vulqonlar, guruch teraslari va okean — parvoz, nonushta va bagaj tashish paketga kiradi.", duration:"menejerdan so'rang", price:"menejerdan so'rang", cta:"Menejerga yozish →", href:"https://t.me/Masturabilen", external:true },
    issykkul:{ text:"Issiqko'l — qisqa parvoz, tog' havosi va suv bo'yida tinch dam olish.", duration:"10 tun", price:"$483 dan", cta:"Menejerga yozish →", href:"https://t.me/Masturabilen", external:true }
  },
  en: {
    turkey:{ text:"Antalya, Bodrum, Marmaris — beach holidays with direct flights from Tashkent, hotels from 3★ to 5★ all-inclusive.", duration:"7 nights / 8 days", price:"from $754", cta:"See the tour ↓", href:"#tour-turkey" },
    uae:{ text:"Dubai and Abu Dhabi — modern getaways, shopping, and seaside skyscrapers. Amwaj Rotana Jumeirah Beach 5★, 3 minutes from the beach.", duration:"7 nights", price:"from $1,059", cta:"See the tour ↓", href:"#tour-uae" },
    georgia:{ text:"Batumi + Tbilisi — sea, mountains, and old-town streets in one trip.", duration:"8 nights", price:"from $827", cta:"See the tour ↓", href:"#tour-georgia" },
    egypt:{ text:"Sharm El Sheikh — all-inclusive on the Red Sea: meals, drinks, and transfer already in the price.", duration:"7 nights / 8 days", price:"from $519", cta:"See the tour ↓", href:"#tour-egypt" },
    maldives:{ text:"From cozy guesthouses to resorts like Sheraton and Nova Maldives — for any budget.", duration:"7 nights / 8 days", price:"from 11.5M UZS", cta:"See the tour ↓", href:"#tour-maldives" },
    azerbaijan:{ text:"Baku + Naftalan — a modern city and a healing resort in one trip.", duration:"flexible", price:"from $761", cta:"See the tour ↓", href:"#tour-azerbaijan" },
    vietnam:{ text:"Phu Quoc — a tropical island, white-sand beaches, and a new season starting October, 5★ hotels from major chains.", duration:"ask your manager", price:"from $947", cta:"Message a manager →", href:"https://t.me/Masturabilen", external:true },
    bali:{ text:"Volcanoes, rice terraces, and the ocean — flight, breakfast, and baggage included.", duration:"ask your manager", price:"ask your manager", cta:"Message a manager →", href:"https://t.me/Masturabilen", external:true },
    issykkul:{ text:"Lake Issyk-Kul — a short flight, mountain air, and a calm lakeside stay.", duration:"10 nights", price:"from $483", cta:"Message a manager →", href:"https://t.me/Masturabilen", external:true }
  }
};

const destPanel = document.getElementById('dest-detail');
const destPills = document.querySelectorAll('.dest-pill');
let activeDest = null;

function renderDestPanel(key){
  const dict = translations[currentLang];
  const info = destInfo[currentLang][key];
  document.getElementById('dest-detail-title').textContent = dict['dest_' + key] || '';
  document.getElementById('dest-detail-text').textContent = info.text;
  document.getElementById('dest-detail-duration').textContent = info.duration;
  document.getElementById('dest-detail-price').textContent = info.price;
  const cta = document.getElementById('dest-detail-cta');
  cta.textContent = info.cta;
  cta.href = info.href;
  if(info.external){ cta.target = '_blank'; cta.rel = 'noopener'; }
  else { cta.removeAttribute('target'); cta.removeAttribute('rel'); }
}

destPills.forEach(pill=>{
  pill.addEventListener('click', ()=>{
    const key = pill.dataset.dest;
    if(activeDest === key){
      destPanel.classList.remove('show');
      pill.classList.remove('active');
      activeDest = null;
      return;
    }
    destPills.forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
    activeDest = key;
    renderDestPanel(key);
    destPanel.classList.add('show');
  });
});

document.getElementById('dest-detail-cta').addEventListener('click', function(e){
  const href = this.getAttribute('href');
  if(href && href.startsWith('#')){
    const target = document.querySelector(href);
    if(target){
      target.classList.add('flash');
      setTimeout(()=> target.classList.remove('flash'), 1450);
      setTimeout(()=> target.scrollIntoView({ behavior:'smooth', block:'center' }), 10);
    }
  }
});

/* ============ TOURS CAROUSEL ============ */
const toursGrid = document.getElementById('tours-grid');
const toursPrev = document.getElementById('tours-prev');
const toursNext = document.getElementById('tours-next');
function scrollToursBy(dir){
  const card = toursGrid.querySelector('.ticket');
  if(!card) return;
  const step = card.getBoundingClientRect().width + 26; // card width + gap
  toursGrid.scrollBy({ left: dir * step, behavior: 'smooth' });
}
function updateCarouselArrows(){
  const max = toursGrid.scrollWidth - toursGrid.clientWidth - 4;
  toursPrev.disabled = toursGrid.scrollLeft <= 4;
  toursNext.disabled = toursGrid.scrollLeft >= max;
}
if(toursGrid && toursPrev && toursNext){
  toursPrev.addEventListener('click', ()=> scrollToursBy(-1));
  toursNext.addEventListener('click', ()=> scrollToursBy(1));
  toursGrid.addEventListener('scroll', updateCarouselArrows);
  window.addEventListener('resize', updateCarouselArrows);
  updateCarouselArrows();
}

/* ============ LIVE DATE STAMP ============ */
const liveDateEl = document.getElementById('live-date');
if(liveDateEl){
  const d = new Date();
  const pad = n => String(n).padStart(2,'0');
  liveDateEl.textContent = '· ' + pad(d.getDate()) + '.' + pad(d.getMonth()+1) + '.' + d.getFullYear();
}

/* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{ threshold:0.15 });
document.querySelectorAll('[data-reveal]').forEach(el=> revealObserver.observe(el));

/* ============ AUTH OVERLAY (hard gate — no bypass) ============ */
const authOverlay = document.getElementById('auth-overlay');
const authStatus = document.getElementById('auth-status');
function closeAuthOverlay(e){
  if(e) e.preventDefault();
  authOverlay.classList.remove('show');
}

// --- Supabase (checks "does this phone/email/username already exist" + stores the lead) ---
// Project: viamor-tour · table "leads" · public access only via the check_and_save_lead()
// RPC function (SECURITY DEFINER) — anon visitors can never list or bulk-read the table.
// Only signed-in admins (admin.html, via Supabase Auth) can read the full leads list.
const supabase = createClient(
  "https://gsqpvfeogoansmpvwiva.supabase.co",
  "sb_publishable_ruqP2NWUJbDIvRejkaiDZQ_Id8AOhfs"
);

// Checks whether this identifier was seen before; saves it if not.
// Returns { isNew, error }. Fails open (treats as "new", doesn't block) on any error.
async function checkAndSaveLead(name, contact, source){
  const rawKey = source + ':' + (contact || name || 'unknown');
  const key = rawKey.toLowerCase().replace(/[^a-z0-9:._@+-]/g,'') || (source + ':unknown');
  try{
    const { data, error } = await supabase.rpc('check_and_save_lead', {
      p_lead_key: key, p_name: name || '', p_contact: contact || '', p_source: source
    });
    if(error) throw error;
    const alreadyExisted = data === true;
    if(!alreadyExisted) sendToFormspree(name, contact, source);
    return { isNew: !alreadyExisted };
  } catch(err){
    sendToFormspree(name, contact, source);
    return { isNew:true, error:true };
  }
}

// Email notification (only actually fires for genuinely new leads — see checkAndSaveLead)
function sendToFormspree(name, contact, source){
  const fd = new FormData();
  fd.append('name', name || '');
  fd.append('phone', contact || '');
  fd.append('_subject', 'Viamor Tour — вход через ' + source);
  fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body: fd, headers:{'Accept':'application/json'} }).catch(()=>{});
}

// Shared "success" flow for every sign-in path: check/save, flash a status line, then reveal the site
async function afterAuthSuccess(name, contact, source){
  const result = await checkAndSaveLead(name, contact, source);
  const dict = translations[currentLang];
  authStatus.textContent = (result && result.isNew === false) ? dict.auth_status_back : dict.auth_status_new;
  authStatus.classList.add('show');
  setTimeout(closeAuthOverlay, 850);
}

// --- Basic sanity checks for the manual ФИО+phone form (blocks obvious junk input) ---
function isValidPhone(phone){
  const clean = phone.replace(/[\s\-()]/g, '');
  return /^\+?998\d{9}$/.test(clean) || /^\+\d{7,14}$/.test(clean);
}
function isValidFullName(name){
  const trimmed = name.trim().replace(/\s+/g, ' ');
  const words = trimmed.split(' ');
  if(words.length < 2) return false;
  const wordPattern = /^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳ'’-]{2,25}$/;
  const consonants = "bcdfghjklmnpqrstvwxzБВГДЖЗЙКЛМНПРСТФХЦЧШЩбвгджзйклмнпрстфхцчшщ";
  for(const w of words){
    if(!wordPattern.test(w)) return false;
    let run = 0, maxRun = 0;
    for(const ch of w){
      if(consonants.includes(ch)){ run++; maxRun = Math.max(maxRun, run); } else { run = 0; }
    }
    if(maxRun >= 4) return false; // e.g. "щвщкр" — looks like keyboard mashing, not a real name
  }
  return true;
}

document.getElementById('auth-inline-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const form = this;
  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const errEl = document.getElementById('auth-form-error');
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  nameInput.classList.remove('invalid');
  phoneInput.classList.remove('invalid');
  errEl.classList.remove('show');

  const nameOk = isValidFullName(name);
  const phoneOk = isValidPhone(phone);
  if(!nameOk) nameInput.classList.add('invalid');
  if(!phoneOk) phoneInput.classList.add('invalid');

  if(!nameOk || !phoneOk){
    errEl.textContent = translations[currentLang].auth_invalid;
    errEl.classList.add('show');
    return; // invalid input — do not grant access
  }

  await afterAuthSuccess(name, phone, 'phone');
  form.reset();
});

/* ============ CONTACT FORM (submits to Formspree) ============ */
document.getElementById('contact-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const form = this;
  const noteOk = document.getElementById('form-note');
  const noteErr = document.getElementById('form-error');
  noteOk.classList.remove('show');
  noteErr.classList.remove('show');
  try{
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if(res.ok){
      noteOk.classList.add('show');
      form.reset();
    } else {
      noteErr.classList.add('show');
    }
  } catch(err){
    noteErr.classList.add('show');
  }
});