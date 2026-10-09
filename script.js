/* NatureLens.ai – demo behaviour */
(function () {
  'use strict';

  // ---- Small built-in species list used in demo mode ----
  const SPECIES = [
    {
      kind: 'plant', name: 'Pedunculate oak', latin: 'Quercus robur',
      about: 'A broadleaf tree of woodlands and hedgerows, with deeply rounded leaf lobes and acorns on long stalks.',
      features: ['Rounded leaf lobes with no points', 'Very short leaf stalk', 'Small ear-like lobes at the leaf base'],
      lookalikes: 'Sessile oak has longer leaf stalks and acorns without stalks.'
    },
    {
      kind: 'plant', name: 'Common dandelion', latin: 'Taraxacum officinale',
      about: 'A hardy roadside plant with a single yellow flower head per hollow stem and a round seed puff.',
      features: ['Toothed leaves in a flat rosette', 'One flower head per stem', 'Milky sap in the stem'],
      lookalikes: 'Cat\'s-ear has branched stems and hairy leaves.'
    },
    {
      kind: 'bird', name: 'Eurasian blue tit', latin: 'Cyanistes caeruleus',
      about: 'A small, acrobatic garden bird often seen hanging upside down from feeders and twigs.',
      features: ['Blue cap and wings', 'White cheeks with a dark eye stripe', 'Yellow underparts'],
      lookalikes: 'Great tit is larger with a black head and a black stripe down the belly.'
    },
    {
      kind: 'bird', name: 'European robin', latin: 'Erithacus rubecula',
      about: 'A round, upright songbird that follows gardeners for turned soil and sings through winter.',
      features: ['Orange-red face and breast', 'Brown back', 'Large dark eyes'],
      lookalikes: 'Juvenile robins are speckled brown with no red breast.'
    },
    {
      kind: 'insect', name: 'Monarch butterfly', latin: 'Danaus plexippus',
      about: 'A large orange butterfly that migrates thousands of kilometres, and whose caterpillars feed on milkweed.',
      features: ['Orange wings with black veins', 'White dots along the black border', 'Wingspan around 9 to 10 cm'],
      lookalikes: 'The viceroy is smaller and has an extra black line across the hind wing.'
    },
    {
      kind: 'insect', name: 'Seven-spot ladybird', latin: 'Coccinella septempunctata',
      about: 'A common red beetle that eats aphids and is a welcome visitor in gardens.',
      features: ['Red wing cases', 'Seven black spots', 'Black head with white patches'],
      lookalikes: 'Harlequin ladybirds vary widely in colour and spot count.'
    },
    {
      kind: 'fungus', name: 'Fly agaric', latin: 'Amanita muscaria',
      about: 'A striking woodland mushroom that grows under birch and pine in autumn.',
      features: ['Red cap with white flecks', 'Ring on the stem', 'Swollen, scaly stem base'],
      lookalikes: 'Caesar\'s mushroom has an orange cap and yellow gills.',
      warning: 'Fly agaric is poisonous. Never eat any mushroom you have identified only from a photo.'
    },
    {
      kind: 'fungus', name: 'Chanterelle', latin: 'Cantharellus cibarius',
      about: 'An apricot-coloured woodland mushroom with a fruity smell and false gills that run down the stem.',
      features: ['Egg-yolk yellow colour', 'Blunt, forked ridges instead of true gills', 'Smells faintly of apricot'],
      lookalikes: 'The false chanterelle has thinner, truly forked gills and a more orange colour.',
      warning: 'Lookalikes can make you ill. Check wild mushrooms with a local expert before eating.'
    }
  ];

  // ---- Elements ----
  const fileInput = document.getElementById('file');
  const drop = document.getElementById('drop');
  const preview = document.getElementById('preview');
  const previewImg = document.getElementById('previewImg');
  const resultEl = document.getElementById('result');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  let currentUrl = null;

  // ---- Identification ----
  /**
   * Replace this function to connect a real model or API.
   * It receives the image File and the chosen kind ('any', 'plant', 'bird', 'insect', 'fungus')
   * and must resolve to: { kind, name, latin, about, features[], lookalikes, warning?, confidence (0-100) }
   *
   * Example:
   *   const body = new FormData(); body.append('image', file);
   *   const res = await fetch('/api/identify', { method: 'POST', body });
   *   return res.json();
   */
  async function identify(file, kind) {
    await wait(1900); // pretend to think
    const pool = kind === 'any' ? SPECIES : SPECIES.filter(s => s.kind === kind);
    const seed = hash(file.name + file.size);
    const pick = pool[seed % pool.length];
    const confidence = 78 + (seed % 20); // 78 to 97
    return { ...pick, confidence };
  }

  // ---- Flow ----
  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showError('That file is not an image. Choose a JPG, PNG or WebP photo.');
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      showError('That photo is over 12 MB. Choose a smaller one.');
      return;
    }

    clearError();
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(file);
    previewImg.src = currentUrl;

    drop.hidden = true;
    preview.hidden = false;
    preview.classList.add('is-scanning');
    resultEl.hidden = true;
    resultEl.innerHTML = '';

    const kind = document.querySelector('input[name="kind"]:checked').value;

    try {
      const data = await identify(file, kind);
      preview.classList.remove('is-scanning');
      renderResult(data);
    } catch (err) {
      preview.classList.remove('is-scanning');
      showError('Identification failed. Check your connection and try again.');
      reset();
    }
  }

  function renderResult(d) {
    const features = d.features.map(f => `<li>${esc(f)}</li>`).join('');
    resultEl.innerHTML = `
      <div class="result-top">
        <div>
          <h3>${esc(d.name)}</h3>
          <div class="latin">${esc(d.latin)}</div>
        </div>
        <div class="conf"><strong>${d.confidence}%</strong><span>match confidence</span></div>
      </div>
      <div class="meter" role="img" aria-label="Confidence ${d.confidence} percent"><i></i></div>
      <p>${esc(d.about)}</p>
      <h4>Features that supported this</h4>
      <ul>${features}</ul>
      <h4>Easily confused with</h4>
      <p>${esc(d.lookalikes)}</p>
      ${d.warning ? `<p class="warn">${esc(d.warning)}</p>` : ''}
      <div class="result-actions">
        <button class="btn" type="button" id="again">Identify another photo</button>
        <button class="btn btn-ghost" type="button" id="copy">Copy result</button>
      </div>`;
    resultEl.hidden = false;

    requestAnimationFrame(() => {
      const bar = resultEl.querySelector('.meter i');
      if (bar) bar.style.width = d.confidence + '%';
    });

    document.getElementById('again').addEventListener('click', reset);
    document.getElementById('copy').addEventListener('click', async (e) => {
      const text = `${d.name} (${d.latin}) – ${d.confidence}% match, identified with NatureLens.ai`;
      try {
        await navigator.clipboard.writeText(text);
        e.target.textContent = 'Copied';
      } catch {
        e.target.textContent = 'Copy not available';
      }
      setTimeout(() => { e.target.textContent = 'Copy result'; }, 1800);
    });

    resultEl.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  }

  function reset() {
    fileInput.value = '';
    preview.hidden = true;
    preview.classList.remove('is-scanning');
    resultEl.hidden = true;
    resultEl.innerHTML = '';
    drop.hidden = false;
    document.getElementById('try').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  // ---- Events ----
  fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));

  ['dragenter', 'dragover'].forEach(ev =>
    drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach(ev =>
    drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
  drop.addEventListener('drop', e => handleFile(e.dataTransfer.files[0]));

  // ---- Helpers ----
  function showError(msg) {
    clearError();
    const p = document.createElement('p');
    p.className = 'error';
    p.id = 'err';
    p.setAttribute('role', 'alert');
    p.textContent = msg;
    drop.insertAdjacentElement('afterend', p);
  }
  function clearError() { const e = document.getElementById('err'); if (e) e.remove(); }
  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
  function prefersReducedMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
})();