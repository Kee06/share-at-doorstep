(function () {
  const PER_ITEM_FEE = 50; // change to your team's rate

  const $ = (id) => document.getElementById(id);
  const money = (n) => "₹" + n.toLocaleString("en-IN");

  // Only write when the text actually changes, so the observer can't loop
  function setText(el, text) {
    if (el && el.textContent !== text) el.textContent = text;
  }

   function countItems() {
    const list = $("summaryItemsList");
    if (!list) return 0;

    let total = 0;
    Array.from(list.children).forEach((row) => {
      const m = row.textContent.trim().match(/x\s*(\d+)$/i);
      if (m) total += Number(m[1]);
    });

    // Fallback if the rows are nested inside a wrapper element
    if (total === 0) {
      for (const m of list.textContent.matchAll(/x\s*(\d+)/gi)) {
        total += Number(m[1]);
      }
    }
    return total;
  }

  function getBasePrice() {
    const selected = document.querySelector('input[name="pickupService"]:checked');
    return selected ? Number(selected.dataset.price) : 0;
  }

  function updatePrice() {
    const base = getBasePrice();
    const count = countItems();
    const itemsFee = count * PER_ITEM_FEE;
    const total = base + itemsFee;

    setText($("baseFeeDisplay"), money(base));
    setText($("itemCountDisplay"), String(count));
    setText($("perItemFeeDisplay"), String(PER_ITEM_FEE));
    setText($("itemsFeeDisplay"), money(itemsFee));
    setText($("selectedServicePrice"), money(total) + "/-");
    setText($("rzpPriceSummary"), money(total));
  }

  // Recalculate whenever the item summary changes, or when pickup.js
  // rewrites the price text with its own hardcoded value
  const watcher = new MutationObserver(updatePrice);
  ["summaryItemsList", "selectedServicePrice", "rzpPriceSummary"].forEach((id) => {
    const el = $(id);
    if (el) watcher.observe(el, { childList: true, subtree: true, characterData: true });
  });

  // Recalculate when the service type changes
  document.addEventListener("change", (e) => {
    if (e.target.name === "pickupService") updatePrice();
  });

  updatePrice();
})();