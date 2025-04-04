# Language Prediction and Retraining App

This React application provides a user-friendly interface for language prediction and model retraining. It allows users to input text and identify the language, visualize dataset insights, and trigger model retraining.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Setup](#setup)
-   [Running the App](#running-the-app)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Language Prediction:** Accurately predicts the language of user-inputted text.
-   **Confidence Scores:** Displays confidence scores for predictions, indicating model certainty.
-   **Alternative Predictions:** Provides alternative language predictions with confidence scores.
-   **Dataset Visualizations:** Offers interactive visualizations to understand the training dataset:
    -   Language distribution.
    -   Topic distribution by language.
    -   Text length across languages.
    -   Most common words per language (French, Yoruba, Swahili).
    -   Topic sentiment analysis.
-   **Model Retraining:** Allows users to trigger model retraining with new data.
-   **Training Status:** Provides real-time feedback on the retraining process.
-   **Training Information:** Displays dataset size, supported languages, and last training date.
-   **Dark/Light Mode:** Provides a toggle for user preference.
-   **Responsive Design:** Ensures the app works well on various screen sizes.

## Technologies Used

-   **React:** JavaScript library for building user interfaces.
-   **React Hooks:** For state management and side effects.
-   **Lucide React:** For icons.
-   **CSS:** For styling.
-   **Vercel:** For deployment.
-   **Node.js/npm (or yarn):** For package management.
-   **Git:** For version control.

## Setup

1.  **Clone the Repository:**

    ```bash
    git clone [repository-url]
    cd [repository-name]
    ```

2.  **Install Dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

3.  **Environment Variables:**

    Create a `.env.local` file in the root directory and add your API base URL:

    ```
    REACT_APP_API_BASE_URL=your_api_base_url
    ```

    Replace `your_api_base_url` with the actual URL of your backend API.

## Running the App

1.  **Start the Development Server:**

    Using npm:

    ```bash
    npm start
    ```

    Using yarn:

    ```bash
    yarn start
    ```

2.  **Open in Browser:**

    The app will be available at `http://localhost:3000`.

## Deployment

This app is designed to be deployed on Vercel.

1.  **Vercel Account:** Create a Vercel account at [vercel.com](https://vercel.com).
2.  **Vercel CLI (Optional):** Install the Vercel CLI:

    ```bash
    npm install -g vercel
    ```

3.  **Deploy:**

    Using the Vercel website:

    -   Import your Git repository.
    -   Configure the project settings.
    -   Deploy.

    Using the Vercel CLI:

    ```bash
    vercel
    ```

    Follow the prompts to deploy your app.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
