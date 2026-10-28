// Legal copy from the client's Hostaway booking site, with its template placeholders
// replaced by the business name, website and contact email.
// Strings are paragraphs; string arrays are bulleted lists.

export type LegalBlock = string | string[];

export interface LegalDocument {
  title: string;
  intro: LegalBlock[];
  sections: { heading: string; blocks: LegalBlock[] }[];
}

export const privacyPolicy: LegalDocument = {
  "title": "Privacy Policy",
  "intro": [
    "At Berkshire Vacation Rental Co., accessible at www.berkshirevacationrental.com, one of our main priorities is the privacy of our visitors.",
    "This Privacy Policy document contains types of information that is collected and recorded by Berkshire Vacation Rental Co. and how we use it.",
    "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at jaryn@berkshirevacationrental.com.",
    "This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected in Berkshire Vacation Rental Co.",
    "This policy is not applicable to any information collected offline or via channels other than this website."
  ],
  "sections": [
    {
      "heading": "Consent",
      "blocks": [
        "By using our website, you hereby consent to our Privacy Policy and agree to its terms."
      ]
    },
    {
      "heading": "Information we collect",
      "blocks": [
        "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide."
      ]
    },
    {
      "heading": "How we use your information",
      "blocks": [
        "We use the information we collect in various ways, including to:",
        [
          "Provide, operate, and maintain our website",
          "Improve, personalize, and expand our website",
          "Understand and analyze how you use our website",
          "Develop new products, services, features, and functionality",
          "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
          "Send you emails",
          "Find and prevent fraud"
        ]
      ]
    },
    {
      "heading": "Log Files",
      "blocks": [
        "Berkshire Vacation Rental Co. follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."
      ]
    },
    {
      "heading": "Cookies and Web Beacons",
      "blocks": [
        "Like any other website, Berkshire Vacation Rental Co. uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."
      ]
    },
    {
      "heading": "CCPA Privacy Policy (Do Not Sell My Personal Information)",
      "blocks": [
        "Under the CCPA, among other rights, California consumers have the right to:",
        [
          "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
          "Request that a business delete any personal data about the consumer that a business has collected.",
          "Request that a business that sells a consumer's personal data, not sell the consumer's personal data."
        ],
        "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
      ]
    },
    {
      "heading": "GDPR Privacy Policy (Data Protection Rights)",
      "blocks": [
        "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
        [
          "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",
          "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
          "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
          "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
          "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
          "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions."
        ],
        "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
      ]
    },
    {
      "heading": "Children's Information",
      "blocks": [
        "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
        "Berkshire Vacation Rental Co. does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records."
      ]
    }
  ]
};

export const termsAndConditions: LegalDocument = {
  "title": "Terms and conditions",
  "intro": [
    "Welcome to Berkshire Vacation Rental Co.!",
    "These terms and conditions outline the rules and regulations for the use of Berkshire Vacation Rental Co.'s Website, located at www.berkshirevacationrental.com.",
    "By accessing this website we assume you accept these terms and conditions. Do not continue to use Berkshire Vacation Rental Co. if you do not agree to take all of the terms and conditions stated on this page.",
    "The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, the law. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
  ],
  "sections": [
    {
      "heading": "License",
      "blocks": [
        "Unless otherwise stated, Berkshire Vacation Rental Co. and/or its licensors own the intellectual property rights for all material on Berkshire Vacation Rental Co.",
        "All intellectual property rights are reserved. You may access this from Berkshire Vacation Rental Co. for your own personal use subjected to restrictions set in these terms and conditions.",
        "You must not:",
        [
          "Republish material from Berkshire Vacation Rental Co.",
          "Sell, rent or sub-license material from Berkshire Vacation Rental Co.",
          "Reproduce, duplicate or copy material from Berkshire Vacation Rental Co.",
          "Redistribute content from Berkshire Vacation Rental Co."
        ],
        "This Agreement shall begin on the date hereof.",
        "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Berkshire Vacation Rental Co. does not filter, edit, publish or review Comments prior to their presence on the website.",
        "Comments do not reflect the views and opinions of Berkshire Vacation Rental Co., its agents and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Berkshire Vacation Rental Co. shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.",
        "Berkshire Vacation Rental Co. reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.",
        "You warrant and represent that:",
        [
          "You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;",
          "The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;",
          "The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy",
          "The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity."
        ],
        "You hereby grant Berkshire Vacation Rental Co. a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media."
      ]
    },
    {
      "heading": "Hyperlinking to our Content",
      "blocks": [
        "The following organizations may link to our Website without prior written approval:",
        [
          "Government agencies;",
          "Search engines;",
          "News organizations;",
          "Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and",
          "System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website."
        ],
        "These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.",
        "We may consider and approve other link requests from the following types of organizations:",
        [
          "commonly-known consumer and/or business information sources;",
          "dot.com community sites;",
          "associations or other groups representing charities;",
          "online directory distributors;",
          "internet portals;",
          "accounting, law and consulting firms; and",
          "educational institutions and trade associations."
        ],
        "We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Berkshire Vacation Rental Co.; and (d) the link is in the context of general resource information.",
        "These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.",
        "If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to jaryn@berkshirevacationrental.com. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.",
        "Approved organizations may hyperlink to our Website as follows:",
        [
          "By use of our corporate name; or",
          "By use of the uniform resource locator being linked to; or",
          "By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site."
        ],
        "No use of Berkshire Vacation Rental Co.'s logo or other artwork will be allowed for linking absent a trademark license agreement."
      ]
    },
    {
      "heading": "iFrames",
      "blocks": [
        "Without prior approval and written permission, you may not create frames around our Web Pages that alter in any way the visual presentation or appearance of our Website."
      ]
    },
    {
      "heading": "Reservation of Rights",
      "blocks": [
        "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions."
      ]
    },
    {
      "heading": "Removal of links from our website",
      "blocks": [
        "If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.",
        "We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date."
      ]
    },
    {
      "heading": "Disclaimer",
      "blocks": [
        "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:",
        [
          "limit or exclude our or your liability for death or personal injury;",
          "limit or exclude our or your liability for fraud or fraudulent misrepresentation;",
          "limit any of our or your liabilities in any way that is not permitted under applicable law; or",
          "exclude any of our or your liabilities that may not be excluded under applicable law."
        ],
        "The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.",
        "As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature."
      ]
    }
  ]
};
