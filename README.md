# Mohamed Yasir | Portfolio

A responsive personal portfolio built with HTML, CSS, and vanilla JavaScript. No build step or package installation is required.

## Run locally

Open this folder in VS Code and launch `index.html` with the Live Server extension, or serve the folder with any local static web server. A local server is recommended because the résumé availability check uses `fetch()`.

## Customize

1. Edit the `portfolioConfig` object in `script.js` to update skills, project descriptions, technology tags, and education dates or qualifications.
2. Remove any skill you do not personally use. Project cards are labeled as concepts until you replace them with real work.
3. Add real repository and live-demo URLs to each project's `github` and `demo` values. Links without URLs stay inactive.
4. Add your profile URLs to `social.github` and `social.linkedin`. Social links stay inactive until set.
5. Add your actual PDF résumé at `assets/resume.pdf`. The download control activates when the file is present and served by a local or deployed web server.
6. Connect the contact form to a submission provider such as Formspree: create a form, then set `contactEndpoint` to its endpoint URL in `script.js`. Without an endpoint, the form validates in the browser and clearly reports that no message was sent.
7. Replace the page description and social preview metadata in the `<head>` of `index.html` when you publish, if needed.

## Project structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   └── README.md
    └── resume.pdf                 # Add your real PDF here
```

The `assets/images/` directory is ready for personal or project images. No personal contact details, achievements, or project URLs have been invented.
