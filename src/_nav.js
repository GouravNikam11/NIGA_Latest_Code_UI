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
      name: 'Author',
      url: '/ListAuthorComponent',         // Author section
      icon: 'icon-pencil',
    },

    {
      name: 'Questions',
      url: '/ListQuestionSection',         // Question section
      icon: 'icon-pencil',
    },
    {
      name: 'Questions Group',
      url: '/ListQuestionGroup',          // Question Group
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
      name: 'DiagnosisSystem',
      url: '/ListDiagnosisSystem',         // Diagnosis System
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

    {
      name: 'Pathology',
      url: '/ListPathologyComponent',               // Package 
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
    //  {
    //    name: 'Add User',
    //    url: '/AddUser',               // Add User
    //    icon: 'icon-pencil',
    //  },
    {
      name: 'Patient Entry',
      url: '/PatientEntry',               // My Cases
      icon: 'icon-pencil',
    },
    {
      name: 'Add Rubrics',
      url: '/AddRubrics',               // My Cases
      icon: 'icon-pencil',
    },
    {
      name: 'Remedial Rubrics',
      url: '/AddRemedialRubrics',               // My Cases
      icon: 'icon-pencil',
    },
    {
      name: 'Patient List',
      url: '/PatientList',               // add new case.
      icon: 'icon-pencil',
    },

    {
      name: 'Find Rubrics',
      url: '/FindRubrics',               // add new case.
      icon: 'icon-pencil',
    },
    {
      name: 'Menu Master',
      url: '/ListMenuMaster',               // add new Menu.
      icon: 'icon-pencil',
    },
    {
      name: 'Role Master',
      url: '/ListRoleMaster',               // add new Role.
      icon: 'icon-pencil',
    },
    {
      name: 'Role Details',
      url: '/ListRoleDetails',               // add new Role Details.
      icon: 'icon-pencil',
    },
    {
      name: 'Doctor Dashboard',
      url: '/DoctorDashboard',               // Doctor Dashboard.
      icon: 'icon-pencil',
    },
    {
      name: 'Patient Appoitment',
      url: '/AddPatientAppointment',          // Patient  Appoitment.
      icon: 'icon-pencil',
    },
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
    //   name: 'Patient Dashboard',
    //   url: '/PatientDashboard',          // Patient Dashboard
    //   icon: 'icon-pencil',
    // },




  ],
};
