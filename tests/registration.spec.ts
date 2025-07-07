// import { test, expect } from "@playwright/test";
// import { RegistrationPage } from "../components/common/FormComponent";
// import { UserDataFactory } from "../fixtures/UserDataFactory";

// test("Successful registration", async ({ page }) => {
//   const registrationPage = new RegistrationPage(page);
//   await registrationPage.navigateTo("/register");

//   const user = UserDataFactory.getRandomUser();
//   await registrationPage.fillRegistrationForm(
//     user.firstName,
//     user.lastName,
//     user.userName,
//     user.password
//   );

//   const modalText = await registrationPage.modal.getTitleText();
//   expect(modalText).toContain("Success");
// });
