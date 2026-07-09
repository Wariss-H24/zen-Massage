import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Surface */
        background:                  '#faf9f7',
        surface:                     '#faf9f7',
        'surface-bright':            '#faf9f7',
        'surface-dim':               '#dadad8',
        'surface-variant':           '#e3e2e0',
        'surface-container-lowest':  '#ffffff',
        'surface-container-low':     '#f4f3f1',
        'surface-container':         '#efeeec',
        'surface-container-high':    '#e9e8e6',
        'surface-container-highest': '#e3e2e0',

        /* On-surface */
        'on-background':             '#1a1c1b',
        'on-surface':                '#1a1c1b',
        'on-surface-variant':        '#434843',
        'inverse-surface':           '#2f3130',
        'inverse-on-surface':        '#f1f1ef',

        /* Primary */
        primary:                     '#425646',
        'on-primary':                '#ffffff',
        'primary-container':         '#5a6e5d',
        'on-primary-container':      '#d9f0da',
        'primary-fixed':             '#d2e8d3',
        'primary-fixed-dim':         '#b6ccb8',
        'on-primary-fixed':          '#0d1f12',
        'on-primary-fixed-variant':  '#384b3c',
        'inverse-primary':           '#b6ccb8',
        'surface-tint':              '#4f6353',

        /* Secondary */
        secondary:                   '#6b5c4c',
        'on-secondary':              '#ffffff',
        'secondary-container':       '#f4dfcb',
        'on-secondary-container':    '#716252',
        'secondary-fixed':           '#f4dfcb',
        'secondary-fixed-dim':       '#d7c3b0',
        'on-secondary-fixed':        '#241a0e',
        'on-secondary-fixed-variant':'#524436',

        /* Tertiary */
        tertiary:                    '#4e5154',
        'on-tertiary':               '#ffffff',
        'tertiary-container':        '#66696c',
        'on-tertiary-container':     '#e8e9ed',
        'tertiary-fixed':            '#e1e2e6',
        'tertiary-fixed-dim':        '#c5c6ca',
        'on-tertiary-fixed':         '#191c1f',
        'on-tertiary-fixed-variant': '#44474a',

        /* Error */
        error:                       '#ba1a1a',
        'on-error':                  '#ffffff',
        'error-container':           '#ffdad6',
        'on-error-container':        '#93000a',

        /* Outline */
        outline:                     '#737872',
        'outline-variant':           '#c3c8c1',

        /* Brand */
        'sage-deep':                 '#4A594D',
        'sand-light':                '#F2EBE3',
        'charcoal-muted':            '#2C2E30',

        /* Status */
        'status-pending':            '#E6D5A7',
        'status-confirmed':          '#7A9E7E',
        'status-completed':          '#A0A0A0',
        'status-cancelled':          '#D18D8D',
      },

      borderRadius: {
        DEFAULT: '0.25rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        full:    '9999px',
      },

      spacing: {
        'base':             '4px',
        'stack-sm':         '8px',
        'stack-md':         '16px',
        'gutter':           '24px',
        'stack-lg':         '32px',
        'section-gap':      '80px',
        'margin-mobile':    '16px',
        'margin-desktop':   '64px',
        'container-max':    '1280px',
      },

      maxWidth: {
        'container-max': '1280px',
      },

      fontFamily: {
        'body-md':     ['"Hanken Grotesk"', 'sans-serif'],
        'body-lg':     ['"Hanken Grotesk"', 'sans-serif'],
        'label-md':    ['"Hanken Grotesk"', 'sans-serif'],
        'caption':     ['"Hanken Grotesk"', 'sans-serif'],
        'headline-sm': ['"Libre Caslon Text"', 'serif'],
        'headline-md': ['"Libre Caslon Text"', 'serif'],
        'display-lg':  ['"Libre Caslon Text"', 'serif'],
        sans:          ['"Hanken Grotesk"', 'sans-serif'],
        serif:         ['"Libre Caslon Text"', 'serif'],
      },

      fontSize: {
        'caption':     ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'body-md':     ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg':     ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'label-md':    ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'headline-md': ['32px', { lineHeight: '40px', fontWeight: '400' }],
        'display-lg':  ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-lg-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}

export default config
