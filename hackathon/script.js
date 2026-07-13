/* ────────────────────────────────────────────────────────────────────────
   Bloch sphere hero animation + email-capture form handler.
   No dependencies; the SVG in index.html carries a static pose so the
   page still reads correctly with JavaScript disabled.
   ──────────────────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  /* ──────── Bloch sphere ────────
     A qubit state |ψ⟩ = cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩ drawn as the
     point (sinθcosφ, sinθsinφ, cosθ) on the unit sphere. φ precesses
     steadily (Larmor-style) while θ drifts slowly, so the tip traces a
     non-repeating spiral between the poles. */

  var R = 110; // sphere radius in SVG units — matches the static markup
  var TILT = (22 * Math.PI) / 180; // camera looks down 22°
  var AZIMUTH = (-30 * Math.PI) / 180; // axes splayed for depth
  var sinT = Math.sin(TILT);
  var cosT = Math.cos(TILT);
  var sinA = Math.sin(AZIMUTH);
  var cosA = Math.cos(AZIMUTH);

  // Orthographic projection of a point on the unit sphere to SVG coords.
  // d > 0 means the point is on the viewer's side of the sphere.
  function project(x, y, z) {
    var x2 = x * cosA - y * sinA;
    var y2 = x * sinA + y * cosA;
    return {
      X: R * x2,
      Y: -R * (y2 * sinT + z * cosT),
      d: -y2 * cosT + z * sinT,
    };
  }

  var svg = document.getElementById("bloch");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (svg && !reduceMotion) {
    var vector = document.getElementById("vector");
    var vecGrad = document.getElementById("vecGrad");
    var tip = document.getElementById("tip");
    var tipGlow = document.getElementById("tipGlow");
    var dropline = document.getElementById("dropline");
    var floorline = document.getElementById("floorline");
    var psi = document.getElementById("psi");
    var state = document.getElementById("state");
    var trail = document.getElementById("trail");
    var angles = document.getElementById("angles");

    var trailPoints = [];
    var TRAIL_MAX = 110;
    var frameCount = 0;
    var start = null;

    var frame = function (now) {
      if (start === null) start = now;
      var t = (now - start) / 1000;

      // θ breathes between 35° and 75°; φ precesses once every 9 s.
      var theta = ((55 + 20 * Math.sin((2 * Math.PI * t) / 19)) * Math.PI) / 180;
      var phi = ((2 * Math.PI * t) / 9) % (2 * Math.PI);

      var sx = Math.sin(theta) * Math.cos(phi);
      var sy = Math.sin(theta) * Math.sin(phi);
      var sz = Math.cos(theta);

      var p = project(sx, sy, sz);
      var q = project(sx, sy, 0); // equatorial-plane projection

      vector.setAttribute("x2", p.X);
      vector.setAttribute("y2", p.Y);
      vecGrad.setAttribute("x2", p.X);
      vecGrad.setAttribute("y2", p.Y);
      tip.setAttribute("cx", p.X);
      tip.setAttribute("cy", p.Y);
      tipGlow.setAttribute("cx", p.X);
      tipGlow.setAttribute("cy", p.Y);
      dropline.setAttribute("x1", p.X);
      dropline.setAttribute("y1", p.Y);
      dropline.setAttribute("x2", q.X);
      dropline.setAttribute("y2", q.Y);
      floorline.setAttribute("x2", q.X);
      floorline.setAttribute("y2", q.Y);

      // |ψ⟩ label rides just beyond the tip, flipping sides at the axis.
      var len = Math.sqrt(p.X * p.X + p.Y * p.Y) || 1;
      psi.setAttribute("x", p.X + (p.X / len) * 16);
      psi.setAttribute("y", p.Y + (p.Y / len) * 16 + 4);
      psi.setAttribute("text-anchor", p.X < 0 ? "end" : "start");

      // Dim the state slightly while the tip is on the far side.
      var opacity = Math.max(0.55, Math.min(1, 0.8 + 0.35 * p.d));
      state.setAttribute("opacity", opacity.toFixed(3));

      trailPoints.push(p.X.toFixed(1) + "," + p.Y.toFixed(1));
      if (trailPoints.length > TRAIL_MAX) trailPoints.shift();
      trail.setAttribute("points", trailPoints.join(" "));

      if (angles && frameCount % 8 === 0) {
        angles.textContent =
          "θ = " + ((theta * 180) / Math.PI).toFixed(1) + "° · φ = " + ((phi * 180) / Math.PI).toFixed(1) + "°";
      }

      frameCount++;
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  /* ──────── Email capture ────────
     Posts to the endpoint configured on the form's data-endpoint
     attribute (Formspree-compatible: FormData body, JSON accepted).
     See README.md for wiring options. */

  var form = document.getElementById("signup");
  if (form) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button");

    var setStatus = function (message, isError) {
      status.textContent = message;
      status.classList.toggle("error", Boolean(isError));
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var email = form.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("That doesn't look like an email address — try again.", true);
        return;
      }

      // Honeypot: bots fill the hidden field; humans never see it.
      if (form.company.value) {
        setStatus("You're on the list. You'll hear from us the moment the launch is official.");
        form.reset();
        return;
      }

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        setStatus(
          "Signups aren't connected to a backend yet — add your form endpoint to data-endpoint in index.html (see README).",
          true
        );
        return;
      }

      button.disabled = true;
      setStatus("Sending…");

      var body = new FormData();
      body.set("email", email);

      fetch(endpoint, {
        method: "POST",
        body: body,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            setStatus("You're on the list. You'll hear from us the moment the launch is official.");
            form.reset();
          } else {
            setStatus("Something interfered. Try again in a moment.", true);
          }
        })
        .catch(function () {
          setStatus("Something interfered. Try again in a moment.", true);
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }
})();
