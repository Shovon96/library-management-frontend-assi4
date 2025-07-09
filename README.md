# 📚 Library Management System (Book Shelf)

A full-stack library management system where users can manage books and borrowing records. Built with **React**, **TypeScript**, **Redux Toolkit Query**

---

## 🛠️ Tech Stack

| Frontend                        | Backend                  |
|----------------------------------|--------------------------|
| React + TypeScript               | Node.js + Express        |
| Redux Toolkit Query (RTK Query)  | MongoDB (Mongoose)       |
| Tailwind CSS + shadcn/ui         | Zod validation           |
| React Router                     | REST API architecture    |
| Toast notifications              |                          |

---

---

## Features Overview

### Main Functionalities
- View All Books, Add Book, Edit Book & Delete Books
- Sort books
- Borrow books and automatically update stock
- Borrow Summary to see which books are borrowed the most
- Responsive UI

---

## Pages & Functionalities

### 1. Home Page (`/`)
- Simple landing page.

### 2. All Books Page (`/books`)
- View all books in a table: Title, Author, Genre, ISBN, Copies, Description, Status.
- Sort by:
  - Title Ascending
  - Title Descending
  - Copies High to Low
- Pagination:
  - 10 books per page.
- Actions:
  - **Edit:** Update any book's details.
  - **Delete:** Remove a book.
  - **Borrow:** Borrow a book using a modal form.

### 3. View a Single Book (`/books/:id`)
- View a single book in this page: Title, Author, Genre, ISBN, Copies, Description, Status.
- Actions:
  - **Edit:** Update any book's details.
  - **Delete:** Remove a book.
  - **Borrow:** Borrow a book using a modal form.

### 4. Create Book Page (`/create-book`)
- Add a new book with title, author, genre, ISBN, copies, and description.

### 5. Edit Book Page (`/edit-book/:id`)
- Edit existing book with details.

### 6. Borrow Summary Page (`/borrow-summary`)
- See a table with:
  - Book Title
  - ISBN
  - Total Borrowed Quantity

### 7. Reques a Book Borrow (Modal)
- Request available quantities book
- Due Date for book return

### 8. Not Found Page
- if any routed page not found then will user see this file

--- 

## Packages & Tools:

- shadcn/ui
- lucide-react
- Redux Toolkit
- react toast
- react hook form
- zod

## How to Use:
1. Clone the repository
2. Install dependies

```bash
npm install
```
3. Run the project

```bash
npm run dev
```
---
# Thank You!

