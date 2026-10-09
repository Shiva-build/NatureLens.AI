
# 🌿 NatureLens.ai

### Point at it. Know what it is.

NatureLens.ai is a nature-inspired web application designed to help people explore plants, trees, birds, insects, spiders, mushrooms, and other fungi through a photo-based interface.

The project combines an attractive field-guide design with interactive photo uploads, image previews, animated scanning effects, and educational species information.

> **Project status:** Front-end demonstration. Species results currently come from a built-in sample list. Real AI image identification has not yet been implemented.

---

## 📌 Table of Contents

- About the Project
- Features
- Supported Categories
- Technologies Used
- Project Structure
- Installation and Setup
- How to Use
- How It Works
- Design System
- Current Limitations
- Future Improvements
- Contributing
- License

---

## 🌱 About the Project

NatureLens.ai aims to make exploring nature more accessible to students, beginners, gardeners, hikers, and wildlife enthusiasts.

Users can select a nature category, upload a photograph, and view an example identification with a common name, scientific name, description, identifying features, and similar species.

The long-term goal is to connect the interface to a real AI vision model so that uploaded photographs can be analyzed for more useful species identification.

### 🎯 Project Objectives

- Make nature exploration simple and interactive.
- Encourage environmental awareness and curiosity.
- Present educational species information.
- Provide a responsive experience across desktop and mobile devices.
- Build a foundation for future AI-powered identification.
- Promote responsible and safe wildlife observation.

---

## ✨ Features

### 📸 Photo Upload

- Select a photograph from your device.
- Drag and drop images into the upload area.
- Preview the selected image.
- Validate image file types.
- Reject files larger than 12 MB.

### 🔍 Interactive Identification Demo

- Select a category before uploading.
- Display an animated scanning effect.
- Show a sample species result.
- Display a simulated match percentage.
- Present educational information about the selected species.

**Important:** The current implementation does not analyze the actual image content. Demo results are selected using the uploaded filename and file size.

### 🌿 Nature Categories

The application includes these options:

- Not sure
- Plants
- Birds
- Insects
- Fungi

### 🧬 Educational Information

The sample result cards can contain:

- Common species name
- Scientific name
- Species description
- Identifying characteristics
- Similar-looking species
- Optional safety warnings

### 📋 Copy Results

Copy a short identification summary to the clipboard when browser permissions allow it.

### 🎨 Responsive Interface

- Nature-inspired green and cream colors
- Botanical leaf illustration
- Camera-viewfinder graphics
- Animated scanning effects
- Responsive CSS Grid and Flexbox layouts
- Keyboard focus indicators
- Reduced-motion support

---

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling, animations, and responsive layouts |
| JavaScript | Photo handling and demo interactions |
| SVG | Botanical illustrations and interface graphics |
| Google Fonts | Typography |
| Browser APIs | Image previews, drag-and-drop, and clipboard |

The current demo does not require a JavaScript framework, database, or API key.

---

## 📁 Project Structure

Keep all four files in the same folder.

```text
NatureLens.ai/
├── index.html
├── style.css
├── script.js
└── README.md
```

### File descriptions

**index.html**

Contains the page structure, navigation, introductory section, photo upload interface, category selector, educational sections, and footer.

**style.css**

Contains the color palette, typography, page layouts, buttons, botanical illustration styling, scanning animations, and responsive media queries.

**script.js**

Contains the built-in species list, file validation, image preview, demo identification function, result rendering, clipboard interaction, and error handling.

**README.md**

Provides project documentation, setup instructions, feature descriptions, limitations, and future development plans.

---

## 🚀 Installation and Setup

### Prerequisites

You need:

- A computer
- Visual Studio Code or another code editor
- A modern web browser
- The four project files

No backend server or API key is required for the current demo.

### Step 1: Open the Project

Open Visual Studio Code.

Select:

**File → Open Folder → NatureLens.ai**

### Step 2: Check Your Files

Ensure the folder contains:

- `index.html`
- `style.css`
- `script.js`
- `README.md`

Check that `index.html` includes the stylesheet and JavaScript references:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

### Step 3: Run the Website

**Option A: Open directly**

Open `index.html` in your web browser.

**Option B: Use Live Server**

1. Install the Live Server extension in VS Code.
2. Open `index.html`.
3. Right-click inside the editor.
4. Choose **Open with Live Server**.

The website should open in your browser.

---

## 🖱️ How to Use

