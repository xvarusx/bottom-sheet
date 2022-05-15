import "./style.scss";
import TouchDragListener from "./src/TouchDragListener.js";

/**
 * Bottom Sheet
 * @author Windo <herwindo.artono@go-jek.com>
 */
class BottomSheet {
  constructor(id) {
    this.id = id;
    this.el = document.getElementById(id);
    this.scrim = this.el.querySelector(".c-bottom-sheet__scrim");
    this.handle = this.el.querySelector(".c-bottom-sheet__handle");
    this.sheet = this.el.querySelector(".c-bottom-sheet__sheet");
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);

    this.scrim.addEventListener("click", this.deactivate);
    this.handle.addEventListener("click", this.deactivate);

    this.sheetListener = new TouchDragListener({
      el: this.sheet,
      touchStartCallback: ({ el, active, initialY, currentY, yOffset }) => {
        console.log("touchStartCallback", currentY);
        if (typeof currentY === NaN || undefined) {
          return;
        } else {
          if (currentY < 285) {
            el.style.setProperty("--translateY", `translateY(0)`);
            el.style.setProperty("transition", `unset`);
            return;
          }
          if (currentY <= -40) {
            currentY = -41 + currentY / 10;
          } else if (currentY <= -60) {
            currentY = -60;
          }
          // el.style.setProperty("--translateY", `translateY(${0}))`);
          el.style.setProperty("transition", `unset`);
          //   el.style.removeProperty("transform");
        }
      },
      touchEndCallback: ({ el, active, initialY, currentY, yOffset }) => {
        el.style.setProperty(
          "transition",
          `transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
        );
        if (currentY <= 285) {
          this.activate();
          return;
        }
        if (currentY > 400) {
        }
        el.style.setProperty("--translateY", `translateY(${currentY}px)`);
        // el.style.setProperty("min-Height", "600px");
        el.style.setProperty("transform", `translateY(50%)`);
      },
      touchMoveCallback: ({ el, active, initialY, currentY, yOffset }) => {
        el.style.removeProperty("transform");
        if (currentY <= -20) {
          currentY = -41 + currentY / 10;
        } else if (currentY <= -60) {
          currentY = -60;
        } else if (currentY >= 310) {
          this.deactivate(currentY);
          return;
        }

        el.style.setProperty("--translateY", `translateY(${currentY}px)`);
        el.style.setProperty("transform", `translateY(${currentY})px`);
      },
    });

    this.scrimListener = new TouchDragListener({
      el: this.scrim,
      touchMoveCallback: ({ el, active, initialY, currentY, yOffset }) => {
        if (currentY >= 285) {
          this.deactivate();
          return;
        } else if (currentY <= 285) {
          this.activate();
          return;
        }
      },
    });
  }
  activate(e) {
    if (e) e.preventDefault();
    this.el.classList.add("active");
  }
  deactivate(translateY) {
    if (!translateY) {
      this.sheet.style.setProperty("--translateY", `translateY(201px)`);
    } else {
      this.sheet.style.setProperty(
        "transition",
        `transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
      );
      this.sheet.style.setProperty(
        "--translateY",
        `translateY(${translateY}px)`
      );
    }

    // this.el.classList.remove("active");
  }
}

const bottomSheet = new BottomSheet("country-selector");
document
  .getElementById("country-select-button")
  .addEventListener("click", () => {
    bottomSheet.activate();
  });

document.querySelector(".start").addEventListener("click", () => {
  bottomSheet.activate();
});

//window.bottomSheet = bottomSheet;
