import { ACCORDIAN_CONTENT, ContentState } from "../../constants/widgets";
import { test } from "../../fixtures/WidgetsFixtures";
import { Accordian } from "../../types/widgets";

test.describe("Widgets - Accordian page", () => {
  test("Verify initial state of accordion", async ({ accordianPage }) => {
    await accordianPage.verifyBaseComponents();
    await accordianPage.verifyInitialState();
  });

  test("Verify first section content", async ({ accordianPage }) => {
    await accordianPage.verifyBaseComponents();
    await accordianPage.verifySectionContent(
      Accordian.FIRST_SECTION,
      ACCORDIAN_CONTENT.firstSection
    );
  });

  test("Verify second section can be expanded and contains correct text", async ({
    accordianPage,
  }) => {
    await accordianPage.verifyBaseComponents();
    await accordianPage.verifySectionState(
      Accordian.SECOND_SECTION,
      ContentState.isNotVisible
    );
    await accordianPage.toggleSection(Accordian.SECOND_SECTION);
    await accordianPage.verifySectionState(
      Accordian.SECOND_SECTION,
      ContentState.isVisible
    );
    await accordianPage.verifySectionContent(
      Accordian.SECOND_SECTION,
      ACCORDIAN_CONTENT.secondSection
    );
  });

  test("Verify third section can be expanded and contains correct text", async ({
    accordianPage,
  }) => {
    await accordianPage.verifyBaseComponents();
    await accordianPage.verifySectionState(
      Accordian.THIRD_SECTION,
      ContentState.isNotVisible
    );
    await accordianPage.toggleSection(Accordian.THIRD_SECTION);
    await accordianPage.verifySectionState(
      Accordian.THIRD_SECTION,
      ContentState.isVisible
    );
    await accordianPage.verifySectionContent(
      Accordian.THIRD_SECTION,
      ACCORDIAN_CONTENT.thirdSection
    );
  });

  test("Verify accordion behavior - only one section expanded at a time", async ({
    accordianPage,
  }) => {
    await accordianPage.verifyBaseComponents();
    await accordianPage.verifyInitialState();

    await accordianPage.toggleSection(Accordian.SECOND_SECTION);
    await accordianPage.verifySectionState(
      Accordian.FIRST_SECTION,
      ContentState.isNotVisible
    );
    await accordianPage.verifySectionState(
      Accordian.SECOND_SECTION,
      ContentState.isVisible
    );
    await accordianPage.verifySectionState(
      Accordian.THIRD_SECTION,
      ContentState.isNotVisible
    );

    await accordianPage.toggleSection(Accordian.THIRD_SECTION);
    await accordianPage.verifySectionState(
      Accordian.FIRST_SECTION,
      ContentState.isNotVisible
    );
    await accordianPage.verifySectionState(
      Accordian.SECOND_SECTION,
      ContentState.isNotVisible
    );
    await accordianPage.verifySectionState(
      Accordian.THIRD_SECTION,
      ContentState.isVisible
    );

    await accordianPage.toggleSection(Accordian.FIRST_SECTION);
    await accordianPage.verifySectionState(
      Accordian.FIRST_SECTION,
      ContentState.isVisible
    );
    await accordianPage.verifySectionState(
      Accordian.SECOND_SECTION,
      ContentState.isNotVisible
    );
    await accordianPage.verifySectionState(
      Accordian.THIRD_SECTION,
      ContentState.isNotVisible
    );
  });
});
