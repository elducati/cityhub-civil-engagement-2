{
  "linters": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  },
  "timeout": 60000,
  "concurrent": false
}
