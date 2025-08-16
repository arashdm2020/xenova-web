To fulfill this request, I will generate a detailed prompt for a Cursor AI. This prompt will instruct the AI to build a Persian-language Next.js website for Xenova, incorporating specific design and technical requirements based on the provided documents.

***

### **Prompt for Cursor AI: Xenova Website Development**

You are a highly skilled Next.js developer and an expert AI assistant. Your task is to create a modern, elegant, and fully functional Persian-language website for the "Xenova" pharmaceutical platform. The project is based on a Next.js app initialized with the standard `create-next-app@latest` command, and you must integrate Tailwind CSS for all styling.

**Key Requirements:**

* **Language:** The entire website, including all content and UI elements, must be in **Persian**. There is no English version.
* **Font:** Use the **Vazirmatn** font for all Persian text. You must install this font using npm (`npm install vazirmatn`) and configure it correctly in the project's CSS, as described in the provided documentation.
* **Icons:** Integrate and utilize **Font Awesome** for all necessary icons to enhance the user interface and visual appeal.

**Project Context:**

The project is located at `~/Projects/xenova-UI/xenova-app`. Inside the `doc` folder, you have access to `Xenova.pdf` and `Xenova.txt`.

**Instructions for AI:**

1.  **Content Analysis and Extraction:**
    * Read and thoroughly understand the Persian content of `Xenova.pdf` or `Xenova.txt`.
    * [cite_start]Extract key information, including Xenova's value proposition, features, strategic goals, system architecture diagrams (from pages 8 and 9) [cite: 80, 98][cite_start], technical specifications of hardware and software [cite: 67, 70, 78][cite_start], investment details (funding request, estimated costs, ROI) [cite: 61, 149, 159][cite_start], and market risks with their solutions[cite: 153].

2.  **Website Development (Next.js with Tailwind CSS, Persian UI):**

    * **Core Pages:**
        * **Homepage (`/`):** A visually compelling landing page that introduces Xenova. Use engaging visuals and a clear call to action. [cite_start]Highlight the platform's core problem-solving capability—reducing drug development costs and time[cite: 8].
        * [cite_start]**About (`/about`):** Provide detailed information about the platform's unique technology, which integrates Molecular Dynamics (MD), intelligent docking, and pharmacokinetic (PK) analysis[cite: 7]. [cite_start]This page should also present the strategic goals and the modular, scalable system architecture[cite: 24, 37].
        * **Investment (`/investment`):** A dedicated page for potential investors. [cite_start]Clearly present the funding request of **13.5 billion Tomans** [cite: 9, 149][cite_start], a breakdown of the estimated costs (human resources, hardware, software, etc.) [cite: 63, 64][cite_start], the projected ROI, and a summary of the market risks and how they will be managed[cite: 153, 156, 157].
        * **Contact (`/contact`):** An elegant contact and collaboration form. The form must collect the user's name, email, subject, and a message. [cite_start]Include a checkbox labeled "علاقه‌مند به همکاری" (Interested in collaboration)[cite: 11].

3.  **Technical Implementation:**

    * **Database:**
        * Use **SQLite** as the project's database. Create a database file named `xenova.db`.
        * Create tables to store dynamic content (e.g., features, team members) and form submissions from the contact page. This structure should be designed for future expandability with a content management system (CMS) or admin panel.

    * **API Routes:**
        * Develop Next.js API routes (`/api`) to handle all database interactions.
        * Create an endpoint to **fetch content** from the SQLite database.
        * Create a **POST** endpoint for the contact form to securely store submitted data in the database. Implement validation and error handling for this endpoint.

    * **Styling and Design:**
        * Tailwind is installed do not change this setting !.
        * The design should be modern, clean, and elegant. Use a professional color scheme and typography.
        * Implement a **fully responsive layout** that works seamlessly across all device sizes.
        * Incorporate CSS animations and transitions for a polished user experience.

4.  **Final Deliverables:**

    * Provide the complete and well-structured Next.js project code.
    * Include clear, step-by-step instructions on how to set up the project locally, including database setup and running the development server.
    * Offer a brief summary of the design and architectural choices, explaining how they were made to align with the information provided in the original `Xenova.pdf` document.

***