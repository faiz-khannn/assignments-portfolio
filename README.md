# Assignments Portfolio

A professional, modern, and engaging frontend portfolio website to showcase internship assignments.

## Features

- **100% Frontend**: No server required - runs entirely in the browser
- **Dynamic Content Management**: Managed through a simple JSON configuration file
- **PDF Document Preview**: View PDF assignment files directly in the browser
- **Code Preview & Execution**: View and run JavaScript files with syntax highlighting
- **HTML Preview**: View HTML assignments in a dedicated tab or open in a new window
- **Tabbed Interface**: Switch between assignment document and solution with a tabbed interface
- **Responsive Design**: Works well on all device sizes
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Modern UI Effects**: Animations, hover effects, and smooth transitions

## File Structure

```
assignments-portfolio/
├── index.html                 # Main portfolio page
├── assignment-details.html    # Assignment details page with tabbed interface
├── style.css                  # CSS styling for both pages
├── script.js                  # JavaScript for index page
├── details.js                 # JavaScript for details page
├── assignments.json           # Configuration file for assignment metadata
├── docs/                      # Assignment documents (.pdf files)
│   ├── Assignment-1.pdf
│   └── Assignment-5.pdf
└── assignments/               # Assignment solutions
    ├── Assignment-1.html
    └── Assignment-5.js
```

## Technologies Used

- HTML5, CSS3, JavaScript
- Prism.js (for code syntax highlighting)
- Google Fonts (Poppins)
- AOS library (for scroll animations)

## How to Run

Since this is a purely frontend project, you can simply:

1. Open `index.html` in your browser to view locally
2. Upload all files to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

No server setup, dependencies, or build process required!

## Adding New Assignments

To add new assignments:

1. Add your assignment document (PDF file) to the `docs/` folder
2. Add your solution file (HTML or JS) to the `assignments/` folder
3. Update the `assignments.json` file with the new assignment's metadata

### Example Assignment Entry in assignments.json

```json
{
  "assignments": [
    {
      "id": "Assignment-1",
      "title": "Assignment 1: Blogging Platform",
      "description": "A simple blog platform with navigation and posts.",
      "docPath": "docs/Assignment-1.pdf",
      "filePath": "assignments/Assignment-1.html",
      "fileType": "html"
    },
    {
      "id": "Assignment-5",
      "title": "Assignment 5: JavaScript Fundamentals",
      "description": "JavaScript functions with various examples.",
      "docPath": "docs/Assignment-5.pdf",
      "filePath": "assignments/Assignment-5.js",
      "fileType": "js"
    }
  ]
}
```

## Configuration Properties

Each assignment in the `assignments.json` file should have:

- `id`: Unique identifier for the assignment
- `title`: Display title for the assignment
- `description`: (Optional) Brief description of the assignment
- `docPath`: Path to the PDF document file
- `filePath`: Path to the solution file
- `fileType`: Type of the solution file (html, js)

## PDF Viewing

The portfolio uses a multi-layered approach to display PDF files directly in the browser:

1. Primary method: HTML iframe for modern browsers
2. First fallback: object tag for broader compatibility
3. Second fallback: embed tag for older browsers
4. Final fallback: "Open in New Tab" and "Download" buttons

This ensures PDF viewing works across different browsers and environments.

## Supported File Types

- Assignment Documents: `.pdf` files
- Solution Files: `.html` and `.js` files

## Browser Compatibility

The website is designed to work in all modern browsers (Chrome, Firefox, Safari, Edge).

## Deployment

This project is 100% frontend and can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Azure Static Web Apps
- Any web hosting service that supports static files

## Credits

Developed with ❤️ by [Mohammad Faiz Khan](https://mohdfaiz.netlify.app/)