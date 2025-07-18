import { test } from "../../fixtures/WidgetsFixtures";

test.describe('Slider Functionality', () => {
  test('Test value using keyboard arrows', async ({ sliderPage }) => {
    await sliderPage.verifyBaseComponents();
    await sliderPage.setValue(50);
    await sliderPage.verifyExactValue(50);
  });

  test('Test value by dragging slider', async ({ sliderPage }) => {
    await sliderPage.verifyBaseComponents();
    await sliderPage.dragSliderToValue(75);
    await sliderPage.verifyValueWithinRange(75);
  });

  test('Test min value - 0', async ({ sliderPage }) => {
    await sliderPage.verifyBaseComponents();
    await sliderPage.setValue(0);
    await sliderPage.verifyMinValue();
  });

  test('Test max value - 100', async ({ sliderPage }) => {
    await sliderPage.verifyBaseComponents();
    await sliderPage.setValue(100);
    await sliderPage.verifyMaxValue();
  });

  test('Test value display when moved', async ({ sliderPage }) => {
    await sliderPage.verifyBaseComponents();
    const initialValue = await sliderPage.getCurrentValue();
    
    await sliderPage.setValue(initialValue + 10);
    await sliderPage.verifyValueChangedFrom(initialValue);
    await sliderPage.verifyExactValue(initialValue + 10);
  });
});