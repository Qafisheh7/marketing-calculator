"use strict";

function num(id, doc) {
  var el = (doc || document).getElementById(id);
  if (!el || el.value === "" || el.value === null) return null;
  var v = parseFloat(el.value);
  return isFinite(v) ? v : null;
}

function computeMetrics(input) {
  var out = { romi: null, mer: null, cac: null, ltv: null, ratio: null };

  if (input.revenue != null && input.spend != null && input.spend > 0) {
    out.romi = (input.revenue - input.spend) / input.spend;
  }
  if (input.totalRevenue != null && input.spend != null && input.spend > 0) {
    out.mer = input.totalRevenue / input.spend;
  }
  if (input.spend != null && input.customers != null && input.customers > 0) {
    out.cac = input.spend / input.customers;
  }
  if (input.aov != null && input.margin != null && input.lifespan != null) {
    out.ltv = input.aov * (input.margin / 100) * input.lifespan;
  }
  if (out.ltv != null && out.cac != null && out.cac > 0) {
    out.ratio = out.ltv / out.cac;
  }
  return out;
}

function fmtMoney(v) {
  return v.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
function fmtPct(v) {
  return (v * 100).toFixed(1) + "%";
}
function fmtX(v) {
  return v.toFixed(2) + "x";
}
function fmtRatio(v) {
  return v.toFixed(2) + " : 1";
}

function verdictFor(ratio) {
  if (ratio == null) return "";
  if (ratio >= 3) return "LTV:CAC is at or above 3:1, the common benchmark for a healthy growth model.";
  if (ratio >= 1) return "LTV:CAC is between 1:1 and 3:1. Acquisition pays back, but there is room to improve efficiency.";
  return "LTV:CAC is below 1:1. You are spending more to acquire a customer than they return in margin.";
}

function render(doc) {
  doc = doc || document;
  var input = {
    revenue: num("revenue", doc),
    totalRevenue: num("totalRevenue", doc),
    spend: num("spend", doc),
    customers: num("customers", doc),
    aov: num("aov", doc),
    margin: num("margin", doc),
    lifespan: num("lifespan", doc)
  };
  var m = computeMetrics(input);
  doc.getElementById("r-romi").textContent = m.romi == null ? "-" : fmtPct(m.romi);
  doc.getElementById("r-mer").textContent = m.mer == null ? "-" : fmtX(m.mer);
  doc.getElementById("r-cac").textContent = m.cac == null ? "-" : fmtMoney(m.cac);
  doc.getElementById("r-ltv").textContent = m.ltv == null ? "-" : fmtMoney(m.ltv);
  doc.getElementById("r-ratio").textContent = m.ratio == null ? "-" : fmtRatio(m.ratio);
  doc.getElementById("verdict").textContent = verdictFor(m.ratio);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    var inputs = document.querySelectorAll("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", function () { render(); });
    }
    render();
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { computeMetrics: computeMetrics, verdictFor: verdictFor };
}
