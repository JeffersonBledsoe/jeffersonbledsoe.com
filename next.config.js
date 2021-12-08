const { env } = require("process");

const cspMappings = {
  "default-src": "'self'",
  "style-src": ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
  "font-src": "fonts.gstatic.com",
  "img-src": ["'self'", "data:"],
  "connect-src": ["'self'", "vitals.vercel-insights.com"],
  "script-src":
    env.NODE_ENV === "production" ? "'self'" : ["'self'", "'unsafe-eval'"],
};

const cspHeader = Object.keys(cspMappings)
  .map((key) => {
    let value = cspMappings[key];

    if (Array.isArray(value)) {
      value = value.join(" ");
    }

    return `${key} ${value}`;
  })
  .join("; ");

const permissionsPolicyMappings = {
  accelerometer: null,
  "ambient-light-sensor": null,
  autoplay: null,
  battery: null,
  camera: null,
  "cross-origin-isolated": null,
  "display-capture": null,
  "document-domain": null,
  "encrypted-media": null,
  "execution-while-not-rendered": null,
  "execution-while-out-of-viewport": null,
  fullscreen: null,
  geolocation: null,
  gyroscope: null,
  "keyboard-map": null,
  magnetometer: null,
  microphone: null,
  midi: null,
  "navigation-override": null,
  payment: null,
  "picture-in-picture": null,
  "publickey-credentials-get": null,
  "screen-wake-lock": null,
  "sync-xhr": null,
  usb: null,
  "web-share": null,
  "xr-spatial-tracking": null,
};

const permissionsPolicyHeader = Object.keys(permissionsPolicyMappings)
  .map((key) => {
    let value = permissionsPolicyMappings[key];

    if (value === null) {
      return `${key}=()`;
    }

    if (Array.isArray(value)) {
      value = value.join(" ");
    }

    return `${key}=("${value}")`;
  })
  .join(", ");

//

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspHeader,
  },
  {
    key: "Permissions-Policy",
    value: permissionsPolicyHeader,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Server",
    value: "Apache", // fake server value
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "sameorigin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/",
        headers: securityHeaders,
      },
    ];
  },
};
