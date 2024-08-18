# Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In order to run npm scripts, you need to download and install the latest Node.js version from the official
website [Node.js](https://nodejs.org/).

Implying node is installed, in the root project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available functionalities

### Table view
This is the main app view, where a table with the already added family members have been added to the questionairre

![image](https://github.com/user-attachments/assets/023c1290-1b77-4857-a286-4ac05b21e47c)

### Questionairre - new family member add
By clicking the + button on the upper left a dialog with a form will be shown.

![image](https://github.com/user-attachments/assets/26d1eaa5-b0c8-4361-bbc3-831e6e3bffdc)

By filling all the form fields the submit button will add it to the db and the entry will be shown in the table.

![image](https://github.com/user-attachments/assets/1765c6bb-4d8f-416a-868e-e67f66c050d9)

A table entry can also be deleted by clicking the trashcan icon on the row and the top left corner (this will delete all the entries in the table).

![image](https://github.com/user-attachments/assets/08129848-6927-4a80-87cb-65a9268048c5)

### Export data
By clicking one of the 2 buttons in the table view footer is possible to download the dataset in .csv format.
This operation will set the rows in the table as "Exported" and will not be exported by clicking the "Export changed to csv" button.
This button will be enabled only if there are new added rows or if not all the rows have been exported before in the same session.

![358897667-12ab9f19-bb47-46c2-8901-75b9f540bd70](https://github.com/user-attachments/assets/5231ef11-7b20-47e2-ad77-09f3bf1a9c8f)

![358897712-185d820f-0d16-4f89-b9da-9f920f87e1ea](https://github.com/user-attachments/assets/031eafb5-e5fc-4b4f-b3a0-42f34be42cd3)

![image](https://github.com/user-attachments/assets/fa3537ef-50cd-4d02-805e-f93684130762)

### Easter egg
If something hilarious have been submitted by the questionairre form, the confirmation popup on the top left corner will say that "you are funny"

![image](https://github.com/user-attachments/assets/938cc824-24b3-4b06-b1a7-80029e5c47c0)

This kind of check is executed by the backend, so nothing will be seen on the front end code.

