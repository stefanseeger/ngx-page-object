import { act, render } from '@testing-library/react';

import App from './app';
import { AppPO } from './app.po';

describe('App', () => {
  let po: AppPO;
  let app: HTMLElement;
  beforeEach(() => {
    const { baseElement } = render(<App />);
    app = baseElement;
    po = new AppPO(baseElement);
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display app', () => {
    expect(po.isDisplayed()).toBeTruthy();
  });

  it('should display welcome', () => {
    expect(po.getWelcome().isDisplayed()).toBeTruthy();
  });

  it('should display false', () => {
    expect(
      po.getWelcome().isDisplayed('selector-which-does-not-match'),
    ).toBeFalsy();
  });

  it('should get textContent', () => {
    expect(po.getWelcome().getTextContent()).toBe(
      ' Ugly text with some extra spaces and line breaks ',
    );
  });

  it('should get normalized text content', () => {
    expect(po.getWelcome().getNormalizedTextContent()).toBe(
      'Ugly text with some extra spaces and line breaks',
    );
  });

  it('should get textContents', () => {
    expect(po.getWelcome().getTextContents()).toStrictEqual([
      'first ',
      'second ',
      'third ',
    ]);
  });

  it('should get normalized text contents', () => {
    expect(po.getWelcome().getNormalizedTextContents()).toStrictEqual([
      'first',
      'second',
      'third',
    ]);
  });

  it('should wait for elements to appear and diappear', async () => {
    const welcome = po.getWelcome();
    // Default
    expect(welcome.getShowHideButtonText()).toBe('Show');
    expect(welcome.getWaitText()).toBeNull();

    // Click button
    act(() => {
      welcome.clickShowHideButton();
    });

    // Text appears after a second
    await welcome.waitForTextAppear();
    expect(welcome.getShowHideButtonText()).toBe('Hide');
    expect(welcome.getWaitText()).toBe('I am hear');

    // Click button again
    act(() => {
      welcome.clickShowHideButton();
    });

    // Text disappears after one second
    await welcome.waitForTextDisappear();
    expect(welcome.getShowHideButtonText()).toBe('Show');
    expect(welcome.getWaitText()).toBeNull();
  });
});
