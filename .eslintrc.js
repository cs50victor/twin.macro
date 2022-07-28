module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  settings: { version: 'detect' },
  plugins: ['chai-friendly', 'jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'xo/browser',
    'xo-typescript/space',
    'xo-react/space',
    'plugin:chai-friendly/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-warning-comments': ['error', { terms: ['todo'], location: 'start' }],
    'no-undef': 2,
    'capitalized-comments': 0,
    'no-constant-binary-expression': 0,
    'import/no-unresolved': 'error',
    'import/no-relative-parent-imports': 'error',
    'unicorn/filename-case': ['error', { case: 'camelCase' }],
    'unicorn/prefer-optional-catch-binding': 0, // Doubleup
    'unicorn/consistent-destructuring': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/import-style': 0,
    'unicorn/prefer-array-flat': 0,
    'unicorn/prevent-abbreviations': [
      'error',
      { allowList: { params: true, formatProp: true } },
    ],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/space-before-function-paren': 0,
        '@typescript-eslint/prefer-readonly-parameter-types': 0,
        '@typescript-eslint/parameter-properties': 0,
        '@typescript-eslint/consistent-generic-constructors': 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-duplicate-enum-values': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-implicit-any-catch': 0,
      },
    },
    {
      files: ['src/macro/**/*.js'],
      rules: {
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: {
              args: true,
              props: true,
              params: true,
              opts: true,
              isDev: true,
              dataProp: true,
              firstArg: true,
              propName: true,
              styledArgs: true,
              formatProp: true,
              styledProps: true,
              moveTwPropToStyled: true,
              moveDotElementToParam: true,
              addDataPropToExistingPath: true,
              dataTwPropAllEnvironments: true,
              dataCsPropAllEnvironments: true,
              addDataTwPropToPath: true,
            },
          },
        ],
      },
    },
    {
      files: ['types/tests/**/*.ts', 'types/tests/**/*.tsx'],
      rules: {
        'import/no-unassigned-import': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-unsafe-call': 0,
      },
    },
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'macro.js',
    'types',
    '__fixtures__',
    'tailwind.config.js',
    'sandbox',
    'types/macro.d.ts',
  ],
  globals: { JSX: true, AriaAttributes: true, process: true },
}
