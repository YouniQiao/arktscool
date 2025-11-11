// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ArkTS",
  tagline: "HarmonyOS programming language",
  url: "https://arkts.cool",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "images/favicon.ico",
  organizationName: "youniqiao",
  projectName: "arktscool",
  deploymentBranch: "master",
  trailingSlash: false,
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  plugins: [],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/YouniQiao/arktscool/tree/master/",
          sidebarCollapsed: false,
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css"), require.resolve("./src/css/helpers.css")],
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // algolia: {
      //   appId: "W7AFDUEIGE",
      //   apiKey: "95785b7a78017aade2bc8b82ca965e24",
      //   indexName: "lerna",
      //   contextualSearch: false,
      //   searchPagePath: false,
      // },
      // announcementBar: {
      //   id: "lerna-talks",
      //   content:
      //     'State of JS survey: <a target="_blank" style="font-weight: bolder" rel="noopener noreferrer" href="https://stateofjs.com/en-us/">Give Nx & Lerna a thumbs up</a> <span aria-hidden="true">&rarr;</span>',
      //   backgroundColor: "#9333EA",
      //   textColor: "#FFFFFF",
      //   isCloseable: false,
      // },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      metadata: [
        { name: "keywords", content: "arkts, javascript, typescript, harmonyos, deveco studio" },
        {
          name: "description",
          content:
            "HarmonyOS programming language.",
        },
        { name: "og:image", content: "https://lerna.js.org/images/og-image-lerna.png" },
      ],
      navbar: {
        title: "ArkTS",
        logo: {
          alt: "Lerna Logo",
          src: "images/lerna-logo-dark.svg",
          srcDark: "images/lerna-logo-light.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "指南",
          },
          
          //{
          //  href: "https://github.com/lerna/lerna",
          //  className: "header-github-link",
          //  "aria-label": "GitHub repository",
          //  position: "right",
          //  title: "Lerna on Github",
          //},
        ],
        hideOnScroll: true,
      },
      footer: {
        // links: [
        //   {
        //     title: "Resources",
        //     items: [
        //       {
        //         label: "Blog",
        //         href: "https://nx.dev/blog?utm_source=lerna.js.org",
        //       },
        //       {
        //         label: "Youtube Channel",
        //         href: "https://youtube.com/@nxdevtools?utm_source=lerna.js.org",
        //       },
        //       {
        //         label: "About Us",
        //         href: "https://nx.app/company?utm_source=lerna.js.org",
        //       },
        //     ],
        //   },
        //   {
        //     title: "Help",
        //     items: [
        //       {
        //         label: "Troubleshooting",
        //         to: "/docs/troubleshooting",
        //       },
        //       {
        //         label: "Stack Overflow",
        //         href: "https://stackoverflow.com/questions/tagged/lerna",
        //       },
        //       {
        //         label: "Report Issues",
        //         href: "https://github.com/lerna/lerna/issues?q=is%3Aopen+is%3Aissue",
        //       },
        //     ],
        //   },
        //   {
        //     title: "Community",
        //     items: [
        //       {
        //         label: "Twitter",
        //         href: "https://twitter.com/lernajs",
        //       },
        //       {
        //         label: "GitHub",
        //         href: "https://github.com/lerna/lerna",
        //       },
        //       {
        //         label: "Newsletter",
        //         href: "https://go.nx.dev/nx-newsletter?utm_source=lerna.js.org",
        //       },
        //       {
        //         label: "Community Discord",
        //         href: "https://go.nx.dev/community?utm_source=lerna.js.org",
        //       },
        //       {
        //         label: "Help Us",
        //         href: "https://github.com/lerna/lerna/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Acommunity",
        //       },
        //     ],
        //   },
        //   {
        //     title: "Solutions",
        //     items: [
        //       {
        //         label: "Nx",
        //         href: "https://nx.dev/?utm_source=lerna.js.org",
        //       },
        //       {
        //         label: "NxCloud",
        //         href: "https://nx.app/?utm_source=lerna.js.org",
        //       },
        //     ],
        //   },
        // ],
        copyright: `&copy; ${new Date().getFullYear()} Theme from Lerna.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
