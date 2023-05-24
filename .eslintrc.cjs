const prettier = {
  'prettier/prettier': [
    'error',
    {
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 80,
      arrowParens: 'avoid',
      semi: false,
      endOfLine: 'auto',
      usePrettierrc: true,
    },
  ],
};

const configure = ({
  env,
  extends_,
  rules,
  project,
  plugins,
}) => ({
  plugins: [
    '@typescript-eslint',
    'sort-destructure-keys',
    ...(plugins ?? []),
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    ...extends_,
    'prettier',
  ],
  env: {
    'es2021': true,
    [env]: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    project,
  },
  rules: {
    // 1. turn OFF rules that are ON in default recommended sets
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'unicorn/no-array-callback-reference': 'off',
    // 2. turn ON rules that are OFF in default recommended sets
    '@typescript-eslint/naming-convention': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    // 3. Customize rules that are ON in default recommended sets
    'unicorn/prevent-abbreviations': [
      'error',
      {
        'allowList': {
          'Def': true,
          'Dir': true,
          'Props': true,
          'props': true,
          'res': true,
        },
      },
    ],
    // 4. Overrides
    ...(rules ?? {}),
    // 5. Formatter
    ...prettier,
  },
})

/** https://github.com/motemen/minimatch-cheat-sheet */
module.exports = {
  root: true,
  settings: { react: { version: 'detect' } },
  overrides: [
    {
      // server lint rules
      files: ['backend/**/*.ts'],
      ...configure({
        env: 'node',
        extends_: ['plugin:node/recommended'],
        project: 'tsconfig.node.json',
        rules: {
          'node/no-missing-import': 'off',
          'node/no-extraneous-import': 'off',
        },
      }),
    },
    {
      // client lint rules
      files: ['frontend/**/*.ts{,x}', 'vite.config.ts'],
      ...configure({
        env: 'browser',
        extends_: [
          'plugin:react/recommended',
          'plugin:react-hooks/recommended'
        ],
        project: 'tsconfig.json',
        plugins: ['react-refresh'],
        rules: {
          'react/react-in-jsx-scope': 'off',
          'react-refresh/only-export-components': 'error',
          '@typescript-eslint/naming-convention': 'off',
        }
      }),
    }
  ],
}
