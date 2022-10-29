import App from "../../src/App";
import Problem2 from "../../src/components/problems/Problem2";
import Problem1 from "../../src/components/problems/Problem1";

describe("component tests", () => {
  describe("problem 1", () => {
    beforeEach(() => {
      cy.mount(<Problem1 />);
      cy.get('button:contains("Start")').as("startBtn");
      cy.get('button:contains("stop")').as("stopBtn");
      cy.get('button:contains("Reset")').as("resetBtn");
      cy.get("output").as("output");
    });

    it("initial state", () => {
      cy.get("@output").should((output) => {
        expect(output.text()).to.equal("0", "expect the initial state is 0");
      });
      cy.get("@startBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          false,
          "expect the start button should be able to click"
        );
      });
      cy.get("@stopBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          true,
          "The stop button should be disabled"
        );
      });
      cy.get("@resetBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          true,
          "The reset button should be disabled"
        );
      });
    });

    it("click the start button", () => {
      let number;
      cy.get("@startBtn")
        .click()
        .should((btn) => {
          expect(btn.is(":disabled")).to.equal(
            true,
            "After clicking start button, the start button should be disabled"
          );
        });
      cy.get("@output")
        .should((output) => {
          number = output.text();
        })
        .then((output) => {
          cy.wait(1000).then(() => {
            expect(Number(output.text())).to.gt(
              Number(number),
              "expect the count number greater than before"
            );
          });
        });
      cy.get("@stopBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          false,
          "expect the stop button should be able to click after the timer starts to count"
        );
      });
      cy.get("@resetBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          false,
          "expect the reset button should be able to click after the timer starts to count"
        );
      });
    });

    it("click the stop button", () => {
      let text;
      cy.get("@startBtn")
        .click()
        .wait(1000)
        .then(() => {
          cy.get("@output")
            .invoke("text")
            .then((t) => {
              text = t;
            })
            .then(() => {
              cy.get("@stopBtn").click();
            });
        })
        .wait(400)
        .then(() => {
          cy.get("@startBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              false,
              "After clicking the stop button, the start button should be enabled"
            );
          });
          cy.get("@stopBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              true,
              "After clicking the stop button, the stop button should be disabled"
            );
          });
          cy.get("@resetBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              false,
              "After clicking the stop button, the reset button should be enabled"
            );
          });
          cy.get("@output").should((output) => {
            expect(output.text()).to.equal(
              text,
              "After clicking the stop button, the output text should not change"
            );
          });
        });
    });

    it("click reset button", () => {
      cy.get("@startBtn")
        .click()
        .wait(1000)
        .then(() => {
          cy.get("@resetBtn").click();
        })
        .then(() => {
          cy.get("@startBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              false,
              "After clicking the reset button, the start button should be enabled"
            );
          });
          cy.get("@stopBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              true,
              "After clicking the reset button, the stop button should be disabled"
            );
          });
          cy.get("@resetBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              true,
              "After clicking the reset button, the reset button should be disabled"
            );
          });
          cy.get("@output").should((output) => {
            expect(output.text()).to.equal(
              "0",
              "After clicking the reset button, the output text should reset to the original state"
            );
          });
        });
    });
  });

  describe("problem 2", () => {
    beforeEach(() => {
      cy.mount(<Problem2 />);
      cy.get('button:contains("Start")').as("startBtn");
      cy.get('button:contains("stop")').as("stopBtn");
      cy.get('button:contains("Reset")').as("resetBtn");
      cy.get("output").as("output");
    });

    it("initial state", () => {
      cy.get("@output").should((output) => {
        expect(output.text()).to.equal(
          "click start to exercise",
          'The initial state of start button should be "click start to exercise"'
        );
      });
      cy.get("@startBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          false,
          "The start button should be enabled"
        );
      });
      cy.get("@stopBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          true,
          "The stop button should be disabled"
        );
      });
      cy.get("@resetBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          true,
          "The reset button should be disabled"
        );
      });
    });

    it("click start button", () => {
      const exercises = [
        "Jumping jacks",
        "Wall sit",
        "Push-up",
        "Abdominal crunch",
        "Step-up onto chair",
        "Squat",
        "Triceps dip",
        "Plank",
        "High knees running in place",
        "Lunge",
        "Push-up and rotation",
        "Side plank",
      ];
      cy.get("@startBtn")
        .click()
        .should((btn) => {
          expect(btn.is(":disabled")).to.equal(
            true,
            "After clicking start button, the start button should be disabled"
          );
        });
      exercises.forEach((e) => {
        cy.get("@output").should((output) => {
          expect(output.text()).contains(e);
        });
      });
      cy.get("@stopBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          false,
          "After clcking the start button, the stop button should be enabled"
        );
      });
      cy.get("@resetBtn").should((btn) => {
        expect(btn.is(":disabled")).to.equal(
          false,
          "After clicking the start button, the reset button should be enabled"
        );
      });
    });

    it("click stop button", () => {
      let text;
      cy.get("@startBtn")
        .click()
        .wait(400)
        .then(() => {
          cy.get("@output")
            .invoke("text")
            .then((t) => {
              text = t;
            })
            .then(() => {
              cy.get("@stopBtn").click();
            });
        })
        .wait(400)
        .then(() => {
          cy.get("@startBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              false,
              "After clicking the stop button, the start button should be enabled"
            );
          });
          cy.get("@stopBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              true,
              "After clicking the stop button, the stop button should be disabled"
            );
          });
          cy.get("@resetBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              false,
              "After clicking the stop button, the reset button should be enabled"
            );
          });
          cy.get("@output").should((output) => {
            expect(output.text()).to.equal(
              text,
              "After clicking the stop button, the output text should not change"
            );
          });
        });
    });

    it("click reset button", () => {
      cy.get("@startBtn")
        .click()
        .wait(400)
        .then(() => {
          cy.get("@resetBtn").click();
        })
        .then(() => {
          cy.get("@startBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              false,
              "After clicking the reset button, the start button should be enabled"
            );
          });
          cy.get("@stopBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              true,
              "After clicking the reset button, the stop button should be disabled"
            );
          });
          cy.get("@resetBtn").should((btn) => {
            expect(btn.is(":disabled")).to.equal(
              true,
              "After clicking the reset button, the reset button should be disabled"
            );
          });
          cy.get("@output").should((output) => {
            expect(output.text()).to.equal(
              "click start to exercise",
              "After clicking the reset button, the output text should reset to the original state"
            );
          });
        });
    });
  });
});
