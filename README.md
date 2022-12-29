Initially forked from: <https://github.com/boolean-uk/react-address-book>

# React Address Book

![React Address Book](./images/address-book.gif)

In this exercise you are going to practice:

- Fetching data from a server using `useEffect` and `fetch`
- Implementing a controlled form
- Posting data to a server using `fetch`
- Implementing multiple routes

## Requirements

- A user can **view a list of contacts** at "/" when the app loads.
  - Each contact should show first name and last name
  - The list of contacts should be fetched from json-server
- A user can **create a contact** at "/contacts/add" via a form when the "Add New Contact" menu link is clicked
  - The created contact should have:
    - first name
    - last name
    - street
    - city
  - When the form is submitted, the created contact should be saved in the database by sending to json-server
  - The created contact should be also be added to the contacts list
  - The add new contact form should be reset
- A user can **view a specific contact** at "/contacts/:id" by pressing a "view" link from the contacts list
  - The view contact page should display all the details of the contact
  - The specific contact should be fetched from json-server based on it's id
