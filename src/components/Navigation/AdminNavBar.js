export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },

    {
      title: true,
      name: 'Masters',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"

    },


    {
      name: 'Drug System',
      url: '/ListDrugSystem',         // Drug System
      icon: 'icon-pencil',
    },


    {
      name: 'Drug Group Master',
      url: '/ListDrugGroupMaster',         // Drug Group Master
      icon: 'icon-pencil',
    },

    {
      name: 'Allopathic Drug Master',
      url: '/ListAllopathicDrugMaster',         // Allopathic Drug Master
      icon: 'icon-pencil',
    },
    {
      name: 'Language',
      url: '/LanguageList',         // Language section
      icon: 'icon-pencil',
    },
    {
      name: 'Existance',
      url: '/ListQuestionSection',         // Question section
      icon: 'icon-pencil',
    },

    {
      name: 'Questions Group',
      url: '/ListQuestionGroup',          // Question Group
      icon: 'icon-pencil',
    },
    {
      name: ' Sub Questions Group',
      url: '/ListSubQuestionGroup',          // Sub Question Group
      icon: 'icon-pencil',
    },

  
    {
      name: 'Author',
      url: '/ListAuthorComponent',         // Author section
      icon: 'icon-pencil',
    },

  {
    name: 'Materia Medica Remedies',
    url: '/materiamedicaremedies',         // materia medica remedies
    icon: 'icon-pencil',
  },

    {
      name: 'Materia Medica',
      url: '/ListMateriaMedicaComponent',         // MateriaMedica section
      icon: 'icon-pencil',
    },

    {
      name: 'Head',
      url: '/ListMateriaMedicaHeadComponent',         // Head section
      icon: 'icon-pencil',
    },

    {
      name: 'Part Location',
      url: '/ListPartLocation',           // Part location
      icon: 'icon-pencil',
    },
    {
      name: 'Body Part',
      url: '/ListBodyPart',               // Body Part
      icon: 'icon-pencil',
    },
    {
      name: 'Intensity',
      url: '/ListIntensity',              // Intensity
      icon: 'icon-pencil',
    },
    {
      name: 'Clinical Questions',
      url: '/ListClinicalQuestions',       // Clinical Questions
      icon: 'icon-pencil',
    },
    {
      name: 'Diagnosis Group',
      url: '/ListDiagnosisGroup',          // Diagnosis Group
      icon: 'icon-pencil',
    },
    {
      name: 'Section',
      url: '/ListSection',          // Section
      icon: 'icon-pencil',
    },
    {
      name: 'Sub-Section',
      url: '/ListSubSection',         // Sub-Section
      icon: 'icon-pencil',
    },

    {
      name: 'Diagnosis System',
      url: '/ListDignosisSystem',         // Diagnosis System
      icon: 'icon-pencil',
    },
  
    {
      name: 'Diagnosis Therapeutics Details',
      url: '/ListDiagnosisTherapeuticsDetail',            // DiagnosisTherapeuticsDetail 
      icon: 'icon-pencil',
    },

    {
      name: 'Diagnosis',
      url: '/ListDiagnosis',            // Diagnosis 
      icon: 'icon-pencil',
    },
    {
      name: 'Package',
      url: '/ListPackage',               // Package 
      icon: 'icon-pencil',
    },

    // {
    //   name: 'Pathology',
    //   url: '/ListPathologyComponent',               // Package 
    //   icon: 'icon-pencil',
    // },

    {
      name: 'Labs & Imaging',
      url: '/ListLabsAndImaging',               // Labs & Imaging
      icon: 'icon-pencil',
    },

    {
      name: 'Qualification',
      url: '/ListQualification',               // Qualification 
      icon: 'icon-pencil',
    },
    {
      name: 'Remedy',
      url: '/ListRemedy',               // Remedy 
      icon: 'icon-pencil',
    },
    {
      name: 'Remedy Grade',
      url: '/ListRemedyGrade',               // Remedy Grade
      icon: 'icon-pencil',
    },
    {
      name: 'Add Rubrics',
      url: '/RubricList',               // My Cases
      icon: 'icon-pencil',
    },
    {
      name: 'Remedial Rubrics',
      url: '/AddRemedialRubrics',               // My Cases
      icon: 'icon-pencil',
    },
    {
      name: 'Find Rubrics',
      url: '/FindRubrics',               // add new case.
      icon: 'icon-pencil',
    },
    // {
    //   name: 'Menu Master',
    //   url: '/ListMenuMaster',               // add new Menu.
    //   icon: 'icon-pencil',
    // },
    // {
    //   name: 'Role Master',
    //   url: '/ListRoleMaster',               // add new Role.
    //   icon: 'icon-pencil',
    // },
    // {

    //   name: 'User Master',

    //   url: '/ListUserComponent',               // add new User.

    //   icon: 'icon-pencil',

    // },
    // {
    //   name: 'Role Details',
    //   url: '/ListRoleDetails',               // add new Role Details.
    //   icon: 'icon-pencil',
    // },
    // {
    //   name: 'Deep Analytics',
    //   url: '/GetAstrologyComponent',          // Astrology.
    //   icon: 'icon-pencil',
    // },
    // {
    //   name: 'Deep Analytics Demo',
    //   url: '/AstrologyComponent',          // Astrology.
    //   icon: 'icon-pencil',
    // },

    // {
    //   name: 'Niga Repertory',
    //   url: '/ListNigaRepertoryComponent',          // NigaRepertoryComponent  
    //   icon: 'icon-pencil',
    // },


    {
      name: 'Monogram',
      url: '/ListMonoGram',          //  ListMonoGram
      icon: 'icon-pencil',
    },


    {
      name: 'News',
      url: '/ListNewsComponent',              //  News 
      icon: 'icon-pencil',
    },


    {
      name: 'Blogs',
      url: '/ListBlogsComponent',        //   Blogs
      icon: 'icon-pencil',
    },

    // {
    //   name: 'Subscription',
    //   url: '/Subscription',          //   Blogs
    //   icon: 'icon-pencil',
    // },

  ],
};
