/* «23 пари» · доповнення до днів: наочна схема роботи білка для кожного дня та статті блогу Apixmed за темою.
   Схема (js/viz.js, шаблон mech) стоїть одразу після розділу «Ген дня». Позначка {n} — n-те джерело дня. */
(function () {
  const DAYS = window.ADVENT_DAYS;
  if (!DAYS) return;

  const MECH = {
    1: { kind: "enzyme",
      uk: { title: "Як працює фермент MTHFR", items: ["5,10-метилен-ТГФ: форма фолату, що надходить до ферменту", "фермент MTHFR", "5-метил-ТГФ: активна форма, яка віддає метильну групу для переробки гомоцистеїну на метіонін{2}"] },
      en: { title: "How the MTHFR enzyme works", items: ["5,10-methylene-THF: the form of folate that reaches the enzyme", "the MTHFR enzyme", "5-methyl-THF: the active form that donates a methyl group to turn homocysteine into methionine{2}"] } },
    2: { kind: "enzyme",
      uk: { title: "Як працює лактаза", items: ["лактоза, молочний цукор", "лактаза в клітинах кишки{4}", "глюкоза і галактоза, які всмоктуються в кров"] },
      en: { title: "How lactase works", items: ["lactose, the sugar in milk", "lactase in the cells of the gut{4}", "glucose and galactose, which are absorbed into the blood"] } },
    3: { kind: "tf",
      uk: { title: "Як працює рецептор PPARγ", items: ["рецептор PPARγ: його активують жирні кислоти{2}", "ділянки ДНК, з якими він зв’язується", "зчитування генів, потрібних для дозрівання жирових клітин{2}"] },
      en: { title: "How the PPARγ receptor works", items: ["the PPARγ receptor: fatty acids activate it{2}", "the stretches of DNA it binds to", "reading of the genes needed for fat cells to mature{2}"] } },
    4: { kind: "tf",
      uk: { title: "Як CLOCK запускає добовий цикл", items: ["білки CLOCK і BMAL1 у парі", "ділянки ДНК біля генів PER і CRY", "зчитування генів PER і CRY: початок нового добового циклу{2}"] },
      en: { title: "How CLOCK starts the daily cycle", items: ["the CLOCK and BMAL1 proteins as a pair", "stretches of DNA next to the PER and CRY genes", "reading of the PER and CRY genes: the start of a new daily cycle{2}"] } },
    5: { kind: "enzyme",
      uk: { title: "Як працює теломераза", items: ["нуклеотиди: будівельний матеріал ДНК", "теломераза з каталітичною частиною TERT{2}", "нові повтори TTAGGG на кінці хромосоми{9}"] },
      en: { title: "How telomerase works", items: ["nucleotides: the building blocks of DNA", "telomerase with its catalytic part, TERT{2}", "new TTAGGG repeats at the end of the chromosome{9}"] } },
    6: { kind: "present",
      uk: { title: "Як HLA показує фрагмент мікроба", items: ["фрагмент мікроба (пептид)", "молекула HLA тримає пептид на поверхні клітини{2}", "рецептор імунної клітини перевіряє фрагмент"] },
      en: { title: "How HLA displays a fragment of a microbe", items: ["a fragment of a microbe (a peptide)", "the HLA molecule holds the peptide on the cell surface{2}", "an immune cell’s receptor inspects the fragment"] } },
    7: { kind: "receptor",
      uk: { title: "Як працює рецептор гіркого", items: ["гірка сполука з їжі", "рецептор TAS2R38 на смаковій клітині{2}", "сигнал до мозку: «гірко»"] },
      en: { title: "How the bitter receptor works", items: ["a bitter compound from food", "the TAS2R38 receptor on a taste cell{2}", "a signal to the brain: “bitter”"] } },
    8: { kind: "enzyme",
      uk: { title: "Як працює ліпопротеїнліпаза", items: ["тригліцериди в ліпопротеїнах крові{1}", "ліпопротеїнліпаза", "вільні жирні кислоти, які забирають м’язи й жирова тканина{2}"] },
      en: { title: "How lipoprotein lipase works", items: ["triglycerides in blood lipoproteins{1}", "lipoprotein lipase", "free fatty acids taken up by muscle and fat tissue{2}"] } },
    9: { kind: "enzyme",
      uk: { title: "Як ген ABO створює групу крові", items: ["цукор, який приєднує фермент: один для варіанта A, інший для B", "фермент, закодований геном ABO", "антиген A або B на поверхні еритроцита; варіант O дає неактивний білок{1}"] },
      en: { title: "How the ABO gene makes a blood group", items: ["the sugar the enzyme attaches: one for variant A, another for B", "the enzyme encoded by the ABO gene", "antigen A or B on the red cell surface; variant O gives an inactive protein{1}"] } },
    10: { kind: "tf",
      uk: { title: "Як працює білок TCF7L2", items: ["білок TCF7L2", "ділянки ДНК, зчитуванням яких він керує", "робота клітин, що виділяють інсулін{2}{3}"] },
      en: { title: "How the TCF7L2 protein works", items: ["the TCF7L2 protein", "the stretches of DNA whose reading it controls", "the work of insulin-secreting cells{2}{3}"] } },
    11: { kind: "structure",
      uk: { title: "Де працює α-актинін-3", items: ["Z-диск: межа між ланками м’язового волокна", "α-актинін-3 закріплює нитки на Z-диску у швидких волокнах{1}", "тонкі нитки, які ковзають під час скорочення"] },
      en: { title: "Where α-actinin-3 works", items: ["the Z-disc: the boundary between units of a muscle fibre", "α-actinin-3 anchors the filaments at the Z-disc in fast fibres{1}", "thin filaments that slide when the muscle contracts"] } },
    12: { kind: "enzyme",
      uk: { title: "Як працює ALDH2", items: ["ацетальдегід: проміжний продукт розпаду алкоголю{2}", "фермент ALDH2", "ацетат, який організм використовує далі"] },
      en: { title: "How ALDH2 works", items: ["acetaldehyde: an intermediate of alcohol breakdown{2}", "the ALDH2 enzyme", "acetate, which the body goes on to use"] } },
    13: { kind: "hormone",
      uk: { title: "Шлях Klotho в організмі", items: ["нирка: тут виробляється найбільше Klotho{1}", "Klotho циркулює в крові як гормон{4}", "тканини-мішені: обмін фосфатів і вітаміну D{1}"] },
      en: { title: "The route of Klotho through the body", items: ["the kidney: most Klotho is made here{1}", "Klotho circulates in the blood as a hormone{4}", "target tissues: phosphate and vitamin D metabolism{1}"] } },
    14: { kind: "enzyme",
      uk: { title: "Як працює дейодиназа 2 типу", items: ["тироксин (Т4)", "дейодиназа 2 типу", "трийодтиронін (Т3): активна форма гормону{1}"] },
      en: { title: "How type 2 deiodinase works", items: ["thyroxine (T4)", "type 2 deiodinase", "triiodothyronine (T3): the active form of the hormone{1}"] } },
    15: { kind: "enzyme",
      uk: { title: "Як працює CYP1A2", items: ["кофеїн", "фермент CYP1A2: переробляє 95% спожитого кофеїну{1}", "продукти розпаду кофеїну"] },
      en: { title: "How CYP1A2 works", items: ["caffeine", "the CYP1A2 enzyme: it processes 95% of ingested caffeine{1}", "the breakdown products of caffeine"] } },
    16: { kind: "receptor",
      uk: { title: "Як працює рецептор MC1R", items: ["гормон, що стимулює пігментні клітини", "рецептор MC1R на пігментній клітині шкіри{1}", "клітина виробляє більше темного пігменту, еумеланіну{1}"] },
      en: { title: "How the MC1R receptor works", items: ["a hormone that stimulates pigment cells", "the MC1R receptor on a pigment cell of the skin{1}", "the cell makes more of the dark pigment, eumelanin{1}"] } },
    17: { kind: "enzyme",
      uk: { title: "Як працює ACE", items: ["ангіотензин I", "ангіотензинперетворювальний фермент (ACE)", "ангіотензин II, який звужує судини{3}"] },
      en: { title: "How ACE works", items: ["angiotensin I", "angiotensin-converting enzyme (ACE)", "angiotensin II, which narrows blood vessels{3}"] } },
    18: { kind: "receptor",
      uk: { title: "Як працює рецептор MC4R", items: ["сигнальна молекула ситості", "рецептор MC4R на нейроні гіпоталамуса{1}", "сигнал «досить»: споживання їжі зменшується{1}"] },
      en: { title: "How the MC4R receptor works", items: ["a satiety signalling molecule", "the MC4R receptor on a neuron of the hypothalamus{1}", "the “enough” signal: food intake goes down{1}"] } },
    19: { kind: "enzyme",
      uk: { title: "Як працює FUT2", items: ["цукор фукоза", "фермент FUT2 у клітинах слизових оболонок", "антиген у слині та слизу: за ним людину називають «секретором»{5}"] },
      en: { title: "How FUT2 works", items: ["the sugar fucose", "the FUT2 enzyme in the cells of mucous membranes", "an antigen in saliva and mucus: it is what makes someone a “secretor”{5}"] } },
    20: { kind: "receptor",
      uk: { title: "Як працює фактор росту GDF5", items: ["фактор росту GDF5", "рецептор на клітині майбутнього хряща", "сигнал до формування хряща й суглоба{1}"] },
      en: { title: "How the growth factor GDF5 works", items: ["the growth factor GDF5", "a receptor on a future cartilage cell", "a signal to form cartilage and a joint{1}"] } },
    21: { kind: "enzyme",
      uk: { title: "Як працює CBS", items: ["гомоцистеїн", "фермент цистатіонін-β-синтаза (CBS)", "цистатіонін: другий шлях знешкодження гомоцистеїну{3}"] },
      en: { title: "How CBS works", items: ["homocysteine", "the enzyme cystathionine β-synthase (CBS)", "cystathionine: the second route for clearing homocysteine{3}"] } },
    22: { kind: "enzyme",
      uk: { title: "Як працює COMT", items: ["дофамін у лобовій корі{1}", "фермент COMT", "неактивний продукт розпаду дофаміну"] },
      en: { title: "How COMT works", items: ["dopamine in the frontal cortex{1}", "the COMT enzyme", "an inactive breakdown product of dopamine"] } },
    23: { kind: "tf",
      uk: { title: "Як працює рецептор андрогенів", items: ["рецептор андрогенів із приєднаним гормоном", "ділянки ДНК, з якими він зв’язується", "зчитування генів, чутливих до андрогенів{1}"] },
      en: { title: "How the androgen receptor works", items: ["the androgen receptor with its hormone attached", "the stretches of DNA it binds to", "reading of androgen-responsive genes{1}"] } },
    24: { kind: "organelle",
      uk: { title: "Де живе мітохондріальна ДНК", items: ["мітохондрія: енергетична станція клітини", "кільцева мітохондріальна ДНК: 37 генів{1}", "енергія для клітини{2}"] },
      en: { title: "Where mitochondrial DNA lives", items: ["a mitochondrion: the cell’s power station", "circular mitochondrial DNA: 37 genes{1}", "energy for the cell{2}"] } }
  };

  /* Статті блогу apixmed.com.ua за темою дня: адреса після /blog/ */
  const BLOG = {
    1: ["b-vitamins-homocysteine-genetics", "vitamin-blood-test-vs-genetics"],
    2: ["lactose-gluten-caffeine-food-sensitivity", "food-allergy-intolerance-genetics"],
    3: ["insulin-sensitivity-type-2-diabetes-genetics", "diabetes-inherited-family-history"],
    4: ["sleep-genetics-chronotype-insomnia", "sleep-stress-recovery-genetics"],
    6: ["immune-resistance-infections-genetics"],
    7: ["taste-preferences-genetics-food-choice"],
    8: ["normal-cholesterol-hidden-risk", "carbohydrate-fat-sensitivity-genetics"],
    10: ["insulin-sensitivity-type-2-diabetes-genetics", "diabetes-inherited-family-history"],
    11: ["muscle-fiber-type-genetics-strength", "sports-potential-and-recovery-dna"],
    12: ["shvydkist-detoksykatsiyi"],
    13: ["mineral-absorption-magnesium-calcium-phosphorus"],
    14: ["hashimoto-thyroiditis-genetic-predisposition", "hormonal-imbalance-and-your-dna"],
    15: ["lactose-gluten-caffeine-food-sensitivity"],
    16: ["skin-hair-appearance-dna-test", "metabolism-dna-food-response"],
    17: ["hypertension-genetics-diet", "vo2max-aerobic-capacity-genetics"],
    18: ["hormones-weight-energy-mood-and-your-dna", "why-same-diet-different-results"],
    19: ["vitamin-blood-test-vs-genetics", "immune-resistance-infections-genetics"],
    20: ["osteoporosis-osteoarthritis-bone-health-after-40", "injury-risk-training-genetics"],
    21: ["b-vitamins-homocysteine-genetics"],
    22: ["serotonin-dopamine-brain-genetics", "cortisol-chronic-stress-fatigue"],
    23: ["early-hair-loss-genetics", "hormones-somatotropin-estrogen-testosterone-genetics"]
  };
  /* Назви статей двома мовами: адреса → [українською, англійською] */
  const BLOG_T = {"b-vitamins-homocysteine-genetics":["Вітаміни групи B і гомоцистеїн: що не покаже стандартний аналіз","B Vitamins and Homocysteine: What a Standard Blood Test Won't Show"],"vitamin-blood-test-vs-genetics":["Ілюзія норми: що ховається за ідеальними показниками вітамінів у крові","The Illusion of Normal: What Hides Behind Ideal Vitamin Blood Test Results"],"lactose-gluten-caffeine-food-sensitivity":["Лактоза, глютен, кофеїн: генетичні особливості харчової чутливості","Lactose, Gluten, Caffeine: The Genetics of Food Sensitivity"],"food-allergy-intolerance-genetics":["Харчова алергія та непереносимість: як розрізнити і що робити","Food Allergy and Intolerance: How to Tell the Difference and What to Do"],"insulin-sensitivity-type-2-diabetes-genetics":["Інсулінова чутливість і ризик цукрового діабету 2 типу: генетичний вимір","Insulin Sensitivity and the Risk of Type 2 Diabetes: The Genetic Dimension"],"diabetes-inherited-family-history":["Чи передається діабет у спадок і що з цим робити","Is Diabetes Hereditary, and What to Do about It"],"sleep-genetics-chronotype-insomnia":["Хронотип, глибина сну і безсоння: що закладено в генах","Chronotype, Sleep Depth, and Insomnia: What Is Written in Your Genes"],"sleep-stress-recovery-genetics":["Сон і стрес: чому відпочинок не завжди відновлює, і що з цим робити","Sleep and Stress: Why Rest Doesn't Always Restore — and What to Do About It"],"dna-aging-prevention-strategy":["Профілактика старіння за даними ДНК: стратегія на основі генетичної панелі Ultima","DNA-Based Aging Prevention: A Strategy Built on the Ultima Genetic Panel"],"immune-resistance-infections-genetics":["Імунітет і стійкість до інфекцій: чому ви хворієте частіше за інших","Immunity and resistance to infections: why you get sick more often than others"],"taste-preferences-genetics-food-choice":["Смакові вподобання і генетика: як ми схильні вибирати їжу","Taste Preferences and Genetics: How We Tend to Choose Food"],"normal-cholesterol-hidden-risk":["Холестерин у нормі, а ризик є: що показує ДНК","Normal Cholesterol, But the Risk Is There: What DNA Reveals"],"carbohydrate-fat-sensitivity-genetics":["Чутливість до вуглеводів і жирів: як генетика пов’язана з індивідуальною реакцією на їжу","Carbohydrate and Fat Sensitivity: How Genetics Shapes Your Individual Response to Food"],"muscle-fiber-type-genetics-strength":["Генетичний код сили: як тип м’язових волокон формує ваш спортивний потенціал","The Genetic Code of Strength: How Muscle Fiber Type Shapes Your Athletic Potential"],"sports-potential-and-recovery-dna":["Спортивний потенціал і відновлення: що показує ДНК-тест","Athletic Potential and Recovery: What a DNA Test Shows"],"shvydkist-detoksykatsiyi":["Швидкість детоксикації: від чого залежить та чи можна її прискорити","Detoxification rate: what it depends on and whether it can be sped up"],"mineral-absorption-magnesium-calcium-phosphorus":["Магній, кальцій і фосфор: що впливає на засвоєння мінералів","Magnesium, Calcium and Phosphorus: What Affects Mineral Absorption"],"hashimoto-thyroiditis-genetic-predisposition":["Щитоподібна залоза і тиреоїдит Хашимото: роль генетики в аутоімунному запаленні","Hashimoto's Thyroiditis: How Genetic Predisposition Connects to Autoimmune Inflammation"],"hormonal-imbalance-and-your-dna":["Гормональний дисбаланс і генетика: що ДНК-тест може розповісти про гормони","Hormonal Imbalance and DNA: What a Genetic Test Reveals About Your Hormones"],"skin-hair-appearance-dna-test":["Генетика шкіри та волосся: що показує ДНК-тест","Skin and Hair Genetics: What a DNA Test Reveals"],"metabolism-dna-food-response":["Метаболізм, травлення і генетика: що впливає на реакцію на їжу","Metabolism, Digestion, and DNA: What Shapes the Response to Food"],"hypertension-genetics-diet":["Гіпертонія і генетика: чому DASH-дієта допомагає не всім","Hypertension and Genetics: Why the DASH Diet Doesn't Work for Everyone"],"vo2max-aerobic-capacity-genetics":["VO₂max: що це і чому аеробний потенціал важливо оцінювати не лише спортсменам","VO₂max: What It Is and Why Aerobic Capacity Matters for More Than Just Athletes"],"hormones-weight-energy-mood-and-your-dna":["Вага, енергія, настрій і ваша ДНК: як гормони пов’язані з генетикою","Weight, Energy, Mood, and Your DNA: How Hormones Are Linked to Genetics"],"why-same-diet-different-results":["Чому одна і та сама дієта дає різні результати у різних людей: роль генетики і метаболізму","Why the Same Diet Gives Different Results in Different People: The Role of Genetics and Metabolism"],"osteoporosis-osteoarthritis-bone-health-after-40":["Остеопороз і остеоартроз: що впливає на здоров’я кісток і суглобів","Osteoporosis and Osteoarthritis: What Affects Bone and Joint Health"],"injury-risk-training-genetics":["Ризик травм під час тренувань: яку роль відіграє генетика","Injury risk during training: what role does genetics play?"],"serotonin-dopamine-brain-genetics":["Серотонін і дофамін: що насправді відбувається в мозку та як ДНК впливає на настрій","Serotonin and Dopamine: What Is Actually Happening in the Brain and How DNA Influences Mood"],"cortisol-chronic-stress-fatigue":["Кортизол і хронічний стрес: гормональні механізми втоми та індивідуальні відмінності","Cortisol and Chronic Stress: Hormonal Mechanisms of Fatigue and Individual Differences"],"early-hair-loss-genetics":["Чому волосся випадає у молодому віці, якщо гормони в нормі: роль генетики","Why Hair Falls Out at a Young Age When Hormones Are Normal: The Role of Genetics"],"hormones-somatotropin-estrogen-testosterone-genetics":["Соматотропін, естроген і тестостерон: як генетика пов’язана з гормонами","Somatotropin, estrogen, and testosterone: how genetics relates to hormones"]};

  /* Продукт гена дня: [назва українською, англійською, тип українською, англійською] */
  const DEF = {
    1: ["метилентетрагідрофолатредуктаза", "methylenetetrahydrofolate reductase", "фермент", "enzyme"],
    2: ["лактаза", "lactase", "фермент", "enzyme"],
    3: ["рецептор PPARγ", "PPARγ receptor", "ядерний рецептор", "nuclear receptor"],
    4: ["білок CLOCK", "CLOCK protein", "регулятор активності генів", "regulator of gene activity"],
    5: ["теломераза (каталітична частина)", "telomerase (catalytic part)", "фермент", "enzyme"],
    6: ["білки HLA", "HLA proteins", "молекули імунної системи", "immune-system molecules"],
    7: ["рецептор гіркого смаку", "bitter taste receptor", "рецептор", "receptor"],
    8: ["ліпопротеїнліпаза", "lipoprotein lipase", "фермент", "enzyme"],
    9: ["глікозилтрансфераза ABO", "ABO glycosyltransferase", "фермент", "enzyme"],
    10: ["білок TCF7L2", "TCF7L2 protein", "транскрипційний фактор", "transcription factor"],
    11: ["α-актинін-3", "α-actinin-3", "білок скелетних м’язів", "skeletal muscle protein"],
    12: ["альдегіддегідрогеназа 2", "aldehyde dehydrogenase 2", "фермент", "enzyme"],
    13: ["білок Klotho", "Klotho protein", "білок, що діє як гормон", "hormone-like protein"],
    14: ["дейодиназа 2 типу", "type 2 deiodinase", "фермент", "enzyme"],
    15: ["цитохром P450 1A2", "cytochrome P450 1A2", "фермент", "enzyme"],
    16: ["рецептор меланокортину 1", "melanocortin 1 receptor", "рецептор", "receptor"],
    17: ["ангіотензинперетворювальний фермент", "angiotensin-converting enzyme", "фермент", "enzyme"],
    18: ["рецептор меланокортину 4", "melanocortin 4 receptor", "рецептор", "receptor"],
    19: ["фукозилтрансфераза 2", "fucosyltransferase 2", "фермент", "enzyme"],
    20: ["фактор росту й диференціації 5", "growth differentiation factor 5", "сигнальний білок", "signalling protein"],
    21: ["цистатіонін-β-синтаза", "cystathionine β-synthase", "фермент", "enzyme"],
    22: ["катехол-O-метилтрансфераза", "catechol-O-methyltransferase", "фермент", "enzyme"],
    23: ["рецептор андрогенів", "androgen receptor", "рецептор гормонів", "hormone receptor"],
    24: ["13 білків, 22 транспортні РНК і 2 рибосомні РНК", "13 proteins, 22 transfer RNAs and 2 ribosomal RNAs", "37 генів", "37 genes"]
  };

  DAYS.forEach((d) => {
    const m = MECH[d.d];
    const f = DEF[d.d];
    if (f) d.def = { p: { uk: f[0], en: f[1] }, k: { uk: f[2], en: f[3] } };
    if (m) d.viz = [{ id: "mech", after: "role", kind: m.kind, uk: m.uk, en: m.en }].concat(d.viz || []);
    d.blog = (BLOG[d.d] || []).filter((s) => BLOG_T[s]).map((s) => ({ slug: s, uk: BLOG_T[s][0], en: BLOG_T[s][1] }));
  });
})();
