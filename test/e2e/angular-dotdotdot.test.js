(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("Tooltip component", function() {
    beforeEach(function (){
      browser.get("/test/e2e/angular-dotdotdot.test.html");
    });

    it("Should hide Tooltip by default", function () {
      expect(element(by.id("test")).isPresent()).
      to.eventually.be.true;
      
      expect(element(by.id("test")).getText()).
      to.eventually.have.string("...");
    });

  });

})();
