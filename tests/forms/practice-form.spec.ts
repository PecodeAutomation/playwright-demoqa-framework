import dayjs from "dayjs";
import { test } from "../../fixtures/FormsFixtures";
import { UserDataFactory } from "../../fixtures/UserDataFactory";
import { FILES } from "../../constants/common";

test.describe("Forms - Practice Form page", () => {
  test("Submit minimal valid form", async ({ practiceFormPage }) => {
    const testUser = UserDataFactory.getMinimalPracticeFormUser();

    await practiceFormPage.verifyBaseComponents();
    await practiceFormPage.formComponent.fillFirstName(testUser.firstName);
    await practiceFormPage.formComponent.fillLastName(testUser.lastName);
    await practiceFormPage.formComponent.selectGender(testUser.gender);
    await practiceFormPage.formComponent.fillMobileNumber(testUser.mobile);
    await practiceFormPage.formComponent.clickSubmit();
    await practiceFormPage.verifyFirstLastName(
      testUser.firstName,
      testUser.lastName
    );
    await practiceFormPage.verifyGender(testUser.gender);
    await practiceFormPage.verifyMobileNumber(testUser.mobile);
  });

  test("Submit full form with all fields", async ({ practiceFormPage }) => {
    const testUser = UserDataFactory.getRandomPracticeFormUser();
    const dateOfBirth = dayjs().subtract(18, "year").format("DD MMMM, YYYY");

    await practiceFormPage.verifyBaseComponents();
    await practiceFormPage.formComponent.fillFirstName(testUser.firstName);
    await practiceFormPage.formComponent.fillLastName(testUser.lastName);
    await practiceFormPage.formComponent.fillEmail(testUser.email);
    await practiceFormPage.formComponent.selectGender(testUser.gender);
    await practiceFormPage.formComponent.fillMobileNumber(testUser.mobile);
    await practiceFormPage.formComponent.setDateOfBirth(dateOfBirth);
    await practiceFormPage.formComponent.selectSubjects(testUser.subjects);
    await practiceFormPage.formComponent.selectHobbies(testUser.hobbies);
    await practiceFormPage.formComponent.uploadPicture(testUser.picture);
    await practiceFormPage.formComponent.selectState(testUser.state);
    await practiceFormPage.formComponent.selectCity(testUser.city);
    await practiceFormPage.formComponent.clickSubmit();
    await practiceFormPage.verifyFirstLastName(
      testUser.firstName,
      testUser.lastName
    );
    await practiceFormPage.verifyEmail(testUser.email);
    await practiceFormPage.verifyGender(testUser.gender);
    await practiceFormPage.verifyMobileNumber(testUser.mobile);
    await practiceFormPage.verifyBirthDate(
      dayjs(dateOfBirth).format("DD MMMM,YYYY")
    );
    await practiceFormPage.verifySubjects(testUser.subjects.join(", "));
    await practiceFormPage.verifyHobbies(testUser.hobbies.join(", "));
    await practiceFormPage.verifyPicture(FILES.uploadFile);
    await practiceFormPage.verifyStateAndCity(testUser.state, testUser.city);
  });
});
