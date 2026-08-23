(() => {
  'use strict';

  const storageKey = 'bpb-news-cms-data-v1';
  const form = document.querySelector('#newsArticleForm');
  const fields = form.elements;
  const library = document.querySelector('#articleLibrary');
  const message = document.querySelector('#cmsMessage');
  const title = document.querySelector('#editorTitle');
  const imagePreview = document.querySelector('#imagePreview');
  const previewImage = document.querySelector('#imagePreviewImage');
  let selectedImage = '';

  const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const readData = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return { articles: Array.isArray(saved?.articles) ? saved.articles : [] };
    } catch { return { articles: [] }; }
  };
  const writeData = data => localStorage.setItem(storageKey, JSON.stringify(data));
  const formatDate = date => date ? new Intl.DateTimeFormat('en-ZA', { day:'numeric', month:'short', year:'numeric' }).format(new Date(`${date}T00:00:00`)) : 'No date';
  const slugify = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'article';
  const showPreview = image => { selectedImage = image || ''; imagePreview.hidden = !selectedImage; previewImage.src = selectedImage; };
  const resetEditor = () => { form.reset(); fields.articleId.value = ''; fields.category.value = 'News & Insights'; selectedImage = ''; imagePreview.hidden = true; previewImage.removeAttribute('src'); title.textContent = 'New article'; message.textContent = ''; };

  const renderLibrary = () => {
    const articles = readData().articles.sort((a, b) => String(b.date || b.createdAt).localeCompare(String(a.date || a.createdAt)));
    document.querySelector('#articleCount').textContent = `${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`;
    library.innerHTML = articles.length ? articles.map(article => `<article class="library-item"><img src="${escapeHtml(article.image)}" alt=""><div class="library-item__content"><small>${escapeHtml(formatDate(article.date))} · ${escapeHtml(article.author || 'BP Bernstein')}</small><h3>${escapeHtml(article.title)}</h3><div class="library-item__actions"><button type="button" data-edit="${escapeHtml(article.id)}">Edit</button><button type="button" data-delete="${escapeHtml(article.id)}">Delete</button></div></div></article>`).join('') : '<p class="library-empty">No articles have been created yet. Use the editor to publish the first one.</p>';
  };

  const editArticle = id => {
    const article = readData().articles.find(item => item.id === id);
    if (!article) return;
    fields.articleId.value = article.id;
    fields.title.value = article.title || '';
    fields.subtitle.value = article.subtitle || '';
    fields.date.value = article.date || '';
    fields.author.value = article.author || '';
    fields.category.value = article.category || 'News & Insights';
    fields.alt.value = article.alt || '';
    fields.writeup.value = article.writeup || '';
    fields.image.value = '';
    showPreview(article.image);
    title.textContent = 'Edit article';
    message.textContent = `Editing “${article.title}”. Save to apply your changes.`;
    scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.querySelector('#clearEditor').addEventListener('click', resetEditor);
  document.querySelector('#removeImage').addEventListener('click', () => { fields.image.value = ''; showPreview(''); });
  fields.image.addEventListener('change', event => {
    const [file] = event.target.files;
    if (!file) return;
    if (!file.type.startsWith('image/')) { message.textContent = 'Please select a PNG, JPG or WEBP image.'; fields.image.value = ''; return; }
    const reader = new FileReader();
    reader.addEventListener('load', () => showPreview(reader.result));
    reader.readAsDataURL(file);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const isEditing = Boolean(fields.articleId.value);
    if (!form.reportValidity()) return;
    if (!selectedImage) { message.textContent = 'Please add a cover image before saving.'; fields.image.focus(); return; }
    const data = readData();
    const existing = data.articles.find(article => article.id === fields.articleId.value);
    const idBase = slugify(fields.title.value);
    const id = existing?.id || `cms-${idBase}-${Date.now().toString(36)}`;
    const article = {
      id,
      title: fields.title.value.trim(),
      subtitle: fields.subtitle.value.trim(),
      date: fields.date.value,
      author: fields.author.value.trim(),
      category: fields.category.value.trim() || 'News & Insights',
      image: selectedImage,
      alt: fields.alt.value.trim(),
      writeup: fields.writeup.value.trim(),
      createdAt: existing?.createdAt || new Date().toISOString()
    };
    data.articles = existing ? data.articles.map(item => item.id === id ? article : item) : [article, ...data.articles];
    try { writeData(data); } catch { message.textContent = 'This image is too large to save in browser storage. Please use a smaller image and try again.'; return; }
    renderLibrary();
    resetEditor();
    message.textContent = isEditing ? 'Article updated. Refresh the News page to view the changes.' : 'Article saved. Refresh the News page to view it.';
  });

  library.addEventListener('click', event => {
    const editId = event.target.closest('[data-edit]')?.dataset.edit;
    const deleteId = event.target.closest('[data-delete]')?.dataset.delete;
    if (editId) editArticle(editId);
    if (deleteId) {
      const article = readData().articles.find(item => item.id === deleteId);
      if (!article || !confirm(`Delete “${article.title}”? This cannot be undone.`)) return;
      const data = readData();
      data.articles = data.articles.filter(item => item.id !== deleteId);
      writeData(data);
      if (fields.articleId.value === deleteId) resetEditor();
      renderLibrary();
      message.textContent = 'Article deleted. Refresh the News page to view the updated archive.';
    }
  });

  renderLibrary();
})();
