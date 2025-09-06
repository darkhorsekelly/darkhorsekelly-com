# Dark Horse Kelly site

# Product requirements

## Product overview

* 💡**Generalist notebook** for bringing hyperactive artifacts into order so visitors can explore the cool stuff that’s shipped and coming soon

## Product expand

### **Legend:**

* ### **📄Page** \= distinct endpoint

* ✨ **Feature** \= a key capability  
* 🧩 **UI component** \= not 1:1 a React component, but a core building block the user interacts with  
* 📦 **Object** \= object from the data model  
* 🏷️ **Field** \= property from the data model

### **Full product expand**

* **📄Workshop** on home page (An overview and jumping-off point, project-first exploration)  
  * ✨ Feature: **Smart header** (see below)  
  * 🧩 UI component to select **Tracker** or **Calendar**  
    * (1) 🧩 UI component: A **project tracker** table  
      * 🧩 UI component: Each row in the project tracker is a 📦Object: **project**  
        * In columns, displays:  
          * 🏷️ Field:  **Status** (enum, “Ideation”, “Pending”, “Progress”)  
          * 🏷️ Field: Ideation Date (datetime)  
          * 🏷️ Field:  Last Update (datetime)  
          * 🏷️ Calculated field:  \# of 📦 **Artifacts**   
            * 🖱️Click on a **artifact** or here, \# of artifacts (anywhere across the site) to go to:  
              * **📄 Notebook** filtered by all artifacts associated with this project  
          * 🏷️ Reactions: \# of 📦 **reactions** (sum of project \+ associated artifacts) as emojis with subscript numbers, and a:  
            * ✨ Feature: **Sentiment analysis** that uses LLM to create an up-to-date short phrase reflecting overall sentiment  
              * 🖱️Click on sentiment to display/hide:  
                * 🧩 UI component: Full list, three columns, reaction emoji, reaction text, datestamp  
          * ✨ Feature: **React to project** (or artifact, see below)  
            * 🖱️Click to create a 📦 **reaction**   
              * 🧩 UI component: Select an 🏷️ Field: emoji for your **reaction**  
              * 🧩 UI component: Open text type a 🏷️ Field: **review** to attach to your reaction  
              * 🏷️ Field: Datestamp created  
          * ✨ Feature: **Get summary**  
            * 🖱️Click to display a:  
              * 🧩 UI component: LLM-generated popout **summary** of the project with text covering:  
                * Overview  
                * Status  
                * Next steps  
        * 🖱️Click on a **project** (anywhere across the site) to go to:  
          * **📄 Notebook** filtered by all artifacts associated with this project  
    * (2) 🧩 UI component: **Calendar view** displays **projects** (as block spans) & **artifacts** (as moment-in-time pins) in Gantt roadmap-esque for a visual of activity over time  
* **📄 Notebook** page (Artifact-first exploration)  
  * ✨ Feature: **Smart header** (see below)  
  * 🧩 UI component: **Filtering, sorting**  
    * Select tag  
    * Select date  
    * Sort by date asc/desc  
    * Sort by reaction  
  * 🧩 UI component: **Show XYZ per page**  
  * 🧩 UI component: Default, No Grouping. Alternatively, select **Group by Project**, **Group by Date** (Month, Year)  
  * 🧩 UI component: **AI-assisted search** that on search returns a new list of **artifacts** as well as a smart search summary with an answer and relevant, stylized, clickable links to topmost artifacts used to generate answer  
  * 🧩 Primary UI component: Displays **list of artifacts**:  
    * Default: Auto-sorted by time featuring the most recent first.   
    * List of artifacts is an amalgamation of:  
      * (1) 🧩 UI component: **Featured artifacts** more stylize, larger preview for the most recent 3 artifacts  
      * (2) 🧩 UI component: **Listed artifacts** are more of a table UI of remaining artifacts  
        * 🧩 UI component: **Pagination**  
      * Each one displays:  
        * 🏷️ Fields  
      * Each one has: ✨ Feature: **React to artifact** (see below)  
        * 🖱️Click to create a 📦 **reaction**   
          * 🧩 UI component: Select an 🏷️ Field: emoji for your **reaction**  
          * 🧩 UI component: Open text type a 🏷️ Field: **review** to attach to your reaction  
          * 🏷️ Field: Datestamp created  
      * 🖱️Click on an **artifact** (anywhere across the site) to go to:  
        * **📄 Artifact view** (akin to a blog post) displaying the markdown from the markdown file  
  * **📦 Artifacts** are associated with **📦 projects**.   
    * Generally it’s X artifact to 1 project, but it can also be 1 artifact to multiple projects, or 1 artifact to no projects  
    * Artifacts are markdown files  
    * Artifacts can be associated with **📦 tags** (many:many)  
