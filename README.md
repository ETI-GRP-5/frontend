# Project SDG Collab

## Description

Objective: Implement a solution aligned with one of the United Nations' Sustainable Development Goals, while integrating Cloud Native concepts learned.

SDG Focus: Partnerships for the Goals (SDG 17)

Short Description: Web application connects local non-governmental organizations (NGOs) for collaborative projects.


Microservices:
1. User Profile + Auth
2. Organization Profile
3. Project Coordination
4. Forum Discussions
5. Task Management
6. Resource Sharing
7. Search

User Profile + Auth:
- Allows users to login via credentials or Google.
- Saves user data into Firestore.
- Allows users to sign up.

Organization:
- Allows users to create organizations with the organization name, description, and objectives (owners).
- Allows users to join organizations (members).
- Allows owners to modify organization information.

Project:
- Allows users to create new projects with relevant details such as name, description, start date, end date, status, and the corresponding SDG.
- Allows users to become members of the project and view the project resources.

Resource:
- Allows project members to view the list of resources (e.g., images, documents) for that project.
- Allows project members to upload, download, or delete the project resources.

Task:
- Allows NGOs to add/delete tasks to projects.
- Enables NGOs to create tasks for enrolled users in a project.

Forum:
- Allows users to create new discussion threads on various topics related to the SDG.
- Enables users to engage in discussions and share ideas by posting replies and comments.

Search:
- Allows users to search for project titles.
- Upon search, the project card will be displayed, and users will be able to see the project based on the respective project titles.


## Installation

### Prerequisites

Ensure you have Node.js and npm installed on your system.

### Installation Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/ETI-GRP-5/frontend
    ```

2. Navigate to the project directory:

    ```bash
    cd frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

### Development

This command starts the development server and opens the application in your default web browser.
```bash
npm start
```

This command builds the application for production, creating an optimized bundle in the build folder.
Production Build
```bash
npm run build
```

## Folder Structure

- src/: Contains the source code of the frontend application.
- src/api/: Api routes to get, update and post data.
- src/components/: Reusable UI components.
- src/view/admin/: React components representing different pages/routes of the application.
- src/layout/: template for positioning and displaying UI components.
- public/: Contains static assets and the HTML template file.

## Technologies Used

ReactJS, TailwindCSS & JavaScript

## Contributing

Microservices:
1. User Profile + Auth (Ray Zin)
2. Organization Profile (Isabelle)
3. Project Coordination (Ryan)
4. Forum Discussions (Ryan)
5. Task Management (Zacharia)
6. Resource Sharing (Simon)
7. Search (Zacharia)

## Copyright and license

⭐️ [Copyright 2023 Horizon UI ](https://www.horizon-ui.com/?ref=readme-horizon-tailwind-react)

📄 [Horizon UI License](https://www.simmmple.com/licenses?ref=readme-horizon-tailwind-react)

