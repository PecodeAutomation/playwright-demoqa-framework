// import { test, expect } from "@playwright/test";
// import { BooksPage } from "../components/common/BooksPage";
// import { ProfilePage } from "../components/common/ProfilePage";
// import { ApiClient } from "../utils/apiClient";

// test.describe("Books Tests", () => {
//   let booksPage: BooksPage;
//   let profilePage: ProfilePage;

//   test.beforeEach(async ({ page }) => {
//     booksPage = new BooksPage(page);
//     profilePage = new ProfilePage(page);
//     await booksPage.navigateTo("/books");
//   });

//   test("Verify book list is not empty", async () => {
//     const titles = await booksPage.getBookTitles();
//     expect(titles.length).toBeGreaterThan(0);
//   });

//   test("Add book to collection", async () => {
//     await booksPage.addBookToCollection(0);
//     await profilePage.navigateTo("/profile");
//   });

//   test("Delete all books via API", async () => {
//     const api = await ApiClient.getInstance("https://demoqa.com");
//     const response = await api.delete("/BookStore/v1/Books", {
//       data: {
//         userId: "test-user-id",
//       },
//     });
//     expect(response.status()).toBe(204);
//   });
// });