* ✨ Feature: **Smart header** across all pages  
  * Every page on load displays the write-time-generated summary of the underlying information:  
    * 🧩 UI component: **Dynamic LLM summary** at top with relevant, stylized, clickable links to topmost artifacts from current page used to summarize  
* **📄 Admin** page  
  * ✨ Feature: **CRUD Projects**  
    * Basic CRUD functions  
    * Update all fields  
  * ✨ Feature: **CRUD Artifacts**  
    * Basic CRUD functions  
    * Update artifact:project mapping (many:many, flexible)  
    * Update tag:artifact mapping (many:many, flexible)

## System architecture

### **🥞 Stack Overview**

This stack is designed around a modern, server-centric approach using [Next.js](http://Next.js), with a hybrid data model that leverages flat files and a relational database. 

### **🧪 Testing**

Test-driven development powered by:

* **For Unit & Component Testing**: 🛠️ **Jest** with **React Testing Library**. This is the industry standard for testing individual React components in isolation. You can test things like "when a user clicks this button, does the `onClick` handler fire?" without needing to run the entire application.  
* **For End-to-End (E2E) Testing**: 🛠️ **Playwright**. This tool allows you to write tests that simulate real user behavior across your entire site. You can write a script that automates a brows   er to "log in, navigate to the workshop, add a reaction to a project, and verify the reaction appears." This is crucial for catching bugs in critical user flows.

### **💾 Data Layer**

Two distinct parts: Markdown (.mdx) files for primary content and PostgreSQL for relational data. 

* Content (Flat-file storage)  
  * Primary content, like dev logs and blog posts, will be stored as local **Markdown (`.mdx`) files** in a `/content` directory.  
  * Each file will use**YAML frontmatter** to store its metadata

```
--- 
title: 'Dev Log #1: Building the Island' 
publish_date: '2025-08-21T10:00:00Z' 
project_ids: ['uuid-for-codename-island'] 
tag_ids: ['uuid-for-next-js', 'uuid-for-game-design'] 
---
```

* Structured data (Database)  
  * **Hosting**: 🛠️ **PostgreSQL** hosted on **Vercel** with **Prisma Postgres**, easy handshake between deployment platform and hosting  
  * **Type-Safe Access**: 🛠️ **Prisma** will be used as the ORM (Object-Relational Mapper) and Prisma Postgres will be used as the database provider, to provide type safety when communicating with the database  
  * **Validation**: 🛠️ **Zod** will be used to validate data schemas, ensuring that data (especially from forms) is in the correct format before being sent to the database

### **🖥️ Frontend & UI**

Handle how content is rendered, styled & displayed

* **Content rendering**  
  * 🛠️ **gray-matter**: Parses the YAML frontmatter from your `.mdx` files, separating metadata from the content itself  
  * 🛠️ **next-mdx-remote**: Renders the MDX content on the server, plus securely pass in custom React components (like a `<Chart />`) for use within the artifacts  
* **Styling & components**  
  * **🛠️ Tailwind CSS:** utility-first framework  
  * 🛠️ **clsx**: A utility for conditionally joining CSS class names, keeping your component logic clean  
  * 🛠️ **@heroicons/react**: A set of high-quality SVG icons designed to work seamlessly with Tailwind CSS

**🔒 Authentication**

* 🛠️ **next-auth**: core library; user sessions, sign-in, sign-out, and route protection  
* 🛠️ **@auth/prisma-adapter**: The specific adapter that allows `next-auth` to use the Prisma client to communicate with your PostgreSQL database, handling user creation and session management

### **🤖 AI**

* 🛠️ **openai**: The official client library for interacting with the OpenAI API to generate summaries and perform sentiment analysis  
* 🛠️ **LangGraph**: A library for building stateful, multi-actor applications with LLMs. As you noted, this may be slightly overkill for the initial scope but offers powerful capabilities for more complex AI workflows

### **FAQ**

1. **❔Question**: Are reactions anonymous?  
   1. **Answer**: They can be, yes  
2. **❔Question**: Limit of one reaction per user/session per item?  
   1. **Answer**: Yes  
3. **❔Question**: How is the Reactions column on the Project tracker calculated?  
   1. **Answer**: Displays every emoji with \>0 reactions in a row with a subscript for the sum of reactions for that emoji. There are only a few (5?) emojis possible to select, making this system work.   
4. **❔Question**: How does “sort by reaction” work?  
   1. **Answer**: Sort ascend./desc. by the total number of reactions on each artifact  
5. **❔Question**: 📄 Artifact view is described as "akin to a blog post" that displays a markdown file. This page should be more explicitly defined  
   1. **Answer**: Display the markdown file and metadata so that the user can read the content. This view will get more investment later on (e.g. easy navigation up to its project, or side-to-side to sequential artifacts on the project, or to related artifacts in general)  
6. **❔Question**: The "Featured artifacts" UI component is mentioned, but how is an artifact designated as "featured"? Is it a manual toggle in the admin panel (is\_featured boolean) or is it automated (e.g., the 3 most recent artifacts)?  
   1. **Answer**: It is automated: The 3 most recent artifacts for the current list view. The most recent is full width, almost like a hero image. The next two are half width boxes, and the rest are in a list.

## Data model & schema

**📦Object**: `project`

* 🏷️ **Field**: `id` (UUID, Primary Key)  
* 🏷️ **Field**: `name` (string, e.g., "Codename Island")  
* 🏷️ **Field**: `description` (string, a short summary)  
* 🏷️ **Field**: `status` (enum: "Ideation", "In Progress", "Shipped", "Archived", “Abandoned”)  
* 🏷️ **Field**: `ideation_date` (datetime)  
* 🏷️ **Field**: `last_updated_date` (datetime)  
* 🏷️ **Field**: `llm_summary` (text, stored result from the "Get Summary" feature)  
* 🏷️ **Field**: `llm_sentiment_phrase` (string, stored result from the "Sentiment Analysis" feature)  
* 🏷️ **Relational Field**: `artifacts` (Many-to-Many relationship with `Artifact` object)

**📦Object**: `artifact`

* 🏷️ **Field**: `id` (UUID, Primary Key)  
* 🏷️ **Field**: `title` (string)  
* 🏷️ **Field**: `publish_date` (datetime)  
* 🏷️ **Field**: `content_path` (string, path to the markdown file, e.g., `/content/my-post.md`)  
* 🏷️ **Field**: `type` (enum: "Dev Log", "Blog Post", "Link", "Image")  
* 🏷️ **Relational Field**: `projects` (Many-to-Many relationship with `Project` object)  
* 🏷️ **Relational Field**: `tags` (Many-to-Many relationship with `Tag` object)

**📦Object**: `tag`

* 🏷️ **Field**: `id` (UUID, Primary Key)  
* 🏷️ **Field**: `name` (string, e.g., "Next.js", "Game Design")  
* 🏷️ **Relational Field**: `artifacts` (Many-to-Many relationship with `Artifact` object)

**📦Object**: `reaction`

* 🏷️ **Field**: `id` (UUID, Primary Key)  
* 🏷️ **Field**: `emoji` (string)  
* 🏷️ **Field**: `review_text` (text, optional)  
* 🏷️ **Field**: `created_at` (datetime)  
* 🏷️ **Relational Field**: `user_id` (Foreign Key to `User` object, if you require login to react)  
* 🏷️ **Relational Field**: `project_id` (Foreign Key, nullable)  
* 🏷️ **Relational Field**: `artifact_id` (Foreign Key, nullable)

**📦Object**: `user`

* 🏷️ **Field**: `id` (UUID, Primary Key)  
* 🏷️ **Field**: `name` (string)  
* 🏷️ **Field**: `email` (string, unique)  
* 🏷️ **Field**: `role` (enum: "Admin", "User")  
* 🏷️ **Field**: `password_hash` (string)

