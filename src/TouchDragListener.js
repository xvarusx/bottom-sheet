class TouchDragListener {
  constructor({
    el,
    touchStartCallback,
    touchEndCallback,
    touchMoveCallback,
    showLog,
  }) {
    this.el = el;
    this.touchStartCallback = touchStartCallback;
    this.touchEndCallback = touchEndCallback;
    this.touchMoveCallback = touchMoveCallback;
    this.showLog = showLog;

    this.active = false;
    this.currentY;
    this.initialY;
    this.yOffset = 0;

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.drag = this.drag.bind(this);

    this.el.addEventListener("mousedown", this.dragStart);
    this.el.addEventListener("mouseleave", this.dragEnd);
    this.el.addEventListener("mouseup", this.dragEnd);
    this.el.addEventListener("mousemove", this.drag);

    this.el.addEventListener("touchstart", this.dragStart);
    this.el.addEventListener("touchend", this.dragEnd);
    this.el.addEventListener("touchmove", this.drag);
  }

  dragStart(e) {
    console.log("drag start");
    this.active = true;
    this.el.classList.add("active");

    if (e.type === "touchstart") {
      console.log("drag start", this.initialY);
      if (e.touches[0].clientY - this.yOffset > 450) {
        // console.log(this.initialY);
        this.initialY = 260;
      } else if (
        e.touches[0].clientY - this.yOffset < 450 &&
        e.touches[0].clientY - this.yOffset > 0
      ) {
        this.initialY = e.touches[0].clientY - this.yOffset;
      } else if (e.touches[0].clientY - this.yOffset < 0) {
        this.initialY = 250;
      }
    } else {
      this.initialY = e.clientY - this.yOffset;
    }

    if (!this.touchStartCallback) return;

    this.touchStartCallback({
      el: this.el,
      active: this.active,
      currentY: this.currentY,
      initialY: this.initialY,
      yOffset: this.offSetY,
    });
  }

  dragEnd(e) {
    console.log("drag end");
    this.active = true;
    this.el.classList.remove("active");

    this.yOffset = 0;

    this.initialY = this.currentY;
    console.log(this.initialY);
    if (!this.touchEndCallback) return;

    this.touchEndCallback({
      el: this.el,
      active: this.active,
      currentY: this.currentY,
      initialY: this.initialY,
      yOffset: this.offSetY,
    });
  }
  drag(e) {
    console.log("drag");
    if (!this.active) return;
    e.preventDefault();

    if (e.type === "touchmove") {
      console.log("touchmove", e.touches[0].clientY - this.initialY);
      this.currentY = e.touches[0].clientY - this.initialY;
    } else {
      console.log("else touchmove", e.touches[0].clientY - this.initialY);
      this.currentY = e.clientY - this.initialY;
    }

    this.yOffset = this.currentX;

    if (!this.touchMoveCallback) return;

    this.touchMoveCallback({
      el: this.el,
      active: this.active,
      currentY: this.currentY,
      initialY: this.initialY,
      yOffset: this.offSetY,
    });

    if (this.showLog) {
      console.log({
        active: this.active,
        initialY: this.initialY,
        currentY: this.currentY,
        offSetY: this.offSetY,
      });
    }
  }
}

export default TouchDragListener;
