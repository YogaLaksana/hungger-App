/* eslint-disable no-undef */
Feature('like-button');

Before(({ I }) => {
  I.amOnPage('/#/detail');
});

Scenario('showing like button', ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.list-container');
});
