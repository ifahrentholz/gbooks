import { GbooksPage } from './app.po';

describe('gbooks App', () => {
  let page: GbooksPage;

  beforeEach(() => {
    page = new GbooksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
