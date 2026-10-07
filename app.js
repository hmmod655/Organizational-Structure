/* =========================================================================
   REEF — Procedure Documentation Guide (prototype)
   Front-end only. Data is stored in the browser (localStorage) through the
   `Store` object below — replace Store's methods with API calls to connect a
   real database later; nothing else needs to change.
   ========================================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   *  Storage layer (swap for a real backend later)
   * ------------------------------------------------------------------ */
  const KEY = "reef-pdg-records-v1";
  const CLAIMS = "reef-pdg-claims-v1";
  const safeGet = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const safeSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  const Store = {
    all() { return safeGet(KEY, []); },
    get(id) { return this.all().find(r => r.id === id); },
    save(rec) {
      const all = this.all();
      const i = all.findIndex(r => r.id === rec.id);
      if (i >= 0) all[i] = rec; else all.push(rec);
      return safeSet(KEY, all);
    },
    remove(id) { safeSet(KEY, this.all().filter(r => r.id !== id)); },
    replaceAll(list) { safeSet(KEY, list); },
    claims() { return safeGet(CLAIMS, {}); },
    setClaim(key, val) { const c = this.claims(); if (val) c[key] = val; else delete c[key]; safeSet(CLAIMS, c); }
  };

  /* ------------------------------------------------------------------ *
   *  i18n
   * ------------------------------------------------------------------ */
  let lang = safeGet("reef-pdg-lang", "ar");

  const T = {
    ar: {
      appTitle: "دليل توثيق الإجراءات", appSub: "ريف — بوابة الإدارات",
      home: "الرئيسية", admin: "لوحة التحول الرقمي", langBtn: "English",
      heroKicker: "مجموعة ريف",
      heroTitle: "دليل توثيق الإجراءات للإدارات",
      heroText: "اختر إدارتك، ثم قسمك، ثم منصبك، ووثّق جميع الإجراءات التي تنفذها في دورك الوظيفي. عند الضغط على «تم» تُولَّد خريطة العملية تلقائياً وتُحفظ مع بياناتك.",
      flow: ["الإدارة", "القسم", "المنصب", "النموذج والخريطة"],
      departments: "الإدارات", sections: "الأقسام", positions: "المناصب", procedures: "الإجراءات الموثّقة",
      nSections: n => `${n} قسم`, nPositions: n => `${n} منصب`, nProcs: n => `${n} إجراء`,
      moreDepts: "تُضاف بقية إدارات ريف تباعاً.",
      chooseSection: "اختر القسم", choosePosition: "اختر المنصب",
      grade: "الدرجة", level: "المستوى",
      shared: n => `يشغل هذا المنصب ${n} موظفين بنفس الوصف الوظيفي — يعبّئ النماذج موظف واحد فقط لتجنّب التكرار.`,
      sharedTag: n => `×${n} — تعبئة واحدة`,
      fillerLabel: "الموظف المكلّف بالتعبئة", fillerPh: "اكتب اسم الموظف", fillerSave: "تثبيت",
      fillerSet: "يتولى التعبئة:", change: "تغيير",
      newProc: "توثيق إجراء جديد",
      noProcs: "لا توجد إجراءات موثّقة لهذا المنصب بعد. ابدأ بتوثيق أول إجراء تنفذه في دورك.",
      view: "عرض", edit: "تعديل", del: "حذف", confirmDel: "هل تريد حذف هذا الإجراء نهائياً؟",
      done: "تم — توليد الخريطة والحفظ", cancel: "إلغاء", previewMap: "معاينة الخريطة", addRow: "إضافة صف",
      errName: "يرجى إدخال اسم الإجراء (القسم 1).",
      errSteps: "يرجى إدخال خطوة واحدة على الأقل مع المسؤول عنها (القسم 5).",
      errStorage: "تعذّر الحفظ في المتصفح.",
      saved: "تم حفظ الإجراء وتوليد خريطة العملية.",
      print: "طباعة / PDF", dlSvg: "تنزيل الخريطة SVG", dlPng: "تنزيل الخريطة PNG", back: "رجوع",
      exampleToggle: "مثال توضيحي: إجراء طلب الشراء",
      exampleSub: "مثال معبّأ لتوضيح طريقة التعبئة فقط – الأرقام والحدود افتراضية",
      adminTitle: "لوحة إدارة التحول الرقمي",
      adminNote: "نسخة تجريبية: البيانات محفوظة في هذا المتصفح ولا يوجد تسجيل دخول. في النسخة النهائية يقتصر الوصول لهذه اللوحة على ثلاثة أشخاص من إدارة التحول الرقمي، ويرى كل موظف بوابة إدارته فقط.",
      statProcs: "إجراءات موثّقة", statPositions: "مناصب بدأت التوثيق", statDepts: "إدارات في الدليل",
      coverage: "نسبة التغطية حسب الإدارة",
      thDept: "الإدارة", thSection: "القسم", thPosition: "المنصب", thName: "اسم الإجراء", thCode: "رمز الإجراء", thSteps: "الخطوات", thUpdated: "آخر تحديث",
      exportJson: "تصدير البيانات (JSON)", importJson: "استيراد بيانات",
      importDone: n => `تم استيراد ${n} إجراء.`, importErr: "ملف غير صالح.",
      allDepts: "كل الإدارات",
      empty: "لا توجد بيانات بعد.",
      mapEmpty: "أدخل الخطوات والمسؤول عن كل خطوة في القسم 5 ثم اضغط «معاينة الخريطة» أو «تم».",
      mapNumbersNote: "الأرقام داخل الدوائر تطابق أرقام الخطوات في الجدول التالي.",
      nextHint: "صيغة «الخطوة التالية»: رقم الخطوة (مثل 2)، أو للقرار: «نعم ← 3 / لا ← نهاية (السبب)». يمكن اختيار شكل الخطوة من الرمز بجانب رقمها.",
      shapes: { auto: "الشكل: تلقائي", task: "نشاط / مهمة", decision: "قرار (نعم / لا)", doc: "مستند / نموذج" },
      unspecified: "غير محدد", startW: "بداية", endW: "نهاية",
      notFound: "الصفحة غير موجودة.", lastUpdated: "آخر تحديث",
      docHeader: "نموذج توثيق إجراءات العمل",
      footer: "وثيقة داخلية – ريف"
    },
    en: {
      appTitle: "Procedure Documentation Guide", appSub: "REEF — Departments Portal",
      home: "Home", admin: "Digital Transformation", langBtn: "العربية",
      heroKicker: "REEF Group",
      heroTitle: "Departmental Procedure Documentation Guide",
      heroText: "Choose your department, then your section, then your position, and document every procedure you perform in your role. When you press “Done”, the process map is generated automatically and saved with your data.",
      flow: ["Department", "Section", "Position", "Form & map"],
      departments: "Departments", sections: "Sections", positions: "Positions", procedures: "Documented procedures",
      nSections: n => `${n} section${n === 1 ? "" : "s"}`, nPositions: n => `${n} position${n === 1 ? "" : "s"}`, nProcs: n => `${n} procedure${n === 1 ? "" : "s"}`,
      moreDepts: "The remaining REEF departments will be added progressively.",
      chooseSection: "Choose your section", choosePosition: "Choose your position",
      grade: "Grade", level: "Level",
      shared: n => `${n} employees hold this position with the same job description — only ONE of them fills the forms, to avoid duplication.`,
      sharedTag: n => `×${n} — one filler`,
      fillerLabel: "Employee assigned to fill", fillerPh: "Employee name", fillerSave: "Assign",
      fillerSet: "Filled by:", change: "Change",
      newProc: "Document a new procedure",
      noProcs: "No procedures documented for this position yet. Start with the first procedure you perform in your role.",
      view: "View", edit: "Edit", del: "Delete", confirmDel: "Delete this procedure permanently?",
      done: "Done — generate map & save", cancel: "Cancel", previewMap: "Preview map", addRow: "Add row",
      errName: "Please enter the procedure name (section 1).",
      errSteps: "Please enter at least one step with its responsible role (section 5).",
      errStorage: "Could not save in this browser.",
      saved: "Procedure saved and process map generated.",
      print: "Print / PDF", dlSvg: "Download map SVG", dlPng: "Download map PNG", back: "Back",
      exampleToggle: "Illustrative example: Purchase Request procedure",
      exampleSub: "A filled example to illustrate how to complete the form – figures and boundaries are hypothetical",
      adminTitle: "Digital Transformation Dashboard",
      adminNote: "Prototype: data is stored in this browser and there is no sign-in. In the final version, access to this dashboard is limited to three people from Digital Transformation, and each employee sees only their own department’s portal.",
      statProcs: "Documented procedures", statPositions: "Positions started", statDepts: "Departments in the guide",
      coverage: "Coverage by department",
      thDept: "Department", thSection: "Section", thPosition: "Position", thName: "Procedure name", thCode: "Procedure code", thSteps: "Steps", thUpdated: "Last updated",
      exportJson: "Export data (JSON)", importJson: "Import data",
      importDone: n => `${n} procedures imported.`, importErr: "Invalid file.",
      allDepts: "All departments",
      empty: "No data yet.",
      mapEmpty: "Enter the steps and the responsible role for each in section 5, then press “Preview map” or “Done”.",
      mapNumbersNote: "Numbers inside the circles match the step numbers in the following table.",
      nextHint: "“Next step” format: a step number (e.g. 2), or for a decision: “Yes → 3 / No → End (reason)”. You can choose a step’s shape from the symbol next to its number.",
      shapes: { auto: "Shape: automatic", task: "Activity / Task", decision: "Decision (Yes / No)", doc: "Document / Form" },
      unspecified: "Unspecified", startW: "Start", endW: "End",
      notFound: "Page not found.", lastUpdated: "Last updated",
      docHeader: "Business Procedure Documentation Form",
      footer: "Internal document – REEF"
    }
  };
  const t = k => T[lang][k];

  /* Form text — reproduces the template exactly (Arabic) + English version */
  const F = {
    ar: {
      title: "نموذج توثيق إجراء عمل", sub: "خريطة العملية (Business Process Map) وتفاصيل الإجراء",
      howTitle: "طريقة التعبئة",
      how: [
        "نموذج واحد لكل إجراء، ويُوثَّق الإجراء كما يُنفَّذ فعلياً اليوم.",
        "حدّد أولاً أين يبدأ الإجراء وأين ينتهي بالضبط وفي أي إدارة، ثم ارسم الخريطة، ثم اكتب الخطوات بنفس أرقام الخريطة.",
        "كل مسار في الخريطة يمثل دوراً أو إدارة (وليس اسم شخص)، وكل خطوة تبدأ بفعل: يرفع، يراجع، يعتمد.",
        "كل قرار له مساران واضحان (نعم / لا)، ولا يُترك أي مسار بلا نهاية.",
        "النصوص الرمادية بين [ ] إرشادات تُحذف عند التعبئة. راجع المثال التوضيحي في نهاية الملف."
      ],
      s1: "معلومات الإجراء",
      info: {
        dept: ["الإدارة", "[اسم الإدارة]"], name: ["اسم الإجراء", "[اسم واضح يصف الإجراء]"],
        code: ["رمز الإجراء", "[الإدارة / القسم أو المنصب // رقم الإجراء]"], owner: ["مالك الإجراء", "[المنصب المسؤول عن الإجراء]"],
        approver: ["معتمد الإجراء", "[المنصب الذي يعتمد الإجراء]"], approvalDate: ["تاريخ الاعتماد", "[يوم / شهر / سنة]"],
        version: ["رقم الإصدار", "[1.0]"], issueDate: ["تاريخ الإصدار", "[يوم / شهر / سنة]"],
        reviewer: ["المراجِع", "[اسم ومنصب من راجع الإجراء]"], reviewDate: ["تاريخ المراجعة", "[يوم / شهر / سنة]"]
      },
      s2: "الغرض والنطاق",
      purpose: ["الغرض", "[لماذا يوجد هذا الإجراء؟ يهدف هذا الإجراء إلى ...]"],
      scope: ["النطاق", "[ما الذي يشمله الإجراء وما الذي لا يشمله]"],
      boundsHead: ["حدود الإجراء", "ماذا يحدث بالضبط؟", "في أي إدارة؟", "الدور المسؤول"],
      bounds: {
        start: ["يبدأ الإجراء", "[الحدث الذي يبدأ به الإجراء بالضبط، مثل: استلام طلب ...]", "[اسم الإدارة التي يبدأ فيها]", "[الدور الذي ينفذ أول خطوة]"],
        end: ["ينتهي الإجراء", "[المخرج النهائي الذي ينتهي به الإجراء، مثل: إصدار ...]", "[اسم الإدارة التي ينتهي فيها]", "[الدور الذي ينفذ آخر خطوة]"],
        alt: ["نهاية بديلة (إن وجدت)", "[إن كان للإجراء نهاية أخرى، مثل: رفض الطلب]", "[اسم الإدارة]", "[الدور]"],
        deps: ["الاعتماديات (الإجراءات المرتبطة)", "[الإجراءات التي يعتمد عليها هذا الإجراء أو تعتمد عليه، مع رمزها ونوع الارتباط: يسبقه / يليه]", "[الإدارة المالكة للإجراء المرتبط]", "[الدور المسؤول عنه]"]
      },
      s3: "الأدوار المشاركة",
      rolesHead: ["الدور / المنصب", "المسؤولية في هذا الإجراء"],
      rolesPh: ["[مثال: أخصائي المشتريات]", "[ما الذي يقوم به هذا الدور في الإجراء]"],
      s4: "خريطة العملية (Process Map)",
      legend: ["بداية / نهاية", "نشاط / مهمة", "قرار (نعم / لا)", "مستند / نموذج"],
      mapGuideLead: "إرشاد:",
      mapGuide: "كل صف يمثل دوراً، والتسلسل من اليمين إلى اليسار. تُرسم الخريطة تلقائياً من جدول الخطوات (القسم 5) بنفس الرموز أعلاه عند الضغط على «تم»، وتُرقَّم كل خطوة بنفس رقمها في جدول الخطوات.",
      laneHead: "المسار (الدور)", lanePh: n => `[الدور ${n}]`,
      s5: "خطوات الإجراء",
      stepsGuide: "خطوة واحدة في كل صف، بنفس ترقيم الخريطة. في خطوات القرار اكتب المسارين في عمود «الخطوة التالية».",
      stepsHead: ["#", "الخطوة (ماذا يحدث؟)", "المسؤول", "المدخلات", "المخرجات", "النظام / النموذج", "المدة", "الخطوة التالية"],
      stepsPh: ["[يبدأ بفعل: يرفع الموظف طلب ...]", "[الدور]", "[ماذا يحتاج]", "[ماذا ينتج]", "[ERP / نموذج / بريد]", "[يوم]", "[2  أو  نعم ← 3 / لا ← 1]"]
    },
    en: {
      title: "Business Procedure Documentation Form", sub: "Business Process Map and Procedure Details",
      howTitle: "How to fill",
      how: [
        "One form per procedure; document the procedure as it is actually performed today.",
        "First define exactly where the procedure starts and ends and in which department, then draw the map, then write the steps using the same numbers as the map.",
        "Each lane in the map represents a role or department (not a person’s name), and each step starts with a verb: Submits, Reviews, Approves.",
        "Every decision has two clear paths (Yes / No), and no path is left without an end.",
        "Grey text between [ ] is guidance and is removed when filling. See the illustrative example at the end of the file."
      ],
      s1: "Procedure Information",
      info: {
        dept: ["Department", "[Department name]"], name: ["Procedure name", "[A clear name describing the procedure]"],
        code: ["Procedure code", "[Department / Section or Position // Procedure number]"], owner: ["Procedure owner", "[Position responsible for the procedure]"],
        approver: ["Procedure approver", "[Position that approves the procedure]"], approvalDate: ["Approval date", "[Day / Month / Year]"],
        version: ["Version number", "[1.0]"], issueDate: ["Issue date", "[Day / Month / Year]"],
        reviewer: ["Reviewer", "[Name and position of the reviewer]"], reviewDate: ["Review date", "[Day / Month / Year]"]
      },
      s2: "Purpose and Scope",
      purpose: ["Purpose", "[Why does this procedure exist? This procedure aims to ...]"],
      scope: ["Scope", "[What the procedure covers and what it does not]"],
      boundsHead: ["Procedure boundaries", "What exactly happens?", "In which department?", "Responsible role"],
      bounds: {
        start: ["Procedure starts", "[The exact event that starts the procedure, e.g. receiving a request ...]", "[Department where it starts]", "[Role performing the first step]"],
        end: ["Procedure ends", "[The final output that ends the procedure, e.g. issuing ...]", "[Department where it ends]", "[Role performing the last step]"],
        alt: ["Alternative end (if any)", "[If the procedure has another end, e.g. request rejected]", "[Department name]", "[Role]"],
        deps: ["Dependencies (related procedures)", "[Procedures this one depends on or that depend on it, with their code and link type: precedes / follows]", "[Department owning the related procedure]", "[Role responsible for it]"]
      },
      s3: "Participating Roles",
      rolesHead: ["Role / Position", "Responsibility in this procedure"],
      rolesPh: ["[e.g. Procurement Specialist]", "[What this role does in the procedure]"],
      s4: "Process Map",
      legend: ["Start / End", "Activity / Task", "Decision (Yes / No)", "Document / Form"],
      mapGuideLead: "Guidance:",
      mapGuide: "Each row represents a role, and the sequence runs from left to right. The map is drawn automatically from the steps table (section 5) using the symbols above when you press “Done”, and each step is numbered with its number in the steps table.",
      laneHead: "Lane (Role)", lanePh: n => `[Role ${n}]`,
      s5: "Procedure Steps",
      stepsGuide: "One step per row, using the same numbering as the map. For decision steps, write both paths in the “Next step” column.",
      stepsHead: ["#", "Step (what happens?)", "Responsible", "Inputs", "Outputs", "System / Form", "Duration", "Next step"],
      stepsPh: ["[Starts with a verb: Employee submits a request ...]", "[Role]", "[What is needed]", "[What is produced]", "[ERP / Form / Email]", "[Day]", "[2  or  Yes → 3 / No → 1]"]
    }
  };

  /* Illustrative example (from the template) */
  const EXAMPLE = {
    ar: {
      info: { dept: "إدارة المشتريات", name: "إجراء طلب الشراء", code: "PUR / DP // 001", owner: "مدير إدارة المشتريات", approver: "مدير عام الشؤون المالية والإدارية", approvalDate: "2026-10-05", version: "1.0", issueDate: "2026-10-01", reviewer: "أخصائي التميز المؤسسي", reviewDate: "2026-10-03" },
      purpose: "توفير احتياجات الإدارات من السلع والخدمات بالجودة والسعر المناسبين وفي الوقت المطلوب، وفق الميزانية المعتمدة.",
      scope: "يشمل طلبات الشراء المباشر لجميع الإدارات. لا يشمل المنافسات العامة واستلام المواد.",
      bounds: {
        start: { what: "ظهور احتياج لسلعة أو خدمة ورفع طلب شراء في النظام", dept: "الإدارة الطالبة", role: "الموظف الطالب" },
        end: { what: "إصدار أمر الشراء وإرساله للمورد", dept: "إدارة المشتريات", role: "أخصائي المشتريات" },
        alt: { what: "رفض الطلب في إحدى نقاط القرار وإشعار الإدارة الطالبة: رفض المدير (خطوة 2)، عدم توفر الميزانية (خطوة 3)، رفض الترسية (خطوة 6)", dept: "الإدارة الطالبة / الإدارة المالية / إدارة المشتريات (حسب نقطة الرفض)", role: "مدير الإدارة الطالبة / محلل الميزانية / مدير المشتريات" },
        deps: { what: "يعتمد على: إجراء إعداد واعتماد الميزانية (FIN / BUD // 001).  يليه: إجراء استلام وفحص المواد (PUR / WH // 003).", dept: "الإدارة المالية / إدارة المشتريات (المستودعات)", role: "محلل الميزانية / أخصائي المستودعات" }
      },
      roles: [
        { role: "الموظف (الإدارة الطالبة)", resp: "تحديد الاحتياج والمواصفات ورفع طلب الشراء في النظام." },
        { role: "مدير الإدارة الطالبة", resp: "مراجعة الاحتياج واعتماد الطلب أو إعادته." },
        { role: "الإدارة المالية", resp: "التحقق من توفر الميزانية وحجز المبلغ." },
        { role: "إدارة المشتريات", resp: "طلب العروض وتحليلها واعتماد الترسية وإصدار أمر الشراء." }
      ],
      steps: [
        { step: "يحدد الاحتياج ويرفع طلب شراء في النظام مع المواصفات", owner: "الموظف (الإدارة الطالبة)", inputs: "الاحتياج والمواصفات", outputs: "طلب شراء", system: "ERP", duration: "يوم", next: "2" },
        { step: "يراجع الطلب ويتخذ قراراً: اعتماد أو إعادة للتعديل أو رفض", owner: "مدير الإدارة الطالبة", inputs: "طلب الشراء", outputs: "طلب معتمد / معاد / مرفوض", system: "ERP", duration: "يوم", next: "اعتماد ← 3 / إعادة للتعديل ← 1 / رفض ← نهاية (رفض الطلب وإشعار الموظف)" },
        { step: "يتحقق من توفر الميزانية ويحجز المبلغ", owner: "الإدارة المالية", inputs: "طلب معتمد", outputs: "حجز ميزانية", system: "ERP", duration: "يومان", next: "نعم ← 4 / لا ← رفض وإشعار (نهاية)" },
        { step: "يطلب 3 عروض أسعار من موردين معتمدين", owner: "إدارة المشتريات", inputs: "المواصفات", outputs: "عروض الأسعار", system: "البريد / بوابة الموردين", duration: "4 أيام", next: "5" },
        { step: "يحلل العروض ويعد التوصية", owner: "إدارة المشتريات", inputs: "عروض الأسعار", outputs: "محضر تحليل العروض", system: "FRM-PUR-02", duration: "يومان", next: "6" },
        { step: "يراجع التوصية ويتخذ قرار الترسية حسب جدول الصلاحيات: اعتماد أو إعادة أو رفض", owner: "إدارة المشتريات", inputs: "محضر التحليل", outputs: "ترسية معتمدة / معادة / مرفوضة", system: "ERP", duration: "يوم", next: "اعتماد ← 7 / إعادة طلب العروض ← 4 / رفض ← نهاية (إلغاء الطلب وإشعار الإدارة)" },
        { step: "يصدر أمر الشراء ويرسله للمورد", owner: "إدارة المشتريات", inputs: "ترسية معتمدة", outputs: "أمر شراء", system: "ERP", duration: "يوم", next: "نهاية" }
      ]
    },
    en: {
      info: { dept: "Procurement Department", name: "Purchase Request Procedure", code: "PUR / DP // 001", owner: "Procurement Department Manager", approver: "General Manager - Finance & Administration", approvalDate: "2026-10-05", version: "1.0", issueDate: "2026-10-01", reviewer: "Institutional Excellence Specialist", reviewDate: "2026-10-03" },
      purpose: "Provide departments with goods and services at the right quality and price, on time, within the approved budget.",
      scope: "Covers direct purchase requests for all departments. Does not cover public tenders or receipt of materials.",
      bounds: {
        start: { what: "A need for a good or service arises and a purchase request is raised in the system", dept: "Requesting department", role: "Requesting employee" },
        end: { what: "Purchase order issued and sent to the supplier", dept: "Procurement Department", role: "Procurement Specialist" },
        alt: { what: "Request rejected at one of the decision points and the requesting department notified: manager rejection (step 2), budget unavailable (step 3), award rejected (step 6)", dept: "Requesting dept. / Finance / Procurement (depending on rejection point)", role: "Requesting dept. manager / Budget analyst / Procurement manager" },
        deps: { what: "Depends on: Budget preparation & approval procedure (FIN / BUD // 001).  Followed by: Receipt & inspection of materials (PUR / WH // 003).", dept: "Finance / Procurement (Warehouses)", role: "Budget analyst / Warehouse specialist" }
      },
      roles: [
        { role: "Employee (requesting department)", resp: "Define the need and specifications and raise the purchase request in the system." },
        { role: "Requesting department manager", resp: "Review the need and approve or return the request." },
        { role: "Finance Department", resp: "Verify budget availability and reserve the amount." },
        { role: "Procurement Department", resp: "Request and analyse quotations, approve the award and issue the purchase order." }
      ],
      steps: [
        { step: "Defines the need and raises a purchase request in the system with specifications", owner: "Employee (requesting department)", inputs: "Need and specifications", outputs: "Purchase request", system: "ERP", duration: "1 day", next: "2" },
        { step: "Reviews the request and decides: approve, return for amendment, or reject", owner: "Requesting department manager", inputs: "Purchase request", outputs: "Approved / returned / rejected request", system: "ERP", duration: "1 day", next: "Approve → 3 / Return for amendment → 1 / Reject → End (request rejected, employee notified)" },
        { step: "Verifies budget availability and reserves the amount", owner: "Finance Department", inputs: "Approved request", outputs: "Budget reservation", system: "ERP", duration: "2 days", next: "Yes → 4 / No → Reject and notify (End)" },
        { step: "Requests 3 quotations from approved suppliers", owner: "Procurement Department", inputs: "Specifications", outputs: "Quotations", system: "Email / Supplier portal", duration: "4 days", next: "5" },
        { step: "Analyses quotations and prepares the recommendation", owner: "Procurement Department", inputs: "Quotations", outputs: "Quotation analysis minutes", system: "FRM-PUR-02", duration: "2 days", next: "6" },
        { step: "Reviews the recommendation and decides the award per the authority matrix: approve, return, or reject", owner: "Procurement Department", inputs: "Analysis minutes", outputs: "Approved / returned / rejected award", system: "ERP", duration: "1 day", next: "Approve → 7 / Re-request quotations → 4 / Reject → End (request cancelled, department notified)" },
        { step: "Issues the purchase order and sends it to the supplier", owner: "Procurement Department", inputs: "Approved award", outputs: "Purchase order", system: "ERP", duration: "1 day", next: "End" }
      ]
    }
  };

  /* ------------------------------------------------------------------ *
   *  Utilities
   * ------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nm = o => (o ? (o[lang] || o.ar || o.en) : "");
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const fmtDate = v => { if (!v) return ""; const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v); return m ? `${m[3]}/${m[2]}/${m[1]}` : v; };
  const fmtStamp = ts => { try { return new Date(ts).toLocaleString(lang === "ar" ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB", { dateStyle: "medium", timeStyle: "short" }); } catch (e) { return new Date(ts).toISOString(); } };
  const ORG = window.REEF_ORG || { departments: [] };
  const findDept = id => ORG.departments.find(d => d.id === id);
  const findSec = (d, id) => d && d.sections.find(s => s.id === id);
  const findPos = (s, id) => s && s.positions.find(p => p.id === id);
  const posKey = (d, s, p) => `${d}/${s}/${p}`;
  const recsFor = (d, s, p) => Store.all().filter(r => r.deptId === d && (!s || r.secId === s) && (!p || r.posId === p));
  const totalPositions = d => d.sections.reduce((a, s) => a + s.positions.length, 0);

  const ICON = {
    arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    users: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M15.5 5.2a3 3 0 010 5.6M17.5 14.6c1.6.6 2.7 2 3 4.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    doc: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z M14 3v4h4 M10 12h5M10 16h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>'
  };
  const emblem = cls => `<svg class="${cls || "emblem"}" viewBox="1330 -6 940 924" aria-hidden="true"><use href="#reef-logo-path"/></svg>`;

  function toast(msg, kind) {
    const el = $("#toast");
    el.textContent = msg;
    el.className = "toast show" + (kind ? " " + kind : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => (el.className = "toast"), 3200);
  }

  /* ------------------------------------------------------------------ *
   *  Process-map generator (swimlane SVG, same notation as the template)
   * ------------------------------------------------------------------ */
  const MapGen = (function () {
    const C = { ink: "#1b1b1a", grey: "#e6e6e6", lane: "#f4f4f4", line: "#cfcfcf", docStroke: "#6b6b6b" };
    const FONT = '"IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif';
    let ctx;
    function measure(txt, size, weight) {
      if (!ctx) ctx = document.createElement("canvas").getContext("2d");
      ctx.font = `${weight || 500} ${size}px ${FONT}`;
      return ctx.measureText(txt).width;
    }
    function wrap(text, maxW, maxLines, size, weight) {
      const words = String(text || "").trim().split(/\s+/).filter(Boolean);
      const lines = []; let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (measure(test, size, weight) <= maxW || !cur) cur = test;
        else { lines.push(cur); cur = w; }
      }
      if (cur) lines.push(cur);
      if (lines.length > maxLines) {
        const kept = lines.slice(0, maxLines);
        let last = kept[maxLines - 1];
        while (last.length > 1 && measure(last + "…", size, weight) > maxW) last = last.slice(0, -1);
        kept[maxLines - 1] = last.trim() + "…";
        return kept;
      }
      return lines;
    }
    const normDigits = s => String(s || "").replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const END_RE = /نهاية|انتهاء|ينتهي|\bend\b|\bfinish\b|\bclose\b/i;

    function splitTop(s) { // split on "/" or "|" outside parentheses
      const out = []; let depth = 0, cur = "";
      for (const ch of s) {
        if (ch === "(" || ch === "（") depth++;
        if (ch === ")" || ch === "）") depth = Math.max(0, depth - 1);
        if ((ch === "/" || ch === "|" || ch === "؛" || ch === ";") && depth === 0) { out.push(cur); cur = ""; }
        else cur += ch;
      }
      out.push(cur);
      return out.map(x => x.trim()).filter(Boolean);
    }
    function parseNext(raw) {
      const s = normDigits(raw).trim();
      if (!s) return [];
      return splitTop(s).map(part => {
        let label = "", target = part;
        const m = /^(.*?)\s*(←|→|->|<-|=>|⇐|⇒|:)\s*(.+)$/.exec(part);
        if (m) { label = m[1].trim(); target = m[3].trim(); }
        const num = /^\D{0,12}?(\d+)\s*$/.exec(target);
        if (num && !END_RE.test(target)) return { label, to: parseInt(num[1], 10) };
        if (END_RE.test(target)) {
          let txt = "";
          const paren = /\(([^)]*)\)/.exec(target);
          const stripped = target.replace(/\(([^)]*)\)/g, "").replace(END_RE, "").replace(/[:：\-–]/g, " ").trim();
          if (stripped) txt = stripped;
          else if (paren && !END_RE.test(paren[1])) txt = paren[1].trim();
          return { label, end: true, text: txt };
        }
        return { label, end: true, text: target };
      });
    }

    function build(data, L) {
      const rtl = L === "ar";
      const TT = T[L];
      const rows = (data.steps || []).map((s, i) => Object.assign({}, s, { n: i + 1 }))
        .filter(s => (s.step || "").trim() || (s.owner || "").trim());
      if (!rows.length) return null;
      const byN = {}; rows.forEach(r => (byN[r.n] = r));

      // lanes in order of first appearance
      const lanes = [];
      const laneIdx = name => { const k = (name || "").trim() || TT.unspecified; let i = lanes.indexOf(k); if (i < 0) { lanes.push(k); i = lanes.length - 1; } return i; };
      rows.forEach((r, i) => {
        r.lane = laneIdx(r.owner);
        let br = parseNext(r.next);
        if (!br.length) { const nx = rows[i + 1]; br = nx ? [{ label: "", to: nx.n }] : [{ label: "", end: true, text: "" }]; }
        br = br.map(b => (b.to != null && !byN[b.to]) ? { label: b.label, end: true, text: "" } : b);
        r.branches = br;
        const auto = br.length > 1 || /[?؟]/.test(r.step || "") ? "decision"
          : (/FRM|نموذج|استمارة|مستند|\bform\b|document/i.test(r.system || "") ? "doc" : "task");
        r.type = r.shape && r.shape !== "auto" ? r.shape : auto;
      });

      // grid placement
      const occ = {};
      const key = (l, c, s) => `${l}|${c}|${s}`;
      const nodes = [];
      const start = { id: "S", type: "term", lane: rows[0].lane, col: 0, sub: 0,
        text: TT.startW + ((data.bounds && data.bounds.start && data.bounds.start.what) ? ": " + data.bounds.start.what : "") };
      occ[key(start.lane, 0, 0)] = 1; nodes.push(start);
      rows.forEach((r, i) => {
        let col;
        const preds = rows.filter(p => p.n < r.n && p.branches.some(b => b.to === r.n));
        if (i === 0) col = 1;
        else if (preds.length) col = Math.max(...preds.map(p => p.col + ((p.lane !== r.lane && p.type === "decision") ? 0 : 1)));
        else col = rows[i - 1].col + 1;
        while (occ[key(r.lane, col, 0)]) col++;
        r.col = col; r.sub = 0; occ[key(r.lane, col, 0)] = 1;
        r.id = "s" + r.n; r.text = r.type === "decision" ? (r.step || "").split(/[:：]/)[0] : r.step;
        nodes.push(r);
      });
      const edges = [];
      edges.push({ from: start, to: rows[0], label: "", pr: 0 });
      let ec = 0;
      const mainEnd = (data.bounds && data.bounds.end && data.bounds.end.what) || "";
      const altEnd = (data.bounds && data.bounds.alt && data.bounds.alt.what) || "";
      rows.forEach(r => {
        const decision = r.type === "decision";
        r.branches.forEach((b, bi) => {
          if (b.end) {
            let txt = b.text;
            if (!txt) txt = (!decision || bi === 0) ? mainEnd : (altEnd.length < 60 ? altEnd : "");
            const col = r.col + 1; let sub = 0;
            while (occ[key(r.lane, col, sub)]) sub++;
            occ[key(r.lane, col, sub)] = 1;
            const e = { id: "e" + (++ec), type: "term", lane: r.lane, col, sub, text: TT.endW + (txt ? ": " + txt : "") };
            nodes.push(e);
            edges.push({ from: r, to: e, label: b.label, pr: 1 });
          } else {
            const tgt = byN[b.to];
            edges.push({ from: r, to: tgt, label: b.label, pr: b.to > r.n ? 0 : 2 });
          }
        });
      });

      // geometry (logical: flow goes towards +x; mirrored for RTL at output)
      const HW = 168, PAD = 26, COLW = 256, RH = 170;
      const SZ = { term: [166, 58], task: [174, 74], doc: [174, 78], decision: [198, 122] };
      const maxCol = Math.max(...nodes.map(n => n.col));
      const subs = lanes.map((_, li) => Math.max(0, ...nodes.filter(n => n.lane === li).map(n => n.sub)) + 1);
      const laneTop = []; let y = 0;
      subs.forEach((s, i) => { laneTop[i] = y; y += s * RH; });
      const H = y, W = HW + PAD * 2 + (maxCol + 1) * COLW;
      nodes.forEach(n => {
        n.w = SZ[n.type][0]; n.h = SZ[n.type][1];
        n.cx = HW + PAD + n.col * COLW + COLW / 2;
        n.cy = laneTop[n.lane] + n.sub * RH + RH / 2;
        n.used = {};
      });
      const port = (n, p) => p === "F" ? [n.cx + n.w / 2, n.cy] : p === "B" ? [n.cx - n.w / 2, n.cy] : p === "T" ? [n.cx, n.cy - n.h / 2] : [n.cx, n.cy + n.h / 2];
      const pick = (n, list) => { for (const p of list) if (!n.used[p]) { n.used[p] = 1; return p; } n.used[list[0]] = 1; return list[0]; };

      edges.sort((a, b) => (a.from.n || 0) - (b.from.n || 0) || a.pr - b.pr);
      const paths = [];
      edges.forEach(e => {
        const A = e.from, B = e.to;
        const dx = B.col - A.col;
        const sameLane = A.lane === B.lane, sameRow = sameLane && A.sub === B.sub;
        let pts;
        if (sameRow && dx > 0) {
          const sp = pick(A, ["F", "D", "T"]);
          const s = port(A, sp);
          if (sp === "F") pts = [s, port(B, "B")];
          else { const yy = sp === "D" ? A.cy + RH / 2 - 12 : A.cy - RH / 2 + 12; const d = port(B, sp); pts = [s, [s[0], yy], [d[0], yy], d]; }
        } else if (sameRow) {
          const sp = pick(A, ["T", "D"]);
          const s = port(A, sp), d = port(B, sp);
          const yy = sp === "T" ? A.cy - RH / 2 + 12 : A.cy + RH / 2 - 12;
          pts = [s, [s[0], yy], [d[0], yy], d];
        } else if (sameLane) {
          const below = B.sub > A.sub;
          const sp = pick(A, below ? ["D", "F"] : ["T", "F"]);
          const s = port(A, sp);
          const d = port(B, dx >= 0 ? "B" : "F");
          pts = sp === "F" ? [s, [s[0] + (d[0] - s[0]) / 2, s[1]], [s[0] + (d[0] - s[0]) / 2, d[1]], d] : [s, [s[0], d[1]], d];
        } else {
          const down = B.lane > A.lane;
          const vS = down ? "D" : "T", vD = down ? "T" : "D";
          const d = port(B, vD);
          if (dx === 0) {
            const sp = pick(A, [vS, "F", "B"]);
            const s = port(A, sp);
            pts = sp === vS ? [s, d] : [s, [s[0] + (sp === "F" ? 22 : -22), s[1]], [s[0] + (sp === "F" ? 22 : -22), (s[1] + d[1]) / 2], [d[0], (s[1] + d[1]) / 2], d];
          } else {
            const sp = pick(A, dx > 0 ? (A.type === "decision" ? [vS, "F"] : ["F", vS]) : ["B", vS]);
            const s = port(A, sp);
            if (sp === "F" || sp === "B") pts = [s, [d[0], s[1]], d];
            else {
              const yy = down ? laneTop[A.lane] + subs[A.lane] * RH : laneTop[A.lane];
              pts = [s, [s[0], yy], [d[0], yy], d];
            }
          }
        }
        paths.push({ pts, label: e.label });
      });

      // output
      const X = x => rtl ? W - x : x;
      const dirAttr = rtl ? ' direction="rtl"' : "";
      const mk = "ah" + Math.random().toString(36).slice(2, 7);
      const out = [];
      out.push(`<svg xmlns="http://www.w3.org/2000/svg" class="pmap" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family='${FONT}'>`);
      out.push(`<defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.ink}"/></marker></defs>`);
      out.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="#fff"/>`);
      lanes.forEach((name, i) => {
        const yy = laneTop[i], hh = subs[i] * RH;
        out.push(`<rect x="0" y="${yy}" width="${W}" height="${hh}" fill="${i % 2 ? C.lane : "#fff"}"/>`);
        if (i) out.push(`<line x1="0" y1="${yy}" x2="${W}" y2="${yy}" stroke="${C.line}" stroke-width="1.2"/>`);
        const hx = rtl ? W - HW : 0;
        out.push(`<rect x="${hx}" y="${yy}" width="${HW}" height="${hh}" fill="${C.ink}"/>`);
        if (i) out.push(`<line x1="${hx}" y1="${yy}" x2="${hx + HW}" y2="${yy}" stroke="#555" stroke-width="1"/>`);
        const ls = wrap(name, HW - 28, 4, 14, 700);
        const y0 = yy + hh / 2 - (ls.length - 1) * 10;
        ls.forEach((l, k) => out.push(`<text x="${hx + HW / 2}" y="${y0 + k * 20}" fill="#fff" font-size="14" font-weight="700" text-anchor="middle" dominant-baseline="middle"${dirAttr}>${esc(l)}</text>`));
      });
      out.push(`<rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" fill="none" stroke="${C.ink}" stroke-width="1.5"/>`);

      // edges
      paths.forEach(p => {
        const d = p.pts.map((q, i) => `${i ? "L" : "M"}${X(q[0]).toFixed(1)} ${q[1].toFixed(1)}`).join("");
        out.push(`<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="1.6" stroke-linejoin="round" marker-end="url(#${mk})"/>`);
      });
      paths.forEach(p => {
        if (!p.label) return;
        const [a, b] = p.pts;
        const tw = measure(p.label, 13, 700);
        const ax = X(a[0]), bx = X(b[0]);
        let lx, ly;
        if (Math.abs(a[1] - b[1]) < 0.5) { const sg = Math.sign(bx - ax) || 1; lx = ax + sg * (tw / 2 + 10); ly = a[1] - 11; }
        else { const sg = Math.sign(b[1] - a[1]) || 1; const fw = rtl ? -1 : 1; lx = ax + fw * (tw / 2 + 9); ly = a[1] + sg * 15; }
        out.push(`<text x="${lx.toFixed(1)}" y="${ly}" font-size="13" font-weight="700" fill="${C.ink}" text-anchor="middle" dominant-baseline="middle" stroke="#fff" stroke-width="4" paint-order="stroke" stroke-linejoin="round"${dirAttr}>${esc(p.label)}</text>`);
      });

      // nodes
      nodes.forEach(n => {
        const cx = X(n.cx), cy = n.cy, w = n.w, h = n.h;
        let fill = "#fff", tcol = C.ink, maxW = w - 24, maxL = 3;
        if (n.type === "term") {
          fill = C.ink; tcol = "#fff";
          out.push(`<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${C.ink}"/>`);
          maxW = w - 30; maxL = 2;
        } else if (n.type === "task") {
          out.push(`<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>`);
        } else if (n.type === "decision") {
          out.push(`<path d="M${cx} ${cy - h / 2}L${cx + w / 2} ${cy}L${cx} ${cy + h / 2}L${cx - w / 2} ${cy}Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.6" stroke-linejoin="round"/>`);
          maxW = w * 0.56; maxL = 3;
        } else if (n.type === "doc") {
          const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2 - 8;
          out.push(`<path d="M${x0} ${y0}H${x1}V${y1}C${x1 - w * 0.25} ${y1 - 12} ${x0 + w * 0.55} ${y1 + 18} ${x0} ${y1 + 2}Z" fill="#fff" stroke="${C.docStroke}" stroke-width="1.6" stroke-linejoin="round"/>`);
        }
        const ls = wrap(n.text, maxW, maxL, 13, 500);
        const yOff = n.type === "doc" ? -4 : 0;
        const y0 = cy + yOff - (ls.length - 1) * 9;
        ls.forEach((l, k) => out.push(`<text x="${cx}" y="${y0 + k * 18}" fill="${tcol}" font-size="13" font-weight="500" text-anchor="middle" dominant-baseline="middle"${dirAttr}>${esc(l)}</text>`));
        if (n.n) {
          let bx, by;
          if (n.type === "decision") { bx = n.cx + w / 4 + 4; by = n.cy - h / 4 - 4; }
          else { bx = n.cx + w / 2 - 2; by = n.cy - h / 2 + 2; }
          out.push(`<circle cx="${X(bx)}" cy="${by}" r="12" fill="${C.ink}" stroke="#fff" stroke-width="2"/>`);
          out.push(`<text x="${X(bx)}" y="${by + 0.5}" fill="#fff" font-size="12" font-weight="700" text-anchor="middle" dominant-baseline="middle">${n.n}</text>`);
        }
      });
      out.push("</svg>");
      return out.join("");
    }
    return { build, parseNext };
  })();

  /* ------------------------------------------------------------------ *
   *  Form model
   * ------------------------------------------------------------------ */
  function blankData(dept, sec, pos) {
    const n = (recsFor(dept.id, sec.id, pos.id).length + 1).toString().padStart(3, "0");
    const steps = []; for (let i = 0; i < 10; i++) steps.push({ step: "", owner: "", inputs: "", outputs: "", system: "", duration: "", next: "", shape: "auto" });
    return {
      info: { dept: nm(dept), name: "", code: `${dept.code} / ${sec.code} // ${n}`, owner: nm(pos), approver: "", approvalDate: "", version: "1.0", issueDate: "", reviewer: "", reviewDate: "" },
      purpose: "", scope: "",
      bounds: { start: { what: "", dept: "", role: "" }, end: { what: "", dept: "", role: "" }, alt: { what: "", dept: "", role: "" }, deps: { what: "", dept: "", role: "" } },
      roles: [{ role: "", resp: "" }, { role: "", resp: "" }, { role: "", resp: "" }, { role: "", resp: "" }],
      steps
    };
  }
  function setPath(obj, path, val) {
    const parts = path.split("."); let o = obj;
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = val;
  }
  function getPath(obj, path) { return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj); }

  /* ------------------------------------------------------------------ *
   *  Document (form + read-only) rendering
   * ------------------------------------------------------------------ */
  const legendSvg = i => [
    '<svg viewBox="0 0 60 26"><rect x="1" y="2" width="58" height="22" rx="11" fill="#1b1b1a"/></svg>',
    '<svg viewBox="0 0 60 26"><rect x="1" y="1.5" width="58" height="23" rx="3" fill="#fff" stroke="#1b1b1a" stroke-width="1.4"/></svg>',
    '<svg viewBox="0 0 60 30"><path d="M30 1L59 15L30 29L1 15Z" fill="#e6e6e6" stroke="#1b1b1a" stroke-width="1.4"/></svg>',
    '<svg viewBox="0 0 60 28"><path d="M1 1H59V21C45 16 25 30 1 22Z" fill="#fff" stroke="#6b6b6b" stroke-width="1.4"/></svg>'
  ][i];

  function secHead(num, title) {
    return `<div class="sec-head"><span class="sec-num">${num}</span><h3>${esc(title)}</h3></div>`;
  }

  // field renderer: editable (textarea/input) or read-only text
  function fld(data, path, ph, ro, opts) {
    const v = getPath(data, path) || "";
    opts = opts || {};
    if (ro) {
      const shown = opts.date ? fmtDate(v) : v;
      return `<div class="ro">${esc(shown)}</div>`;
    }
    if (opts.date) return `<input type="date" class="in" data-p="${path}" value="${esc(v)}" aria-label="${esc(ph)}" title="${esc(ph)}">`;
    return `<textarea class="in" rows="1" data-p="${path}" placeholder="${esc(ph || "")}">${esc(v)}</textarea>`;
  }

  function renderDoc(data, L, ro, opts) {
    opts = opts || {};
    const f = F[L];
    const prevLang = lang; lang = L; // so helpers use document language
    let h = "";
    h += `<div class="doc" dir="${L === "ar" ? "rtl" : "ltr"}" lang="${L}">`;
    h += `<div class="doc-banner"><div><h2>${esc(f.title)}</h2><p>${esc(f.sub)}</p></div>${emblem("banner-emblem")}</div>`;
    if (!opts.hideHow) {
      h += `<div class="how"><h4>${esc(f.howTitle)}</h4><ol>${f.how.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>`;
    }
    // 1
    h += secHead(1, f.s1);
    const I = f.info;
    const pair = (a, b) => `<tr><th>${esc(I[a][0])}</th><td>${fld(data, "info." + a, I[a][1], ro, { date: /Date$/.test(a) })}</td><th>${esc(I[b][0])}</th><td>${fld(data, "info." + b, I[b][1], ro, { date: /Date$/.test(b) })}</td></tr>`;
    h += `<table class="t t-info"><colgroup><col class="c-lab"><col><col class="c-lab"><col></colgroup><tbody>${pair("dept", "name")}${pair("code", "owner")}${pair("approver", "approvalDate")}${pair("version", "issueDate")}${pair("reviewer", "reviewDate")}</tbody></table>`;
    // 2
    h += secHead(2, f.s2);
    h += `<table class="t t-info"><colgroup><col class="c-lab"><col></colgroup><tbody>
      <tr><th>${esc(f.purpose[0])}</th><td>${fld(data, "purpose", f.purpose[1], ro)}</td></tr>
      <tr><th>${esc(f.scope[0])}</th><td>${fld(data, "scope", f.scope[1], ro)}</td></tr></tbody></table>`;
    h += `<table class="t t-bounds"><thead><tr>${f.boundsHead.map(x => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>`;
    ["start", "end", "alt", "deps"].forEach(k => {
      const b = f.bounds[k];
      h += `<tr><th>${esc(b[0])}</th><td>${fld(data, `bounds.${k}.what`, b[1], ro)}</td><td>${fld(data, `bounds.${k}.dept`, b[2], ro)}</td><td>${fld(data, `bounds.${k}.role`, b[3], ro)}</td></tr>`;
    });
    h += `</tbody></table>`;
    // 3
    h += secHead(3, f.s3);
    h += `<table class="t t-roles"><thead><tr><th>${esc(f.rolesHead[0])}</th><th>${esc(f.rolesHead[1])}</th></tr></thead><tbody>`;
    data.roles.forEach((r, i) => {
      h += `<tr><td>${fld(data, `roles.${i}.role`, i === 0 ? f.rolesPh[0] : "", ro)}</td><td>${fld(data, `roles.${i}.resp`, i === 0 ? f.rolesPh[1] : "", ro)}</td></tr>`;
    });
    h += `</tbody></table>`;
    if (!ro) h += `<button type="button" class="btn ghost sm" data-act="add-role">${ICON.plus}${esc(T[prevLang].addRow)}</button>`;
    // 4
    h += `<div class="page-break"></div>`;
    h += secHead(4, f.s4);
    h += `<div class="legend">${f.legend.map((x, i) => `<span class="lg">${legendSvg(i)}<b>${esc(x)}</b></span>`).join("")}</div>`;
    if (!ro) h += `<p class="guide"><b>${esc(f.mapGuideLead)}</b> ${esc(f.mapGuide)}</p>`;
    h += `<div class="map-wrap" id="${opts.mapId || "mapArea"}">`;
    if (opts.mapSvg) h += `<div class="map-scroll">${opts.mapSvg}</div><p class="map-note">${esc(T[L].mapNumbersNote)}</p>`;
    else h += emptyGrid(data, L);
    h += `</div>`;
    if (!ro) h += `<div class="map-actions"><button type="button" class="btn ghost sm" data-act="preview">${esc(T[prevLang].previewMap)}</button></div>`;
    // 5
    h += secHead(5, f.s5);
    if (!ro) h += `<p class="guide"><b>${esc(f.mapGuideLead)}</b> ${esc(f.stepsGuide)}</p>`;
    h += `<div class="t-scroll"><table class="t t-steps"><thead><tr>${f.stepsHead.map(x => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>`;
    const keys = ["step", "owner", "inputs", "outputs", "system", "duration", "next"];
    const stepsShown = ro ? trimSteps(data.steps) : data.steps;
    stepsShown.forEach((s, i) => {
      h += `<tr><td class="num"><span>${i + 1}</span>${ro ? "" : shapeBtn(s.shape || "auto", i)}</td>`;
      keys.forEach((k, j) => { h += `<td>${fld(data, `steps.${i}.${k}`, i === 0 ? f.stepsPh[j] : "", ro)}</td>`; });
      h += `</tr>`;
    });
    h += `</tbody></table></div>`;
    if (!ro) h += `<div class="row-actions"><button type="button" class="btn ghost sm" data-act="add-step">${ICON.plus}${esc(T[prevLang].addRow)}</button><p class="hint">${esc(T[L].nextHint)}</p></div>`;
    h += `</div>`;
    lang = prevLang;
    return h;
  }
  function trimSteps(steps) {
    let last = -1;
    steps.forEach((s, i) => { if (["step", "owner", "inputs", "outputs", "system", "duration", "next"].some(k => (s[k] || "").trim())) last = i; });
    return steps.slice(0, Math.max(last + 1, 1));
  }
  const SHAPES = ["auto", "task", "decision", "doc"];
  function shapeBtn(shape, i) {
    const g = { auto: '<circle cx="9" cy="9" r="2.4" fill="currentColor"/><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-dasharray="2 2"/>',
      task: '<rect x="2.5" y="4.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/>',
      decision: '<path d="M9 2L16 9L9 16L2 9Z" fill="#e6e6e6" stroke="currentColor" stroke-width="1.3"/>',
      doc: '<path d="M2.5 3.5H15.5V12.5C12 11 7 15.5 2.5 13Z" fill="none" stroke="currentColor" stroke-width="1.3"/>' }[shape];
    return `<button type="button" class="shape-btn" data-act="shape" data-i="${i}" title="${esc(T[lang].shapes[shape])}" aria-label="${esc(T[lang].shapes[shape])}"><svg viewBox="0 0 18 18">${g}</svg></button>`;
  }
  function emptyGrid(data, L) {
    const f = F[L];
    const owners = [];
    (data.steps || []).forEach(s => { const o = (s.owner || "").trim(); if (o && !owners.includes(o)) owners.push(o); });
    (data.roles || []).forEach(r => { const o = (r.role || "").trim(); if (o && !owners.includes(o)) owners.push(o); });
    const n = Math.max(4, owners.length);
    let h = `<div class="t-scroll"><table class="t t-grid"><thead><tr><th>${esc(f.laneHead)}</th>`;
    for (let i = 1; i <= 8; i++) h += `<th>${i}</th>`;
    h += `</tr></thead><tbody>`;
    for (let i = 0; i < n; i++) {
      h += `<tr><th class="${owners[i] ? "" : "ph"}">${esc(owners[i] || f.lanePh(i + 1))}</th>${"<td></td>".repeat(8)}</tr>`;
    }
    return h + `</tbody></table></div><p class="map-empty">${esc(T[lang].mapEmpty)}</p>`;
  }

  /* ------------------------------------------------------------------ *
   *  Pages
   * ------------------------------------------------------------------ */
  const app = () => $("#app");

  function crumbs(list) {
    const items = [`<a href="#/">${esc(t("home"))}</a>`].concat(list.map(c => c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : `<span aria-current="page">${esc(c.label)}</span>`));
    $("#crumbs").innerHTML = items.join(`<i class="sep">${ICON.arrow}</i>`);
    $("#crumbs").hidden = false;
  }
  function noCrumbs() { $("#crumbs").hidden = true; $("#crumbs").innerHTML = ""; }

  function pageHome() {
    noCrumbs();
    const flow = t("flow").map((x, i) => `<li><span>${i + 1}</span>${esc(x)}</li>`).join("");
    const cards = ORG.departments.map(d => {
      const n = Store.all().filter(r => r.deptId === d.id).length;
      return `<a class="card dept" href="#/d/${d.id}">
        ${emblem("card-emblem")}
        <span class="code">${esc(d.code)}</span>
        <h3>${esc(nm(d))}</h3>
        <p class="meta">${esc(t("nSections")(d.sections.length))} · ${esc(t("nPositions")(totalPositions(d)))}</p>
        <p class="meta strong">${esc(t("nProcs")(n))}</p>
        <span class="go">${ICON.arrow}</span></a>`;
    }).join("");
    app().innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="kicker">${esc(t("heroKicker"))}</p>
          <h1>${esc(t("heroTitle"))}</h1>
          <p class="lead">${esc(t("heroText"))}</p>
          <ol class="flow">${flow}</ol>
        </div>
        <div class="hero-art">${emblem("hero-emblem")}</div>
      </section>
      <div class="ornament"><span></span>${emblem("orn-emblem")}<span></span></div>
      <section>
        <div class="list-head"><h2>${esc(t("departments"))}</h2><p>${esc(t("moreDepts"))}</p></div>
        <div class="grid">${cards}</div>
      </section>`;
  }

  function pageDept(d) {
    crumbs([{ label: nm(d) }]);
    const cards = d.sections.map(s => {
      const n = recsFor(d.id, s.id).length;
      return `<a class="card" href="#/d/${d.id}/s/${s.id}">
        <span class="code">${esc(s.code)}</span>
        <h3>${esc(nm(s))}</h3>
        <p class="meta">${esc(t("nPositions")(s.positions.length))}</p>
        <p class="meta strong">${esc(t("nProcs")(n))}</p>
        <span class="go">${ICON.arrow}</span></a>`;
    }).join("");
    app().innerHTML = `
      <header class="page-head"><p class="kicker">${esc(d.code)} · ${esc(t("nSections")(d.sections.length))}</p><h1>${esc(nm(d))}</h1><p class="lead">${esc(t("chooseSection"))}</p></header>
      <div class="grid">${cards}</div>`;
  }

  function pageSection(d, s) {
    crumbs([{ label: nm(d), href: `#/d/${d.id}` }, { label: nm(s) }]);
    const items = s.positions.map(p => {
      const n = recsFor(d.id, s.id, p.id).length;
      const hc = p.headcount > 1 ? `<span class="tag shared">${ICON.users}${esc(t("sharedTag")(p.headcount))}</span>` : "";
      return `<a class="pos" href="#/d/${d.id}/s/${s.id}/p/${p.id}">
        <span class="grade">${esc(p.grade)}</span>
        <div class="pos-main"><h3>${esc(nm(p))}</h3><p class="meta">${esc(lang === "ar" ? p.en : p.ar)}</p></div>
        <div class="pos-side">${hc}<span class="tag ${n ? "ok" : ""}">${ICON.doc}${esc(t("nProcs")(n))}</span></div>
        <span class="go">${ICON.arrow}</span></a>`;
    }).join("");
    app().innerHTML = `
      <header class="page-head"><p class="kicker">${esc(nm(d))} · ${esc(s.code)}</p><h1>${esc(nm(s))}</h1><p class="lead">${esc(t("choosePosition"))}</p></header>
      <div class="pos-list">${items}</div>`;
  }

  function pagePosition(d, s, p) {
    crumbs([{ label: nm(d), href: `#/d/${d.id}` }, { label: nm(s), href: `#/d/${d.id}/s/${s.id}` }, { label: nm(p) }]);
    const base = `#/d/${d.id}/s/${s.id}/p/${p.id}`;
    const recs = recsFor(d.id, s.id, p.id).sort((a, b) => b.updatedAt - a.updatedAt);
    let shared = "";
    if (p.headcount > 1) {
      const k = posKey(d.id, s.id, p.id);
      const c = Store.claims()[k];
      shared = `<div class="notice">${ICON.users}<div><p>${esc(t("shared")(p.headcount))}</p>
        ${c ? `<p class="claim"><b>${esc(t("fillerSet"))}</b> ${esc(c.name)} <button class="link" data-act="unclaim" data-k="${esc(k)}">${esc(t("change"))}</button></p>`
            : `<form class="claim-form" data-k="${esc(k)}"><label>${esc(t("fillerLabel"))}<input name="n" required placeholder="${esc(t("fillerPh"))}"></label><button class="btn sm">${esc(t("fillerSave"))}</button></form>`}
      </div></div>`;
    }
    const list = recs.length ? recs.map(r => `
      <article class="proc">
        <div><span class="code">${esc(r.data.info.code || "")}</span><h3>${esc(r.data.info.name)}</h3>
        <p class="meta">${trimSteps(r.data.steps).length} ${esc(t("thSteps"))} · ${esc(t("lastUpdated"))}: ${esc(fmtStamp(r.updatedAt))}</p></div>
        <div class="proc-actions"><a class="btn sm" href="${base}/view/${r.id}">${esc(t("view"))}</a><a class="btn ghost sm" href="${base}/edit/${r.id}">${esc(t("edit"))}</a><button class="btn ghost sm danger" data-act="del" data-id="${r.id}">${esc(t("del"))}</button></div>
      </article>`).join("") : `<div class="empty">${emblem("empty-emblem")}<p>${esc(t("noProcs"))}</p></div>`;
    app().innerHTML = `
      <header class="page-head with-action">
        <div><p class="kicker">${esc(nm(s))}</p><h1>${esc(nm(p))}</h1>
        <p class="lead"><span class="grade">${esc(p.grade)}</span> <span class="muted">${esc(t("level"))} <bdi dir="ltr">${esc(p.level)}</bdi></span></p></div>
        <a class="btn primary" href="${base}/new">${ICON.plus}${esc(t("newProc"))}</a>
      </header>
      ${shared}
      <div class="list-head"><h2>${esc(t("procedures"))}</h2></div>
      <div class="proc-list">${list}</div>`;
  }

  let formState = null;
  function pageForm(d, s, p, id) {
    const base = `#/d/${d.id}/s/${s.id}/p/${p.id}`;
    const existing = id ? Store.get(id) : null;
    if (id && !existing) return pageNotFound();
    const docLang = existing ? (existing.lang || lang) : lang;
    crumbs([{ label: nm(d), href: `#/d/${d.id}` }, { label: nm(s), href: `#/d/${d.id}/s/${s.id}` }, { label: nm(p), href: base }, { label: existing ? existing.data.info.name : t("newProc") }]);
    formState = {
      d, s, p, base, lang: docLang,
      rec: existing ? JSON.parse(JSON.stringify(existing)) : { id: uid(), deptId: d.id, secId: s.id, posId: p.id, lang: docLang, createdAt: Date.now() },
      data: existing ? JSON.parse(JSON.stringify(existing.data)) : blankData(d, s, p)
    };
    renderFormPage();
  }
  function renderFormPage() {
    const st = formState, L = st.lang;
    const exMap = MapGen.build(EXAMPLE[L], L);
    app().innerHTML = `
      <form id="procForm" class="form-wrap" novalidate>
        ${renderDoc(st.data, L, false)}
        <div class="form-bar">
          <a class="btn ghost" href="${st.base}">${esc(t("cancel"))}</a>
          <button class="btn primary" type="submit">${esc(t("done"))}</button>
        </div>
      </form>
      <details class="example">
        <summary><span>${esc(T[L].exampleToggle)}</span><small>${esc(T[L].exampleSub)}</small></summary>
        ${renderDoc(withRoles(EXAMPLE[L]), L, true, { mapSvg: exMap, hideHow: true, mapId: "exMap" })}
      </details>`;
    autosizeAll();
  }
  function withRoles(ex) { const c = JSON.parse(JSON.stringify(ex)); while (c.roles.length < 4) c.roles.push({ role: "", resp: "" }); return c; }

  function pageView(d, s, p, id) {
    const base = `#/d/${d.id}/s/${s.id}/p/${p.id}`;
    const r = Store.get(id);
    if (!r) return pageNotFound();
    crumbs([{ label: nm(d), href: `#/d/${d.id}` }, { label: nm(s), href: `#/d/${d.id}/s/${s.id}` }, { label: nm(p), href: base }, { label: r.data.info.name }]);
    const L = r.lang || "ar";
    app().innerHTML = `
      <div class="view-bar no-print">
        <a class="btn ghost sm" href="${base}">${esc(t("back"))}</a>
        <span class="spacer"></span>
        <a class="btn ghost sm" href="${base}/edit/${r.id}">${esc(t("edit"))}</a>
        <button class="btn ghost sm" data-act="dl-svg" data-id="${r.id}">${esc(t("dlSvg"))}</button>
        <button class="btn ghost sm" data-act="dl-png" data-id="${r.id}">${esc(t("dlPng"))}</button>
        <button class="btn primary sm" data-act="print">${esc(t("print"))}</button>
      </div>
      <div class="print-head" dir="${L === "ar" ? "rtl" : "ltr"}"><svg class="ph-logo" viewBox="0 0 3578 912"><use href="#reef-logo-path"/></svg><span><b>${esc(T[L].docHeader)}</b> | ${esc(r.data.info.code || "")}</span></div>
      ${renderDoc(r.data, L, true, { mapSvg: r.mapSvg, hideHow: true })}
      <p class="print-foot">${esc(T[L].footer)}</p>`;
  }

  function pageAdmin() {
    crumbs([{ label: t("admin") }]);
    const all = Store.all().sort((a, b) => b.updatedAt - a.updatedAt);
    const filter = pageAdmin.filter || "";
    const rows = all.filter(r => !filter || r.deptId === filter);
    const startedPos = new Set(all.map(r => posKey(r.deptId, r.secId, r.posId))).size;
    const cov = ORG.departments.map(d => {
      const tot = totalPositions(d);
      const done = new Set(all.filter(r => r.deptId === d.id).map(r => r.secId + "/" + r.posId)).size;
      const pct = tot ? Math.round(done / tot * 100) : 0;
      return `<div class="cov"><span>${esc(nm(d))}</span><div class="bar"><i style="width:${pct}%"></i></div><b>${done}/${tot} · ${pct}%</b></div>`;
    }).join("");
    const opts = `<option value="">${esc(t("allDepts"))}</option>` + ORG.departments.map(d => `<option value="${d.id}" ${filter === d.id ? "selected" : ""}>${esc(nm(d))}</option>`).join("");
    const trs = rows.map(r => {
      const d = findDept(r.deptId), s = findSec(d, r.secId), p = findPos(s, r.posId);
      const href = d && s && p ? `#/d/${d.id}/s/${s.id}/p/${p.id}/view/${r.id}` : "#/admin";
      return `<tr><td>${esc(nm(d))}</td><td>${esc(nm(s))}</td><td>${esc(nm(p))}</td><td><a href="${href}">${esc(r.data.info.name)}</a></td><td class="mono">${esc(r.data.info.code)}</td><td>${trimSteps(r.data.steps).length}</td><td>${esc(fmtStamp(r.updatedAt))}</td></tr>`;
    }).join("");
    app().innerHTML = `
      <header class="page-head"><p class="kicker">REEF · DT</p><h1>${esc(t("adminTitle"))}</h1></header>
      <div class="notice soft"><p>${esc(t("adminNote"))}</p></div>
      <div class="stats">
        <div class="stat"><b>${all.length}</b><span>${esc(t("statProcs"))}</span></div>
        <div class="stat"><b>${startedPos}</b><span>${esc(t("statPositions"))}</span></div>
        <div class="stat"><b>${ORG.departments.length}</b><span>${esc(t("statDepts"))}</span></div>
      </div>
      <div class="list-head"><h2>${esc(t("coverage"))}</h2></div>
      <div class="covs">${cov}</div>
      <div class="list-head admin-tools">
        <select id="deptFilter" aria-label="${esc(t("thDept"))}">${opts}</select>
        <span class="spacer"></span>
        <button class="btn ghost sm" data-act="export">${esc(t("exportJson"))}</button>
        <label class="btn ghost sm file">${esc(t("importJson"))}<input type="file" id="importFile" accept="application/json,.json" hidden></label>
      </div>
      <div class="t-scroll"><table class="t admin-t"><thead><tr><th>${esc(t("thDept"))}</th><th>${esc(t("thSection"))}</th><th>${esc(t("thPosition"))}</th><th>${esc(t("thName"))}</th><th>${esc(t("thCode"))}</th><th>${esc(t("thSteps"))}</th><th>${esc(t("thUpdated"))}</th></tr></thead>
      <tbody>${trs || `<tr><td colspan="7" class="center muted">${esc(t("empty"))}</td></tr>`}</tbody></table></div>`;
  }

  function pageNotFound() { noCrumbs(); app().innerHTML = `<div class="empty">${emblem("empty-emblem")}<p>${esc(t("notFound"))}</p><a class="btn" href="#/">${esc(t("home"))}</a></div>`; }

  /* ------------------------------------------------------------------ *
   *  Router
   * ------------------------------------------------------------------ */
  function route() {
    formState = null;
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    window.scrollTo(0, 0);
    if (!parts.length) return pageHome();
    if (parts[0] === "admin") return pageAdmin();
    if (parts[0] !== "d") return pageNotFound();
    const d = findDept(parts[1]); if (!d) return pageNotFound();
    if (parts.length === 2) return pageDept(d);
    const s = parts[2] === "s" && findSec(d, parts[3]); if (!s) return pageNotFound();
    if (parts.length === 4) return pageSection(d, s);
    const p = parts[4] === "p" && findPos(s, parts[5]); if (!p) return pageNotFound();
    if (parts.length === 6) return pagePosition(d, s, p);
    if (parts[6] === "new") return pageForm(d, s, p);
    if (parts[6] === "edit" && parts[7]) return pageForm(d, s, p, parts[7]);
    if (parts[6] === "view" && parts[7]) return pageView(d, s, p, parts[7]);
    pageNotFound();
  }

  /* ------------------------------------------------------------------ *
   *  Events
   * ------------------------------------------------------------------ */
  function autosize(el) { if (el && el.tagName === "TEXTAREA") { el.style.height = "auto"; el.style.height = el.scrollHeight + 2 + "px"; } }
  function autosizeAll() { document.querySelectorAll("textarea.in").forEach(autosize); }

  function rerenderForm(keepScroll) {
    const y = window.scrollY;
    const form = $("#procForm");
    const tmp = document.createElement("div");
    tmp.innerHTML = renderDoc(formState.data, formState.lang, false);
    form.replaceChild(tmp.firstElementChild, form.querySelector(".doc"));
    autosizeAll();
    if (keepScroll) window.scrollTo(0, y);
  }

  function showMap(svg) {
    const area = $("#mapArea");
    if (!area) return;
    area.innerHTML = svg ? `<div class="map-scroll">${svg}</div><p class="map-note">${esc(T[formState.lang].mapNumbersNote)}</p>` : emptyGrid(formState.data, formState.lang);
  }

  document.addEventListener("input", e => {
    const el = e.target;
    if (el.matches && el.matches("[data-p]") && formState) {
      setPath(formState.data, el.dataset.p, el.value);
      autosize(el);
      if (/^(steps\.\d+\.owner|roles\.\d+\.role)$/.test(el.dataset.p) && $("#mapArea .t-grid")) showMap(null);
    }
  });

  document.addEventListener("change", e => {
    if (e.target.id === "deptFilter") { pageAdmin.filter = e.target.value; pageAdmin(); }
    if (e.target.id === "importFile") {
      const file = e.target.files[0]; if (!file) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const arr = JSON.parse(rd.result); if (!Array.isArray(arr)) throw 0;
          const all = Store.all(); const ids = new Set(all.map(r => r.id));
          let n = 0; arr.forEach(r => { if (r && r.id && r.data) { if (ids.has(r.id)) all[all.findIndex(x => x.id === r.id)] = r; else all.push(r); n++; } });
          Store.replaceAll(all); toast(t("importDone")(n)); pageAdmin();
        } catch (err) { toast(t("importErr"), "err"); }
      };
      rd.readAsText(file);
    }
  });

  document.addEventListener("submit", e => {
    if (e.target.id === "procForm") {
      e.preventDefault();
      const st = formState, data = st.data;
      if (!(data.info.name || "").trim()) { toast(t("errName"), "err"); focusPath("info.name"); return; }
      const valid = data.steps.some(s => (s.step || "").trim() && (s.owner || "").trim());
      if (!valid) { toast(t("errSteps"), "err"); focusPath("steps.0.step"); return; }
      const svg = MapGen.build(data, st.lang);
      const rec = Object.assign(st.rec, { data, mapSvg: svg, lang: st.lang, updatedAt: Date.now(),
        deptName: { ar: st.d.ar, en: st.d.en }, secName: { ar: st.s.ar, en: st.s.en }, posName: { ar: st.p.ar, en: st.p.en } });
      if (!Store.save(rec)) { toast(t("errStorage"), "err"); return; }
      formState = null;
      toast(t("saved"));
      location.hash = `${st.base}/view/${rec.id}`;
    }
    const cf = e.target.closest && e.target.closest(".claim-form");
    if (cf) {
      e.preventDefault();
      const name = cf.querySelector("input").value.trim(); if (!name) return;
      Store.setClaim(cf.dataset.k, { name, at: Date.now() });
      route();
    }
  });
  function focusPath(p) { const el = document.querySelector(`[data-p="${p}"]`); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus({ preventScroll: true }); } }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const act = b.dataset.act;
    if (act === "add-role") { formState.data.roles.push({ role: "", resp: "" }); rerenderForm(true); }
    else if (act === "add-step") { formState.data.steps.push({ step: "", owner: "", inputs: "", outputs: "", system: "", duration: "", next: "", shape: "auto" }); rerenderForm(true); }
    else if (act === "shape") {
      const i = +b.dataset.i, s = formState.data.steps[i];
      s.shape = SHAPES[(SHAPES.indexOf(s.shape || "auto") + 1) % SHAPES.length];
      b.outerHTML = shapeBtn(s.shape, i);
    }
    else if (act === "preview") {
      const svg = MapGen.build(formState.data, formState.lang);
      if (!svg) toast(t("errSteps"), "err");
      showMap(svg);
    }
    else if (act === "del") { if (confirm(t("confirmDel"))) { Store.remove(b.dataset.id); route(); } }
    else if (act === "unclaim") { Store.setClaim(b.dataset.k, null); route(); }
    else if (act === "print") window.print();
    else if (act === "dl-svg" || act === "dl-png") {
      const r = Store.get(b.dataset.id); if (!r || !r.mapSvg) return;
      const name = (r.data.info.code || r.data.info.name || "process-map").replace(/[\\/:*?"<>|\s]+/g, "_");
      if (act === "dl-svg") download(new Blob([r.mapSvg], { type: "image/svg+xml" }), name + ".svg");
      else svgToPng(r.mapSvg, blob => download(blob, name + ".png"));
    }
    else if (act === "export") {
      download(new Blob([JSON.stringify(Store.all(), null, 2)], { type: "application/json" }), `reef-procedures-${new Date().toISOString().slice(0, 10)}.json`);
    }
  });

  function download(blob, filename) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function svgToPng(svg, cb) {
    const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg); const w = +m[1], h = +m[2], k = 2;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = w * k; c.height = h * k;
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height); c.toBlob(cb, "image/png");
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ------------------------------------------------------------------ *
   *  Language
   * ------------------------------------------------------------------ */
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
    document.title = `${t("appTitle")} — REEF`;
  }
  $("#langBtn").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    safeSet("reef-pdg-lang", lang);
    applyLang();
    if (formState) {
      // keep the data being entered; re-render the form in the new language
      const st = formState, y = window.scrollY;
      const other = lang === "ar" ? "en" : "ar";
      if (st.data.info.dept === st.d[other]) st.data.info.dept = nm(st.d);
      if (st.data.info.owner === st.p[other]) st.data.info.owner = nm(st.p);
      st.lang = lang; st.rec.lang = lang;
      crumbs([{ label: nm(st.d), href: `#/d/${st.d.id}` }, { label: nm(st.s), href: `#/d/${st.d.id}/s/${st.s.id}` }, { label: nm(st.p), href: st.base }, { label: st.data.info.name || t("newProc") }]);
      renderFormPage();
      window.scrollTo(0, y);
    } else route();
  });

  window.addEventListener("hashchange", route);
  applyLang();
  route();

  // expose for testing / future backend wiring
  window.REEF_PDG = { Store, MapGen, EXAMPLE };
})();
