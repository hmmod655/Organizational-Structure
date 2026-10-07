/* =========================================================================
   REEF — Procedure Documentation Guide
   Organisation data (departments → sections → positions)

   How to add a department: append a new object to REEF_ORG.departments.
   - headcount > 1 means several employees hold the same position / job
     description; only ONE of them fills the procedure forms for it.
   ========================================================================= */

window.REEF_ORG = {
  departments: [
    {
      id: "marketing",
      code: "MKT",
      ar: "التسويق",
      en: "Marketing",
      sections: [
        {
          id: "overview", code: "OV",
          ar: "نظرة عامة — قيادة التسويق", en: "Overview — Marketing Leadership",
          positions: [
            { id: "cmo", grade: "G-22", level: "N-1", ar: "الرئيس التنفيذي للتسويق", en: "Chief Marketing Officer" },
            { id: "gm-marketing", grade: "G-20", level: "N-2", ar: "مدير عام التسويق", en: "General Manager - Marketing" },
            { id: "sh-office-cmo", grade: "G-15", level: "N-2", ar: "رئيس قسم مكتب الرئيس التنفيذي للتسويق", en: "Section Head - Office of the CMO" }
          ]
        },
        {
          id: "brand-reef", code: "BRF",
          ar: "المدير التنفيذي الأول للعلامة التجارية - ريف", en: "Senior Director - Brand - REEF",
          positions: [
            { id: "sd-brand-reef", grade: "G-19", level: "N-3", ar: "المدير التنفيذي الأول للعلامة التجارية - ريف", en: "Senior Director - Brand - REEF" },
            { id: "mgr-partnerships", grade: "G-16", level: "N-4", ar: "مدير الشراكات", en: "Manager - Partnerships" },
            { id: "sup-mkt-projects-reef", grade: "G-14", level: "N-4", ar: "مشرف المشاريع التسويقية - ريف", en: "Supervisor - Marketing Projects - REEF" },
            { id: "cc-partnerships", grade: "G-12", level: "N-5", ar: "صانع محتوى الشراكات", en: "Content Creator - Partnerships" },
            { id: "sp-partnership-activation", grade: "G-12", level: "N-5", ar: "أخصائي تفعيل الشراكات", en: "Specialist - Partnership Activation" }
          ]
        },
        {
          id: "brand-ksa-osma", code: "BKO",
          ar: "مدير العلامة التجارية - السعودية - أوسما", en: "Manager - Brand KSA - OSMA",
          positions: [
            { id: "mgr-brand-ksa-osma", grade: "G-18", level: "N-3", ar: "مدير العلامة التجارية - السعودية - أوسما", en: "Manager - Brand KSA - OSMA" },
            { id: "sup-mkt-campaigns", grade: "G-14", level: "N-4", ar: "مشرف الحملات التسويقية", en: "Supervisor - Marketing Campaigns" }
          ]
        },
        {
          id: "brand-aix", code: "BAX",
          ar: "مدير العلامة التجارية - إكس", en: "Director - Brand - AIX",
          positions: [
            { id: "dir-brand-aix", grade: "G-18", level: "N-3", ar: "مدير العلامة التجارية - إكس", en: "Director - Brand - AIX" },
            { id: "sp-digital-aix", grade: "G-12", level: "N-4", ar: "أخصائي تسويق رقمي - إكس", en: "Specialist - Digital Marketing - AIX" },
            { id: "sp-graphic-aix", grade: "G-12", level: "N-4", ar: "أخصائي جرافيك ديزاين - إكس", en: "Specialist - Graphic Design - AIX" },
            { id: "sp-influencers-aix", grade: "G-12", level: "N-4", ar: "أخصائي مشاهير - إكس", en: "Specialist - Influencers - AIX" }
          ]
        },
        {
          id: "brand-buyar", code: "BBY",
          ar: "مدير العلامة التجارية - بويار", en: "Director - Brand - BUYAR",
          positions: [
            { id: "dir-brand-buyar", grade: "G-18", level: "N-3", ar: "مدير العلامة التجارية - بويار", en: "Director - Brand - BUYAR" },
            { id: "sp-digital-buyar", grade: "G-12", level: "N-4", ar: "أخصائي تسويق رقمي - بويار", en: "Specialist - Digital Marketing - BUYAR" },
            { id: "sp-graphic-buyar", grade: "G-12", level: "N-4", ar: "أخصائي جرافيك ديزاين - بويار", en: "Specialist - Graphic Design - BUYAR" },
            { id: "sp-influencers-buyar", grade: "G-12", level: "N-4", ar: "أخصائي مشاهير - بويار", en: "Specialist - Influencers - BUYAR" },
            { id: "sp-marketing-buyar", grade: "G-12", level: "N-4", ar: "أخصائي تسويق - بويار", en: "Specialist - Marketing - BUYAR" }
          ]
        },
        {
          id: "brand-intl-osma", code: "BIO",
          ar: "مدير العلامة التجارية الدولية - أوسما", en: "Director - Brand International - OSMA",
          positions: [
            { id: "dir-brand-intl-osma", grade: "G-18", level: "N-3", ar: "مدير العلامة التجارية الدولية - أوسما", en: "Director - Brand International - OSMA" },
            { id: "sup-intl-campaigns", grade: "G-14", level: "N-4", ar: "مشرف الحملات الدولية", en: "Supervisor - International Campaigns" }
          ]
        },
        {
          id: "mkt-intl-reef", code: "MIR",
          ar: "المدير التنفيذي للتسويق - الدولي وريف", en: "Director - Marketing - International, REEF",
          positions: [
            { id: "dir-mkt-intl-reef", grade: "G-18", level: "N-3", ar: "المدير التنفيذي للتسويق - الدولي وريف", en: "Director - Marketing - International, REEF" },
            { id: "sp-intl-marketing", grade: "G-12", level: "N-4", ar: "أخصائي تسويق دولي", en: "Specialist - International Marketing" }
          ]
        },
        {
          id: "creative", code: "CRV",
          ar: "الإبداع — القيادة", en: "Creative — Leadership",
          positions: [
            { id: "smgr-creative", grade: "G-17", level: "N-3", ar: "مدير أول الإبداع", en: "Senior Manager - Creative" },
            { id: "mgr-creative", grade: "G-16", level: "N-4", ar: "مدير الإبداع", en: "Manager - Creative" }
          ]
        },
        {
          id: "ai-content", code: "AIC",
          ar: "رئيس قسم محتوى الذكاء الاصطناعي", en: "Section Head - AI Content",
          positions: [
            { id: "sh-ai-content", grade: "G-15", level: "N-5", ar: "رئيس قسم محتوى الذكاء الاصطناعي", en: "Section Head - AI Content" },
            { id: "sp-ai-content", grade: "G-12", level: "N-6", headcount: 2, ar: "أخصائي محتوى الذكاء الاصطناعي", en: "Specialist - AI Content" }
          ]
        },
        {
          id: "social-media", code: "SOC",
          ar: "رئيس قسم التواصل الاجتماعي", en: "Section Head - Social Media",
          positions: [
            { id: "sh-social", grade: "G-15", level: "N-5", ar: "رئيس قسم التواصل الاجتماعي", en: "Section Head - Social Media" },
            { id: "content-creator", grade: "G-12", level: "N-6", ar: "صانع محتوى", en: "Content Creator" },
            { id: "sp-social-aix-buyar", grade: "G-12", level: "N-6", headcount: 2, ar: "أخصائي التواصل الاجتماعي - إكس وبويار", en: "Specialist - Social Media - AIX, BUYAR" },
            { id: "sp-social-reef-osma", grade: "G-12", level: "N-6", headcount: 2, ar: "أخصائي التواصل الاجتماعي - ريف وأوسما", en: "Specialist - Social Media - REEF, OSMA" }
          ]
        },
        {
          id: "visual-creative", code: "VCR",
          ar: "رئيس قسم إبداع مرئي", en: "Section Head - Visual Creative",
          positions: [
            { id: "sh-visual", grade: "G-15", level: "N-5", ar: "رئيس قسم إبداع مرئي", en: "Section Head - Visual Creative" },
            { id: "off-visual", grade: "G-14", level: "N-6", ar: "مسؤول إبداع مرئي", en: "Officer - Visual Creative" },
            { id: "designer-ads", grade: "G-12", level: "N-6", ar: "مصمم إعلانات", en: "Designer - Advertisements" },
            { id: "off-ad-design", grade: "G-12", level: "N-6", ar: "مسؤول تصميم إعلاني", en: "Officer - Advertising Design" }
          ]
        },
        {
          id: "ad-direction", code: "ADR",
          ar: "مشرف بناء توجه إعلاني", en: "Supervisor - Advertising Direction",
          positions: [
            { id: "sup-ad-direction", grade: "G-14", level: "N-5", ar: "مشرف بناء توجه إعلاني", en: "Supervisor - Advertising Direction" },
            { id: "content-writer", grade: "G-13", level: "N-6", ar: "كاتب محتوى", en: "Content Writer" },
            { id: "content-writer-campaigns", grade: "G-13", level: "N-6", ar: "كاتب محتوى حملات إبداعية", en: "Content Writer - Creative Campaigns" }
          ]
        },
        {
          id: "digital-marketing", code: "DGM",
          ar: "مدير أول التسويق الرقمي", en: "Senior Manager - Digital Marketing",
          positions: [
            { id: "smgr-digital", grade: "G-17", level: "N-3", ar: "مدير أول التسويق الرقمي", en: "Senior Manager - Digital Marketing" },
            { id: "sh-customer-relations", grade: "G-15", level: "N-4", ar: "رئيس قسم علاقات عملاء", en: "Section Head - Customer Relations" },
            { id: "sh-paid-campaigns", grade: "G-15", level: "N-4", ar: "رئيس قسم الحملات المدفوعة", en: "Section Head - Paid Campaigns" },
            { id: "sp-crm-marketing", grade: "G-12", level: "N-4", headcount: 2, ar: "أخصائي تسويق علاقات العملاء", en: "Specialist - Customer Relations Marketing" },
            { id: "sp-digital-reef", grade: "G-12", level: "N-4", headcount: 2, ar: "أخصائي تسويق رقمي - ريف", en: "Specialist - Digital Marketing - REEF" },
            { id: "sp-digital-osma", grade: "G-12", level: "N-4", headcount: 2, ar: "أخصائي تسويق رقمي - أوسما", en: "Specialist - Digital Marketing - OSMA" },
            { id: "sp-seo", grade: "G-12", level: "N-4", ar: "أخصائي تحسين محركات البحث", en: "Specialist - SEO" },
            { id: "sp-affiliate-osma-buyar", grade: "G-12", level: "N-4", ar: "أخصائي تسويق بالعمولة - أوسما وبويار", en: "Specialist - Affiliate Marketing - OSMA, BUYAR" },
            { id: "sp-affiliate-reef", grade: "G-12", level: "N-4", ar: "أخصائي تسويق بالعمولة - ريف", en: "Specialist - Affiliate Marketing - REEF" },
            { id: "sp-celebrity", grade: "G-12", level: "N-4", headcount: 2, ar: "أخصائي تسويق مشاهير", en: "Specialist - Celebrity Marketing" }
          ]
        },
        {
          id: "crm", code: "CRM",
          ar: "مدير علاقات العملاء", en: "Manager - Customer Relations (CRM)",
          positions: [
            { id: "mgr-crm", grade: "G-16", level: "N-3", ar: "مدير علاقات العملاء", en: "Manager - Customer Relations (CRM)" },
            { id: "sup-loyalty", grade: "G-14", level: "N-4", ar: "مشرف الولاء", en: "Supervisor - Loyalty" },
            { id: "ssp-customer-relations", grade: "G-13", level: "N-4", ar: "أخصائي أول علاقات عملاء", en: "Senior Specialist - Customer Relations" },
            { id: "sp-loyalty", grade: "G-12", level: "N-4", ar: "أخصائي برنامج الولاء", en: "Specialist - Loyalty Program" },
            { id: "analyst-customer-data", grade: "G-12", level: "N-4", ar: "محلل بيانات العملاء", en: "Analyst - Customer Data" }
          ]
        },
        {
          id: "influencers", code: "INF",
          ar: "مدير إدارة المشاهير", en: "Manager - Influencers Department",
          positions: [
            { id: "mgr-influencers", grade: "G-16", level: "N-3", ar: "مدير إدارة المشاهير", en: "Manager - Influencers Department" },
            { id: "sh-influencer-intl", grade: "G-15", level: "N-4", ar: "رئيس قسم إعلانات المشاهير - دولي", en: "Section Head - Influencer Ads - International" },
            { id: "sup-influencer-ksa", grade: "G-14", level: "N-4", ar: "مشرف إعلانات مشاهير - السعودية", en: "Supervisor - Influencer Ads - KSA" },
            { id: "sup-pr", grade: "G-14", level: "N-4", ar: "مشرف العلاقات العامة", en: "Supervisor - Public Relations" },
            { id: "sp-influencer-intl", grade: "G-12", level: "N-5", ar: "أخصائي إعلانات مشاهير - دولي", en: "Specialist - Influencer Ads - International" },
            { id: "sp-influencer-ads", grade: "G-12", level: "N-5", headcount: 3, ar: "أخصائي إعلانات مشاهير", en: "Specialist - Influencer Ads" }
          ]
        },
        {
          id: "mkt-projects-group", code: "MPG",
          ar: "مشرف المشاريع التسويقية - المجموعة", en: "Supervisor - Marketing Projects - Group",
          positions: [
            { id: "sup-mkt-projects-group", grade: "G-14", level: "N-3", ar: "مشرف المشاريع التسويقية - المجموعة", en: "Supervisor - Marketing Projects - Group" },
            { id: "sp-field-marketing", grade: "G-12", level: "N-5", ar: "أخصائي تسويق ميداني", en: "Specialist - Field Marketing" },
            { id: "sp-marketing-reef", grade: "G-12", level: "N-5", ar: "أخصائي تسويق - ريف", en: "Specialist - Marketing - REEF" }
          ]
        }
      ]
    }
  ]
};