1. Open NatureLens.ai.
2. Navigate to the photo upload section.
3. Select a category or choose "Not sure."
4. Upload an image from your device.
5. Wait for the demonstration scanning animation.
6. Review the displayed sample species information.
7. Read the listed features and similar species.
8. Copy the result if needed.
9. Select "Identify another photo" to restart.

**Reminder:** A displayed result is not proof that the uploaded photograph contains that species.

---

## ⚙️ How It Works

### 1. Species Data

JavaScript stores example species in a built-in `SPECIES` array.

Each record may contain a category, common name, scientific name, description, identifying features, lookalikes, and an optional safety warning.

### 2. File Validation

The application checks that the selected file is an image and that its size does not exceed 12 MB.

### 3. Image Preview

The browser creates a temporary object URL to display the selected photograph.

In the current implementation, the image is not sent to a remote AI service.

### 4. Demo Identification

The `identify()` function waits briefly and chooses an example species based on the file's name and size, filtered by the selected category.

The displayed match percentage is generated for demonstration purposes.

### 5. Result Display

The result card presents the sample species information, simulated confidence percentage, progress bar, and available actions.

---

## 🎨 Design System

The visual identity is inspired by botanical field guides and natural environments.

| Color | Hex Code | Purpose |
|---|---|---|
| Paper | `#EEF2E5` | Main background |
| Paper 2 | `#E2E9D4` | Alternate sections |
| Spruce | `#16302A` | Primary text and dark sections |
| Spruce 2 | `#21463D` | Secondary text |
| Moss | `#4C7A34` | Primary accents |
| Lichen | `#C7DB6A` | Highlights |
| Berry | `#A3304F` | Warnings and focus outlines |

The interface uses Instrument Serif and Figtree fonts, CSS custom properties, transitions, animations, and responsive breakpoints.

Google Fonts are loaded externally, with local system-font fallbacks.

---

## ⚠️ Current Limitations

NatureLens.ai is an educational front-end demo.

- No real AI vision model is connected.
- The uploaded image is not visually analyzed.
- Species results are selected from a limited built-in list.
- Match percentages are simulated, not verified probabilities.
- The field log contains illustrative examples rather than verified live community submissions.
- There is no account system or database.
- There is no persistent identification history.
- No backend API is included.
- Google Fonts may require an internet connection.

### Safety Notice

Never eat wild mushrooms, plants, berries, or other organisms based only on an app's identification.

Some species have dangerous lookalikes. Consult a qualified local expert whenever identification could affect health or safety.

NatureLens.ai is intended for educational exploration, not medical, emergency, or foraging advice.

---

## 🛣️ Future Improvements

These are planned possibilities, not existing features.

### Phase 1: Front-End Improvements

- Expand the species list.
- Improve error handling.
- Add image removal and replacement controls.
- Improve mobile interactions.
- Add example species galleries.
- Make demo-mode warnings more prominent.

### Phase 2: Real AI Identification

- Integrate a vision-capable AI model through a backend API.
- Analyze image content instead of file metadata.
- Return candidate species and visible supporting features.
- Represent uncertainty accurately.
- Include reliable species references.
- Keep API keys on the server.

### Phase 3: Learning and Exploration

- Add a searchable species guide.
- Add educational articles.
- Save observations in a field log.
- Introduce user accounts if needed.
- Add seasonal and geographic information from reliable sources.
- Support verified community contributions.

### Phase 4: Production Readiness

- Implement secure backend validation.
- Establish privacy and data-retention policies.
- Add automated tests.
- Improve accessibility.
- Optimize performance.
- Deploy the application to a hosting platform.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application.
5. Commit your changes.
6. Submit a pull request.

Example Git commands:

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Improve photo upload experience"
git push origin feature/your-feature
```

Do not include passwords, API keys, or other secrets in commits.

---

## 📄 License

No license has been selected for this project yet.

If you want others to reuse, modify, and distribute the code, choose and add an appropriate license file, such as the MIT License.

Until a license is added, do not assume the project is available for unrestricted reuse.

---

## 👨‍💻 Project Information

**Project:** NatureLens.ai

**Type:** Nature exploration and species-identification demo

**Technologies:** HTML, CSS, JavaScript

**Author:** Add your name or GitHub username.

**GitHub Repository:** Add your repository URL.

**Live Demo:** Add your deployed website URL when available.

---

## 🌎 Explore. Observe. Learn.

NatureLens.ai aims to bring people closer to nature by making observation and learning more accessible, one photograph at a time.

*Built with HTML, CSS, and JavaScript.*