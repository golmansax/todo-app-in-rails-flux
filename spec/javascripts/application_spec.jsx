'use strict';

var bootApplication = require('../../app/assets/javascripts/application');

describe('application', function () {
  it('can be loaded', function () {
    fixture.load('application.html');

    expect(bootApplication).not.to.throw();
  });
});
